<script lang="ts" setup>
interface Modal {
  show: boolean;
  title: string;
  width?: number;
  loading?: boolean;
  customClass?: string;
  hideBtnClose?: boolean;
  scrollable?: boolean;
  hideActions?: boolean;
}
const $props = defineProps<Modal>();
interface Emit {
  (e: "update:show", value: boolean): void;
  (e: "close"): void;
}
const $emit = defineEmits<Emit>();
const onCancel = () => {
  $emit("update:show", false);
  $emit("close");
};
</script>
<template>
  <VDialog
    :model-value="$props.show"
    :max-width="width ? width : 600"
    persistent
    offset="v-dialog"
    :scrollable="scrollable"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click.prevent="onCancel" />
    <!-- Dialog Content -->
    <VCard :loading="loading" :disabled="loading">
      <template #title>
        <span class="font-weight-black text-uppercase">{{ title }}</span>
      </template>
      <VCardText :class="customClass">
        <slot name="content" />
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-3" v-if="!hideActions">
        <VBtn
          variant="tonal"
          color="secondary"
          @click.prevent="onCancel"
          v-if="!hideBtnClose"
        >
          Cerrar
        </VBtn>
        <slot name="actions" />
      </VCardText>
    </VCard>
  </VDialog>
</template>
