<script setup lang="ts">
import {
  PackagingForm,
  PackagingModel,
} from "@/@app/inventory/packaging/IPackagingContracts";
import PackagingService from "@/@app/inventory/packaging/PackagingService";
import { EmitEvents, IModal } from "@/@core/contracts/IModal";
import { VForm } from "vuetify/components";

const { modal } = defineProps<IModal<PackagingModel>>();
const emits = defineEmits<EmitEvents<PackagingModel>>();
const formPacking = ref<InstanceType<typeof VForm>>();
const close = () => {
  emits("update:modal", {
    show: false,
    item: undefined,
    loading: false,
    title: modal.title,
  });
};
const form = ref<PackagingForm>({
  description: "",
});
const save = async () => {
  try {
    if (await !formPacking.value?.validate())
      throw new Error("Ingrese los campos requeridos");
    let result;
    if (modal.item?.id) {
      result = await PackagingService.update(form.value, modal.item?.id ?? 0);
    } else {
      result = await PackagingService.register(form.value);
    }
    notifySuccess(result.message);
    close();
    emits("reload", result.response);
  } catch (ex: any) {
    notifyError(ex.message);
  }
};
watch(
  () => modal.item,
  (value) => {
    if (value) {
      form.value.description = value.description;
    }
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <FormDialog
    :title="modal.title"
    :loading="modal.loading"
    :show="modal.show"
    @close="close"
  >
    <template #content>
      <VForm
        lazy-validation
        ref="formPacking"
        @submit.prevent="save"
        id="formularioPacking"
      >
        <VRow>
          <VCol cols="12">
            <VTextField
              v-model="form.description"
              label="Descripcion"
              placeholder="Nombre"
              :rules="[requiredValidator]"
            />
          </VCol>
        </VRow>
      </VForm>
    </template>
    <template #actions>
      <VBtn type="submit" form="formularioPacking">
        {{ modal.item?.id ? "EDITAR" : "Guardar" }}
      </VBtn>
    </template>
  </FormDialog>
</template>
