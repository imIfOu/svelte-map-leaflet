<script>
    import L from 'leaflet';
    import {onDestroy, onMount} from 'svelte';
    import {Layer} from "../lib/layer.js";

    export let name;
    export let events = [];
    export let url;
    export let opacity = 1;
    export let zIndex = 1;
    export let wms = false;
    export let options = {};
    export const getInstance = () => leafletTileLayer;

    let leafletTileLayer;

    const layerComponent = new Layer(name, events, () => wms ? L.tileLayer.wms(url, options) : L.tileLayer(url, options));

    onMount(()=> {
        leafletTileLayer = layerComponent.mountLayer()
    });

    onDestroy(() => {
        layerComponent.destroyLayer()
    });

    $: leafletTileLayer && leafletTileLayer.setUrl(url);
    $: leafletTileLayer && leafletTileLayer.setOpacity(opacity);
    $: leafletTileLayer && leafletTileLayer.setZIndex(zIndex);
</script>