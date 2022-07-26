package pt.unl.fct.di.apdc.alfa.util;

public class RegisterGoogleData {

    public String userId;
    public String username;
    public String address;
    public String zipcode;
    public String externalType;
    public String externalId;
    public String token;

    public RegisterGoogleData() {

    }

    public RegisterGoogleData(String userId, String username, String address, String zipcode, String externalType, String externalId, String token) {
        this.userId = userId;
        this.username = username;
        this.address = address;
        this.zipcode = zipcode;
        this.externalType = externalType;
        this.externalId = externalId;
        this.token = token;
    }
}
