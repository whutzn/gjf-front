<template>
  <div class="app-container center">
    <div id="map" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile"
import View from "ol/View"
import "ol/ol.css"
import { OSM, TileArcGISRest } from "ol/source"

onMounted(() => {
  const url = "http://192.168.0.81:6080/arcgis/rest/services/gbznt/xzqh/MapServer"

  const layers = [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: new TileArcGISRest({
        url: url,
        params: { layers: "show:1" }
      })
    })
  ]
  const map = new Map({
    layers: layers,
    target: "map",
    view: new View({
      center: [-27213426.22615661, 3134352.6742481664],
      zoom: 10.5
    })
  })

  map.on("moveend", (e) => {
    console.log(e.target.getView().getZoom(), e.target.getView().getCenter())
  })
})
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #map {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
}
</style>
