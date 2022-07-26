package pt.unl.fct.di.apdc.alfa.resources;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Transaction;
import pt.unl.fct.di.apdc.alfa.annotations.Secured;
import pt.unl.fct.di.apdc.alfa.util.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

@Secured
@Path("/logout")
@Consumes(MediaType.APPLICATION_JSON)
public class LogoutResource {

    private static final Logger LOG = Logger.getLogger(LogoutResource.class.getName());

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    public LogoutResource() {
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response doLogout(@Context HttpServletRequest request,
                             @Context HttpHeaders headers) {

        String token = headers.getHeaderString(HttpHeaders.AUTHORIZATION)
                .substring(Constants.AUTHENTICATION_SCHEME.length()).trim();

        Key key = datastore.newKeyFactory().setKind(Constants.DB_TOKEN).newKey(token);

        Transaction txn = datastore.newTransaction();

        try {
            txn.delete(key);
            txn.commit();

            // URI location = new URI(Constants.LOGOUT_PAGE);
            // return Response.temporaryRedirect(location).build();
            return Response.ok().build();
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

}
