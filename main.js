feather.replace();
const greetings = [
    'Good morning',
    'Good afternoon',
    'Good evening',
    'Good night now sleep!'
];

const weather_icon_mapping = {
    'cloud' : 'cloud',
    'rain' : 'cloud-rain',
    'sunny' : 'sun',
}

const time_element = document.querySelector('.time');
const greeting_element = document.querySelector('.greeting');

const month_element = document.querySelector('.month');
const date_element = document.querySelector('.date');

const weather_icon_element = document.querySelector('.weather-icon i');
const temprature_element = document.querySelector('.temprature');
const weather_description_element = document.querySelector('.weather-description'); 

const search_box = document.querySelector('#search-box');

// update clock every minute
let set_time = () => {
    const current_time = new Date();
    const hour = current_time.getHours();
    const minutes = current_time.getMinutes();

    let str_hour = hour.toString();
    if(hour < 10){
        str_hour = '0' + str_hour;
    }
    let str_minutes = minutes.toString();
    if(minutes < 10){
        str_minutes = '0' + str_minutes;
    }

    time_element.innerHTML = str_hour + ':' + str_minutes;
    let greet = 0;
    if(hour >= 6 && hour < 12){
        greet = 0;
    }
    else if(hour >= 12 && hour < 17){
        greet = 1;
    }
    else if(hour >= 17 && hour < 22){
        greet = 2;
    }
    else{
        greet = 3;
    }
    greeting_element.innerHTML = greetings[greet];
}
set_time();
setInterval(set_time, 60000);

// set the correct date.
let set_date = () => {
    const current_date = new Date().toDateString().split(' ');
    month_element.innerHTML = current_date[1];
    date_element.innerHTML = current_date[2];
}
set_date();

// search on google 
search_box.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        const query = search_box.value;
        if(query.length > 0){
            window.location.href = 'https://www.google.com/search?client=firefox-b-d&q=' + query.replaceAll(' ', '+');
        }
    }
});

// set weather
let set_weather = () => {
    fetch('https://wttr.in/?format="%C:%f"')
    .then(response => response.text())
    .then(
        data => {
            data = data.replaceAll('"', '').split(':');
            temprature_element.innerHTML = data[1].substring(1, data[1].length-2) + "&deg;<sub>c</sub>";
            weather_description_element.innerHTML = data[0];
            
            let weather_category = data[0].toLowerCase();
            if (weather_category.includes('rain') || weather_category.includes('drizzle')){
                weather_category = 'rain';
            }
            else if (weather_category.includes('cloud')){
                weather_category = 'cloud';
            }
            else {
                // default icon.
                weather_category = 'sunny';
            }
           
            weather_icon_element.setAttribute('data-feather', weather_icon_mapping[weather_category]);
            feather.replace();
        }
    );
}
set_weather();
window.onload = function() {
    search_box.focus();
}