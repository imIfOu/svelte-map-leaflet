<script>
    import L from 'leaflet';
    import {onMount, onDestroy } from 'svelte';
    import { DivOverlay } from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let latLng = [0,0];
    export let options = {};
    export const getInstance = () => leafletToolTip;

    const layerComponent = new DivOverlay(name,events,
        () => L.tooltip(options).setLatLng(latLng),
        (layer, divOverlay) => layer.bindTooltip(divOverlay),
        (layer, divOverlay) => layer.unbindTooltip(divOverlay)
    );

    let leafletToolTip;
    let leafletToolTipContent;

    onMount(()=> {
        leafletToolTip = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletToolTip && leafletToolTip.setLatLng(latLng);
    $: leafletToolTip && leafletToolTip.setContent(leafletToolTipContent);

</script>

<div style="display: none">
    {#if leafletToolTip }
        <div bind:this={leafletToolTipContent}>
            <slot></slot>
        </div>
    {/if}
</div>