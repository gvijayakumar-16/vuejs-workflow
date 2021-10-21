<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >
    <link href="https://cdn.jsdelivr.net/npm/vuesax/dist/vuesax.css" rel="stylesheet">

    <h1>Simple Workflow Editor!</h1>
    <div class="row">
      <div class="column left">
        <WorkflowToolbox ref="toolbox"/>
      </div>
      <div class="column right">
        <WorkflowEditor
          v-bind:onSaveWorkflow="handleSaveWorkflow"
          v-bind:onDeleteWorkflow="handleDeleteWorkflow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WorkflowToolbox from "./components/WorkflowToolbox.vue";
import WorkflowEditor from "./components/WorkflowEditor.vue";

export default {
  components: {
    WorkflowToolbox,
    WorkflowEditor
  },
  methods: {
    handleSaveWorkflow(data) {
      this.$refs.toolbox.SaveWorkflow(data);
    },
    handleDeleteWorkflow(data) {
      this.$refs.toolbox.DeleteWorkflow(data);
    }
  }
};
</script>

<style lang="scss">
@import "./variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  line-height: 1.4;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
}

.column {
  float: left;
  padding: 5px;
}

.left {
  width: 20%;
}

.right {
  width: 80%;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>