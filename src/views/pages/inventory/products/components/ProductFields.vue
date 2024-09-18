<script setup lang="ts">
import { useProductForm } from "../store/productAddOrEditStore";

const useStore = useProductForm();
const searchSunatCodes = ref("");

onBeforeMount(() => {
  useStore.refreshForm();
});
onMounted(async () => {
  await useStore.getCategories();
  await useStore.getBrands();
  await useStore.getTaxes();
  await useStore.getWareHouses();
});
</script>
<template>
  <v-card>
    <v-card-title>
      <h5 class="text-uppercase">Información General</h5>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <AppTextField
            label="Nombre"
            :rules="[requiredValidator]"
            v-model="useStore.form.name"
          ></AppTextField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <AppAutocomplete
            label="Categoria"
            :items="useStore.categories"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.category_id"
          ></AppAutocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <AppAutocomplete
            label="Sub Categoria"
            :items="useStore.subCategories"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.sub_category_id"
          ></AppAutocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <AppAutocomplete
            label="Marca"
            :items="useStore.brands"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.brand_id"
          ></AppAutocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <AppTextField
            label="Codigo Barra"
            :rules="[requiredValidator]"
            v-model="useStore.form.barcode"
          ></AppTextField>
        </v-col>
        <v-col cols="12" md="8">
          <AppAutocomplete
            label="Codigo Sunat"
            @update:search="useStore.searchSunatCodes"
            :items="useStore.sunatCodes"
            item-title="description"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.sunat_product_code_id"
          ></AppAutocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <AppTextarea label="Descripción" rows="3" no-resize></AppTextarea>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <div class="py-2"></div>
  <v-card>
    <v-card-title>
      <h5 class="text-uppercase">Precio</h5>
      <h5 class="text-secondary">
        Indica el valor de venta y el costo de compra de tu producto.
      </h5>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <AppTextField
            label="Precio Base"
            v-model="useStore.form.base_price"
            placeholder="0.00"
            @keyup="useStore.changeBasePrice"
          ></AppTextField>
        </v-col>
        <v-col cols="12" md="1" class="d-flex justify-center align-center pt-8">
          <v-icon icon="tabler-plus"></v-icon>
        </v-col>
        <v-col cols="12" md="4">
          <AppSelect
            label="Impuesto"
            :items="useStore.taxes"
            v-model="useStore.form.tax_id"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            @update:model-value="useStore.changeBasePrice"
          ></AppSelect>
        </v-col>
        <v-col cols="12" md="1" class="d-flex justify-center align-center pt-8">
          <v-icon icon="tabler-equal"></v-icon>
        </v-col>
        <v-col cols="12" md="3">
          <AppTextField
            label="Precio Total"
            placeholder="0.00"
            v-model="useStore.form.unit_price"
            @keyup="useStore.changeUnitPrice"
          ></AppTextField>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <AppTextField
            label="Costo Inicial"
            placeholder="0.00"
            type="number"
          ></AppTextField>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <div class="py-2"></div>
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
        <div class="detail-icon">
          <v-icon icon="tabler-stack-2" size="25"></v-icon>
        </div>
        <div class="detail-container">
          <p class="item">{{ item.ware_house }}</p>
          <p class="item totales">
            <template v-if="item.completed">
              {{ item.quantity }} {{ item.minimum_quantity }} -
              {{ item.maximum_quantity }}
            </template>
            <template v-else> Agrega aquí la cantidad inicial de tu producto </template>
          </p>
        </div>
        <div class="detail-actions">
          <v-icon size="30" icon="tabler-dots-vertical"></v-icon>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.container-detail-inventory {
  padding: 10px 5px;
  display: flex;
  .detail-icon {
    width: 60px;
    height: 60px;
    background-color: var(--v-primary-base);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: white solid 1px;
  }
  > .detail-container {
    flex-grow: 2;
    padding: 5px 10px;
    p.item {
      font-weight: bold;
      margin: 0;
    }
    p.totales {
      font-size: 0.8rem;
    }
  }
}
</style>
