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
    import {Map, TitleLayer, Marker, Popup} from 'svelte-map-leaflet';
</script>

<Map>
    <TitleLayer></TitleLayer>
    <Marker>
        <Popup>
            <h4>This is a popup</h4>
        </Popup>
    </Marker>
</Map>
```