<script setup lang="ts">
import { inventoryMovementProxyAdapter } from "@/@app/inventory/inventory-movement/api/app/inventory-movement-composition-root";

const actions = inventoryMovementProxyAdapter;
const list = ref();
const allList = async () => {
  list.value = await actions.listing({});
};
onMounted(() => {
  allList();
});
</script>
<template>
  <h1>Entradas</h1>
  <pre>{{ list }}</pre>
</template>
