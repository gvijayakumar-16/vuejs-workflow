<template>
  <div>
    <div class="row">
      <div class="column left">duration:</div>
      <div class="column right">
        <input v-model="step.settings.duration" title="enter duration to wait in ms">
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