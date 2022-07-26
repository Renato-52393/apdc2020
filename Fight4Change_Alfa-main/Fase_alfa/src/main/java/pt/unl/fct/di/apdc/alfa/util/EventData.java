package pt.unl.fct.di.apdc.alfa.util;

public class EventData {
	
	public String eventsName;
	public String date;
	public String origin;
	public String description;
	//public String routeId;
	public String time;
	public String markers;

	
	public EventData() {

	}

	public EventData(String eventsName, String date, String origin,String description, String time) {
		this.eventsName = eventsName;
		this.date = date;
		this.origin=origin;
		this.description = description;
		//this.routeId=routeId;
		this.time=time;

	}
	
	public EventData(String eventsName, String date, String origin,String description, String time,String markers) {
		this.eventsName = eventsName;
		this.date = date;
		this.origin=origin;
		this.description = description;
		//this.routeId=routeId;
		this.time=time;
		this.markers=markers;
		
	}


}