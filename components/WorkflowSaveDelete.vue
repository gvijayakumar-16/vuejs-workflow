<template>
  <div class="saveDeleteControls">
    <i class="fas fa-save" title="Save workflow" v-on:click="handleClickSave"/>
    <i class="fas fa-trash" title="Delete workflow" v-on:click="handleClickDelete"/>
    <span
      class="field-value"
      v-show="!showField('enteredFileName')"
      @click="focusField('enteredFileName')"
      title="The name of the workflow, click to edit"
    >{{this.workflowName}}</span>
    <input
      v-model="enteredFileName"
      v-show="showField('enteredFileName')"
      id="user-name"
      type="text"
      class="field-value form-control"
      v-on:focus="focusField('enteredFileName')"
      v-on:blur="blurField"
      @focus="$event.target.select()"
      title="The name of the workflow"
    >
    {{this.workflowDirtySuffix}}
    <modal class="modal" name="choose-name-for-save">
      <div class="modal-header">
        <i class="fas fa-times fa-2x" v-on:click="handleCloseModal"/>
        <h1>Please enter a name for the workflow</h1>
      </div>
      <div class="modal-body">
        <p>Please only use letters, numbers and hyphens.</p>
        <input v-model="enteredFileName" placeholder="enter name...">
      </div>
      <div class="modal-footer">
        <button v-on:click="handleFileNameEnteredFromModal">
          <i class="fas fa-save"/>
          Save
        </button>
      </div>
    </modal>
    <modal class="modal" name="confirm-delete">
      <div class="modal-header">
        <i class="close-button fas fa-times fa-2x" v-on:click="handleCloseModal"/>
        <h1>
          <i class="fas fa-exclamation"/>
          Confirm delete workflow
        </h1>
      </div>
      <div class="modal-body">
        Please confirm you want to delete the workflow named: {{this.workflowName}}
        <p>This action can not be undone.</p>
      </div>
      <div class="modal-footer">
        <button v-on:click="handleConfirmedDelete">
          <i class="fas fa-trash"/>
          Confirm Delete
        </button>
      </div>
    </modal>
  </div>
</template>
// autosave on a timer?
<script>
export default {
  name: "WorkflowSaveDelete",
  components: {},
  props: {
    workflowName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      enteredFileName: "",
      editField: "",
      workflowDirtySuffix: ""
    };
  },
  mounted() {
    this.enteredFileName = this.workflowName;
  },
  methods: {
    handleWorkflowDirtyUpdated(isDirty) {
      this.workflowDirtySuffix = isDirty ? "[unsaved changes!]" : "";
    },
    handleClickSave() {
      if (this.workflowName === "untitled" || this.workflowDirtySuffix === "") {
        this.$modal.show("choose-name-for-save");
      } else {
        // Save with current filename
        this.$emit("SaveWorkflow", this.enteredFileName);
      }
    },
    handleFileNameEnteredFromModal() {
      console.log("Filename for saving entered", this.enteredFileName);
      this.$modal.hide("choose-name-for-save");
      this.$emit("SaveWorkflow", this.enteredFileName);
    },
    handleClickDelete() {
      if (this.workflowName !== "untitled") {
        this.$modal.show("confirm-delete");
      }
    },
    handleConfirmedDelete() {
      this.$emit("DeleteWorkflow");
      this.handleCloseModal();
    },
    handleCloseModal() {
      this.$modal.hide("confirm-delete");
      this.$modal.hide("choose-name-for-save");
    },
    focusField(fieldName) {
      this.editField = fieldName;
    },
    blurField() {
      this.editField = "";
      this.$emit("WorkflowNameChanged", this.enteredFileName);
    },
    showField(fieldName) {
      return (
        this[fieldName] === "" ||
        this[fieldName] === "untitled" ||
        this.editField === fieldName
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

.saveDeleteControls {
  margin: 2px;
  display: inline;
  i {
    font-size: 1.4em;
    margin: 5px;
    cursor: pointer;
  }
}
.modal {
  .modal-header {
    background: $themeColor;
    color: white;
    padding: 6px;
    .close-button {
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
