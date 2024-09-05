<script setup lang="ts" generic="T">
import {
  EmitEventDataTable,
  IDataTable,
  IRowTable,
  ITableOptions,
} from "@/@core/contracts/ITable";
const rowTable = ref(8);
const { fields, items, currentPage, perPage, total, search, loading } = defineProps<
  IDataTable<T>
>();
const $emits = defineEmits<EmitEventDataTable>();
const options = (opts: ITableOptions) => {
  $emits("refresh", opts);
};
const setField = (item: any, field: any) => {
  return item[field];
};
const table = ref();
</script>
<template>
  <VDataTableServer
    ref="table"
    :headers="(fields as [])"
    fixed-header
    :loading="loading"
    loading-text="cargando..."
    :search="search"
    :items-length="total"
    no-data-text="No hay registros"
    @update:options="options"
    :items-per-page="perPage"
    :items="items"
    :page="currentPage"
  >
    <template
      v-for="header in fields"
      v-slot:[`item.${header.key}`]="{ item }: IRowTable<T>"
    >
      <slot :name="header.key" :item="item">
        {{ setField(item, header.key) }}
      </slot>
    </template>
  </VDataTableServer>
</template>
