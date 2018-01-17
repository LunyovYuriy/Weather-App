var appid = '996ff97b78e75c6484b7e99fe0e6b9d7',
    ico = document.getElementsByClassName("icon")[0],
    city = document.getElementById('city'),
    temp = document.getElementById('temp'),
    descr = document.getElementById('descr'),
    unitsSwitch = document.getElementsByClassName('unit-switch')[0];

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}
function geoSucces(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeather(latitude, longitude, "metric");

    function switchUnit(e) {
        e.preventDefault();
        var target = e.target;
        if (target.id === "cel") {
            getWeather(latitude, longitude, "metric");
            clearActive();
            target.classList.add("active");    
        }
        else if (target.id === "fahr"){
            getWeather(latitude, longitude, "imperial");
            clearActive();
            target.classList.add("active"); 
        }
    }
    unitsSwitch.addEventListener("click", switchUnit);
}

function geoError() {
    alert('Unable to check your position');
}

function clearActive() {
    var buttons = document.querySelectorAll("button");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
}

function getWeather(latitude, longitude, units) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+appid+'&units='+units, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert('error: ' + (xhr.status ? xhr.statusText : "Query failed"));
        }
        else {
            try {
                var weatherJSON = JSON.parse(xhr.responseText);
            }
            catch (e) {
                alert("Некорректный ответ" + e.message);
            }
        }
        city.innerHTML = weatherJSON.name + ", " + weatherJSON.sys.country;
        if (units === "metric") {
            temp.innerHTML = Math.floor(weatherJSON.main.temp) + ' &deg;C';
        }
        else {
            temp.innerHTML = Math.floor(weatherJSON.main.temp) + ' F';
        }
        descr.innerHTML = weatherJSON.weather[0].main;
        ico.src = 'http://openweathermap.org/img/w/' + weatherJSON.weather[0].icon + ".png";
    }
    
    xhr.send();
}