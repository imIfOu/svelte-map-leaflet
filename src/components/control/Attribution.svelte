<script>
    import L from 'leaflet';
    import { onMount, onDestroy, getContext } from 'svelte';

    export let prefix = 'Leaflet';
    export let position = 'botttomright';
    export const getInstance = () => leafletControlAttribution;

    let leafletControlAttribution;

    const getMap = getContext(L.Map);

    onMount(()=> {
        leafletControlAttribution = L.control.attribution({});
        leafletControlAttribution.addTo(getMap());
    })

    $: leafletControlAttribution && leafletControlAttribution.setPrefix(prefix);
    $: leafletControlAttribution && leafletControlAttribution.setPosition(position);

    onDestroy(() => {
        leafletControlAttribution.remove(getMap());
    });
</script>