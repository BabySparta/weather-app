import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

let units = "imperial";
let city = "New+York,US";

async function init(place, unit) {
  try {
    const location = await api.getWeather(place, unit);
    const city = await api.getCoords(place);
    view.displayCurrent(location, city.name, unit);
    view.displayHourly(location, unit);

    hourlyBtn.addEventListener("click", () => {
      setActive(hourlyBtn);
      view.displayHourly(location, unit);
    });
    dailyBtn.addEventListener("click", () => {
      setActive(dailyBtn);
      view.displayDaily(location);
    });
    document.querySelector(".error-message").style.visibility = "hidden";
    document.querySelector(".loadWrap").style.display = "none";
  } catch (err) {
    document.querySelector(".error-message").style.visibility = "visible";
  }
}

// Daily and Hourly. Have to keep these out of init function or it wont work.
function setActive(btn) {
  hourlyBtn.classList.remove("active");
  dailyBtn.classList.remove("active");
  btn.classList.add("active");
}

const tabs = Array.from(document.querySelectorAll(".tab"));
const hourlyBtn = tabs[0];
const dailyBtn = tabs[1];

// units logic
const checkbox = document.querySelector(".checkbox");
checkbox.addEventListener("change", () => {
  if (units === "imperial") {
    units = "metric";
  } else {
    units = "imperial";
  }
  document.querySelector(".loadWrap").style.display = "flex";
  init(city, units);
});

// Search

const searchForm = document.querySelector("form");

searchForm.addEventListener("submit", () => {
  event.preventDefault();
  document.querySelector(".loadWrap").style.display = "flex";
  const searchLocation = document.querySelector(".search").value;
  const formedSearch = formatSearch(searchLocation);
  city = formedSearch;
  init(formedSearch, units);
  searchForm.reset();
});

function formatSearch(string) {
  //trim whitespace before and after
  let trimmed = string.trim();
  //trim spaces after commas
  trimmed = trimmed.replace(/\s*,\s*/g, ",");
  //replace rest of spaces with plus signs
  trimmed = trimmed.replace(" ", "+");
  return trimmed;
}

init(city, units);
