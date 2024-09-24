<script setup lang="ts">
import ImageProduct from "@/views/pages/inventory/products/components/ImageProduct.vue";
import ProductFields from "@/views/pages/inventory/products/components/ProductFields.vue";
import { useProductForm } from "@/views/pages/inventory/products/store/productAddOrEditStore";
import { VForm } from "vuetify/components";
const useStore = useProductForm();
const formProduct = ref<VForm>();
const saveProduct = async () => {
  try {
    const myForm = await formProduct.value?.validate();
    if (!myForm?.valid) throw new Error("Form invalid");
    await useStore.saveProduct();
  } catch (ex: any) {
    notifyError(ex.message);
  }
};
onBeforeUnmount(() => {
  localStorage.removeItem("gallery-images");
});
onBeforeMount(() => {
  localStorage.removeItem("gallery-images");
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card
        title="Nuevo Producto"
        subtitle="Crea tus productos inventariables que ofreces para registrar en tus ventas. "
        elevation="0"
        variant="text"
      >
        <v-card-text>
          <v-form lazy-validation @submit.prevent="saveProduct()" ref="formProduct">
            <v-row>
              <v-col cols="12" md="9">
                <ProductFields />
              </v-col>
              <v-col cols="12" md="3">
                <ImageProduct>
                  <template #actions>
                    <v-row>
                      <v-col md="6" cols="12">
                        <v-btn
                          variant="outlined"
                          block
                          :to="{ name: 'inventory-product' }"
                        >
                          Cancelar
                        </v-btn>
                      </v-col>
                      <v-col md="6" cols="12">
                        <v-btn color="primary" block type="submit"> Guardar </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                </ImageProduct>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
