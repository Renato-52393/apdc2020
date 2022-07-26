package pt.unl.fct.di.apdc.alfa.util;

import org.apache.commons.validator.routines.EmailValidator;

import java.util.regex.Pattern;

public class RegisterData {

	public String userId;
	public String username;
	public String password;
	public String confirmPassword;
	public String address;
	public String zipcode;
	public String role;
	public String status;
	

	public RegisterData() {

	}

	public RegisterData(String userId, String username, String password, String confirmPassword, String address,
			String zipcode, String role, String status) {

		this.userId = userId;
		this.username = username;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.address = address;
		this.zipcode = zipcode;
		this.role = role;
		this.status = status;
	}
	
	

	public boolean idIsEmail() {
		return EmailValidator.getInstance().isValid(userId);
	}

	public boolean idIsPhone() {
		String numberFormats = Constants.PHONE_FORMAT;
		Pattern phone = Pattern.compile(numberFormats);
		return phone.matcher(userId).matches();
	}

	public boolean validPassword() {
		return password.length() >= Constants.PASSWORD_LENGTH && password.matches(Constants.PASSWORD_FORMAT);
	}

}
