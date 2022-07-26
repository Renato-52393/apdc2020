package pt.unl.fct.di.apdc.alfa.resources;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;
import pt.unl.fct.di.apdc.alfa.util.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

@Path("/cleartokens")
public class ClearTokensResource {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private static final Logger LOG = Logger.getLogger(ClearTokensResource.class.getName());

    public ClearTokensResource() {
    }

    @POST
    @Path("/")
    public Response clearTokens(@Context HttpServletRequest request,
                                  @Context HttpHeaders headers) {

        String authHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION)
                .substring(Constants.AUTHENTICATION_SCHEME.length()).trim();

        if (!authHeader.equals(Constants.SECRET_CLEAR_TOKENS))
            return Response.status(Response.Status.FORBIDDEN).entity("Not authorized.").build();

        Transaction txn = datastore.newTransaction();

        try {
            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind(Constants.DB_TOKEN)
                    .setFilter(StructuredQuery.PropertyFilter.lt("token_expiration", Timestamp.now()))
                    .build();

            QueryResults<Entity> results = datastore.run(query);
            results.forEachRemaining(t -> txn.delete(t.getKey()));

            txn.commit();

            return Response.ok().build();
        } catch (Exception e) {
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }
}
