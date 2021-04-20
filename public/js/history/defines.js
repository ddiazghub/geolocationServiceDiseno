var sliderControl = null;
let boundsSet = false;

let vehicles = {
    dates: [
      { start: 0, selection: 0, end: 0 },
      { start: 0, selection: 0, end: 0 },
      { start: 0, selection: 0, end: 0 },
    ],
    lengths: [0, 0, 0],
    polylines: [0, 0, 0],
    colors: ["red", "blue", "#000"],
    licensePlates: ["EEE-070", "ABC-425", "BTE-425"],
    sliders: [
      document.getElementById("myRange"),
      document.getElementById("myRange2"),
      document.getElementById("myRange3"),
    ],
    sliderOutputs: [0, 0, 0],
    ids: ["efee70", "487a8d", "b7ea25"],
    tSelections: [0, 0, 0],
    dbData: [0, 0, 0],
    selectedTaxis: ["efee70", "487a8d", "b7ea25"]
  };

let vehicleSelect = document.querySelectorAll('[type="checkbox"]');
let timeForm = document.getElementById("form");
let sTimeInput = document.getElementById("startTime");
let eTimeInput = document.getElementById("endTime");
let update = document.getElementById("newDateTime");


var startTime = sTimeInput.value;
var endTime = eTimeInput.value;

let initialTimeStamp = 0;
let endingTimeStamp = 0;
let active_polylines = new L.featureGroup().addTo(myMap);
const sw = false;

startMarkers();


/*
let vehicles = [0, 0, 0];
let tSelections = [0, 0, 0];
let dates = [
  { start: 0, selection: 0, end: 0 },
  { start: 0, selection: 0, end: 0 },
  { start: 0, selection: 0, end: 0 },
];
let lengths = [0, 0, 0];
let polylines = [0, 0, 0];
const colors = ["red", "blue", "#000"];
const licensePlates = ["EEE-070", "ABC-425", "BTE-425"];

let sliders = [
  document.getElementById("myRange"),
  document.getElementById("myRange2"),
  document.getElementById("myRange3"),
];
let sTimeInput = document.getElementById("startTime");
let eTimeInput = document.getElementById("endTime");

var startTime = sTimeInput.value;
var endTime = eTimeInput.value;
let sliderOutputs = [0, 0, 0];

let selectedTaxis = ["efee70", "487a8d", "b7ea25"];
let registeredTaxis = ["efee70", "487a8d", "b7ea25"];
let initialTimeStamp = 0;
let endingTimeStamp = 0;
let active_polylines = new L.featureGroup().addTo(myMap);
const sw = false;

startMarkers();
*/