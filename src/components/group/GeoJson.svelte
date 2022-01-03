<script>
    import L from 'leaflet';
    import {onDestroy, setContext, onMount} from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let data = [];
    export let zIndex = 1;
    export let style = {}
    export let options = {};
    export const getInstance = () => leafletGeoJson;

    const layerComponent = new Layer(name,events, () =>  L.geoJSON(data, options));

    let leafletGeoJson;
    setContext(L.LayerGroup, () => leafletGeoJson);

    onMount(()=> {
        leafletGeoJson = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletGeoJson && leafletGeoJson.setZIndex(zIndex);
    $: leafletGeoJson && leafletGeoJson.setStyle(style);
</script>

{#if leafletGeoJson }
    <slot></slot>
{/if}