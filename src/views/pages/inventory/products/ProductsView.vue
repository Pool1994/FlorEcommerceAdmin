<script setup lang="ts"></script>
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
  </Filter>
</template>
