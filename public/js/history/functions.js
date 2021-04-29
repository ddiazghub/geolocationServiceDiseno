async function getData() {
  vehicles.ids.forEach(async (taxi) => {
    let index = vehicles.ids.indexOf(taxi);
    let url = `http://34.221.26.86:50001/vehicles/${taxi}/${initialTimeStamp}/${endingTimeStamp}`;

    console.log(url);

    // let response = await fetch(url);
    // let jsonData = await response.json().;
    
    let [jsonData] = await Promise.all([fetch(url).then((response) => response.json())]);
    vehicles.dbData[index] = jsonData;
    vehicles.lengths[index] = Object.keys(jsonData).length;
    vehicles.sliders[index].max = (jsonData.length) - 1;
    vehicles.sliders[index].value = 0;
    });
};


function updateSliders() {
  vehicles.sliders.forEach((slider) => {
    let index = vehicles.sliders.indexOf(slider);
    if (vehicles.lengths[index] < 1) {
      alert(
        "El vehículo " +
        vehicles.licensePlates[index] +
        " no tiene ubicaciones registradas en el intervalo."
      );
      return;
    }
    vehicles.sliderOutputs[index] = slider.value;
    vehicles.tSelections[index] = vehicles.dbData[index][0].tstamp * 1000;
    vehicles.dates[index].start = new Date(vehicles.tSelections[index]);
    vehicles.dates[index].end = new Date(vehicles.tSelections[index]);
    vehicles.dates[index].selection = new Date(
      vehicles.dbData[index][vehicles.lengths[index] - 1].tstamp * 1000
    );
  });
}

function updateTimeDataFromSliders() {
  vehicles.sliders.forEach((slider) => {
    let index = vehicles.sliders.indexOf(slider);
    if (vehicles.lengths[index] < 1) return;
    vehicles.sliderOutputs[index] = slider.value;
    vehicles.tSelections[index] = vehicles.dbData[index][slider.value].tstamp * 1000;
    vehicles.dates[index].selection = new Date(vehicles.tSelections[index]);
  });
}

function updatePolylines() {
  let latLongs = [[], [], []];
  active_polylines.clearLayers();
  vehicles.dbData.forEach((vehicle) => {
    let index = vehicles.dbData.indexOf(vehicle);
    if (vehicles.lengths[index] < 1) return;
    if (!vehicles.selectedTaxis.includes(vehicles.ids[vehicles.dbData.indexOf(vehicle)])) return;
    vehicle.forEach((element) => {
      latLongs[index].push([element.latitude, element.longitude]);
    });
    vehicles.polylines[index] = new L.polyline(latLongs[index], {
      color: vehicles.colors[index],
    }).addTo(active_polylines);
  });
}

function updateMarker(vehicle, dateType, close) {
  let index = vehicles.dbData.indexOf(vehicle);

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
      vIndex = vehicles.sliderOutputs[index];
      string = "Vehiculo ";
      break;
    case "end":
      mIndex = 2;
      vIndex = vehicles.lengths[index] - 1;
      string = "Fin ";
      break;
  }

  if (
    !vehicles.selectedTaxis.includes(vehicles.ids[vehicles.dbData.indexOf(vehicle)]) ||
    vehicles.lengths[index] < 1
  ) {
    markers[index][mIndex].setLatLng([0, 0]);
    return;
  }

  markers[index][mIndex].setLatLng([
    vehicles.dbData[index][vIndex].latitude,
    vehicles.dbData[index][vIndex].longitude,
  ]);
  markers[index][mIndex]
    .bindPopup(
      string +
        vehicles.dates[index][dateType].getDate() +
        "/" +
        (vehicles.dates[index][dateType].getMonth() + 1) +
        "/" +
        vehicles.dates[index][dateType].getFullYear() +
        " " +
        vehicles.dates[index][dateType].getHours() +
        ":" +
        vehicles.dates[index][dateType].getMinutes() +
        ":" +
        vehicles.dates[index][dateType].getSeconds(),
      { closeOnClick: false, autoPan: false, autoClose: close }
    )
    .openPopup();
}

function setAllMarkers() {
  vehicles.dbData.forEach((vehicle) => {
    updateMarker(vehicle, "start", true);
    updateMarker(vehicle, "selection", true);
    updateMarker(vehicle, "end", true);
  });
}

function closePopups() {
  $(".leaflet-popup-close-button").each(function (index) {
    this.click();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}