<script>
    import L from 'leaflet';
    import {onDestroy, getContext, setContext, onMount} from 'svelte';

    export let position = 'topright';
    export const getInstance = () => leafletControl;

    let leafletControl;
    let leafletControlContent;

    const getMap = getContext(L.Map);

    onMount(()=> {
        leafletControl = L.control();
        leafletControl.onAdd = () => leafletControlContent
        leafletControl.addTo(getMap());
    });

    $: leafletControl && leafletControl.setPosition(position);

    onDestroy(() => {
        leafletControl.remove();
    });
</script>

<div style="display: none">
    <div bind:this={leafletControlContent}>
        <slot/>
    </div>
</div>
