const myMap = L.map('mapid').setView([10.9578, -74.792], 12);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl,  { attribution }).addTo(myMap);


var taxi1Icon = new L.Icon({
    iconUrl: "../static/taxi1.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [41, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


var taxi2Icon = new L.Icon({
    iconUrl: "../static/taxi2.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [41, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


var taxi3Icon = new L.Icon({
    iconUrl: "../static/taxi3.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [41, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


const marker_1 = L.marker([0, 0], {icon: taxi1Icon}).addTo(myMap);
const marker_2 = L.marker([0, 0], {icon: taxi2Icon}).addTo(myMap);
const marker_3 = L.marker([0, 0], {icon: taxi3Icon}).addTo(myMap);


var polyline1 = L.polyline([]).addTo(myMap);
var polyline2 = L.polyline([], {color: 'red'}).addTo(myMap);
var polyline3 = L.polyline([], {color: '#000'}).addTo(myMap);