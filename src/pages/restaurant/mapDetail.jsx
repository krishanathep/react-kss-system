import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// fix marker files not found
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { Link, useParams } from "react-router-dom";
import axios from "axios";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const mapDetail = () => {
  const { id } = useParams();
  const [rest, setRestaurant] = useState([]);
  const [lat, setLat]=useState('')
  const [long, setLong]=useState('')

  const mapCenter = [13.806032270422516, 100.53752731937284]

  const fetData = async () => {
    await axios.get( "https://full-stack-app.com/laravel_auth_jwt_api/public/api/restaurant/" + id)
        .then((res) => {
      console.log(res.data.restaurant);
      setRestaurant(res.data.restaurant);
      setLat(res.data.restaurant.latitude)
      setLong(res.data.restaurant.longitude)
    });
  };

  useEffect(() => {
    fetData();
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Restaurant search map</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Restaurant</a>
                  </li>
                  <li className="breadcrumb-item active">Map</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                  <MapContainer
                    center={mapCenter}
                    zoom={12}
                    style={{ height: "70vh" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[lat , long]}
                    >
                      <Popup>
                        {rest.title}
                      </Popup>
                    </Marker>
                  </MapContainer>
                  <div className="float-right mt-2">
                    <Link to={'/restaurant'} className="btn btn-danger">Go back</Link>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default mapDetail;
