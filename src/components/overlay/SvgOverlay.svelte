<script>
    import L from 'leaflet';
    import {onMount, onDestroy } from 'svelte';
    import {Layer} from "../../lib/layer.js";

    export let name;
    export let events = [];
    export let bounds = [];
    export let zIndex = 1;
    export let opacity = 1.0;
    export let svgProps = {};
    export let options = {};
    export const getInstance = () => leafletSvgOverlay;

    const layerComponent = new Layer(name,events, () => L.svgOverlay(leafletSvgOverlayContent, bounds, options));

    let leafletSvgOverlay;
    let leafletSvgOverlayContent;

    onMount(()=> {
        leafletSvgOverlay = layerComponent.mountLayer();
    });

    onDestroy(() => {
        layerComponent.destroyLayer();
    });

    $: leafletSvgOverlay && leafletSvgOverlay.setBounds(bounds);
    $: leafletSvgOverlay && leafletSvgOverlay.setZIndex(zIndex);
    $: leafletSvgOverlay && leafletSvgOverlay.setOpacity(opacity);

</script>

<div style="display: none">
    <svg bind:this={leafletSvgOverlayContent} {...svgProps}>
        <slot></slot>
    </svg>
</div>
