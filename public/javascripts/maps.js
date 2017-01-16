var toMap = L.map('toMap').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'Travel Site',
    accessToken: 'pk.eyJ1IjoiZGFubnlnb3R0OTgiLCJhIjoiY2l5MG1lZ3JsMDA2bzJxcXVldmdvaHNvMCJ9.nA-yoFFGFhCdtFn-HYC1sQ'
}).addTo(toMap);
var marker = L.marker([51.5, -0.09]).addTo(toMap);


var fromMap = L.map('fromMap').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'Travel Site',
    accessToken: 'pk.eyJ1IjoiZGFubnlnb3R0OTgiLCJhIjoiY2l5MG1lZ3JsMDA2bzJxcXVldmdvaHNvMCJ9.nA-yoFFGFhCdtFn-HYC1sQ'
}).addTo(fromMap);
var marker = L.marker([51.5, -0.09]).addTo(fromMap);
