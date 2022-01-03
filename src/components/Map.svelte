<script>
    import L from 'leaflet';
    import { setContext } from 'svelte';
    import EventManager from "../lib/event.js";

    export let options = {};
    export let events = [];
    export const getInstance = () => leafletMap;

    let leafletMap;

    setContext(L.Map, () => leafletMap);

    const eventManager = new EventManager(events);

    function initLeafletMap(node) {
        leafletMap = L.map(node, options)
        eventManager.subscribe(leafletMap)

        return {
            destroy() {
                eventManager.unsubscribe(leafletMap)
                leafletMap.remove()
            }
        };
    }
</script>

<div style="height:100%;width:100%;" use:initLeafletMap>
    {#if leafletMap }
        <slot></slot>
    {/if}
</div>