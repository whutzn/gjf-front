<template>
  <div class="app-container center">
    <div id="sceneViewer" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, Cesium3DTileset } from "cesium"
import "cesium/Build/Cesium/Widgets/widgets.css"

onMounted(async () => {
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZWI3MjgzNy1mN2RiLTQ3ODUtYTYyMy00YWQ2ZGJiYjllMTAiLCJpZCI6MTQ4MTgyLCJpYXQiOjE2ODczMTIyMDl9.XpOkgvofy7JCkrtEkMyQ7wsEVJuYQSaATGEAtepxH4Q"
  const viewer = new Viewer("sceneViewer", {
    animation: false, //动画小组件
    baseLayerPicker: false, //底图选择组件
    fullscreenButton: false, //全屏组件
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    scene3DOnly: true,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    terrain: Terrain.fromWorldTerrain()
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
  if (process.env.NODE_ENV === "development") viewer.scene.debugShowFramesPerSecond = true
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(121.45, 31.22, 600),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0)
    }
  })
  viewer.scene.primitives.add(await Cesium3DTileset.fromIonAssetId(2275207))
  const buildingTileset = await createOsmBuildingsAsync()
  viewer.scene.primitives.add(buildingTileset)
})
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #sceneViewer {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
}
</style>
