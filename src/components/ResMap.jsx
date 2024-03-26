import React,{useState,useEffect} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// fix marker files not found
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {

  const [restaurant, setRestaurant] = useState([])

  // url barck-end api
  const APP_API = 'https://full-stack-app.com/laravel_auth_jwt_api/public/api/restaurants'

  // Get restaurant api from url
  const fetData = async() => {
    await axios.get(APP_API)
      .then((res)=>{
        console.log(res.data)
        setRestaurant(res.data.restaurants)
      })
  }

  useEffect(()=>{
    fetData()
  },[])

  return (
    <>
        {/* include map api */}
        <MapContainer
          center={[13.806032270422516, 100.53752731937284]}
          zoom={12}
          style={{ height: "30vh"}}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* create marker from api */}
          {restaurant.map((item)=>
            <Marker key={item.id} position={[item.latitude,item.longitude]}>
              <Popup><img src={item.image} alt="" width={'100'} /></Popup>
            </Marker>
          )}
        </MapContainer>
    </>
  );
};

export default Map;