<template>
  <li draggable="true" v-on:dragstart="handleDragStart">{{ step.Name }}</li>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDragStart(e) {
      console.log("dragstart", this.step);
      e.dataTransfer.setData("draggedItem", JSON.stringify(this.step));
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

ul li {
  border: 1px solid $veryLightGrey;
  border-radius: 5px;
  font-size: 14px;
  margin: 4px;
  background: $themeColor;
  padding: 5px;
  text-decoration: none;
  color: white;
  display: block;
  position: relative;
}

ul li:hover {
  cursor: move;
}
</style>