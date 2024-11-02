<script setup lang="ts">
import { ProductModel } from "@/@app/inventory/products/IProductoContract";
import ProductService from "@/@app/inventory/products/services/ProductService";
import { ModalProps } from "@/@core/contracts/IModal";
import { ITableOptions } from "@/@core/contracts/ITable";
import { PaginateModel } from "@/@core/utils/contracts-commons";
import { productHeaders } from "./data/product.fields";

const headers = ref(productHeaders);
const pagination = ref<PaginateModel<ProductModel>>({
  data: [],
  current_page: 1,
  from: 0,
  last_page: 0,
  per_page: 10,
  to: 0,
  total: 0,
});
const modal = ref<ModalProps<ProductModel>>({
  show: false,
  title: "Agregar Categoria",
  item: undefined,
  loading: false,
});
const search = ref("");
const loading = ref(false);
const deleteProduct = (productId: number) => {
  deleteConfirm({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    fnAction: async () => {
      const result = await ProductService.delete(productId);
      return result;
    },
    fnReload: () => {
      list({ page: 1, search: "", itemsPerPage: pagination.value.per_page });
    },
  });
};
const list = async (opt: ITableOptions) => {
  try {
    loading.value = true;
    const result = await ProductService.list(opt);
    pagination.value = result;
    loading.value = false;
  } catch (ex) {
    loading.value = false;
  }
};
</script>
<template>
  <Filter title="Producto">
    <template #others>
      <v-btn
        color="primary"
        :to="{
          name: 'inventory-product-register',
        }"
      >
        Nuevo
      </v-btn>
    </template>
    <template #table>
      <DataTableServer
        :items="pagination.data"
        :fields="headers"
        :current-page="pagination.current_page"
        :per-page="pagination.per_page"
        :total="pagination.total"
        :search="search"
        :loading="loading"
        @refresh="list"
      >
        <template #category="{ item }">
          {{ item.category.name }}
        </template>
        <template #sub_category="{ item }">
          {{ item.sub_category.name }}
        </template>
        <template #brand="{ item }">
          {{ item.brand.name }}
        </template>
        <template #actions="{ item }">
          <v-btn
            icon="tabler-edit"
            variant="text"
            color="success"
            :to="{
              name: 'product-edit',
              params: { id: item.id },
            }"
          ></v-btn>
          <v-btn
            icon="tabler-trash"
            variant="text"
            color="error"
            @click="deleteProduct(item.id)"
          ></v-btn>
        </template>
      </DataTableServer>
    </template>
  </Filter>
</template>
