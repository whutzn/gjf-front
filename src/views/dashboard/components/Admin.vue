<template>
  <div class="app-container center">
    <div id="sceneViewer" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { Ion, Viewer, Cesium3DTileset } from "cesium"
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
    navigationInstructionsInitiallyVisible: false
    // terrain: Terrain.fromWorldTerrain() //默认地形
  })

  /**
   * 加载火星地形
   */
  // const MARS_TERRIAN = await CesiumTerrainProvider.fromUrl("http://data.mars3d.cn/terrain")
  // viewer.terrainProvider = MARS_TERRIAN

  if (process.env.NODE_ENV === "development") viewer.scene.debugShowFramesPerSecond = true
  // viewer.camera.flyTo({
  //   destination: Cartesian3.fromDegrees(121.45, 31.22, 600),
  //   orientation: {
  //     heading: CesiumMath.toRadians(0.0),
  //     pitch: CesiumMath.toRadians(-15.0)
  //   }
  // })
  /**
   * 加载谷歌三维实景，中国区域基本不可用
   **/
  // viewer.scene.primitives.add(await Cesium3DTileset.fromIonAssetId(2275207))
  // const buildingTileset = await createOsmBuildingsAsync()
  // viewer.scene.primitives.add(buildingTileset)

  const TANG_XIA = await Cesium3DTileset.fromUrl("http://192.168.3.132:9003/model/tHCxXN0Kk/tileset.json")
  viewer.scene.primitives.add(TANG_XIA)
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.zoomTo(TANG_XIA)
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

<style>
.cesium-widget-credits {
  /* 去除logo */
  display: none !important;
}
</style>
