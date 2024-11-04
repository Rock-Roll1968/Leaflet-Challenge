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
                radius: mag * 2,
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


init();