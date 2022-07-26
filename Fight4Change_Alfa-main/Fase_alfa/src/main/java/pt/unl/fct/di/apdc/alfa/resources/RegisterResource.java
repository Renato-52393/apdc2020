package pt.unl.fct.di.apdc.alfa.resources;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.util.Utils;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.cloud.datastore.*;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.alfa.util.Constants;
import pt.unl.fct.di.apdc.alfa.util.RegisterData;
import pt.unl.fct.di.apdc.alfa.util.RegisterGoogleData;
import pt.unl.fct.di.apdc.alfa.util.Role;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

@Path("/signup")
@Produces(MediaType.APPLICATION_JSON +";charset=UTF-8")
public class RegisterResource {

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	private static final Logger LOG = Logger.getLogger(RegisterResource.class.getName());
	private final KeyFactory userKind = datastore.newKeyFactory().setKind("Users");


	public RegisterResource() {}

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerAccount(RegisterData data) {
		LOG.fine("Register attempt by user: " + data.userId);

		if(!data.password.equals(data.confirmPassword))
			return Response.status(Status.BAD_REQUEST).entity("Passwords must match.").build();
		boolean idIsEmail = data.idIsEmail();
		boolean idIsPhone = data.idIsPhone();
		if(!(idIsEmail || idIsPhone))
			return Response.status(Status.BAD_REQUEST).entity("Invalid email or phone.").build();
		if(!data.validPassword())
			return Response.status(Status.BAD_REQUEST).entity("Invalid password").build();

		Transaction txn = datastore.newTransaction();

		try {
			Key userKey = userKind.newKey(data.userId);
			Entity user = null;

			if(!datastoreHasMasterUser(txn)) {
				LOG.info("Creating super user.");
				userKey = userKind.newKey(Constants.MASTER_USER_ID);
				data = new RegisterData(Constants.MASTER_USER_ID, Constants.MASTER_USER_NAME, Constants.MASTER_USER_PWD, Constants.MASTER_USER_PWD, "", "", "", "");
			} else {
				user = datastore.get(userKey);
			}

			if(user!=null) {
				txn.rollback();
				return Response.status(Status.BAD_REQUEST).entity("User already exists").build();
			} else {
				List<KeyValue> userEvents = new ArrayList<>();

				Entity.Builder newUsr = Entity.newBuilder(userKey);

				if(data.idIsEmail())
					newUsr.set("user_email", data.userId);
				if(data.idIsPhone())
					newUsr.set("user_phone", data.userId);
				if(data.userId.equals(Constants.MASTER_USER_ID))
					newUsr.set("user_role", Role.SUPER_USER.label);
				else
					newUsr.set("user_role", Role.getDefaltRole());

				newUsr.set("user_name", data.username)
						.set("user_pwd", DigestUtils.sha512Hex(data.password))
						.set("user_address", data.address)
						.set("user_zipcode", data.zipcode)
						.set("user_events", userEvents)
						.set("user_account_status", Constants.DEFAULT_USER_STATUS);

				txn.add(newUsr.build());
				txn.commit();
				
				return Response.ok().build();

			}

		} finally{
			if(txn.isActive()) {
				txn.rollback();
			}
		}
	}

	@POST
	@Path("/google")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerGoogleAccount(RegisterGoogleData data) {
		LOG.fine("Register attempt by user: " + data.userId);

		Transaction txn = datastore.newTransaction();

		try {
			Key userKey = userKind.newKey(data.userId);
			Entity user = datastore.get(userKey);

			if(!datastoreHasMasterUser(txn)) {
				LOG.warning("Can't use Google sign in without super user account.");
				txn.rollback();
			}

			HttpTransport transport = Utils.getDefaultTransport();
			JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
					.setAudience(Collections.singletonList(Constants.GOOGLE_CLIENT_ID))
					.build();

			GoogleIdToken idToken = null;
			try {
				idToken = verifier.verify(data.token);
			} catch(Exception e) {
				LOG.info(e.getLocalizedMessage());
			}
			if(idToken == null) {
				txn.rollback();
				return Response.status(Status.BAD_REQUEST).entity("Invalid Google sign up.").build();
			}

			if(user!=null) {
				txn.rollback();
				return Response.status(Status.BAD_REQUEST).entity("User already exists").build();
			} else {
				List<KeyValue> userEvents = new ArrayList<>();

				Entity newUsr = Entity.newBuilder(userKey)
						.set("user_email", data.userId)
						.set("user_name", data.username)
						.set("user_address", data.address)
						.set("user_zipcode", data.zipcode)
						.set("user_events", userEvents)
						.set("user_account_status", Constants.DEFAULT_USER_STATUS)
						.set("user_external_type", Constants.TYPE_GOOGLE)
						.set("user_external_id", data.externalId)
						.build();

				txn.add(newUsr);
				txn.commit();

				return Response.ok().build();

			}

		} finally{
			if(txn.isActive()) {
				txn.rollback();
			}
		}
	}

	public boolean datastoreHasMasterUser(Transaction txn) {
		Key master = userKind.newKey(Constants.MASTER_USER_ID);
		return txn.get(master) != null;
	}

}