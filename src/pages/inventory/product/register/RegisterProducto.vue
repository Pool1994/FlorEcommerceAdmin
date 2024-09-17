<script setup lang="ts">
import ImageProduct from "@/views/pages/inventory/products/components/ImageProduct.vue";
import ProductFields from "@/views/pages/inventory/products/components/ProductFields.vue";
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
          <v-row>
            <v-col cols="12" md="8">
              <ProductFields />
            </v-col>
            <v-col cols="12" md="4">
              <ImageProduct />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
