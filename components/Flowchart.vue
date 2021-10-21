<template>
  <div
    class="flowchart-container"
    v-on:mousemove="handleMove"
    v-on:mouseup="handleUp"
    v-on:mousedown="handleDown"
    v-on:wheel.passive="handleMouseWheel"
  >
    <svg width="100%" :height="`${height}`">
      <flowchart-link
        v-bind.sync="link"
        v-for="(link, index) in lines"
        v-bind:Id="`link${index}`"
        v-bind:key="`link${index}`"
        v-bind:options="nodeOptions"
        v-on:deleteLink="linkDelete(link.id)"
      ></flowchart-link>
    </svg>
    <flowchart-node
      v-bind.sync="node"
      v-for="(node, index) in nodes"
      v-bind:Id="`node${index}`"
      v-bind:key="`node${index}`"
      v-bind:options="nodeOptions"
      v-on:linkingStart="linkingStart(node.id)"
      v-on:linkingStop="linkingStop(node.id)"
      v-on:nodeSelected="nodeSelected(node.id, $event)"
    ></flowchart-node>
    <sticky-note
      v-bind:x="stickyNote.x"
      v-bind:y="stickyNote.y"
      v-bind:note="stickyNote.note"
      v-for="(stickyNote, index) in notes"
      v-bind:Id="`note${index}`"
      v-bind:key="`note${index}`"
      v-bind:options="nodeOptions"
      v-on:nodeSelected="nodeSelected(stickyNote.id, $event)"
    ></sticky-note>
  </div>
</template>

<script>
import FlowchartLink from "./FlowchartLink.vue";
import FlowchartNode from "./FlowchartNode.vue";
import StickyNote from "./StickyNote.vue";
import { getMousePosition } from "./Position";

export default {
  name: "VueFlowchart",
  props: {
    scene: {
      type: Object,
      default() {
        return {
          scale: 1,
          centerX: 0,
          centerY: 0,
          nodes: [],
          links: []
        };
      }
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      action: {
        linking: false,
        dragging: false,
        scrolling: false,
        selected: 0
      },
      mouse: {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0
      },
      draggingLink: null,
      rootDivOffset: {
        top: 0,
        left: 0
      },
      nodeWidth: 160,
      nodeHieght: 100,
      previousWheelValue: 0
    };
  },
  components: {
    FlowchartLink,
    FlowchartNode,
    StickyNote
  },
  computed: {
    nodeOptions() {
      return {
        centerY: this.scene.centerY,
        centerX: this.scene.centerX,
        scale: this.scene.scale,
        offsetTop: this.rootDivOffset.top,
        offsetLeft: this.rootDivOffset.left,
        selected: this.action.selected
      };
    },
    nodes() {
      return this.scene.nodes.filter(node => {
        return node.step !== undefined;
      });
    },
    notes() {
      return this.scene.nodes.filter(node => {
        return node.note !== undefined;
      });
    },
    lines() {
      const lines = this.scene.links.map(link => {
        const fromNode = this.findNodeWithID(link.from);
        const toNode = this.findNodeWithID(link.to);

        let scaledHalfANodeWidth = (this.nodeWidth * this.scene.scale) / 2;
        let scaledNodeHeight = this.nodeHieght * this.scene.scale;

        let scaledFromNodeX = fromNode.x * this.scene.scale;
        let scaledFromNodeY = fromNode.y * this.scene.scale;
        let scaledToNodeX = toNode.x * this.scene.scale;
        let scaledToNodeY = toNode.y * this.scene.scale;

        let portFromX =
          scaledFromNodeX + this.scene.centerX + scaledHalfANodeWidth;
        let portFromY = scaledFromNodeY + this.scene.centerY + scaledNodeHeight;
        let portToX = scaledToNodeX + this.scene.centerX + scaledHalfANodeWidth;
        let portToY = scaledToNodeY + this.scene.centerY;

        // console.log(
        //   `id${link.id} ToNodeXandY[${toNode.x},${
        //     toNode.y
        //   }]   portTo[${portToX}, ${portToY}]   scaledHalfWidth:${scaledHalfANodeWidth}   scaledHeight:${scaledNodeHeight}   sceneCenter[${
        //     this.scene.centerX
        //   },${this.scene.centerY}]`
        // );

        return {
          start: [portFromX, portFromY],
          end: [portToX, portToY],
          id: link.id
        };
      });
      if (this.draggingLink) {
        const fromNode = this.findNodeWithID(this.draggingLink.from);

        let scaledHalfANodeWidth = (this.nodeWidth * this.scene.scale) / 2;
        let scaledNodeHeight = this.nodeHieght * this.scene.scale;

        let scaledFromNodeX = fromNode.x * this.scene.scale;
        let scaledFromNodeY = fromNode.y * this.scene.scale;

        let portFromX =
          scaledFromNodeX + this.scene.centerX + scaledHalfANodeWidth;
        let portFromY = scaledFromNodeY + this.scene.centerY + scaledNodeHeight;

        // push temp dragging link, mouse cursor postion = link end postion
        lines.push({
          start: [portFromX, portFromY],
          end: [this.draggingLink.mx, this.draggingLink.my]
        });
      }
      return lines;
    }
  },
  mounted() {
    this.rootDivOffset.top = this.$el ? this.$el.offsetTop : 0;
    this.rootDivOffset.left = this.$el ? this.$el.offsetLeft : 0;
    // console.log(22222, this.rootDivOffset);
  },
  methods: {
    findNodeWithID(id) {
      return this.scene.nodes.find(item => {
        return id === item.id;
      });
    },
    linkingStart(index) {
      this.action.linking = true;
      this.draggingLink = {
        from: index,
        mx: 0,
        my: 0
      };
    },
    linkingStop(index) {
      // add new Link
      if (this.draggingLink && this.draggingLink.from !== index) {
        // check link existence
        const existed = this.scene.links.find(link => {
          return link.from === this.draggingLink.from && link.to === index;
        });
        if (!existed) {
          let maxID = Math.max(
            0,
            ...this.scene.links.map(link => {
              return link.id;
            })
          );
          const newLink = {
            id: maxID + 1,
            from: this.draggingLink.from,
            to: index
          };
          this.scene.links.push(newLink);
          this.$emit("linkAdded", newLink);
        }
      }
      this.draggingLink = null;
    },
    linkDelete(id) {
      const deletedLink = this.scene.links.find(item => {
        return item.id === id;
      });
      if (deletedLink) {
        this.scene.links = this.scene.links.filter(item => {
          return item.id !== id;
        });
        this.$emit("linkBreak", deletedLink);
      }
    },
    nodeSelected(id, e) {
      this.action.dragging = id;
      this.action.selected = id;
      this.$emit("nodeClick", id);
      this.mouse.lastX =
        e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouse.lastY =
        e.pageY || e.clientY + document.documentElement.scrollTop;
    },
    handleMove(e) {
      if (this.action.linking) {
        [this.mouse.x, this.mouse.y] = getMousePosition(this.$el, e);
        [this.draggingLink.mx, this.draggingLink.my] = [
          this.mouse.x,
          this.mouse.y
        ];
      }
      if (this.action.dragging) {
        this.mouse.x =
          e.pageX || e.clientX + document.documentElement.scrollLeft;
        this.mouse.y =
          e.pageY || e.clientY + document.documentElement.scrollTop;
        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;
        this.moveSelectedNode(diffX, diffY);
      }
      if (this.action.scrolling) {
        [this.mouse.x, this.mouse.y] = getMousePosition(this.$el, e);
        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;

        this.scene.centerX += diffX;
        this.scene.centerY += diffY;
      }
    },
    handleUp(e) {
      const target = e.target || e.srcElement;
      console.log(
        "up",
        `${getMousePosition(this.$el, e)} scene.center[${this.scene.centerX},${
          this.scene.centerY
        }] scene.scale:${this.scene.scale}`
      );
      if (this.$el.contains(target)) {
        if (
          typeof target.className !== "string" ||
          target.className.indexOf("node-input") < 0
        ) {
          this.draggingLink = null;
        }
        if (target.className === "fas fa-trash") {
          this.nodeDelete(this.action.dragging);
        }
        if (target.className === "fas fa-cog") {
          let selectedNode = this.getSelectedNode();
          this.$emit("settingsClick", selectedNode);
        }
      }
      this.action.linking = false;
      this.action.dragging = null;
      this.action.scrolling = false;
    },
    handleDown(e) {
      const target = e.target || e.srcElement;
      if (
        (target === this.$el || target.matches("svg, svg *")) &&
        e.which === 1
      ) {
        this.action.scrolling = true;
        [this.mouse.lastX, this.mouse.lastY] = getMousePosition(this.$el, e);
        this.action.selected = null; // deselectAll
      }
      this.$emit("canvasClick", e);
    },
    moveSelectedNode(dx, dy) {
      let index = this.scene.nodes.findIndex(item => {
        return item.id === this.action.dragging;
      });

      let left = this.scene.nodes[index].x + dx / this.scene.scale;
      let top = this.scene.nodes[index].y + dy / this.scene.scale;
      this.$set(
        this.scene.nodes,
        index,
        Object.assign(this.scene.nodes[index], {
          x: left,
          y: top
        })
      );
    },
    handleMouseWheel(e) {
      var direction = 0 > e.deltaY ? 1 : -1;
      this.$emit("mouseWheel", direction);
    },
    getSelectedNode() {
      let index = this.scene.nodes.findIndex(item => {
        return item.id === this.action.dragging;
      });
      return this.scene.nodes[index];
    },
    nodeDelete(id) {
      this.scene.nodes = this.scene.nodes.filter(node => {
        return node.id !== id;
      });
      this.scene.links = this.scene.links.filter(link => {
        return link.from !== id && link.to !== id;
      });
      this.$emit("nodeDelete", id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../variables.scss";

.flowchart-container {
  margin: 0;
  border-radius: 5px;
  background: $lightGrey;
  position: relative;
  min-width: 400px;
  width: 100%;
  overflow: scroll;
  svg {
    cursor: grab;
  }
}
</style>
