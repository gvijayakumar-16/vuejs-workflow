<template>
  <div class="modal">
    <div class="modal-header">
      <i class="fas fa-times fa-2x" v-on:click="$emit('close')"/>
      <h1>{{ step.name }}</h1>
      <span>{{ step.desc }}</span>
    </div>
    <div class="modal-body">
      <component v-bind:is="steptype" v-bind:step="step"></component>
    </div>
    <div class="modal-footer">
      <button v-on:click="handleSave">
        <i class="fas fa-save"/>
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import SendEmail from "./StepSettings/SendEmail.vue";
import SendEmailViaAgent from "./StepSettings/SendEmailViaAgent.vue";
import Wait from "./StepSettings/Wait.vue";

export default {
  props: {
    nodeIn: {
      type: Object,
      required: true
    },
    settingsChanged: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      step: {
        id: 0,
        type: "",
        name: "",
        desc: "",
        settings: []
      }
    };
  },
  computed: {
    steptype: function() {
      return this.step.type;
    }
  },
  mounted() {
    this.step = this.getCloneOfStep();
  },
  methods: {
    handleSave() {
      if (JSON.stringify(this.step) !== JSON.stringify(this.nodeIn.step)) {
        this.settingsChanged(this.nodeIn.id, this.step);
      }
      this.$emit("close");
    },
    getCloneOfStep() {
      return JSON.parse(JSON.stringify(this.nodeIn.step));
    }
  },
  components: {
    SendEmail,
    SendEmailViaAgent,
    Wait
  }
};
</script>

<style scoped lang="scss">
@import "../variables.scss";

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