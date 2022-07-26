package pt.unl.fct.di.apdc.alfa.filters;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;
import pt.unl.fct.di.apdc.alfa.annotations.Secured;
import pt.unl.fct.di.apdc.alfa.resources.LoginResource;
import pt.unl.fct.di.apdc.alfa.util.Constants;
import pt.unl.fct.di.apdc.alfa.util.Role;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;

@Secured
@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

    @Context
    private ResourceInfo resourceInfo;

    private static final Logger LOG = Logger.getLogger(LoginResource.class.getName());

    public AuthenticationFilter() {}

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // Get the Authorization header from the request
        String authorizationHeader =
                requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        // Validate the Authorization header
        if (!isTokenBasedAuthentication(authorizationHeader)) {
            abortWithUnauthorized(requestContext);
            return;
        }

        // Extract the token from the Authorization header
        String token = authorizationHeader
                .substring(Constants.AUTHENTICATION_SCHEME.length()).trim();

        String userRole = validateToken(token);

        if(userRole == null)
            abortWithUnauthorized(requestContext);

        // Get the resource class which matches with the requested URL
        // Extract the roles declared by it
        Class<?> resourceClass = resourceInfo.getResourceClass();
        List<Role> classRoles = extractRoles(resourceClass);

        // Get the resource method which matches with the requested URL
        // Extract the roles declared by it
        Method resourceMethod = resourceInfo.getResourceMethod();
        List<Role> methodRoles = extractRoles(resourceMethod);

        try {

            // Check if the user is allowed to execute the method
            // The method annotations override the class annotations
            if (methodRoles.isEmpty()) {
                checkPermissions(classRoles, Role.fromString(userRole));
            } else {
                checkPermissions(methodRoles, Role.fromString(userRole));
            }

        } catch (Exception e) {
            LOG.warning(e.getMessage());
            abortWithUnauthorized(requestContext);
        }
    }

    private boolean isTokenBasedAuthentication(String authorizationHeader) {

        // Check if the Authorization header is valid
        // It must not be null and must be prefixed with "Bearer" plus a whitespace
        // The authentication scheme comparison must be case-insensitive
        return authorizationHeader != null && authorizationHeader.toLowerCase()
                .startsWith(Constants.AUTHENTICATION_SCHEME.toLowerCase() + " ");
    }

    private void abortWithUnauthorized(ContainerRequestContext requestContext) {

        // Abort the filter chain with a 401 status code response
        // The WWW-Authenticate header is sent along with the response
        requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED)
                        .header(HttpHeaders.WWW_AUTHENTICATE,
                                Constants.AUTHENTICATION_SCHEME + " realm=\"" + requestContext.getHeaderString(HttpHeaders.AUTHORIZATION) + "\"")
                        .build());
    }

    private String validateToken(String token) {
        // Check if the token was issued by the server and if it's not expired
        // Throw an Exception if the token is invalid
        String userRole = null;
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        Key tokenKey = datastore.newKeyFactory().setKind("Token").newKey(token);
        Transaction txn = datastore.newTransaction();
        try {
            Entity t = txn.get(tokenKey);
            Timestamp expiration = t.getTimestamp("token_expiration");
            userRole = t.getString("token_role");
            if(expiration.compareTo(Timestamp.now()) < 0) {
                txn.delete(tokenKey);
                return null;
            }
            txn.commit();
            return userRole;
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
        }
        return userRole;
    }

    // Extract the roles from the annotated element
    private List<Role> extractRoles(AnnotatedElement annotatedElement) {
        if (annotatedElement == null) {
            return new ArrayList<>();
        } else {
            Secured secured = annotatedElement.getAnnotation(Secured.class);
            if (secured == null) {
                return new ArrayList<>();
            } else {
                Role[] allowedRoles = secured.value();
                if(allowedRoles.length == 0)
                    return new ArrayList<>(Arrays.asList(Role.values()));
                return Arrays.asList(allowedRoles);
            }
        }
    }

    private void checkPermissions(List<Role> allowedRoles, Role userRole) throws Exception {
        // Check if the user contains one of the allowed roles
        // Throw an Exception if the user has not permission to execute the method
        for(Role r : allowedRoles) {
            if(r == userRole)
                return;
        }
        throw new Exception();
    }
}
