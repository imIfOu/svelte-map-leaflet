[![npm version](https://badge.fury.io/js/svelte-map-leaflet.svg)](https://badge.fury.io/js/svelte-map-leaflet)

# Svelte Map leaflet

This project implements the Leaflet library to manipulate map in the form of reactive svelte components.

## What is Leaflet ?  

Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. It has all the mapping features most developers ever need.
Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop and mobile platforms, can be extended with lots of plugins, has a beautiful, easy to use and well-documented API and a simple, readable source code that is a joy to contribute to.

Link of Leaflet library :  https://leafletjs.com/index.html

## Documentation

For more info see the Documentation.

## Getting Started

Install module : `npm i svelte-map-leaflet`

### Example of usage
```sveltehtml
<script>
    import 'leaflet/dist/leaflet.css'; //Don't forget to declare leaflet css
    import {Map, TitleLayer, Marker, Popup} from 'svelte-map-leaflet'

    const mapOptions = { center: [40.6852119,-74.0788838], zoom: 10};
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const markerLatLng = [40.6852119,-74.0788838];
    const popupMessage = "Statue of Liberty National Monument";
</script>

<div class="map">
    <Map options={mapOptions}>
        <TitleLayer url={tileUrl}></TitleLayer>
        <Marker latLng={markerLatLng}>
            <Popup>{popupMessage}</Popup>
        </Marker>
    </Map>
</div>

<style>
    .map{
        height: 400px;
        width: 400px;
    }
</style>
```