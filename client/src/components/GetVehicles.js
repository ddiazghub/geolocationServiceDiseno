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
      <tr>
        <th scope="row" id="plate1">EFE-070</th>
        <td class="tg-0lax" id="lat">10.992390086364746</td>
        <td class="tg-0lax" id="lon">-74.80256652832031</td>
        <td class="tg-0lax" id="fec">2021-03-09</td>
        <td class="tg-0lax" id="hor">19:05:11</td>
      </tr>
      <tr>
        <th scope="row" id="plate2">ABC-425</th>
        <td class="tg-0lax" id="latitud">10.992390086364746</td>
        <td class="tg-0lax" id="longitud">-74.80256652832031</td>
        <td class="tg-0lax" id="fecha">2021-03-09</td>
        <td class="tg-0lax" id="hora">19:05:11</td>
      </tr>
      <tr>
        <th scope="row" id="plate3">BTE-425</th>
        <td class="tg-0lax" id="latitude">10.992390086364746</td>
        <td class="tg-0lax" id="longitude">-74.80256652832031</td>
        <td class="tg-0lax" id="date">2021-03-09</td>
        <td class="tg-0lax" id="time">2021-03-09</td>
      </tr>
    </tbody>
</table></Fragment>);
};

export default GetVehicles;
