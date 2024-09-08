<script setup lang="ts">
import BrandService from "@/@app/inventory/brand/BrandService";
import { BrandForm, BrandModel } from "@/@app/inventory/brand/IBrandContracts";
import { EmitEvents, IModal } from "@/@core/contracts/IModal";
import { VForm } from "vuetify/components";

const { modal } = defineProps<IModal<BrandModel>>();
const emits = defineEmits<EmitEvents<BrandModel>>();
const formBrand = ref<InstanceType<typeof VForm>>();
const close = () => {
  emits("update:modal", {
    show: false,
    item: undefined,
    loading: false,
    title: modal.title,
  });
};
const form = ref<BrandForm>({
  name: "",
  description: "",
});
const save = async () => {
  try {
    if (await !formBrand.value?.validate())
      throw new Error("Ingrese los campos requeridos");
    let result;
    if (modal.item?.id) {
      result = await BrandService.update(form.value, modal.item?.id ?? 0);
    } else {
      result = await BrandService.register(form.value);
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
      form.value.name = value.name;
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
      <VForm lazy-validation ref="formBrand" @submit.prevent="save" id="formularioBrand">
        <VRow>
          <VCol cols="12">
            <VTextField
              v-model="form.name"
              label="Nombre"
              placeholder="Nombre"
              :rules="[requiredValidator, alphaValidatorSpace]"
            />
          </VCol>
          <VCol cols="12">
            <VTextarea
              rows="3"
              v-model="form.description"
              label="Descripción"
              placeholder="Descripción"
              no-resize
            />
          </VCol>
        </VRow>
      </VForm>
    </template>
    <template #actions>
      <VBtn type="submit" form="formularioBrand">
        {{ modal.item?.id ? "EDITAR" : "Guardar" }}
      </VBtn>
    </template>
  </FormDialog>
</template>
