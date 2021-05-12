sTimeInput.addEventListener("change", function () {
  eTimeInput.min = this.value;
  console.log(this.value);
});

eTimeInput.addEventListener("change", function () {
  sTimeInput.max = this.value;
  console.log(this.value);
});

update.addEventListener("click", async function () {
  startTime = sTimeInput.value;
  endTime = eTimeInput.value;
  var dateEnteredStart = new Date(startTime);
  var dateEnteredEnd = new Date(endTime);
  initialTimeStamp = dateEnteredStart.getTime() / 1000;
  endingTimeStamp = dateEnteredEnd.getTime() / 1000;

  await getData()
});

updateMap.addEventListener("click", function () {
  console.log(vehicles.dbData);
  updateSliders();
  updatePolylines();
  closePopups();
  setAllMarkers();
});

[].forEach.call(vehicleSelect, function (element) {
  element.addEventListener("change", function () {
    if (this.checked) {
      vehicles.selectedTaxis.push(this.value);
    } else {
      var index = vehicles.selectedTaxis.indexOf(this.value);
      if (index > -1) {
        vehicles.selectedTaxis.splice(index, 1);
      }
    }
    console.log(vehicles.selectedTaxis);
    updatePolylines();
    closePopups();
    setAllMarkers();
  });
});

vehicles.sliders.forEach((slider) => {
  slider.oninput = function () {
    let index = vehicles.sliders.indexOf(slider);
    updateTimeDataFromSliders();
    updateMarker(vehicles.dbData[index], "selection", true);
    updateTableData(vehicles.dbData[index], "selection");
  };
});
