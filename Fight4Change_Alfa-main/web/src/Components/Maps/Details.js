/*global google*/
import React,{useState} from 'react'
import "./map.css";
import { MDBtn, MBtn } from './Button'
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { LocateMDBtn, LocateMBtn } from './LocateButton'
import { useHistory } from "react-router-dom";


import { Button } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import { BtnLinkRedirect,BtnRedirect } from './redirect';





const mapContainerStyle = {
  height: "80vh",
  width: "50%",
};

const center = {
  lat: 38.660783,
  lng: -9.205681,
};


function CreateEvents() {

 let history = useHistory();
 const[eventsName, setEventsName] = useState();
 const[date, setDate] = useState();
 const[time, setTime] = useState();
 const[origin, setOrigin] = useState();
 const[description, setDescription] = useState();


 const[show,setShow] = useState(false);

 const handleClose = () => {setShow(false);  
let url ="/home";
 history.push(url);}

 const handleOpen=()=>{console.log("entrei aqui");setShow(true); console.log(show)}

 

  const [state, setState] = React.useState({directions:null});

/*
  const handleChange = React.useCallback((e) => {
    const value = e.target.value;
    setState({
        [e.target.name]: value
    });
    console.log(e.target.value)
  })*/
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState([]);

  const coordinates = markers.map(p=>( { lat: p.lat, lng: p.lng }));
  const coord = JSON.stringify(coordinates);

  const handleContinue = e => {
    e.preventDefault();
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("user") 
      },
      body: JSON.stringify({
        eventsName: eventsName,
        date:date,
        origin: origin,
        description:description,
        time: time,
        markers:coord
      })
    };
    fetch('https://apdc-fasebeta.appspot.com/createEvent', request)
    .then( response => {
     
        console.log(request.headers)
        console.log("mudei1")
        console.log(request.body)
        console.log("response" + response)
        if (response.ok) {
          console.log("Event successfully created alterado2!");
          setShow(true);
          console.log("no continue: " +  show);          
        }
        else {
          console.log("Something went wrong.");
        //  this.setShow(false);
          console.log(show);
          let url ="/createEvent";
          history.push(url);

        }
      }).catch(error => console.error('Error', error))
  };




 
  var service = new google.maps.DirectionsService();

  

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),

      },
    ]);
  }, []);

  const onMarkerClick = React.useCallback((e) => {
    setSelected((current) => [
      ...current, {

        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        active: true,
      }
    ])


  },[])


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 38.660783, lng: () => -9.205681 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      setMarkers((current) => [
        ...current,
        {
          lat: lat,
          lng: lng,

        },
      ]);
      const waypoints = markers.map(p => ({
        location: { lat: p.lat, lng: p.lng },
        stopover: true
      }))
    
      
      if (waypoints.length >= 2) {
        const origin = waypoints[0].location;
        const destination = waypoints.pop().location;
        
    
        service.route(
    
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING,
            waypoints: waypoints
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setState({
                directions: result
              }); 
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
    
        )
      }
     
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const onMarkerDragEnd = (e, index) => {
   
    markers[index] = { ...markers[index], lat: e.latLng.lat(), lng: e.latLng.lng() }

    const waypoints = markers.map(p => ({
      location: { lat: p.lat, lng: p.lng },
      stopover: true
    }))
  
    
    if (waypoints.length >= 2) {
      const origin = waypoints[0].location;
      const destination = waypoints.pop().location;
      service.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING,
          waypoints: waypoints
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            
            setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
  
      )
    }
  


  };
  /* const onMarkerClick = (e,index) => { 
     console.log(index);
     markers[index] = {...markers[index],lat: e.latLng.lat(), lng:e.latLng.lng(),active:true}
     console.log(markers[index].active)
   };*/
  const onInfoClose = (e, index) => {
    selected[index] = { ...selected[index], lat: selected[index].lat, lng: selected[index].lng, active: false }
  }

  


  //const origin = markers[0];
  //const destination = markers[markers.length-1];


  const waypoints = markers.map(p => ({
    location: { lat: p.lat, lng: p.lng },
    stopover: true
  }))

 
  if (waypoints.length >= 2) {
    const origin = waypoints[0].location;
    const destination = waypoints.pop().location;

    service.route(

      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          
          setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }

    )
  }

  return (

    <>
        <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Event successfully created!</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      <LocateMDBtn>
        <LocateMBtn
          className="locate"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => null
            );
          }}
        >
          <i className="far fa-compass fa-2x"></i>
        </LocateMBtn>
      </LocateMDBtn>


      <div className="originImg"><i className="fas fa-map-marker-alt fa-2x"></i></div>
      <div className="origin">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>

      </div>


      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            draggable={true}
            onDragEnd={(e) => onMarkerDragEnd(e, index)}
            onClick={(e) => onMarkerClick(e, index)}
          />
        ))}

        {selected.map((select, index) => (select.active ? (

          <InfoWindow
            position={{ lat: select.lat, lng: select.lng }}
            onCloseClick={(e) => onInfoClose(e, index)}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  <i className="fas fa-hands-helping"></i>
                </span>{" "}
                Paragem na Rota
              </h2>
              <p>Escolhido {select.lat} , {select.lng}</p>
            </div>
          </InfoWindow>
        ) : null))};
            
            <DirectionsRenderer directions={state.directions}  options={{
           
              suppressMarkers: true
    
            }} ></DirectionsRenderer>
            
      </GoogleMap>




      <form className="details" onSubmit={handleContinue}>
        <div className="nameImg"><i className="fas fa-signature fa-2x"></i></div>
        <div className="name">
          <input
            placeholder="Events Name"
            type="text"
            name="eventsName"
            noValidate
            onChange={e=>setEventsName(e.target.value)}
          // values = {values}
          />
        </div>
        <div className="timeImg"><i className="fas fa-hourglass-half fa-2x"></i></div>
        <div className="time">
          <input
            placeholder="Duration"
            type="time"
            name="time"
            noValidate
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div className="OImg"><i className="far fa-dot-circle fa-2x"></i></div>
        <div className="orig">
          <input
            placeholder="Event Location Beginning"
            type="text"
            name="origin"
            noValidate
            onChange={e => setOrigin(e.target.value)}
          />
        </div>
        <div className="Ocalendar"><i className="far fa-calendar-alt fa-2x"></i></div>
        <div className="date">
          <input
            placeholder="Event Date"
            type="datetime-local"
            name="date"
            noValidate
            onChange={e => setDate(e.target.value)}
          />
        </div>
       
        <div className="DesImg"><i className="fas fa-file-signature fa-2x" ></i></div>
        <div className="textArea">
          <textarea
            name="description"
            placeholder="Event Descriprion"
            onChange={e => setDescription(e.target.value)}

          /></div>
        <MDBtn>
          <MBtn type='submit'  onClick={handleOpen} >Create Event</MBtn>
        </MDBtn>
      </form>

    
     
            
      
    </>
  )
};

export default CreateEvents

