<script setup lang="ts">
const { title, loading } = defineProps<{
  title?: string;
  loading?: boolean;
  subtitle?: string;
  search?: string;
  withoutFilters?: boolean;
  padding?: boolean;
}>();

const $emits = defineEmits<{
  (e: "update:search", value: string): void;
}>();
const searching = ref("");
const setSearch = () => {
  $emits("update:search", searching.value);
};
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card
        :title="title"
        :loading="loading"
        :subtitle="subtitle"
        :class="padding ? 'pa-0' : ''"
        :elevation="padding ? 0 : 1"
      >
        <v-card-text :class="padding ? 'pa-0' : ''">
          <v-row v-if="!withoutFilters">
            <v-col cols="4">
              <v-row>
                <v-col cols="10">
                  <AppTextField
                    placeholder="buscar..."
                    v-model="searching"
                    @keyup.enter="setSearch"
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn block @click="setSearch">
                    <v-icon icon="tabler-search" size="25"></v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8" class="d-flex align-end justify-end">
              <slot name="others" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <slot name="table"></slot>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
