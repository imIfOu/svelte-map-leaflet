<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLngs = [];
    export let style = {};
    export let options = {};
    export const getInstance = () => leafletPolygon;

    const layerComponent = new Layer(name, events, () => L.polygon(latLngs, options));

    let leafletPolygon;

    onMount(()=> {
        leafletPolygon = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletPolygon && leafletPolygon.setLatLngs(latLngs);
    $: leafletPolygon && leafletPolygon.setStyle(style);
</script>

{#if leafletPolygon}
    <slot/>
{/if}