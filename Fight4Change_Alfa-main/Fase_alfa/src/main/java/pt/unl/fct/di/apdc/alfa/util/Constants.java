package pt.unl.fct.di.apdc.alfa.util;

public final class Constants {
    public static final String DB_USERS = "Users";
    public static final String DB_USER_STATS = "UserStats";
    public static final String DB_USER_LOG = "UserLog";
    public static final String DB_TOKEN = "Token";
    public static final String DB_ROUTES = "Routes";

    public static final String AUTHENTICATION_SCHEME = "Bearer";

    public static final String MASTER_USER_ID = "ifrag.fight4change@gmail.com";
    public static final String MASTER_USER_NAME = "IFRAG";
    public static final String MASTER_USER_PWD = "apdc2021";

    public static final String DEFAULT_USER_STATUS = "ENABLED";

    public static final String GOOGLE_CLIENT_ID = "129759953268-9o97j36dgd577de4biqtvu99ot7n02oc.apps.googleusercontent.com";
    public static final String TYPE_GOOGLE = "GOOGLE_ACCOUNT";

    public static final int PASSWORD_LENGTH = 6;
    public static final String PASSWORD_FORMAT = "^(?=.*[A-Za-z])(?=.*\\d).{6,}$";
    public static final String PHONE_FORMAT = "^(\\+351)?\\s?9[1236][0-9]\\s?(([0-9]{3})\\s?){2}$";

    public static final String SECRET_CLEAR_TOKENS = "3VHf!dY-%WzStB^>{f%G%)~R";

    public static final String LOGOUT_PAGE = "../logout.html";
}