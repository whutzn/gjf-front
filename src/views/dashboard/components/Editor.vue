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
import { TileWMS } from "ol/source"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import GeoJson from "ol/format/GeoJSON"
import { tile } from "ol/loadingstrategy"
import { createXYZ } from "ol/tilegrid"
import { Fill, Stroke, Style, Text } from "ol/style"

onMounted(() => {
  const layers = [
    new TileLayer({
      source: new TileWMS({
        url: "http://192.168.0.92:8080/geoserver/zjd/wms",
        params: { FORMAT: "image/png", VERSION: "1.1.1", tiled: true, STYLES: "", layers: "zjd:zjdzd_copy4" }
      }),
      maxZoom: 16
    }),
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJson(),
        url: (extent) => {
          return (
            "http://192.168.0.92:8080/geoserver/zjd/wms?service=WFS&version=1.1.0&request=GetFeature&typename=zjd:zjdzd_copy4&outputFormat=application/json&srsname=EPSG:4326&bbox=" +
            extent.join(",") +
            ",EPSG:4326"
          )
        },
        strategy: tile(createXYZ({ tileSize: 512 }))
      }),
      minZoom: 16,
      style: (feature) =>
        new Style({
          stroke: new Stroke({
            color: "#ff0000",
            width: 1
          }),
          fill: new Fill({
            color: "rgba(0,0,0,0)"
          }),
          text: new Text({
            text: feature.get("zjddm"),
            font: "14px sim-sun",
            fill: new Fill({
              color: "rgba(255, 255, 255, 1)"
            }),
            stroke: new Stroke({
              color: "#1b1c1d",
              width: 2
            })
          })
        })
    })
  ]
  const map = new Map({
    layers: layers,
    target: "map",
    view: new View({
      center: [125.26323990075572, 35.885796337603196],
      projection: "EPSG:4326",
      zoom: 6
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
