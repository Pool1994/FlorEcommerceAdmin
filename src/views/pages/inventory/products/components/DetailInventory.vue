<script lang="ts" setup>
import { IDetailInventoryForm } from "@/@app/inventory/products/IProductoContract";
import { VForm } from "vuetify/components";
import { useProductForm } from "../store/productAddOrEditStore";
const formDetailInventory = ref<VForm>();
const modalShow = ref(false);
const useStore = useProductForm();
const indexSelected = ref(0);
const disabledSelect = computed(() => useStore.typeDetail === "EDIT");
const itemSelected = ref<IDetailInventoryForm>({
  warehouse_id: null as any,
  ware_house: null as any,
  quantity: null as any,
  minimum_quantity: null as any,
  maximum_quantity: null as any,
  completed: false,
});
const openModalEdit = (item: IDetailInventoryForm, index: number) => {
  useStore.typeDetail = "EDIT";
  modalShow.value = !modalShow.value;
  itemSelected.value = item;
  indexSelected.value = index;
};
const saveDetailsInventory = async () => {
  try {
    const form = await formDetailInventory.value?.validate();
    if (!form?.valid) throw new Error("Formulario no valido, revisa los errores");
    if (
      useStore.detailsInventory.some(
        (i) => i.warehouse_id === itemSelected.value.warehouse_id
      )
    ) {
      useStore.detailsInventory[indexSelected.value].completed = true;
      useStore.detailsInventory[indexSelected.value].quantity =
        itemSelected.value.quantity;
      useStore.detailsInventory[indexSelected.value].minimum_quantity =
        itemSelected.value.minimum_quantity;
      useStore.detailsInventory[indexSelected.value].maximum_quantity =
        itemSelected.value.maximum_quantity;
      useStore.detailsInventory[indexSelected.value].ware_house =
        itemSelected.value.ware_house;
    } else {
      useStore.detailsInventory.push({
        ...itemSelected.value,
        ware_house: useStore.almacenPendient.find(
          (x) => x.id === itemSelected.value.warehouse_id
        )?.name as any,
        completed: true,
      });
    }
    modalShow.value = false;
  } catch (ex: any) {
    notifyWarning(ex.message);
  }
};
const openModalAdd = () => {
  itemSelected.value = {
    warehouse_id: null as any,
    ware_house: null as any,
    quantity: null as any,
    minimum_quantity: null as any,
    maximum_quantity: null as any,
    completed: false,
  };
  useStore.typeDetail = "ADD";
  modalShow.value = !modalShow.value;
};
const deleteItem = async (index: number) => {
  try {
    alert(index);
    useStore.detailsInventory.splice(index, 1);
  } catch (ex: any) {
    notifyWarning(ex.message);
  }
};
</script>
<template>
  <v-card>
    <v-card-title>
      <h5 class="text-uppercase">Detalle de inventario</h5>
      <h5 class="text-secondary">
        Distribuye y controla las cantidades de tus productos en diferentes lugares
      </h5>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div
        v-for="(item, index) in useStore.detailsInventory"
        :key="index"
        class="container-detail-inventory"
      >
        <div class="detail-icon cursor-pointer" @click="openModalEdit(item, index)">
          <v-icon icon="tabler-stack-2" size="25"></v-icon>
        </div>
        <div class="detail-container">
          <p class="item">
            <span
              @click="openModalEdit(item, index)"
              class="cursor-pointer title-almacen"
            >
              {{ item.ware_house }}
            </span>
          </p>
          <p class="item totales">
            <span @click="openModalEdit(item, index)" class="cursor-pointer">
              <template v-if="item.completed">
                {{ item.quantity }} cantidad - {{ item.minimum_quantity }} min -
                {{ item.maximum_quantity }} max
              </template>
              <template v-else> Agrega aquí la cantidad inicial de tu producto </template>
            </span>
          </p>
        </div>
        <div class="detail-actions">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="tabler-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>

            <v-list density="compact">
              <v-list-item
                title="Editar"
                value="edit"
                @click="openModalEdit(item, index)"
              >
                <template #prepend>
                  <v-icon icon="tabler-pencil"></v-icon>
                </template>
              </v-list-item>
              <v-list-item
                title="Eliminar"
                value="delete"
                v-if="!item.default"
                @click="deleteItem(index)"
              >
                <template #prepend>
                  <v-icon icon="tabler-trash"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="add-new-container">
        <v-btn color="primary" @click="openModalAdd" variant="text">
          <v-icon icon="tabler-plus"></v-icon>
          Agregar nuevo
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
  <FormDialog
    v-model:show="modalShow"
    title="Seleccionar bodega"
    :width="450"
    @close="modalShow = false"
  >
    <template #content>
      <v-form lazy-validation ref="formDetailInventory">
        <v-row>
          <v-col cols="12">
            <AppAutocomplete
              :disabled="disabledSelect"
              v-model="itemSelected.warehouse_id"
              label="Almacen"
              :items="useStore.almacenPendient"
              item-title="name"
              item-value="id"
              :rules="[requiredValidator]"
            >
              <template v-if="!disabledSelect" #append>
                <v-btn>
                  <v-icon icon="tabler-plus"></v-icon>
                </v-btn>
              </template>
            </AppAutocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <AppTextField
              label="Cant. Actual"
              v-model="itemSelected.quantity"
              :rules="[requiredValidator, decimalValidator]"
            ></AppTextField>
          </v-col>
          <v-col cols="12" md="4">
            <AppTextField
              label="Cant. Mínima"
              :rules="[requiredValidator, decimalValidator]"
              v-model="itemSelected.minimum_quantity"
            ></AppTextField>
          </v-col>
          <v-col cols="12" md="4">
            <AppTextField
              label="Cant. Máxima"
              :rules="[requiredValidator, decimalValidator]"
              v-model="itemSelected.maximum_quantity"
            ></AppTextField>
          </v-col>
        </v-row>
      </v-form>
    </template>
    <template #actions>
      <v-btn @click="saveDetailsInventory">Guardar</v-btn>
    </template>
  </FormDialog>
</template>
<style scoped>
.title-almacen {
  font-weight: bold;
}
</style>
