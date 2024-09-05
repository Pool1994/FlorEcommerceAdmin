<script setup lang="ts">
import CategoryService from "@/@app/inventory/category/CategoryService";
import { CategoryModel } from "@/@app/inventory/category/ICategoryContracts";
import { ITableOptions } from "@/@core/contracts/ITable";
import { PaginateModel } from "@/@core/utils/contracts-commons";
import { categoryFields } from "./data/category-fields";

const headers = ref(categoryFields);
const pagination = ref<PaginateModel<CategoryModel>>({
  data: [],
  current_page: 1,
  from: 0,
  last_page: 0,
  per_page: 10,
  to: 0,
  total: 0,
});
const search = ref("");
const loading = ref(false);
const list = async (opt: ITableOptions) => {
  try {
    loading.value = true;
    const result = await CategoryService.list(opt);
    pagination.value = result;
    loading.value = false;
  } catch (ex) {
    loading.value = false;
  }
};
</script>
<template>
  <Filter title="Categoria" v-model:search="search">
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
        <template #created_at="{ item }">
          {{ myGlobalDay(item.created_at.toString()) }}
        </template>
        <template #actions>
          <v-btn icon="tabler-edit" variant="text"></v-btn>
          <v-btn icon="tabler-trash" size="small" variant="text" class="mr-1"></v-btn>
        </template>
      </DataTableServer>
    </template>
  </Filter>
</template>
