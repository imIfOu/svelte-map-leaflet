<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLng = [0,0];
    export let radius = 10;
    export let color = '#3388ff';
    export let weight = 3;
    export let opacity = 1.0;
    export let lineCap = 'round';
    export let lineJoin = 'round';
    export let dashArray = null;
    export let dashOffset = null;
    export let options = {};
    export let marker = false;
    export const getInstance = () => leafletCircle;

    const layerComponent = new Layer(name, events, () => marker ? L.circle(latLng,options) : L.circleMarker(latLng,options));

    let leafletCircle;

    onMount(()=> {
        leafletCircle = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletCircle && leafletCircle.setLatLng(latLng);
    $: leafletCircle && leafletCircle.setRadius(radius);
    $: leafletCircle && leafletCircle.setStyle({
        color: color,
        weight: weight,
        opacity: opacity,
        lineCap: lineCap,
        lineJoin: lineJoin,
        dashArray: dashArray,
        dashOffset: dashOffset,
    });
</script>

{#if leafletCircle}
    <slot/>
{/if}