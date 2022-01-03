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
    export const getInstance = () => leafletTitleLayer;

    let leafletTitleLayer;

    const layerComponent = new Layer(name, events, () => wms ? L.tileLayer.wms(url, options) : L.tileLayer(url, options));

    onMount(()=> {
        leafletTitleLayer = layerComponent.mountLayer()
    });

    onDestroy(() => {
        layerComponent.destroyLayer()
    });

    $: leafletTitleLayer && leafletTitleLayer.setUrl(url);
    $: leafletTitleLayer && leafletTitleLayer.setOpacity(opacity);
    $: leafletTitleLayer && leafletTitleLayer.setZIndex(zIndex);
</script>