<script>
    import L from 'leaflet';
    import {onDestroy, setContext, onMount} from 'svelte';
    import {Layer} from "../../lib/layer.js";

    const defaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });

    export let name;
    export let events = [];
    export let latLng = [0,0];
    export let zIndexOffset = 1;
    export let icon = defaultIcon;
    export let opacity = 1;
    export let options = {};
    export const getInstance = () => leafletMarker;

    const layerComponent = new Layer(name, events, () => L.marker(latLng, options));

    let leafletMarker;
    setContext(L.Marker,  () => leafletMarker);

    onMount(()=> {
        leafletMarker = layerComponent.mountLayer()
    });

    onDestroy(() => {
        layerComponent.destroyLayer()
    });

    $: leafletMarker && leafletMarker.setLatLng(latLng);
    $: leafletMarker && leafletMarker.setZIndexOffset(zIndexOffset);
    $: leafletMarker && leafletMarker.setOpacity(opacity);
    $: leafletMarker && leafletMarker.setIcon(icon);
</script>

{#if leafletMarker}
    <slot/>
{/if}