const windSpeedMap = new Map();
const temperatureMap = new Map();


fetch("http://localhost:8000/windspeed.json")
            .then(response => response.json())
            .then(data => {
                fetch("http://localhost:8000/air-temperature.json")
                    .then(response => response.json())
                    .then(temperatureData => {
                        
                        const debugElement = document.querySelector("#debug");

            

                        for (let i = 0; i < data.items[0].readings.length; i++) {
                            const windSpeedReading = data.items[0].readings[i];
                            const temperatureReading = temperatureData.items[0].readings[i];

                            const windSpeedStation = data.metadata.stations.find(station => station.id === windSpeedReading.station_id);
                            const temperatureStation = temperatureData.metadata.stations.find(station => station.id === temperatureReading.station_id);

                            const windSpeedStationName = windSpeedStation ? windSpeedStation.name : "Unknown Station";
                            const temperatureStationName = temperatureStation ? temperatureStation.name : "Unknown Station";

                            const windSpeedValue = windSpeedReading.value;
                            const temperatureValue = temperatureReading.value;

                            windSpeedMap.set(windSpeedStationName, windSpeedValue);
                            temperatureMap.set(temperatureStationName, temperatureValue);


                                
                        
                        }
                        
                            Sortbytemperature(temperatureMap);
                            SortbywindSpeed(windSpeedMap);
                       
                        
                        
                    })
                    .catch(error => {
                        console.error("Temperature Fetch error:", error);
                    });
            })
            .catch(error => {
                console.error("WindSpeed Fetch error:", error);
            });

        function SortbywindSpeed() {
            const sortedWindSpeedMap = new Map([...windSpeedMap.entries()].sort((a, b) => b[1] - a[1]));
            const debugElement = document.querySelector("#debug");
            debugElement.innerHTML = ""; 
            for (let [key, value] of sortedWindSpeedMap) {
      
                debugElement.innerHTML += `<p> ${key}:<br>
                    &nbsp&nbsp&nbsp&nbsp WindSpeed: ${value} knots<br></p>`;
            }
        }

        function Sortbytemperature() {
            const sortedTemperatureMap = new Map([...temperatureMap.entries()].sort((a, b) => b[1] - a[1]));
            const debugElement = document.querySelector("#debug");
            debugElement.innerHTML = ""; 
            for (let [key, value] of sortedTemperatureMap) {
                debugElement.innerHTML += `<p> ${key}:<br>
                    &nbsp&nbsp&nbsp&nbsp Temperature: ${value} degrees<br></p>`;
            }
        }
       