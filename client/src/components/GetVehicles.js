import React, { Fragment, useEffect, useState } from "react";
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents,  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

const GetVehicles = () => {

    const [vehicles, setVehicles] = useState([]);

    const getVehicles = async () => {
        try {
            const response = await fetch("http://34.221.26.86:50001/vehicles");
            const jsonData = await response.json();

            setVehicles(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
      const timer = setInterval(() => {
        getVehicles();
      }, 5000);
      return () => clearInterval(timer);
    });

    console.log(vehicles);

    return (<Fragment>
      
       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Latitud</th>
            <th scope="col">Longitud</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
          </tr>
        </thead>
        <tbody>
        {vehicles.map(vehicle => (
          <tr>
            <td>{vehicle.id}</td>
            <td>{vehicle.latitude}</td>
            <td>{vehicle.longitude}</td>
            <td>{vehicle.time}</td>
            <td>{vehicle.date}</td>
          </tr>
        ))}
        </tbody>
      </table></Fragment>);

    };

export default GetVehicles;
