<template>
  <div v-bind:style="noteStyle" class="sticky-note" v-on:mousedown="handleMousedown">
    <div>
      <div class="note-title">
        <div class="push-right">
          <i class="fas fa-arrows-alt" title="Drag to move the note"></i>
          <i class="fas fa-cog" title="Click to change note settings"></i>
          <i class="fas fa-trash" title="Click to delete the note"></i>
        </div>
        <h2>
          <editable-text v-model="note.title" title="click to edit"></editable-text>
        </h2>
      </div>
      <editable-text v-model="note.body" title="click to edit"></editable-text>
    </div>
  </div>
</template>

<script>
import EditableText from "./EditableText.vue";

export default {
  name: "StickyNote",
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
    note: {
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
    noteStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + "px",
        left: this.options.centerX + this.x * this.options.scale + "px",
        transform: `scale(${this.options.scale})`
      };
    }
  },
  methods: {
    update: function(event) {
      this.$emit("update", event.target.innerText);
    },
    handleMousedown(e) {
      console.log(e.target.className);
      if (e.target.className.indexOf("fas") !== -1) {
        e.preventDefault();
        this.$emit("nodeSelected", e);
        console.log("node selected", e);
      }
    }
  },
  components: {
    EditableText
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.fas {
  cursor: pointer;
}
.sticky-note {
  margin: 1em;
  float: left;
  padding: 5px;
  width: 200px;
  height: 200px;
  background: #ffc;
  position: absolute;
  /* Firefox */
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  /* Safari+Chrome */
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  /* Opera */
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  .fa-arrows-alt {
    cursor: move;
  }
  .push-right {
    float: right;
  }
}
</style>
