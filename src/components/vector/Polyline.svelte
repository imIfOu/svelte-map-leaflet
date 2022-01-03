<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLngs = [];
    export let color = '#3388ff';
    export let weight = 3;
    export let opacity = 1.0;
    export let lineCap = 'round';
    export let lineJoin = 'round';
    export let dashArray = null;
    export let dashOffset = null;
    export let options = {};
    export const getInstance = () => leafletPolyline;

    const layerComponent = new Layer(name, events, () => L.polyline(latLngs, options));

    let leafletPolyline;

    onMount(()=> {
        leafletPolyline = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletPolyline && leafletPolyline.setLatLngs(latLngs);
    $: leafletPolyline && leafletPolyline.setStyle({
        color: color,
        weight: weight,
        opacity: opacity,
        lineCap: lineCap,
        lineJoin: lineJoin,
        dashArray: dashArray,
        dashOffset: dashOffset,
    });
</script>

{#if leafletPolyline}
    <slot/>
{/if}