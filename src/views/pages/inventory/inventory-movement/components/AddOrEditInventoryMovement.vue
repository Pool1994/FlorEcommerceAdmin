<script setup lang="ts">
import { movementRelationApi } from "@/@app/inventory/inventory-movement/api/app/inventory-movement-composition-root";
import {
  InventoryMovementRegister,
  InventoryMovementTypeSchemaApi,
  MovementDestinationApi,
  ReasonInventoryMovementSchemaApi,
} from "@/@app/inventory/inventory-movement/api/app/schemas";
import { EmitEvents, ModalProps } from "@/@core/contracts";

const $props = defineProps<{
  modal: ModalProps<InventoryMovementRegister>;
  type: "ENTRADA" | "SALIDA" | "VENTAS" | "COMPRAS";
}>();
const $emit = defineEmits<EmitEvents<InventoryMovementRegister>>();
const movementTypes = ref<Array<InventoryMovementTypeSchemaApi>>([]);
const motiveTypes = ref<Array<ReasonInventoryMovementSchemaApi>>([]);
const close = () => {
  $emit("update:modal", {
    show: false,
    title: $props.modal.title,
    item: undefined,
  });
};
const getMovementEntries = async () => {
  const entries = await movementRelationApi.getInventoryMovementEntrie(
    MovementDestinationApi.Inventory
  );
  const motives = await movementRelationApi.getReasonsForInventoryMovementEntrie();

  movementTypes.value = entries;
  motiveTypes.value = motives;
};
const getMovementExit = async () => {
  const exits = await movementRelationApi.getInventoryMovementExit(
    MovementDestinationApi.Inventory
  );
  movementTypes.value = exits;
};
const loadMovementTypes = async () => {
  try {
    switch ($props.type) {
      case "ENTRADA":
        await getMovementEntries();
        break;
      case "SALIDA":
        await getMovementExit();
        break;
      case "VENTAS":
        break;
      case "COMPRAS":
        break;
    }
  } catch (ex) {}
};
onMounted(() => {
  loadMovementTypes();
});
</script>
<template>
  <FormDialog :show="modal.show" :title="modal.title" @close="close" :width="1000">
    <template #content>
      <VForm>
        <LegendForm title="Datos Generales">
          <template #content>
            <VRow>
              <VCol cols="12" md="6">
                <AppAutocomplete
                  density="comfortable"
                  label="Documento"
                  :items="movementTypes"
                  item-title="name"
                  item-value="id"
                ></AppAutocomplete>
              </VCol>
              <VCol cols="12" md="6">
                <AppAutocomplete
                  density="comfortable"
                  label="Motivo"
                  :items="motiveTypes"
                  item-title="name"
                  item-value="id"
                ></AppAutocomplete>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="6">
                <AppAutocomplete density="comfortable" label="Almacen"></AppAutocomplete>
              </VCol>
              <VCol cols="12" md="6">
                <AppDateTimePicker density="comfortable" label="Fecha" />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="12">
                <AppTextarea
                  density="comfortable"
                  label="Descripcion"
                  rows="2"
                  no-resize
                ></AppTextarea>
              </VCol>
            </VRow>
          </template>
        </LegendForm>
        <LegendForm title="Agregar Productos a Inventario">
          <template #content>
            <VRow>
              <VCol cols="12" md="12">
                <AppAutocomplete
                  density="comfortable"
                  label="Producto"
                  placeholder="Selecciona un producto"
                ></AppAutocomplete>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="2">
                <AppTextField
                  label="Caja"
                  density="comfortable"
                  type="number"
                  min="0"
                  max="100"
                />
              </VCol>
              <VCol cols="12" md="2">
                <AppTextField
                  density="comfortable"
                  label="Paquete"
                  type="number"
                  min="0"
                  max="100"
                />
              </VCol>
              <VCol cols="12" md="2">
                <AppTextField
                  density="comfortable"
                  label="Bolsa"
                  type="number"
                  min="0"
                  max="100"
                />
              </VCol>
              <VCol cols="12" md="2">
                <AppTextField
                  density="comfortable"
                  label="Unidad"
                  type="number"
                  min="0"
                  max="100"
                />
              </VCol>
            </VRow>
          </template>
        </LegendForm>

        <LegendForm title="Detalle de productos">
          <template #content>
            <VRow>
              <VCol cols="12" md="12">
                <VTable density="comfortable">
                  <thead>
                    <tr>
                      <th>Producto</th>
                    </tr>
                  </thead>
                </VTable>
              </VCol>
            </VRow>
          </template>
        </LegendForm>
      </VForm>
    </template>
  </FormDialog>
</template>
