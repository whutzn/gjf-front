<template>
  <div :class="buttonClass" class="btn-item" @click="handleClick">
    <div class="img" />
    <div class="cn-title">
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ButtonItem",
  emits: ["click"],
  props: {
    name: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    buttonClass() {
      return {
        "btn-selected": this.selected,
        [`btn-${this.index}`]: true
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit("click", this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-item {
  height: 138px;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  transition: all 500ms linear;
  cursor: pointer;
}
.img {
  background-size: 100% 100%;
  width: 40px;
  height: 40px;
  left: 205px;
  top: 38px;
  position: absolute;
}
.cn-title {
  position: absolute;
  left: 46px;
  bottom: 42px;
  font-size: 28px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
  background: linear-gradient(180deg, #7faaf0 0%, #f9f9f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.btn-item:hover .img {
  transform: scale(1.1);
  transition: all 500ms linear;
}
.btn-item:hover .cn-title {
  font-size: 32px;
  font-weight: 900;
  background: #f9f9f9;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 500ms linear;
}
@import url("./btn.scss");
</style>
