<script setup lang="ts">
import CategoryService from "@/@app/inventory/category/CategoryService";
import { CategoryModel } from "@/@app/inventory/category/ICategoryContracts";
import { ModalProps } from "@/@core/contracts/IModal";
import { ITableOptions } from "@/@core/contracts/ITable";
import { PaginateModel } from "@/@core/utils/contracts-commons";
import { categoryFields } from "./data/category-fields";
import CategoryAddOrEdit from "./modal/CategoryAddOrEdit.vue";

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
const modal = ref<ModalProps<CategoryModel>>({
  show: false,
  title: "Agregar Categoria",
  item: undefined,
  loading: false,
});
const search = ref("");
const loading = ref(false);
const openModal = (actions: "EDIT" | "DELETE" | "ADD", item?: CategoryModel) => {
  switch (actions) {
    case "EDIT":
      modal.value.show = true;
      modal.value.title = "Editar Categoria";
      modal.value.item = item;
      break;
    case "DELETE":
      deleteConfirm({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        fnAction: async () => {
          const result = await CategoryService.delete(item?.id ?? 0);
          return result;
        },
        fnReload: () => {
          list({ page: 1, search: "", itemsPerPage: pagination.value.per_page });
        },
      });
      break;
    case "ADD":
      modal.value.show = true;
      modal.value.title = "Registrar Categoria";
      modal.value.item = undefined;
      break;
  }
};
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
  <Filter title="Categorias" v-model:search="search">
    <template #others>
      <VBtn @click="openModal('ADD')">
        <VIcon icon="tabler-plus" size="25"></VIcon>
        Agregar
      </VBtn>
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
        <template #description="{ item }">
          {{ item.description ? item.description : "-" }}
        </template>
        <template #created_at="{ item }">
          {{ myGlobalDay(item.created_at.toString()) }}
        </template>
        <template #actions="{ item }">
          <v-btn
            icon="tabler-edit"
            variant="text"
            @click.stop="openModal('EDIT', item)"
          ></v-btn>
          <v-btn
            icon="tabler-trash"
            size="small"
            variant="text"
            class="mr-1"
            @click="openModal('DELETE', item)"
          ></v-btn>
        </template>
      </DataTableServer>
    </template>
  </Filter>
  <CategoryAddOrEdit
    v-if="modal.show"
    v-model:modal="modal"
    @reload="() => list({ page: 1, search: '', itemsPerPage: pagination.per_page })"
  />
</template>
