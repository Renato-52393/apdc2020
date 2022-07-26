package pt.unl.fct.di.apdc.alfa.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.alfa.annotations.Secured;
import pt.unl.fct.di.apdc.alfa.util.AddressData;
import pt.unl.fct.di.apdc.alfa.util.Constants;
import pt.unl.fct.di.apdc.alfa.util.EventData;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Logger;

@Secured
@Path("/findevent")
@Produces(MediaType.APPLICATION_JSON)
public class FindEventsResource {

    private static final Logger LOG = Logger.getLogger(FindEventsResource.class.getName());

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private final KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
    private final Gson g = new Gson();

    public FindEventsResource() {
    }

    @POST
    @Path("/address")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response findEventByAddresses(AddressData data,
                                         @Context HttpServletRequest request,
                                         @Context HttpHeaders headers) {

        Transaction txn = datastore.newTransaction();

        try {
            List<EventData> events = new LinkedList<>();
            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind(Constants.DB_ROUTES)
                    .build();

            QueryResults<Entity> results = datastore.run(query);
            results.forEachRemaining(e -> {
                String destination = e.getString("route_destination");
                String origin = e.getString("route_origin");
               EventData eData = new EventData(e.getString("user_name"), e.getString("user_email"), origin, destination, e.getString("route_time"));
                for(String addr : data.addresses) {
                    if(addr.equalsIgnoreCase(destination))
                        events.add(eData);
                    else if(addr.equalsIgnoreCase(origin))
                        events.add(eData);
                }
            });

            return Response.ok(g.toJson(events)).build();
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GET
    @Path("/myEvents")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response findEventByAddresses(@Context HttpServletRequest request,
                                         @Context HttpHeaders headers) {

        String token = headers.getHeaderString(HttpHeaders.AUTHORIZATION)
                .substring(Constants.AUTHENTICATION_SCHEME.length()).trim();
        Key tokenKey = datastore.newKeyFactory().setKind("Token").newKey(token);
        Entity tokenEnt = datastore.get(tokenKey);

        String email = tokenEnt.getString("token_user");
        Key userKey = userKeyFactory.newKey(email);

        Transaction txn = datastore.newTransaction();

        try {
            Entity user = txn.get(userKey);
            if(user == null) {
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).entity("User does not exists.").build();
            }

            List<EventData> listEvents = new ArrayList<>();
            List<Value<Key>> userEvents = user.getList("user_events");
            for(Value<Key> elem : userEvents) {
                Entity event = txn.get(elem.get());
                EventData eData = new EventData(event.getKey().getName(), event.getString("event_date"), event.getString("event_origin"),
                        event.getString("event_description"), event.getString("event_time"), event.getString("event_markers"));
                listEvents.add(eData);
            }

            return Response.ok(g.toJson(listEvents)).build();
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}