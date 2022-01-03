<script>
    import L from 'leaflet';
    import {onDestroy, setContext, onMount} from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let zIndex = 1;
    export let options = {};
    export const getInstance = () => leafletLayerGroup;

    const layerComponent = new Layer(name,events, () =>  L.layerGroup([], options));

    let leafletLayerGroup;
    setContext(L.LayerGroup, () => leafletLayerGroup);

    onMount(()=> {
        leafletLayerGroup = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletLayerGroup && leafletLayerGroup.setZIndex(zIndex);
</script>

{#if leafletLayerGroup }
    <slot></slot>
{/if}