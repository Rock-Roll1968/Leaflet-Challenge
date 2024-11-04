let apiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

fetch(apiUrl)
    .then(json => json.json())
    .then(res => {
        console.log(res.data);
        let stateSelect = document.querySelector("#states");
        stateSelect.addEventListener("change", e => {
            console.log(e.target.value);
            let filteredData = res.data.filter(state => state["Slug State"] === e.target.value)
            console.log(filteredData[0]);
            document.write(JSON.stringify(filteredData[0]))

        })
        res?.data?.map(state => {
            stateSelect.innerHTML += `
            <option value="${state.State.toLowerCase()}">${state.State}</option>`
        })
    })
    .catch(err => console.error(err));
