<script>
    import L from 'leaflet';
    import {onMount, onDestroy, getContext, setContext} from 'svelte';

    export let position = 'bottomleft';
    export let options = {};
    export const getInstance = () => leafletControlScale;

    let leafletControlScale;

    const getMap = getContext(L.Map);

    onMount(()=> {
        leafletControlScale = L.control.scale(options);
        leafletControlScale.addTo(getMap());
    })

    $: leafletControlScale && leafletControlScale.setPosition(position);

    onDestroy(() => {
        leafletControlScale.remove();
    });
</script>