<script>
    import L from 'leaflet';
    import { onMount, onDestroy } from 'svelte';
    import { DivOverlay } from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLng = [0,0];
    export let options = {};
    export const getInstance = () => leafletPopup;

    const layerComponent = new DivOverlay(name,events,
        () => L.popup(options).setLatLng(latLng),
        (layer, divOverlay) => layer.bindPopup(divOverlay),
        (layer, divOverlay) => layer.unbindPopup(divOverlay)
    );

    let leafletPopup;
    let leafletPopupContent;

    onMount(()=> {
        leafletPopup = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletPopup && leafletPopup.setLatLng(latLng);
    $: leafletPopup && leafletPopup.setContent(leafletPopupContent);
</script>

<div style="display: none">
    {#if leafletPopup }
        <div bind:this={leafletPopupContent}>
            <slot></slot>
        </div>
    {/if}
</div>