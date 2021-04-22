
async function getData() {

    const response = await fetch('http://34.221.26.86:50001/vehicles/');
    const jsonData = await response.json();
    
    vehicles = jsonData;
    console.log(vehicles);            
    updateMarkersAndText(vehicles);

}

function updateMarkersAndText(data) {

    vehicles.forEach(vehicle => {
        let date = new Date(vehicle.tstamp * 1000);
        let latLongs = [vehicle.latitude, vehicle.longitude];
        console.log(date);
        console.log(vehicle.tstamp);



        switch (vehicle.id) {

        case "efee70":
            document.getElementById('lat').innerHTML = vehicle.latitude;
            document.getElementById('lon').innerHTML = vehicle.longitude;
            document.getElementById('fec').innerHTML = date;
            marker_1.setLatLng(latLongs);
            polyline1.addLatLng(latLongs);
            break;

        case "487a8d":
            document.getElementById('latitud').innerHTML = vehicle.latitude;
            document.getElementById('longitud').innerHTML = vehicle.longitude;
            document.getElementById('fecha').innerHTML = date;
            marker_2.setLatLng(latLongs);
            polyline2.addLatLng(latLongs);
            break;

        case "b7ea25":
            document.getElementById('latitude').textContent = vehicle.latitude;
            document.getElementById('longitude').textContent = vehicle.longitude;
            document.getElementById('date').textContent = date;
            marker_3.setLatLng(latLongs);
            polyline3.addLatLng(latLongs);
            
        }
    });

    if (!boundsSet) {
        const group = new L.featureGroup([marker_1, marker_2, marker_3]);
        myMap.fitBounds(group.getBounds().pad(0.5));
        boundsSet = true;
    }
}