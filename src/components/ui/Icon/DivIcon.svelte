<script>
    import L from 'leaflet';
    import { getContext } from 'svelte';

    export let options = {};
    export const getInstance = () => leafletDivIcon;

    let leafletDivIcon;
    let leafletDivIconContent;

    const getMarker = getContext(L.Marker);

    $: {
        options.html = leafletDivIconContent
        leafletDivIcon = L.divIcon(options);
        getMarker().setIcon(leafletDivIcon);
    }
</script>

<div style="display: none">
    <div bind:this={leafletDivIconContent}>
        <slot/>
    </div>
</div>