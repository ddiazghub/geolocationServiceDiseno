import React, { Fragment, useEffect, useState } from "react";

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
    return (<Fragment><table class="table">
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
          <td>{vehicle.id}</th>
          <td>{vehicle.latitude}</td>
          <td>{vehicle.longitude}</th>
          <td>{vehicle.time}</td>
          <td>{vehicle.date}</td>
        </tr>
      ))}
    </tbody>
</table></Fragment>);
};

export default GetVehicles;
