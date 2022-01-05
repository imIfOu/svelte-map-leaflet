<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLngs = [];
    export let style = {};
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
    $: leafletPolyline && leafletPolyline.setStyle(style);
</script>

{#if leafletPolyline}
    <slot/>
{/if}