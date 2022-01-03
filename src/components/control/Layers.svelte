<script>
    import L from 'leaflet';
    import {onDestroy, getContext, setContext, onMount} from 'svelte';

    export let position = 'topright';
    export let options = {};
    export const getInstance = () => leafletControlLayers;

    let leafletControlLayers;

    const getMap = getContext(L.Map);
    setContext(L.Control.Layers, () => leafletControlLayers);

    onMount(()=> {
        leafletControlLayers = L.control.layers({}, {}, options);
        leafletControlLayers.addTo(getMap());
    });

    $: leafletControlLayers && leafletControlLayers.setPosition(position);

    onDestroy(() => {
        leafletControlLayers.remove();
    });
</script>

{#if leafletControlLayers }
    <slot></slot>
{/if}