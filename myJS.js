// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bWlzIiwiYSI6ImNrOHlpeDRoeTAyZnczbGtvcWEzNjN3YmYifQ.gNlh9NQUcb7mvtSnXaAE0A';

// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/wind';
var openWeatherMapUrlApiKey = 'API-KEY';

// Determine cities
var cities = [
    {
        name: 'Amsterdam',
        coordinates: [4.895168, 52.370216]
    },
    {
        name: 'Rotterdam',
        coordinates: [4.47917, 51.9225]
    },
    {
        name: 'Nijmegen',
        coordinates: [5.85278, 51.8425]
    },
    {
        name: 'Maastricht',
        coordinates: [5.68889, 50.84833]
    },
    {
        name: 'Groningen',
        coordinates: [6.56667, 53.21917]
    },
    {
        name: 'Enschede',
        coordinates: [6.89583, 52.21833]
    },
    {
        name: 'Leiden',
        coordinates: [4.49700, 52.16010]
    },
];

// Initiate map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [5.508852, 52.142480],
    zoom: 7
});