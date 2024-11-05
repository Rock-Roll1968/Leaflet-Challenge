let apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var map = L.map('map').setView([51.505, -0.09], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const init = async () => {
    const data = await d3.json(apiUrl);

    L.geoJSON(data, {
        style: function (feature) {
            const mag = feature.properties.mag;
            const depth = feature.geometry.coordinates[2];
            
            return {
                color: 'black',
                weight: 1,
                radius: mag * 3,
                fillOpacity: .65,
                fillColor:
                    depth < 10 ? 'green': 
                    depth < 30 ? 'lime' : 
                    depth < 50 ? 'yellow': 
                    depth < 70 ? 'orange': 
                    depth <90 ? 'darkOrange': 'red' 
            };
        },

        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng);
        }
    }).bindPopup(function (layer) {
        const mag = layer.feature.properties.mag;
        const place = layer.feature.properties.place;
        const depth = layer.feature.geometry.coordinates[2];
        const time = new Date(layer.feature.properties.time).toLocaleString();
        return `<h3>${place}<br>Magnitude: ${mag}<br>Depth: ${depth}<br>${time}</h3>`;
    }).addTo(map);
    
};

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML += "<h4>Depth</h4>"
    div.innerHTML += "<span style='background: green; width: 15px; height: 15px; display: inline-block;'></span> 0-10 km<br>";
    div.innerHTML += "<span style='background: lime; width: 15px; height: 15px; display: inline-block;'></span> 10-30 km<br>";
    div.innerHTML += "<span style='background: yellow; width: 15px; height: 15px; display: inline-block;'></span> 30-50 km<br>";
    div.innerHTML += "<span style='background: orange; width: 15px; height: 15px; display: inline-block;'></span> 50-70 km<br>";
    div.innerHTML += "<span style= 'background: darkOrange; width: 15px; height: 15px; display: inline-block;'></span> 70-90 km<br>";
    div.innerHTML += "<span style= 'background: red; width: 15px; height: 15px; display: inline-block;'></span> 90 km<br>"
    return div;
};
legend.addTo(map);


init();