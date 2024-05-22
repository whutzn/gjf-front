<template>
  <div class="containerPublicLeft">
    <ButtonItem
      v-for="(item, index) in list"
      :key="item.id"
      :name="item.name"
      :selected="curSelected == index + 1"
      :index="index + 1"
      @click="click(item.id)"
    />
  </div>
</template>

<script>
import ButtonItem from "./ButtonItem.vue"

export default {
  name: "LeftPanel",
  components: {
    ButtonItem
  },
  data() {
    return {
      curSelected: 0,
      list: [
        { id: 1, name: "标题1" },
        { id: 2, name: "标题2" },
        { id: 3, name: "标题3" },
        { id: 4, name: "标题4" },
        { id: 5, name: "标题5" }
      ]
    }
  },
  props: {
    currSelected: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.curSelected = this.currSelected
  },
  methods: {
    click(val) {
      this.curSelected = val
      this.$emit("child-event", val)
    }
  }
}
</script>

<style lang="scss" scoped>
.containerPublicLeft {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  width: 386px;
  height: 586px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-color: #000000;
  background-image: url("./images/leftMenu.png");
  left: 200px;
  top: 230px;
  position: absolute;
}
</style>
