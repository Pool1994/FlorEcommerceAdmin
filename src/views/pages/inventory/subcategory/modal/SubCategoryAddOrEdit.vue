<script setup lang="ts">
import CategoryService from "@/@app/inventory/category/CategoryService";
import { CategoryModel } from "@/@app/inventory/category/ICategoryContracts";
import {
  SubCategoryForm,
  SubCategoryModel,
} from "@/@app/inventory/subcategory/ISubCategoryContracts";
import SubCategoryService from "@/@app/inventory/subcategory/SubCategoryService";
import { EmitEvents, IModal, ModalProps } from "@/@core/contracts/IModal";
import { VForm } from "vuetify/components";
import CategoryAddOrEdit from "../../category/modal/CategoryAddOrEdit.vue";

const { modal } = defineProps<IModal<SubCategoryModel>>();
const emits = defineEmits<EmitEvents<SubCategoryModel>>();
const formSubCategory = ref<InstanceType<typeof VForm>>();
const categories = ref<Array<{ id: number; text: string }>>([]);
const modalCategory = ref<ModalProps<CategoryModel>>({
  show: false,
  title: "Agregar Categoria",
  item: undefined,
  loading: false,
});
const close = () => {
  emits("update:modal", {
    show: false,
    item: undefined,
    loading: false,
    title: modal.title,
  });
};
const form = ref<SubCategoryForm>({
  name: "",
  description: "",
  category_id: null as any,
});
const save = async () => {
  try {
    if (await !formSubCategory.value?.validate())
      throw new Error("Ingrese los campos requeridos");
    let result;
    if (modal.item?.id) {
      result = await SubCategoryService.update(form.value, modal.item?.id ?? 0);
    } else {
      result = await SubCategoryService.register(form.value);
    }
    notifySuccess(result.message);
    close();
    emits("reload", result.response);
  } catch (ex: any) {
    notifyError(ex.message);
  }
};
const getCategories = async () => {
  try {
    const result = await CategoryService.getCategories();
    categories.value = result;
  } catch (ex: any) {
    notifyError(ex.message);
  }
};
const reloadCategory = (item: CategoryModel) => {
  categories.value.push({ id: item.id, text: item.name });
  form.value.category_id = item.id;
};
watch(
  () => modal.item,
  (value) => {
    if (value) {
      form.value.name = value.name;
      form.value.description = value.description;
      form.value.category_id = value.category_id;
    }
  },
  { deep: true, immediate: true }
);
getCategories();
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
        ref="formSubCategory"
        @submit.prevent="save"
        id="formSubCategory"
      >
        <VRow>
          <VCol cols="12">
            <AppAutocomplete
              :items="categories"
              item-title="text"
              item-value="id"
              label="Categoria"
              v-model="form.category_id"
            >
              <template #append>
                <VBtn @click="modalCategory.show = true">
                  <VIcon icon="tabler-plus" size="25"></VIcon>
                </VBtn>
              </template>
            </AppAutocomplete>
          </VCol>
          <VCol cols="12">
            <AppTextField
              v-model="form.name"
              label="Nombre"
              placeholder="Nombre"
              :rules="[requiredValidator, alphaValidatorSpace]"
            />
          </VCol>
          <VCol cols="12">
            <AppTextarea
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
      <VBtn type="submit" form="formSubCategory">
        {{ modal.item?.id ? "EDITAR" : "Guardar" }}
      </VBtn>
    </template>
  </FormDialog>
  <CategoryAddOrEdit
    v-if="modalCategory.show"
    v-model:modal="modalCategory"
    @reload="reloadCategory"
  />
</template>
