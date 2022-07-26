package pt.unl.fct.di.apdc.alfa.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.alfa.util.EventData;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Path("/events")
public class JoinEventsResource {

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	private final Gson g = new Gson();

	public JoinEventsResource() {
	}

	@GET
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Response doProfile() {

		Transaction txn = datastore.newTransaction();

		try {
			Query<Entity> query = Query.newEntityQueryBuilder().setKind("Event").build();

			QueryResults<Entity> attributes = datastore.run(query);

			List<EventData> events = new LinkedList();

			attributes.forEachRemaining(event -> {
				EventData Event = new EventData(
						event.getKey().getName(), 
						event.getString("event_date"), 
						event.getString("event_origin"),
						event.getString("event_description"), 
						event.getString("event_time"),
						
						event.getString("event_markers"));
				
				events.add(Event);
			});
			
			txn.commit();
			return Response.ok(g.toJson(events)).build();

		} finally {
			if (txn.isActive())
				txn.rollback();
		}
	}
}