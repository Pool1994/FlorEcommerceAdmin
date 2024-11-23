<script setup lang="ts">
import { ModalProps } from "@/@core/contracts";
import AddOrEditInventoryMovement from "../../components/AddOrEditInventoryMovement.vue";

const list = ref();

const modal = ref<ModalProps<any>>({
  show: false,
  title: "Agregar Entrada",
});
const openModal = () => {
  modal.value.show = true;
  modal.value.title = "Agregar Movimiento Inventario";
};
onMounted(() => {});
</script>
<template>
  <Filter>
    <template #others>
      <VBtn @click="openModal()">
        <VIcon icon="tabler-plus" size="25"></VIcon>
        Agregar
      </VBtn>
    </template>
  </Filter>
  <AddOrEditInventoryMovement v-if="modal.show" v-model:modal="modal" :type="'ENTRADA'" />
</template>
