document.getElementById('searchBtn').addEventListener('click', function() {
    let city = document.getElementById('city').value.trim();
    let apiKey = '307e0c18ac5d4373decc81839af5955c'; // Replace with your actual OpenWeatherMap API key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.sys || !data.weather || !data.main) {
                throw new Error('Incomplete data received from API');
            }
            let weatherData = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <h3>${data.weather[0].description}</h3>
                <h3>${data.main.temp}°C</h3>
                <h4>Humidity: ${data.main.humidity}%</h4>
            `;
            document.getElementById('weather').innerHTML = weatherData;
        })
        .catch(error => {
            alert('Error: ' + error.message);
            console.error('Error:', error);
        });
});
