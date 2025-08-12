// const API = "fdefd35c3f08fea80c1cd83bdaa6d5d1";
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const { response } = require("express");
let readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function WeatherApp() {
  const input = rl.question("Enter City name and get weather :", (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    console.log(API_KEY);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Weather Data:", data);
        console.log(`City : ${city}`);
        console.log(`Temperature in ${city}: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  });
}

WeatherApp();
