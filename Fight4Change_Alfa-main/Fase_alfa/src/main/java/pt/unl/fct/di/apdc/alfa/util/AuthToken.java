package pt.unl.fct.di.apdc.alfa.util;

import com.google.cloud.Timestamp;

import java.util.Date;
import java.util.UUID;

public class AuthToken {
    public String userId;
    public String tokenID;
    public String userRole;
    public Timestamp creationDate;
    public Timestamp expirationDate;

    public static final long EXPIRATION_TIME = 60000 * 60 * 2; // 2h

    public AuthToken() { }

    public AuthToken(String userId, String userRole) {
        this.userId = userId;
        this.tokenID = UUID.randomUUID().toString();
        this.userRole = userRole;
        this.creationDate = Timestamp.now();
        this.expirationDate = Timestamp.of(new Date(this.creationDate.toDate().getTime() + EXPIRATION_TIME));
    }
}
