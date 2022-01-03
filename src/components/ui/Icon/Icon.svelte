<script>
    import L from 'leaflet';
    import { getContext } from 'svelte';

    export let options = {};
    export const getInstance = () => leafletIcon;

    let leafletIcon;

    const getMarker = getContext(L.Marker);

    $: {
        leafletIcon = L.icon(options);
        getMarker().setIcon(leafletIcon);
    }
</script>