var sliderControl = null;
let boundsSet = false;

let setPopups = false;
let tSelection = 0;
var timeForm = document.getElementById("form");
var slider = document.getElementById("myRange");
let sTimeInput = document.getElementById("startTime");
let eTimeInput = document.getElementById("endTime");
var startTime = sTimeInput.value;
var endTime = eTimeInput.value;
var sliderOutput = slider.value;
let vehicle;
let length;
let dateSelection;
let dateStart;
let dateEnd;
var taxis = document.getElementsByName("taxi");
let selectedTaxi;
let initialTimeStamp = 0;
let endingTimeStamp = 0;
let active_polyline = L.featureGroup().addTo(myMap);

let sw = false;
startMarkers();

$('#vehicleSelect button').on('click', function() {
  var thisBtn = $(this);
  
  thisBtn.addClass('active').siblings().removeClass('active');
  var btnText = thisBtn.text();
  selectedTaxi = thisBtn.val();
  console.log(btnText + ' - ' + selectedTaxi);

});

// You can use this to set default value
// It will fire above click event which will do the updates for you
$('#vehicleSelect button[value="efee70"]').click();

async function getData() {
  console.log(initialTimeStamp);
  console.log(endingTimeStamp);
  const url = `http://34.221.26.86:50001/vehicles/${selectedTaxi}/${initialTimeStamp}/${endingTimeStamp}`;
  console.log(url);
  const response = await fetch(url);
  const jsonData = await response.json();
  vehicle = jsonData;
  length = Object.keys(vehicle).length;
  slider.max = length - 1;
  slider.value = 0;
  console.log(vehicle);
}

slider.oninput = function() {
  sliderOutput = this.value;

  tSelection = vehicle[sliderOutput].tstamp * 1000;
  dateSelection = new Date(tSelection);
  

  marker_2.setLatLng([vehicle[sliderOutput].latitude, vehicle[sliderOutput].longitude]);
  marker_2.bindPopup("Vehiculo " + dateSelection.getDate()+
    "/"+(dateSelection.getMonth()+1)+
    "/"+dateSelection.getFullYear()+
    " "+dateSelection.getHours()+
    ":"+dateSelection.getMinutes()+
    ":"+dateSelection.getSeconds(), {closeOnClick: false, autoPan:false}).openPopup();

}

sTimeInput.addEventListener("change", function () {
  eTimeInput.min = this.value;
  console.log(this.value);
});

eTimeInput.addEventListener("change", function () {
  sTimeInput.max = this.value;
  console.log(this.value);
});

document.getElementById("newDateTime").addEventListener("click", async function () {
  startTime = sTimeInput.value;
  endTime = eTimeInput.value;
  console.log(startTime);
  console.log(endTime);
  var dateEnteredStart = new Date(startTime);
  var dateEnteredEnd = new Date(endTime);
  console.log(dateEnteredStart);
  console.log(dateEnteredEnd);
  initialTimeStamp = dateEnteredStart.getTime() / 1000;
  endingTimeStamp = dateEnteredEnd.getTime() / 1000;
  setPopups = true;
  await getData();


  sliderOutput = slider.value;

  let latLongs = [];

  tSelection = vehicle[0].tstamp * 1000;
  dateSelection = new Date(tSelection);
  dateStart = new Date(vehicle[0].tstamp * 1000);
  dateEnd = new Date(vehicle[length - 1].tstamp * 1000);
  
  vehicle.forEach(element => {
      latLongs.push([element.latitude, element.longitude]);
  });

  active_polyline.clearLayers();
  var polyline = L.polyline(latLongs, {color: 'red'}).addTo(active_polyline);


  switch (selectedTaxi) {
    case "efee70":
      marker_2.setIcon(taxi1Icon);
      break;
    case "487a8d":
      marker_2.setIcon(taxi2Icon);
      break;
    case "b7ea25":
      marker_2.setIcon(taxi3Icon);
  }

  $(".leaflet-popup-close-button").each(function (index) {
      this.click();
  });

  marker_1.setLatLng([vehicle[0].latitude, vehicle[0].longitude]);
  marker_1.bindPopup("Inicio " + dateStart.getDate()+
    "/"+(dateStart.getMonth()+1)+
    "/"+dateStart.getFullYear()+
    " "+dateStart.getHours()+
    ":"+dateStart.getMinutes()+
    ":"+dateStart.getSeconds(), {closeOnClick: false, autoPan:false, autoClose: false}).openPopup();
  marker_3.setLatLng([vehicle[length - 1].latitude, vehicle[length - 1].longitude]);
  marker_3.bindPopup("Fin " + dateEnd.getDate()+
    "/"+(dateEnd.getMonth()+1)+
    "/"+dateEnd.getFullYear()+
    " "+dateEnd.getHours()+
    ":"+dateEnd.getMinutes()+
    ":"+dateEnd.getSeconds(), {closeOnClick: false, autoPan:false, autoClose: false}).openPopup();

  marker_2.setLatLng([vehicle[0].latitude, vehicle[sliderOutput].longitude]);
  marker_2.bindPopup("Vehiculo " + dateSelection.getDate()+
    "/"+(dateSelection.getMonth()+1)+
    "/"+dateSelection.getFullYear()+
    " "+dateSelection.getHours()+
    ":"+dateSelection.getMinutes()+
    ":"+dateSelection.getSeconds(), {closeOnClick: false, autoPan:false}).openPopup();
});