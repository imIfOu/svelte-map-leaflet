<script>
    import L from 'leaflet';
    import {onMount, onDestroy, getContext, setContext} from 'svelte';

    export let position = 'topleft';
    export let options = {};
    export const getInstance = () => leafletControlZoom;

    let leafletControlZoom;

    const getMap = getContext(L.Map);

    onMount(()=> {
        leafletControlZoom = L.control.zoom(options);
        leafletControlZoom.addTo(getMap());
    })

    $: leafletControlZoom && leafletControlZoom.setPosition(position);

    onDestroy(() => {
        leafletControlZoom.remove();
    });
</script>