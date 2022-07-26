package pt.unl.fct.di.apdc.alfa.resources;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.util.Utils;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.alfa.util.AuthToken;
import pt.unl.fct.di.apdc.alfa.util.LoginData;
import pt.unl.fct.di.apdc.alfa.util.LoginGoogleData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.logging.Logger;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class LoginResource {

    private static final String CLIENT_ID = "129759953268-9o97j36dgd577de4biqtvu99ot7n02oc.apps.googleusercontent.com";

    private static final String DISABLED_USER_STATUS = "DISABLED";

    private static final Logger LOG = Logger.getLogger(LoginResource.class.getName());
    private final Gson g = new Gson();

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private final KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");


    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response doLogin(LoginData data,
                            @Context HttpServletRequest request,
                            @Context HttpHeaders headers) {
        LOG.fine("Login attempt by user: " + data.userId);

        Key userKey = userKeyFactory.newKey(data.userId);
        Key ctrsKey = datastore.newKeyFactory()
                .addAncestors(PathElement.of("Users", data.userId))
                .setKind("UserStats").newKey("counters");

        Key logKey = datastore.allocateId(
                datastore.newKeyFactory()
                        .addAncestors(PathElement.of("Users", data.userId))
                        .setKind("UserLog").newKey()
        );

        Transaction txn = datastore.newTransaction();

        try {
            Entity user = txn.get(userKey);
            if(user == null) {
                LOG.warning("Failed attempt for username: " + data.userId);
                return Response.status(Response.Status.FORBIDDEN).entity("Wrong password or username.").build();
            }

            if(user.getString("user_account_status").equals(DISABLED_USER_STATUS)) {
                LOG.warning("Account is disabled");
                return Response.status(Response.Status.FORBIDDEN).entity("Account is disabled.").build();
            }

            Entity stats = txn.get(ctrsKey);
            if(stats == null) {
                stats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", 0L)
                        .set("user_stats_failed", 0L)
                        .set("user_first_login", Timestamp.now())
                        .set("user_last_login", Timestamp.now())
                        .build();
            }

            String hashedPWD = (String) user.getString("user_pwd");
            if(hashedPWD.equals(DigestUtils.sha512Hex(data.password))) {

                Entity log = Entity.newBuilder(logKey)
                        .set("user_login_ip", request.getRemoteAddr())
                        .set("user_login_host", request.getRemoteHost())
                        .set("user_login_latlon",
                                StringValue.newBuilder(headers.getHeaderString("X-AppEngine-CityLatLong"))
                                        .setExcludeFromIndexes(true).build())
                        .set("user_login_city", headers.getHeaderString("X-AppEngine-City"))
                        .set("user_login_country", headers.getHeaderString("X-AppEngine-Country"))
                        .set("user_login_time", Timestamp.now())
                        .build();

                Entity ustats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", 1L + stats.getLong("user_stats_logins"))
                        .set("user_stats_failed", 0L)
                        .set("user_first_login", stats.getTimestamp("user_first_login"))
                        .set("user_last_login", Timestamp.now())
                        .build();

                AuthToken authToken = new AuthToken(data.userId, user.getString("user_role"));

                Key tokenKey = datastore.newKeyFactory()
                        .setKind("Token").newKey(authToken.tokenID);
                Entity token = Entity.newBuilder(tokenKey)
                        .set("token_user", data.userId)
                        .set("token_creation", authToken.creationDate)
                        .set("token_expiration", authToken.expirationDate)
                        .set("token_role", authToken.userRole)
                        .build();

                txn.put(log, ustats, token);
                txn.commit();

                LOG.info("User '" + data.userId + "' logged in successfully.");
                return Response.ok(g.toJson(authToken)).build();

            } else {
                Entity ustats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", stats.getLong("user_stats_logins"))
                        .set("user_stats_failed", 1L + stats.getLong("user_stats_failed"))
                        .set("user_first_login", stats.getTimestamp("user_first_login"))
                        .set("user_last_login", stats.getTimestamp("user_last_login"))
                        .build();
                txn.put(ustats);
                txn.commit();
                LOG.warning("Wrong password or username: " + data.userId);
                return Response.status(Response.Status.FORBIDDEN).entity("Wrong password or username.").build();
            }
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if(txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @POST
    @Path("/google")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
    public Response doLoginGoogle(LoginGoogleData data,
                                  @Context HttpServletRequest request,
                                  @Context HttpHeaders headers) {
        LOG.fine("Login attempt by user: " + data.userId);

        Key userKey = userKeyFactory.newKey(data.userId);
        Key ctrsKey = datastore.newKeyFactory()
                .addAncestors(PathElement.of("Users", data.userId))
                .setKind("UserStats").newKey("counters");

        Key logKey = datastore.allocateId(
                datastore.newKeyFactory()
                        .addAncestors(PathElement.of("Users", data.userId))
                        .setKind("UserLog").newKey()
        );

        Transaction txn = datastore.newTransaction();

        try {
            Entity user = txn.get(userKey);
            if(user == null) {
                LOG.warning("Failed attempt for username: " + data.userId);
                return Response.status(Response.Status.FORBIDDEN).entity("Wrong password or username.").build();
            }

            if(user.getString("user_account_status").equals(DISABLED_USER_STATUS)) {
                LOG.warning("Account is disabled");
                return Response.status(Response.Status.FORBIDDEN).entity("Account is disabled.").build();
            }

            Entity stats = txn.get(ctrsKey);
            if(stats == null) {
                stats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", 0L)
                        .set("user_stats_failed", 0L)
                        .set("user_first_login", Timestamp.now())
                        .set("user_last_login", Timestamp.now())
                        .build();
            }

            HttpTransport transport = Utils.getDefaultTransport();
            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = null;
            try {
                idToken = verifier.verify(data.token);
            } catch(Exception e) {
                LOG.info(e.getLocalizedMessage());
            }
            if (idToken != null) {
                Entity log = Entity.newBuilder(logKey)
                        .set("user_login_ip", request.getRemoteAddr())
                        .set("user_login_host", request.getRemoteHost())
                        .set("user_login_latlon",
                                StringValue.newBuilder(headers.getHeaderString("X-AppEngine-CityLatLong"))
                                        .setExcludeFromIndexes(true).build())
                        .set("user_login_city", headers.getHeaderString("X-AppEngine-City"))
                        .set("user_login_country", headers.getHeaderString("X-AppEngine-Country"))
                        .set("user_login_time", Timestamp.now())
                        .build();

                Entity ustats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", 1L + stats.getLong("user_stats_logins"))
                        .set("user_stats_failed", 0L)
                        .set("user_first_login", stats.getTimestamp("user_first_login"))
                        .set("user_last_login", Timestamp.now())
                        .build();

                AuthToken authToken = new AuthToken(data.userId, user.getString("user_role"));

                Key tokenKey = datastore.newKeyFactory()
                        .setKind("Token").newKey(authToken.tokenID);
                Entity token = Entity.newBuilder(tokenKey)
                        .set("token_user", data.userId)
                        .set("token_creation", authToken.creationDate)
                        .set("token_expiration", authToken.expirationDate)
                        .set("token_role", authToken.userRole)
                        .build();

                txn.put(log, ustats, token);
                txn.commit();

                LOG.info("User '" + data.userId + "' logged in successfully.");
                return Response.ok(g.toJson(authToken)).build();

            } else {
                Entity ustats = Entity.newBuilder(ctrsKey)
                        .set("user_stats_logins", stats.getLong("user_stats_logins"))
                        .set("user_stats_failed", 1L + stats.getLong("user_stats_failed"))
                        .set("user_first_login", stats.getTimestamp("user_first_login"))
                        .set("user_last_login", stats.getTimestamp("user_last_login"))
                        .build();
                txn.put(ustats);
                txn.commit();
                LOG.warning("Wrong password or username: " + data.userId);
                return Response.status(Response.Status.FORBIDDEN).entity("Wrong password or username.").build();
            }
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if(txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }
}
