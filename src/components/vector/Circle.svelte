<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLng = [0,0];
    export let radius = 10;
    export let style = {};
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
    $: leafletCircle && leafletCircle.setStyle(style);
</script>

{#if leafletCircle}
    <slot/>
{/if}