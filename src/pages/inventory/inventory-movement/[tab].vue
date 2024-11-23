<script setup lang="ts">
import { ITabs } from "@/@app/shared/IShared";
import EntrieView from "@/views/pages/inventory/inventory-movement/lists/entries/EntrieView.vue";
import ExitView from "@/views/pages/inventory/inventory-movement/lists/exit/ExitView.vue";
import PurchaseView from "@/views/pages/inventory/inventory-movement/lists/purchase/PurchaseView.vue";
import SaleView from "@/views/pages/inventory/inventory-movement/lists/sale/SaleView.vue";

const route = useRoute("inventory-inventory-movement-tab");
const tab = computed({
  get: () => route.params.tab,
  set: () => route.params.tab,
});
const currentTab = ref("entries");
const tabs = ref<Array<ITabs>>([
  {
    title: "Entradas",
    tab: "entries",
    icon: "tabler-corner-left-down",
  },
  {
    title: "Salidas",
    tab: "exits",
    icon: "tabler-corner-left-up",
  },
  {
    title: "Ventas",
    tab: "sales",
    icon: "tabler-cash",
  },
  {
    title: "Compras",
    tab: "shopping",
    icon: "tabler-shopping-cart",
  },
]);
const tabItemContent = "croissant.";
</script>
<template>
  <VCard>
    <VTabs v-model="currentTab" density="compact">
      <VTab
        v-for="(item, index) in tabs"
        :key="index"
        :to="{
          name: 'inventory-inventory-movement-tab',
          params: {
            tab: item.tab,
          },
        }"
      >
        <v-icon :icon="item.icon"></v-icon>
        <span>{{ item.title }}</span>
      </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem value="entries">
          <EntrieView v-if="tab === 'entries'" />
        </VWindowItem>
        <VWindowItem value="exits">
          <ExitView v-if="tab === 'exits'" />
        </VWindowItem>
        <VWindowItem value="sales">
          <SaleView v-if="tab === 'sales'" />
        </VWindowItem>
        <VWindowItem value="shopping">
          <PurchaseView v-if="tab === 'shopping'" />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
