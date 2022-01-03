<script>
    import L from 'leaflet';
    import {onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let url;
    export let bounds = [];
    export let zIndex = 1;
    export let opacity = 1.0;
    export let options = {};
    export const getInstance = () => leafletImageOverlay;

    const layerComponent = new Layer(name,events, () => L.imageOverlay(url, bounds, options));

    let leafletImageOverlay;

    onMount(()=> {
        leafletImageOverlay = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletImageOverlay && leafletImageOverlay.setUrl(url);
    $: leafletImageOverlay && leafletImageOverlay.setBounds(bounds);
    $: leafletImageOverlay && leafletImageOverlay.setZIndex(zIndex);
    $: leafletImageOverlay && leafletImageOverlay.setOpacity(opacity);

</script>