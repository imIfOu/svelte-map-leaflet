import L from 'leaflet';
import {getContext, hasContext, setContext} from 'svelte';
import EventManager from "./event.js";

export class Layer {

    constructor(name, events, constructLayer, addIntoContext= true) {
        this.name = name;
        this.constructLayer = constructLayer;
        this._map = getContext(L.Map);

        if(hasContext(L.LayerGroup)) {
            this._layerGroup = getContext(L.LayerGroup);
        }

        if (hasContext('BaseLayer')) {
            this._controlLayers = getContext('BaseLayer');
        } else if (hasContext('Overlay')) {
            this._controlLayers = getContext('Overlay');
        }

        if(addIntoContext){
            setContext(L.Layer, () => this._leafletLayer);
        }

        this._eventManager = new EventManager(events);
    }

    mountLayer () {
        this._leafletLayer = this.constructLayer();
        this._eventManager.subscribe(this._leafletLayer)

        if(this._layerGroup) {
            this._layerGroup().addLayer(this._leafletLayer);
        } else if(this._controlLayers && this.name) {
            this._controlLayers.addLayer(this._leafletLayer, this.name);
        } else  {
            this._leafletLayer.addTo(this._map());
        }

        return this._leafletLayer;
    }

    destroyLayer () {
        this._eventManager.unsubscribe(this._leafletLayer)

        if(this._layerGroup) {
            this._layerGroup().removeLayer(this._leafletLayer);
        }

        if(this._controlLayers) {
            this._controlLayers.removeLayer(this._leafletLayer);
        }

        this._leafletLayer.removeFrom(this._map());
    }
}

export class DivOverlay extends Layer {

    constructor(name, events, constructLayer, bindMethod, unbindMethod) {
        super(name, events, constructLayer, false);
        this._bindMethod = bindMethod;
        this._unbindMethod = unbindMethod;

        if(hasContext(L.Layer)) {
            this._layerParent = getContext(L.Layer);
        }
    }

    mountLayer () {
        this._leafletLayer = this.constructLayer()
        if(this._layerParent) {
            console.warn('dzad',this._layerParent())
            this._bindMethod(this._layerParent(),this._leafletLayer);
        } else if(this._controlLayers && this.name) {
            this._controlLayers.addLayer(this._leafletLayer, this.name);
        } else  {
            this._leafletLayer.openOn(this._map());
        }
        return this._leafletLayer;
    }

    destroyLayer () {
        if(this._layerParent) {
            this._unbindMethod(this._layerParent(),this._leafletLayer);
        }

        if(this._controlLayers) {
            this._controlLayers.removeLayer(this._leafletLayer);
        }

        this._leafletLayer.removeFrom(this._map());
    }
}