<template>
  <div>
    <WorkflowSaveDelete
      ref="SaveDelete"
      v-bind:workflowName="this.scene.workflowName"
      v-on:SaveWorkflow="handleSaveWorkflow"
      v-on:DeleteWorkflow="handleDeleteWorkflow"
      v-on:WorkflowNameChanged="handleWorkflowNameChanged"
    />
    <div class="controls push-right">
      <i class="fas fa-eraser" title="Clear canvas" v-on:click="handleClickClear"/>
      <i
        class="fas fa-sticky-note drag"
        title="Add sticky note to canvas (drag in to position)"
        v-on:dragstart="handleDragStartStickyNote"
      />
      <i
        class="fas fa-download"
        title="Export workflow to json file"
        v-on:click="handleClickDownload"
      />
      <i
        class="fas fa-upload"
        title="Import workflow from json file"
        v-on:click="handleClickUpload"
      />
      <i class="fas fa-search-plus" title="Zoom in" v-on:click="handleZoomIn"/>
      <i class="fas fa-search-minus" title="Zoom out" v-on:click="handleZoomOut"/>
      <i class="fas fa-undo" title="Zoom reset" v-on:click="handleZoomReset"/>
    </div>
    <modal class="modal" name="choose-file-to-upload">
      <div class="modal-header">
        <i class="fas fa-times fa-2x" v-on:click="handleClickCancelUpload"/>
        <h1>Please select a json file to upload</h1>
      </div>
      <div class="modal-body">
        <p>This should be a file that was exported from the Workflow editor.</p>
        <p>The contents will be validated, but please be very cautious if you are attempting to edit the file by hand.</p>
        <input type="file" v-on:change="handleUploadFileChanged">
      </div>
    </modal>
    <div v-on:drop="handleDrop" v-on:dragover="handleAllowDrop">
      <flowchart
        v-bind:scene.sync="scene"
        v-on:nodeClick="nodeClick"
        v-on:nodeDelete="nodeDelete"
        v-on:linkBreak="linkBreak"
        v-on:linkAdded="linkAdded"
        v-on:canvasClick="canvasClick"
        v-on:settingsClick="handleSettingsClick"
        v-on:mouseWheel="handleMouseWheel"
        v-bind:height="'450'"
      />
    </div>
  </div>
</template>

<script>
import Flowchart from "./Flowchart.vue";
import ModalWrapper from "./ModalWrapper";
import WorkflowSaveDelete from "./WorkflowSaveDelete";
import { getTimeStamp } from "./DateHelpers";

export default {
  name: "WorkflowEditor",
  components: {
    Flowchart,
    ModalWrapper,
    WorkflowSaveDelete
  },
  props: {
    onSaveWorkflow: {
      type: Function,
      required: true
    },
    onDeleteWorkflow: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      jsonToLoad: "",
      loadedScene: "",
      workflowIsDirty: false,
      scaleGranularity: 0.2,
      scene: {
        centerX: 0,
        centerY: 0,
        scale: 1,
        workflowName: "untitled",
        nodes: [
          {
            id: 1,
            x: 10,
            y: 10,
            step: {
              type: "SendEmail",
              name: "Send Email To User",
              desc: "Brief description of the task",
              settings: { template: "Admin end workflow" }
            }
          },
          {
            id: 2,
            x: 150,
            y: 140,
            step: {
              type: "FindGroups",
              name: "Find Groups for User",
              desc: "Find adGroups that the current user is a member of",
              settings: {}
            }
          },
          {
            id: 3,
            x: 350,
            y: 270,
            step: {
              type: "Wait",
              name: "Wait for duration",
              desc: "Wait for a configurable amount of time to pass",
              settings: { duration: 250 }
            }
          },
          {
            id: 4,
            x: 600,
            y: 50,
            note: {
              title: "A sticky note!",
              body: "some text to help explain something etc..."
            }
          }
        ],
        links: [
          {
            id: 1,
            from: 1,
            to: 2
          },
          {
            id: 2,
            from: 2,
            to: 3
          }
        ]
      }
    };
  },
  mounted: function() {
    this.isWorkflowDirty();

    this.$watch(
      () => {
        return {
          nodes: this.scene.nodes,
          links: this.scene.links
        };
      },
      (newVal, oldVal) => {
        this.isWorkflowDirty();
        this.$refs.SaveDelete.handleWorkflowDirtyUpdated(this.workflowIsDirty);
      },
      {
        deep: true
      }
    );
  },
  methods: {
    isWorkflowDirty() {
      if (this.loadedScene === null) {
        this.workflowIsDirty = true;
      } else {
        let workflowOnlyScene = {
          nodes: this.scene.nodes,
          links: this.scene.links
        };
        if (this.loadedScene !== JSON.stringify(workflowOnlyScene)) {
          this.workflowIsDirty = true;
        } else {
          this.workflowIsDirty = false;
        }
      }
    },
    handleSaveWorkflow(workflowName) {
      this.scene.workflowName = workflowName;
      // save the workflow into the toolbox
      this.updateLoadedScene();
      this.onSaveWorkflow(this.scene);
    },
    handleDeleteWorkflow() {
      this.onDeleteWorkflow(this.scene.workflowName);
    },
    handleWorkflowNameChanged(newWorkflowName) {
      this.scene.workflowName = newWorkflowName;
    },
    updateLoadedScene() {
      let workflowOnlyScene = {
        nodes: this.scene.nodes,
        links: this.scene.links
      };

      this.loadedScene = JSON.stringify(workflowOnlyScene);
      this.isWorkflowDirty();
      this.$refs.SaveDelete.handleWorkflowDirtyUpdated(this.workflowIsDirty);
    },
    handleClickClear() {
      console.log("Clear");
      this.scene = {
        centerX: 0,
        centerY: 0,
        scale: 1,
        nodes: [],
        links: []
      };
    },
    handleClickUpload() {
      this.$modal.show("choose-file-to-upload");
    },
    handleClickCancelUpload() {
      this.$modal.hide("choose-file-to-upload");
    },
    handleUploadFileChanged(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      console.log("upload file selected", files[0].name);
      this.loadWorkflowFromFile(files[0]);
      this.$modal.hide("choose-file-to-upload");
    },
    loadWorkflowFromFile(file) {
      let reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        this.scene = JSON.parse(e.target.result);
      };
      reader.readAsText(file);
    },
    handleClickDownload() {
      console.log("Downoading", this.jsonToLoad);
      var jsonData = JSON.stringify(this.scene);

      const url = window.URL.createObjectURL(new Blob([jsonData]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        `ExportedWorkflow_${this.scene.workflowName}_${getTimeStamp()}.json`
      );
      document.body.appendChild(link);
      link.click();
    },
    handleSettingsClick(selectedNode) {
      this.$modal.show(
        ModalWrapper,
        {
          nodeIn: selectedNode,
          settingsChanged: this.handleSettingsChanged
        },
        {
          draggable: true,
          adaptive: true,
          scrollable: true,
          height: "auto"
        }
      );
    },
    handleSettingsChanged(id, e) {
      console.log(`step settings changed node${id}`, JSON.stringify(e));
      var nodeToUpdate = this.scene.nodes.find(function(node) {
        return node.id === id;
      });
      nodeToUpdate.step.settings = e.settings;
    },
    handleZoomIn() {
      this.scene.scale += this.scaleGranularity;
      console.log("ZoomIn", this.scene.scale);
    },
    handleZoomOut() {
      if (this.scene.scale >> 0.6) {
        this.scene.scale -= this.scaleGranularity;
      }
      console.log("ZoomOut", this.scene.scale);
    },
    handleZoomReset() {
      this.scene.scale = 1;
      this.scene.centerX = 0;
      this.scene.centerY = 0;
      console.log("ZoomReset", this.scene.scale);
    },
    handleMouseWheel(modifier) {
      this.scene.scale = this.scene.scale + modifier * this.scaleGranularity;
    },
    handleDrop(e) {
      e.preventDefault();
      let jsonData = e.dataTransfer.getData("draggedItem");
      console.log("dropped data:", jsonData);
      let draggedItem = JSON.parse(jsonData);

      // get scaled position relative to the current canvas position
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - this.scene.centerX - rect.left;
      let y = e.clientY - this.scene.centerY - rect.top;
      let scaledX = x / this.scene.scale;
      let scaledY = y / this.scene.scale;

      // console.log(
      //   `rect.left ${rect.left}  rect.top ${rect.top}  client[${e.clientX},${
      //     e.clientY
      //   }]   [${x},${y}]`
      // );

      if (draggedItem.type === "workflow") {
        // need to prompt first if data is unsaved?
        this.scene = draggedItem.data;
      } else if (draggedItem.type === "stickyNote") {
        this.addStickyNote(draggedItem, scaledX, scaledY);
      } else {
        this.addNode(draggedItem, scaledX, scaledY);
      }
    },
    handleAllowDrop(e) {
      e.preventDefault();
    },
    canvasClick(e) {},
    addNode(step, x, y) {
      let maxID = Math.max(
        0,
        ...this.scene.nodes.map(link => {
          return link.id;
        })
      );
      this.scene.nodes.push({
        id: maxID + 1,
        x: x,
        y: y,
        step: step
      });
    },
    addStickyNote(note, x, y) {
      let maxID = Math.max(
        0,
        ...this.scene.nodes.map(link => {
          return link.id;
        })
      );
      this.scene.nodes.push({
        id: maxID + 1,
        x: x,
        y: y,
        note: note
      });
    },
    nodeClick(id) {
      console.log("node click", id);
    },
    nodeDelete(id) {
      console.log("node delete", id);
    },
    linkBreak(id) {
      console.log("link break", id);
    },
    linkAdded(link) {
      console.log("new link added:", link);
    },
    handleDragStartStickyNote(e) {
      let note = {
        type: "stickyNote",
        title: "New Sticky Note",
        body: "click to edit..."
      };
      let jsonNote = JSON.stringify(note);
      e.dataTransfer.setData("draggedItem", jsonNote);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.controls {
  margin: 2px;
  i {
    font-size: 1.4em;
    margin: 5px;
    cursor: pointer;
  }
  .drag {
    cursor: move;
  }
}
.push-right {
  float: right;
}

.modal {
  .modal-header {
    background: $themeColor;
    color: white;
    padding: 6px;
    i {
      float: right;
      padding: 5px;
      cursor: pointer;
    }
  }
  .modal-body {
    padding: 6px;
  }
  .modal-footer {
    padding: 6px;
    float: right;
  }
}
</style>

