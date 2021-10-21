<template>
  <div>
    <div class="row">
      <div class="column left">Template:</div>
      <div class="column right">
        <select v-model="step.settings.template">
          <option disabled value>Please select a template</option>
          <option>Admin start workflow</option>
          <option>Admin end workflow</option>
          <option>User start workflow</option>
          <option>User end workflow</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true
    }
  }
};
</script>