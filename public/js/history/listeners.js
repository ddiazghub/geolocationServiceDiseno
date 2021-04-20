sTimeInput.addEventListener("change", function () {
  eTimeInput.min = this.value;
  console.log(this.value);
});

eTimeInput.addEventListener("change", function () {
  sTimeInput.max = this.value;
  console.log(this.value);
});

document
  .getElementById("newDateTime")
  .addEventListener("click", async function () {
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
    closePopups();
    setAllMarkers();
  });

[].forEach.call(vehicleSelect, function (element) {
  element.addEventListener("change", function () {
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
    closePopups();
    setAllMarkers();
  });
});

sliders.forEach((slider) => {
  slider.oninput = function () {
    let index = sliders.indexOf(slider);
    updateTimeDataFromSliders();
    updateMarker(vehicles[index], "selection", true);
  };
});
