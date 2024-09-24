<script setup lang="ts">
import BrandAddOrEdit from "../../brands/modal/BrandAddOrEdit.vue";
import CategoryAddOrEdit from "../../category/modal/CategoryAddOrEdit.vue";
import SubCategoryAddOrEdit from "../../subcategory/modal/SubCategoryAddOrEdit.vue";
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
        <v-col cols="12" md="9">
          <AppTextField
            label="Nombre"
            :rules="[requiredValidator]"
            v-model="useStore.form.name"
          ></AppTextField>
        </v-col>
        <v-col cols="12" md="3">
          <VRadioGroup v-model="useStore.form.product_type" inline label="Tipo">
            <VRadio label="Nacional" value="NACIONAL" />
            <VRadio label="Importado" value="IMPORTADO" />
          </VRadioGroup>
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
          >
            <template #append>
              <v-btn @click="useStore.openModals('CATEGORY')">
                <v-icon icon="tabler-plus"></v-icon>
              </v-btn>
            </template>
          </AppAutocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <AppAutocomplete
            label="Sub Categoria"
            :items="useStore.subCategories"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.sub_category_id"
          >
            <template #append>
              <v-btn @click="useStore.openModals('SUBCATEGORY')">
                <v-icon icon="tabler-plus"></v-icon>
              </v-btn>
            </template>
          </AppAutocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <AppAutocomplete
            label="Marca"
            :items="useStore.brands"
            item-title="name"
            item-value="id"
            :rules="[requiredValidator]"
            v-model="useStore.form.brand_id"
          >
            <template #append>
              <v-btn @click="useStore.openModals('BRAND')">
                <v-icon icon="tabler-plus"></v-icon>
              </v-btn>
            </template>
          </AppAutocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <AppTextField
            label="Codigo Barra"
            :rules="[requiredValidator]"
            v-model="useStore.form.barcode"
          >
          </AppTextField>
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
          <AppTextarea
            label="Descripción"
            rows="3"
            no-resize
            v-model="useStore.form.description"
          ></AppTextarea>
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
            :rules="[requiredValidator]"
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
            :rules="[requiredValidator]"
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
            :rules="[requiredValidator]"
            v-model="useStore.form.initial_cost"
          ></AppTextField>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <div class="py-2"></div>

  <CategoryAddOrEdit
    v-model:modal="useStore.modalCategory"
    v-if="useStore.modalCategory.show"
    @reload="(item) => useStore.reloadRelations(item, 'CATEGORY')"
  />
  <SubCategoryAddOrEdit
    v-if="useStore.modalSubCategory.show"
    v-model:modal="useStore.modalSubCategory"
    @reload="(item) => useStore.reloadRelations(item, 'SUBCATEGORY')"
  />
  <BrandAddOrEdit
    v-model:modal="useStore.modalBrand"
    v-if="useStore.modalBrand.show"
    @reload="(item) => useStore.reloadRelations(item, 'BRAND')"
  />
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
