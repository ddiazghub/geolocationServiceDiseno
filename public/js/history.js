var sliderControl = null;
let boundsSet = false;

let tSelections = [0, 0, 0];
let dates = [{start: 0, selection: 0, end: 0}, {start: 0, selection: 0, end: 0}, {start: 0, selection: 0, end: 0}];
let vehicles = [0, 0, 0];
let lengths = [0, 0, 0];
let polylines = [0, 0, 0];
const colors = ['red', 'blue', '#000']
const licensePlates = ["EEE-070", "ABC-425", "BTE-425"]

let vehicleSelect = document.querySelectorAll('[type="checkbox"]');
let timeForm = document.getElementById("form");
let sliders = [document.getElementById("myRange"), document.getElementById("myRange2"), document.getElementById("myRange3")];
let sTimeInput = document.getElementById("startTime");
let eTimeInput = document.getElementById("endTime");

var startTime = sTimeInput.value;
var endTime = eTimeInput.value;
let sliderOutputs = [0, 0, 0];

var taxis = document.getElementsByName("taxi");
let selectedTaxis = ["efee70", "487a8d", "b7ea25"];
let registeredTaxis = ["efee70", "487a8d", "b7ea25"];
let initialTimeStamp = 0;
let endingTimeStamp = 0;
let active_polylines = new L.featureGroup().addTo(myMap);
const sw = false;

startMarkers();

async function getData() {
  registeredTaxis.forEach(async (taxi) => {

    let index = registeredTaxis.indexOf(taxi);
    let url = `http://34.221.26.86:50001/vehicles/${taxi}/${initialTimeStamp}/${endingTimeStamp}`;

    console.log(url);

    let response = await fetch(url);
    let jsonData = await response.json();

    vehicles[index] = await jsonData;
    lengths[index] = Object.keys(await jsonData).length
    sliders[index].max = await jsonData.length - 1;
    sliders[index].value = 0;
  });
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
  var dateEnteredStart = new Date(startTime);
  var dateEnteredEnd = new Date(endTime);
  initialTimeStamp = dateEnteredStart.getTime() / 1000;
  endingTimeStamp = dateEnteredEnd.getTime() / 1000;

  await getData();

  console.log(vehicles);
  console.log(vehicles[0]);
  console.log(vehicles[1]);
  console.log(vehicles[2]);
  updateSliders();
  updatePolylines();
  setAllMarkers();
  closePopups();
});

[].forEach.call(vehicleSelect, function (element) {
    element.addEventListener("change", function(){
        if (this.checked) {
            selectedTaxis.push(this.value);
        } else {
            var index = selectedTaxis.indexOf(this.value);
            if (index > -1) {
                selectedTaxis.splice(index, 1);
            }
        }
        console.log(selectedTaxis);
        updatePolylines();
        setAllMarkers();
        closePopups();
    });
});

sliders.forEach(slider => {
  slider.oninput = function() {
    let index = sliders.indexOf(slider);
    updateTimeDataFromSliders();
    updateMarker(vehicles[index], "selection", true);
  }
});

function updateSliders() {
  sliders.forEach(slider => {
    let index = sliders.indexOf(slider);
    if (lengths[index] < 1) {
      alert("El vehículo " + licensePlates[index] + " no tiene ubicaciones registradas en el intervalo.");
      return;
    }
    sliderOutputs[index] = slider.value;
    tSelections[index] = vehicles[index][0].tstamp * 1000;
    dates[index].start = new Date(tSelections[index]);
    dates[index].end = new Date(tSelections[index]);
    dates[index].selection = new Date(vehicles[index][lengths[index] - 1].tstamp * 1000);
  });
};

function updateTimeDataFromSliders() {
  sliders.forEach(slider => {
    let index = sliders.indexOf(slider);
    if (lengths[index] < 1) return;
    sliderOutputs[index] = slider.value;
    tSelections[index] = vehicles[index][slider.value].tstamp * 1000;
    dates[index].selection = new Date(tSelections[index]);
  });
};

function updatePolylines() {
  let latLongs = [[], [], []];
  active_polylines.clearLayers();
  vehicles.forEach(vehicle => {
    let index = vehicles.indexOf(vehicle);
    if (lengths[index] < 1) return;
    if (!selectedTaxis.includes(registeredTaxis[vehicles.indexOf(vehicle)])) return;
    vehicle.forEach(element => {
      latLongs[index].push([element.latitude, element.longitude]);
    })
    polylines[index] = new L.polyline(latLongs[index], {color: colors[index]}).addTo(active_polylines);
  });
}

function updateMarker(vehicle, dateType, close) {
  let index = vehicles.indexOf(vehicle);

  let mIndex = 0;
  let vIndex = 0;
  let string = "";

  switch (dateType) {
    case "start":
      mIndex = 0;
      vIndex = 0;
      string = "Inicio ";
      break;
    case "selection":
      mIndex = 1;
      vIndex = sliderOutputs[index];
      string = "Vehiculo ";
      break;
    case "end":
      mIndex = 2;
      vIndex = lengths[index] - 1;
      string = "Fin ";
      break;
  }

  if (!selectedTaxis.includes(registeredTaxis[vehicles.indexOf(vehicle)]) || (lengths[index] < 1)) {
    markers[index][mIndex].setLatLng([0, 0]);
    return;
  };

  console.log(index);
  console.log(vIndex);
  console.log(sliderOutputs);
  console.log(vehicle[vIndex]);
  markers[index][mIndex].setLatLng([vehicles[index][vIndex].latitude, vehicles[index][vIndex].longitude]);
  markers[index][mIndex].bindPopup(string + dates[index][dateType].getDate()+
    "/"+(dates[index][dateType].getMonth()+1)+
    "/"+dates[index][dateType].getFullYear()+
    " "+dates[index][dateType].getHours()+
    ":"+dates[index][dateType].getMinutes()+
    ":"+dates[index][dateType].getSeconds(), {closeOnClick: false, autoPan:false, autoClose: close}).openPopup();
};

function setAllMarkers() {
  vehicles.forEach(vehicle => {
    updateMarker(vehicle, "start", false);
    updateMarker(vehicle, "selection", true);
    updateMarker(vehicle, "end", false);
  });
};

function closePopups() {
  $(".leaflet-popup-close-button").each(function (index) {
    this.click();
  });
}