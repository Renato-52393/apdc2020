package pt.unl.fct.di.apdc.alfa.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.alfa.annotations.Secured;
import pt.unl.fct.di.apdc.alfa.util.Constants;
import pt.unl.fct.di.apdc.alfa.util.EventData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Secured
@Path("/createEvent")
@Produces(MediaType.APPLICATION_JSON + ";charset=UTF-8")
public class EventResource {


	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	private static final Logger LOG = Logger.getLogger(EventResource.class.getName());
	private final KeyFactory eventsKeyFactory = datastore.newKeyFactory().setKind("Event");
	private final KeyFactory tokensKeyFactory = datastore.newKeyFactory().setKind("Token");
	private final KeyFactory usersKeyFactory = datastore.newKeyFactory().setKind("Users");
	private final Gson g = new Gson();

	public EventResource() {
	}

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerEvent(@Context HttpServletRequest request,
            @Context HttpHeaders headers, EventData data) {
		
		 String token = headers.getHeaderString(HttpHeaders.AUTHORIZATION)
	                .substring(Constants.AUTHENTICATION_SCHEME.length()).trim();
		 Key tokenKey = tokensKeyFactory.newKey(token);
		 Entity tokenEnt = datastore.get(tokenKey);

		 String email = tokenEnt.getString("token_user");
		 Key userKey = usersKeyFactory.newKey(email);

		Transaction txn = datastore.newTransaction();

		try {
			Entity userEnt = datastore.get(userKey);
			if(userEnt == null) {
				txn.rollback();
				return Response.status(Response.Status.BAD_REQUEST).entity("User does not exist.").build();
			}

			Key eventKey = eventsKeyFactory.newKey(data.eventsName);

			Entity.Builder newEvent = Entity.newBuilder(eventKey);

			List<KeyValue> eventParticipants = new ArrayList<>();

			newEvent.set("event_creator", userKey)
					.set("event_origin", data.origin)
					.set("event_description", data.description)
					.set("event_time", data.time)
					.set("event_date", data.date)
					.set("event_markers", data.markers)
					.set("event_participants", eventParticipants);

			// add event to the creating user's list of events
			List<KeyValue> userEvents = userEnt.getList("user_events");
			ValueBuilder<Key, KeyValue, KeyValue.Builder> builder = new KeyValue.Builder().set(eventKey);
			List<KeyValue> newList = new ArrayList<>(userEvents);
			newList.add(builder.build());

			Entity.Builder newUser = Entity.newBuilder(userEnt);
			newUser.set("user_events", newList);

			txn.add(newEvent.build());
			txn.put(newUser.build());
			txn.commit();

			return Response.ok().build();

		} finally {
			if (txn.isActive()) {
				txn.rollback();
			}
		}
	}

	@GET
	@Path("/getEvent/{eventName}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEvent(@PathParam("eventName") String eventsName, @Context HttpServletRequest request,
							 @Context HttpHeaders headers) {
		LOG.warning("Get event: " + eventsName);

		Key eventKey = eventsKeyFactory.newKey(eventsName);
		Entity eventEnt = datastore.get(eventKey);

		Transaction txn = datastore.newTransaction();

		try {
			if(eventEnt == null) {
				txn.rollback();
				return Response.status(Response.Status.BAD_REQUEST).entity("Event does not exist.").build();
			}

			EventData eventData = new EventData(eventsName, eventEnt.getString("event_date"), eventEnt.getString("event_origin"),
					eventEnt.getString("event_description"), eventEnt.getString("event_time"), eventEnt.getString("event_markers"));

			txn.commit();
			return Response.ok(g.toJson(eventData)).build();
		} finally {
			if(txn.isActive()) {
				txn.rollback();
			}
		}
	}

	@POST
	@Path("/updateEvent")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEvent(EventData data) {
		LOG.fine("Get event: " + data.eventsName);

		Key eventKey = eventsKeyFactory.newKey(data.eventsName);
		Entity eventEnt = datastore.get(eventKey);

		Transaction txn = datastore.newTransaction();

		try {
			if(eventEnt == null) {
				txn.rollback();
				return Response.status(Response.Status.BAD_REQUEST).entity("Event does not exist.").build();
			}

			Entity.Builder newEvent = Entity.newBuilder(eventKey);

			if(!data.origin.equals(""))
				newEvent.set("event_origin", data.origin);

			if(!data.description.equals(""))
				newEvent.set("event_description", data.description);

			if(!data.time.equals(""))
				newEvent.set("event_time", data.time);

			if(!data.markers.equals(""))
				newEvent.set("event_time", data.markers);

			txn.put(newEvent.build());
			txn.commit();

			return Response.ok().build();
		} finally {
			if(txn.isActive()) {
				txn.rollback();
			}
		}
	}
}