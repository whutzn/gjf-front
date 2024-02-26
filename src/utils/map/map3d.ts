import { Cartesian3, Cartographic, Cesium3DTileset, Matrix4 } from "cesium"

/**
 * @description: 设置 3dtiles 高度
 * @return {*}
 */
export const setTilesHeight = (tileSet: Cesium3DTileset, height: number) => {
  const boundingSphere = tileSet.boundingSphere
  const cartographic = Cartographic.fromCartesian(boundingSphere.center)
  const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
  const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height)
  const translation = Cartesian3.subtract(offset, surface, new Cartesian3())
  tileSet.modelMatrix = Matrix4.fromTranslation(translation)
}
