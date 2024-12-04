<template>
  <div class="app-container center">
    <div id="sceneViewer" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import {
  Ion,
  Viewer,
  Cesium3DTileset,
  CesiumTerrainProvider,
  WebMapTileServiceImageryProvider,
  GeographicTilingScheme,
  ShadowMode,
  GeoJsonDataSource,
  Color,
  defined,
  Entity,
  ScreenSpaceEventType,
  CallbackProperty,
  ColorMaterialProperty,
  ScreenSpaceEventHandler
} from "cesium"
import "cesium/Build/Cesium/Widgets/widgets.css"
import { setTilesHeight } from "@/utils/map/map3d"

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
    baseLayer: false,
    msaaSamples: 4
  })
  // 水雾特效
  viewer.scene.globe.showGroundAtmosphere = true

  /**
   * 加载火星地形
   */
  const MARS_TERRIAN = await CesiumTerrainProvider.fromUrl("https://data.mars3d.cn/terrain")
  viewer.terrainProvider = MARS_TERRIAN

  const TDT_IMG = new WebMapTileServiceImageryProvider({
    url: "https://t0.tianditu.gov.cn/img_w/wmts?tk=63daddeb93bedd7502558f4170212453",
    layer: "img",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18
  })
  const TDT_CIA = new WebMapTileServiceImageryProvider({
    url: "https://t0.tianditu.gov.cn/cia_w/wmts?tk=63daddeb93bedd7502558f4170212453",
    layer: "cia",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18
  })

  viewer.imageryLayers.addImageryProvider(TDT_IMG)
  viewer.imageryLayers.addImageryProvider(TDT_CIA)

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

  const TANG_XIA = await Cesium3DTileset.fromUrl("http://192.168.0.35:9003/model/tjOpRNmKP/tileset.json", {
    shadows: ShadowMode.DISABLED,
    dynamicScreenSpaceError: true,
    dynamicScreenSpaceErrorDensity: 2.0e-4,
    dynamicScreenSpaceErrorFactor: 24.0,
    dynamicScreenSpaceErrorHeightFalloff: 0.25,
    maximumScreenSpaceError: 7.5,
    cacheBytes: 1073741824,
    maximumCacheOverflowBytes: 2147483648,
    skipLevelOfDetail: true,
    preferLeaves: true
  })
  viewer.scene.primitives.add(TANG_XIA)
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.zoomTo(TANG_XIA)
  setTilesHeight(TANG_XIA, 8)

  const _matrixIds = [
    "EPSG:4326:0",
    "EPSG:4326:1",
    "EPSG:4326:2",
    "EPSG:4326:3",
    "EPSG:4326:4",
    "EPSG:4326:5",
    "EPSG:4326:6",
    "EPSG:4326:7",
    "EPSG:4326:8",
    "EPSG:4326:9",
    "EPSG:4326:10",
    "EPSG:4326:11",
    "EPSG:4326:12",
    "EPSG:4326:13",
    "EPSG:4326:14",
    "EPSG:4326:15",
    "EPSG:4326:16",
    "EPSG:4326:17",
    "EPSG:4326:18",
    "EPSG:4326:19",
    "EPSG:4326:20",
    "EPSG:4326:21"
  ]

  const DLTB_TILE = new WebMapTileServiceImageryProvider({
    url: "http://192.168.0.90:8080/geoserver/leqing/gwc/service/wmts",
    layer: "leqing:tdlygh",
    style: "",
    format: "image/png",
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: _matrixIds,
    tilingScheme: new GeographicTilingScheme(),
    maximumLevel: 20
  })
  viewer.imageryLayers.addImageryProvider(DLTB_TILE)

  let highlightedEntity = new Entity()
  const highlightColor = Color.GREEN.withAlpha(0.6)
  const normalColor = Color.YELLOW.withAlpha(0.6)

  const createEntityCallback = (entity?: Entity) => {
    const colorProperty = new CallbackProperty((time, result) => {
      if (highlightedEntity === entity) {
        return Color.clone(highlightColor, result)
      }
      return Color.clone(normalColor, result)
    }, false)
    return new ColorMaterialProperty(colorProperty)
  }

  const dth = GeoJsonDataSource.load(
    "http://192.168.0.90:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=leqing:zjdbl&outputFormat=application/json&srsName=EPSG:4326",
    {
      clampToGround: true,
      fill: Color.YELLOW.withAlpha(0.6)
    }
  )

  dth
    .then((dataSource) => {
      viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        if (entity.polygon != undefined) entity.polygon.material = createEntityCallback(entity)
      }
      // viewer.flyTo(dataSource)
    })
    .catch((err) => {
      console.log("load dth", err)
    })

  const scene = viewer.scene
  const handler = new ScreenSpaceEventHandler(scene.canvas)
  handler.setInputAction((movement: ScreenSpaceEventHandler.MotionEvent) => {
    const pickedObject = scene.pick(movement.endPosition)
    if (defined(pickedObject) && pickedObject.id instanceof Entity) {
      highlightedEntity = pickedObject.id
    } else {
      highlightedEntity = new Entity()
    }
  }, ScreenSpaceEventType.MOUSE_MOVE)
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
