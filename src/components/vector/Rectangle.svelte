<script>
    import L from 'leaflet';
    import {onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let bounds = [];
    export let style = {};
    export let options = {};
    export const getInstance = () => leafletRectangle;

    const layerComponent = new Layer(name, events, () => L.rectangle(bounds, options));

    let leafletRectangle;

    onMount(()=> {
        leafletRectangle = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletRectangle && leafletRectangle.setBounds(bounds);
    $: leafletRectangle && leafletRectangle.setStyle(style);
</script>

{#if leafletRectangle}
    <slot/>
{/if}