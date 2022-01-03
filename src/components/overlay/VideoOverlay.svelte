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
    export const getInstance = () => leafletVideoOverlay;

    const layerComponent = new Layer(name,events, () => L.videoOverlay(url, bounds, options));

    let leafletVideoOverlay;

    onMount(()=> {
        leafletVideoOverlay = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletVideoOverlay && leafletVideoOverlay.setUrl(url);
    $: leafletVideoOverlay && leafletVideoOverlay.setBounds(bounds);
    $: leafletVideoOverlay && leafletVideoOverlay.setZIndex(zIndex);
    $: leafletVideoOverlay && leafletVideoOverlay.setOpacity(opacity);

</script>