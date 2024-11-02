<script setup lang="ts">
import { ModalProps } from "@/@core/contracts/IModal";
import { useProductForm } from "../store/productAddOrEditStore";
import ModalUploadImage from "./ModalUploadImage.vue";

const store = useProductForm();
const $props = defineProps<{
  edit?: boolean
}>();
const modalGalery = ref<ModalProps<string>>({
  show: false,
  title: "Galeria del producto",
  item: "",
});
const openModalGalery = () => {
  modalGalery.value.show = true;
  modalGalery.value.title = "Galeria del producto";
};
</script>
<template>
  <v-card class="card-container-img">
    <div class="container-img" @click="openModalGalery">
      <v-img :src="store.form.photo" alt="Producto" v-if="store.form.photo" />
      <v-icon size="80" icon="tabler-photo-plus" class="img-empty" v-if="!store.form.photo"></v-icon>
    </div>
    <v-divider></v-divider>
    <v-card-item>
      <v-card-title class="text-secondary">
        <template v-if="store.form.name">
          {{ store.form.name }}
        </template>
        <template v-else> Producto sin nombre </template>
      </v-card-title>
      <v-card-subtitle class="text-secondary" v-if="store.form.requires_pricing === 'SI'">
        {{ formatMoney(store.form.unit_price) }}
      </v-card-subtitle>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      <v-list lines="three">
        <v-list-item class="pl-0">
          <template #title>
            Inventariable
            <VTooltip activator="parent" location="top">
              <template #activator="{ props }">
                <v-icon v-bind="props" icon="tabler-help" size="18" class="text-success">
                </v-icon>
              </template>
              <small class="d-block text-center" style="width: 330px">
                Esta condición es irreversible, solo la podrás editar en productos 'no
                inventariables' que no hayas asociado en documentos o transacciones.
              </small>
            </VTooltip>
          </template>
          <template #subtitle>
            Mantén activada esta opción para llevar el control de costos y cantidades
          </template>
          <template #append>
            <v-switch v-model="store.form.use_inventory" true-value="SI" false-value="NO" :disabled="!!edit"></v-switch>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      <v-row>
        <v-col cols="12" md="12">
          <VCheckbox v-model="store.form.invoicing" label="Facturación" false-value="NO" true-value="SI"
            :disabled="!!edit" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <AppTextField label="Stock" disabled :value="store.form.stock"></AppTextField>
        </v-col>
        <v-col cols="12" md="4">
          <AppTextField label="Stock Max" v-model="store.form.maximun_stock"
            :rules="[decimalValidator, requiredValidator]" :disabled="!!edit">
          </AppTextField>
        </v-col>
        <v-col cols="12" md="4">
          <AppTextField label="Stock Min." :rules="[decimalValidator, requiredValidator]"
            v-model="store.form.minumun_stock" :disabled="!!edit"></AppTextField>
        </v-col>
      </v-row>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      <slot name="actions" />
    </v-card-item>
  </v-card>
  <ModalUploadImage v-model:modal="modalGalery" v-if="modalGalery.show" />
</template>
<style lang="scss" scoped>
.card-container-img {
  .container-img {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-img:hover {
    background: rgba(255, 255, 255, 0.027);
    cursor: pointer;
  }
}
</style>
