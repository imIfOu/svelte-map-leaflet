<script>
    import L from 'leaflet';
    import {onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let bounds = [];
    export let color = '#3388ff';
    export let weight = 3;
    export let opacity = 1.0;
    export let lineCap = 'round';
    export let lineJoin = 'round';
    export let dashArray = null;
    export let dashOffset = null;
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
    $: leafletRectangle && leafletRectangle.setStyle({
        color: color,
        weight: weight,
        opacity: opacity,
        lineCap: lineCap,
        lineJoin: lineJoin,
        dashArray: dashArray,
        dashOffset: dashOffset,
    });
</script>

{#if leafletRectangle}
    <slot/>
{/if}