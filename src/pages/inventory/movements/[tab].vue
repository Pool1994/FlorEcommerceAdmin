<script setup lang="ts">
import { ITabs } from '@/@app/shared/IShared';


const route = useRoute('inventory-movements-tab');
const tab = computed(({
    get:() => route.params.tab,
    set:() => route.params.tab
}));
const currentTab = ref('entries');
const tabs = ref<Array<ITabs>>([
  {
    title:'Entradas',
    tab:'entries',
    icon:'tabler-corner-left-down'
  },
  {
    title:'Salidas',
    tab:'exits',
    icon:'tabler-corner-left-up'
  }
]);
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'
</script>
<template>

<VCard>
    <VTabs v-model="currentTab">
      <VTab v-for="(item,index) in tabs"  :key="index" :to="{
        name: 'inventory-movements-tab',
        params:{
          tab:item.tab
        }
      }">
      <v-icon :icon="item.icon"></v-icon> 
      <span>{{item.title}}</span>
    </VTab>
    </VTabs>

    <VCardText>
      <VWindow v-model="currentTab">
        <VWindowItem
          value="entries"
        >
          Entrads
        </VWindowItem>
        <VWindowItem
          value="exits"
        >
         Salidas
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
