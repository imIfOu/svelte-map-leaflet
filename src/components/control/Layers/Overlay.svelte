<script>
    import L from 'leaflet';
    import {getContext, setContext} from 'svelte';

    const getControlLayers = getContext(L.Control.Layers)

    setContext('Overlay', {
        addLayer: (name, layer) => getControlLayers().addOverlay(name, layer),
        removeLayer: (layer) => getControlLayers().removeLayer(layer)
    });

</script>

{#if getControlLayers() }
    <slot></slot>
{/if}