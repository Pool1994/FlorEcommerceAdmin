<script setup lang="ts">
import { router } from "@/plugins/1.router";
import ImageProduct from "@/views/pages/inventory/products/components/ImageProduct.vue";
import ProductFields from "@/views/pages/inventory/products/components/ProductFields.vue";
import { useProductForm } from "@/views/pages/inventory/products/store/productAddOrEditStore";
import { VForm } from "vuetify/components";
const route = useRoute("inventory-product-edit-producto");
const useStore = useProductForm();
const formProduct = ref<VForm>();
const update = async() =>{
  try {
    const params = route.params as any;
    const myForm = await formProduct.value?.validate();
    if (!myForm?.valid) throw new Error("Form invalid");
    await useStore.saveProduct(params.id);
    router.push({ name: "inventory-product" });
  } catch (ex: any) {
  }
}
onBeforeUnmount(() => {
  localStorage.removeItem("gallery-images");
});
onBeforeMount(() => {
  localStorage.removeItem("gallery-images");
});
onMounted(async () => {
  const params = route.params as any;
  await useStore.edit(params.id);
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card title="Editar Producto"
        subtitle="Edita tu producto inventariable que ofreces para registrar en tus ventas. " elevation="0"
        variant="text">
        <v-card-text>
          <v-form lazy-validation ref="formProduct" @submit.prevent="update">
            <v-row>
              <v-col cols="12" md="9">
                <ProductFields  edit/>
              </v-col>
              <v-col cols="12" md="3">
                <ImageProduct edit>
                  <template #actions>
                    <v-row>
                      <v-col md="6" cols="12">
                        <v-btn variant="outlined" block :to="{ name: 'inventory-product' }">
                          Cancelar
                        </v-btn>
                      </v-col>
                      <v-col md="6" cols="12">
                        <v-btn color="primary" block type="submit"> Actualizar </v-btn>
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
