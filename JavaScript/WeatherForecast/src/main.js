document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "8a0991016f8df2c8c48fcbe232ceffbc";
    const form = document.getElementById("weatherForm");
    const weatherInfo = document.getElementById("weather-info");

    function capitalizeFirstLetter(string) {
        return string.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    function updateWeatherUI(data) {
        const dateElement = weatherInfo.querySelector('.date');
        const weatherElement = weatherInfo.querySelector('.weather');
        const temperatureElement = weatherInfo.querySelector('.temperature');
        const iconElement = weatherInfo.querySelector('.image');
        const cityTitle = document.getElementById("city");

        cityTitle.textContent = data.name;
        dateElement.textContent = dayjs().format('DD/MM/YYYY');
        weatherElement.textContent = capitalizeFirstLetter(data.weather[0].description);
        temperatureElement.textContent = `${data.main.temp}ºC`;
        iconElement.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon" style="width: 100px; height: 85px;">`;
    }

    async function getWeather() {
        try {
            const cityName = document.getElementById("city-name").value;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

            const response = await axios.get(url);
            updateWeatherUI(response.data);
        } catch (error) {
            console.error("Erro ao obter informações meteorológicas", error);
        }
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        getWeather();
    });
});
