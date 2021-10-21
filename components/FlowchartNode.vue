<template>
  <div
    class="flowchart-node"
    v-bind:style="nodeStyle"
    v-on:mousedown="handleMousedown"
    v-bind:class="{selected: options.selected === id}"
  >
    <div class="node-port node-input" v-on:mousedown="inputMouseDown" v-on:mouseup="inputMouseUp"></div>
    <div class="node-main">
      <div v-text="step.name" class="node-header"></div>
      <div class="row">
        <div class="column left">
          <div v-text="step.desc" class="node-body"></div>
        </div>
        <div class="column right">
          <i class="fas fa-cog"></i>
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
    <div class="node-port node-output" v-on:mousedown="outputMouseDown"></div>
  </div>
</template>

<script>
export default {
  name: "FlowchartNode",
  props: {
    id: {
      type: Number,
      default: 1000,
      validator(val) {
        return typeof val === "number";
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === "number";
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === "number";
      }
    },
    step: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 0,
          centerY: 0,
          scale: 1
        };
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + "px", // remove: this.options.offsetTop +
        left: this.options.centerX + this.x * this.options.scale + "px", // remove: this.options.offsetLeft +
        transform: `scale(${this.options.scale})`
      };
    }
  },
  methods: {
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      // console.log(target);
      if (
        target.className.indexOf("node-input") < 0 &&
        target.className.indexOf("node-output") < 0
      ) {
        this.$emit("nodeSelected", e);
      }
      e.preventDefault();
    },
    outputMouseDown(e) {
      this.$emit("linkingStart");
      e.preventDefault();
    },
    inputMouseDown(e) {
      e.preventDefault();
    },
    inputMouseUp(e) {
      this.$emit("linkingStop");
      e.preventDefault();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

$portSize: 11;
.fas {
  cursor: pointer;
}
.flowchart-node {
  margin: 0;
  width: 160px; // make sure these match width and height in SimpleFlowchart.vue
  height: 100px;
  position: absolute;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 0 2px $themeColor;
  background: white;
  z-index: 1;
  opacity: 0.9;

  /* Firefox */
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  /* Safari+Chrome */
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  /* Opera */
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);

  cursor: move;
  transform-origin: top left;
  .node-main {
    text-align: center;
    .node-header {
      background: $themeColor;
      color: white;
      font-size: 13px;
      padding: 6px;
    }
    .node-body {
      font-size: 13px;
    }
  }
  .node-port {
    position: absolute;
    width: #{$portSize}px;
    height: #{$portSize}px;
    left: 50%;
    transform: translate(-50%);
    border: 1px solid #ccc;
    border-radius: 100px;
    background: white;
    &:hover {
      background: $themeColor;
      border: 1px solid $themeColor;
    }
  }
  .node-input {
    top: #{-2 + $portSize/-2}px;
    /* top: 26px;
    left: -1px; */
  }
  .node-output {
    bottom: #{-2 + $portSize/-2}px;
    /* top: 24px;
    left: 80px; */
  }
}
.selected {
  border: solid 4px $themeColor;

  /* Firefox */
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  /* Safari+Chrome */
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  /* Opera */
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
}
.column {
  float: left;
  padding: 5px;
}
.left {
  width: 80%;
}
.right {
  width: 20%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
