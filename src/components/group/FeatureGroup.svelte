<script>
    import L from 'leaflet';
    import {onDestroy, setContext, onMount} from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let zIndex = 1;
    export let style = {}
    export let options = {};
    export const getInstance = () => leafletFeatureGroup;

    const layerComponent = new Layer(name, events, () =>  L.featureGroup([], options));

    let leafletFeatureGroup;
    setContext(L.LayerGroup, () => leafletFeatureGroup);

    onMount(()=> {
        leafletFeatureGroup = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletFeatureGroup && leafletFeatureGroup.setZIndex(zIndex);
    $: leafletFeatureGroup && leafletFeatureGroup.setStyle(style);
</script>

{#if leafletFeatureGroup }
    <slot></slot>
{/if}