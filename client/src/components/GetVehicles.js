import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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

    function LocationMarker() {
      const [position, setPosition] = useState(null)
      const map = useMapEvents({
        click() {
          map.locate()
        },
        locationfound(e) {
          setPosition(e.latlng)
          map.flyTo(e.latlng, map.getZoom())
        },
      })
    
      return position === null ? null : (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }

    return (<Fragment>
      
      <MapContainer
        center={{ lat: 10.9578, lng: -74.792 }}
        zoom={12}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <LocationMarker />
      </MapContainer>,

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
