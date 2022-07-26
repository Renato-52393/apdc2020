package pt.unl.fct.di.apdc.alfa.util;

public enum Role {
    SUPER_USER("SU"),
    BACKEND_MANAGER("BAM"),
    BACKOFFICE_MANAGER("BOM"),
    USER("USER");

    public final String label;

    Role(String label) {
        this.label = label;
    }

    public static String getDefaltRole() {
        return USER.label;
    }

    public static Role fromString(String label) {
        for(Role r : Role.values()) {
            if(r.label.equalsIgnoreCase(label))
                return r;
        }
        return null;
    }
}
