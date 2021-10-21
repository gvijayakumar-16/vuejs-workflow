<template>
  <g @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <path :d="dAttr" :style="pathStyle"></path>
    <a v-if="show.delete" @click="deleteLink">
      <text text-anchor="middle" v-bind:transform="arrowTransform" font-size="38">&times;</text>
    </a>
    <path
      v-else
      d="M -2 -4 L 0 1 L 2 -4 z"
      v-bind:style="arrowStyle"
      v-bind:transform="arrowTransform"
    ></path>
  </g>
</template>

<script>
export default {
  name: "FlowchartLink",
  props: {
    // start point position [x, y]
    start: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    // end point position [x, y]
    end: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    id: Number,
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
    return {
      show: {
        delete: false
      }
    };
  },
  methods: {
    handleMouseOver() {
      if (this.id) {
        this.show.delete = true;
      }
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    getCurvinessFactor() {
      const deltax = this.end[0] - this.start[0];
      const deltay = this.end[1] - this.start[1];

      var cy = 0;
      if (deltay > 0) cy = deltay * 0.7;
      else cy = 0;

      var curviness = 0;
      if (deltax > 120) {
        curviness = 120 - cy;
      } else {
        curviness = deltax * 0.7 - cy;
      }

      if (curviness < 0) curviness = 0;

      return curviness;
    },
    caculateCenterPoint() {
      // caculate arrow position: the center point between start and end
      const dx = (this.end[0] - this.start[0]) / 2;
      const dy = (this.end[1] - this.start[1]) / 2;
      let x = this.start[0] + dx;
      let y = this.start[1] + dy;
      return [x, y];
    },
    caculateRotation() {
      // caculate arrow rotation
      const curvinessFactor = this.getCurvinessFactor() / 2;
      const angle = -Math.atan2(
        this.end[0] - this.start[0],
        this.end[1] - curvinessFactor - (this.start[1] + curvinessFactor)
      );
      const degree = (angle * 180) / Math.PI;
      return degree < 0 ? degree + 360 : degree;
    },
    deleteLink() {
      this.$emit("deleteLink");
    }
  },
  computed: {
    pathStyle() {
      return {
        stroke: "#325382",
        strokeWidth: 2.73205,
        fill: "none"
      };
    },
    arrowStyle() {
      return {
        stroke: "#325382",
        strokeWidth: 5.73205,
        fill: "none"
      };
    },
    arrowTransform() {
      const [arrowX, arrowY] = this.caculateCenterPoint();
      const degree = this.caculateRotation();
      return `translate(${arrowX}, ${arrowY}) rotate(${degree})`;
    },
    dAttr() {
      // starting point of curve
      let cx = this.start[0];
      let cy = this.start[1];

      // end point of curve
      let ex = this.end[0];
      let ey = this.end[1];

      // bezier handle for starting point
      let x1 = cx;
      let y1 = cy + this.getCurvinessFactor();

      // bezier handle for end point
      let x2 = ex;
      let y2 = ey - this.getCurvinessFactor();
      return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
    }
  }
};
</script>

<style scoped lang="scss">
g {
  cursor: pointer;
}
</style>