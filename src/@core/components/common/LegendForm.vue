<script setup lang="ts">
const {} = defineProps<{
  title: string;
}>();
</script>
<template>
  <fieldset class="container-fieldset">
    <legend>{{ title }}</legend>
    <slot name="content"></slot>
  </fieldset>
</template>
<style lang="scss" scoped>
fieldset.container-fieldset {
  width: 100%;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0 1px 8px 1px rgba(0, 0, 0, 0.15);
  padding: 0.8rem 1rem;
  position: relative;
  margin-bottom: 1.5rem;
  legend {
    padding: 0.1rem 1rem;
    border-radius: 4px;
    font-weight: bold;
    background: #2f3349;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;
    text-transform: uppercase;
  }
}
</style>
