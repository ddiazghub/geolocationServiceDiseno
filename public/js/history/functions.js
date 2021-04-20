async function getData() {
  registeredTaxis.forEach(async (taxi) => {
    let index = registeredTaxis.indexOf(taxi);
    let url = `http://34.221.26.86:50001/vehicles/${taxi}/${initialTimeStamp}/${endingTimeStamp}`;

    console.log(url);

    let response = await fetch(url);
    let jsonData = await response.json();

    vehicles[index] = await jsonData;
    lengths[index] = Object.keys(await jsonData).length;
    sliders[index].max = (await jsonData.length) - 1;
    sliders[index].value = 0;
  });
}

function updateSliders() {
  sliders.forEach((slider) => {
    let index = sliders.indexOf(slider);
    if (lengths[index] < 1) {
      alert(
        "El vehículo " +
          licensePlates[index] +
          " no tiene ubicaciones registradas en el intervalo."
      );
      return;
    }
    sliderOutputs[index] = slider.value;
    tSelections[index] = vehicles[index][0].tstamp * 1000;
    dates[index].start = new Date(tSelections[index]);
    dates[index].end = new Date(tSelections[index]);
    dates[index].selection = new Date(
      vehicles[index][lengths[index] - 1].tstamp * 1000
    );
  });
}

function updateTimeDataFromSliders() {
  sliders.forEach((slider) => {
    let index = sliders.indexOf(slider);
    if (lengths[index] < 1) return;
    sliderOutputs[index] = slider.value;
    tSelections[index] = vehicles[index][slider.value].tstamp * 1000;
    dates[index].selection = new Date(tSelections[index]);
  });
}

function updatePolylines() {
  let latLongs = [[], [], []];
  active_polylines.clearLayers();
  vehicles.forEach((vehicle) => {
    let index = vehicles.indexOf(vehicle);
    if (lengths[index] < 1) return;
    if (!selectedTaxis.includes(registeredTaxis[vehicles.indexOf(vehicle)]))
      return;
    vehicle.forEach((element) => {
      latLongs[index].push([element.latitude, element.longitude]);
    });
    polylines[index] = new L.polyline(latLongs[index], {
      color: colors[index],
    }).addTo(active_polylines);
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

  if (
    !selectedTaxis.includes(registeredTaxis[vehicles.indexOf(vehicle)]) ||
    lengths[index] < 1
  ) {
    markers[index][mIndex].setLatLng([0, 0]);
    return;
  }

  console.log(index);
  console.log(vIndex);
  console.log(sliderOutputs);
  console.log(vehicle[vIndex]);
  markers[index][mIndex].setLatLng([
    vehicles[index][vIndex].latitude,
    vehicles[index][vIndex].longitude,
  ]);
  markers[index][mIndex]
    .bindPopup(
      string +
        dates[index][dateType].getDate() +
        "/" +
        (dates[index][dateType].getMonth() + 1) +
        "/" +
        dates[index][dateType].getFullYear() +
        " " +
        dates[index][dateType].getHours() +
        ":" +
        dates[index][dateType].getMinutes() +
        ":" +
        dates[index][dateType].getSeconds(),
      { closeOnClick: false, autoPan: false, autoClose: close }
    )
    .openPopup();
}

function setAllMarkers() {
  vehicles.forEach((vehicle) => {
    updateMarker(vehicle, "start", false);
    updateMarker(vehicle, "selection", true);
    updateMarker(vehicle, "end", false);
  });
}

function closePopups() {
  $(".leaflet-popup-close-button").each(function (index) {
    this.click();
  });
}
