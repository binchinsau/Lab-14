"use strict";
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax.section .cities");

const cityNameEl = document.querySelector(".city-name");
const tempEl = document.querySelector(".city-temp");
const iconEl = document.querySelector(".weather-icon");
const descriptionEl = document.querySelector(".weather-description");

const apiKey = "3506b4d87f89755cd7a66a24d39ac3d7";

form.addEventListener("submit", e => {
  e.preventDefault();

  let inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      cityNameEl.textContent = name;
      tempEl.textContent = `${main.temp.toFixed(0)}°C`;

      iconEl.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      descriptionEl.textContent =
        `${weather[0].description}`.charAt(0).toUpperCase(0) +
        `${weather[0].description}`.slice(1);
    })

    .catch(error => {
      msg.textContent = error.message;
      // msg.textContent = "Please search for a valid city :(";
    });

  msg.textContent = "";
  form.reset();

  input.focus();
});
