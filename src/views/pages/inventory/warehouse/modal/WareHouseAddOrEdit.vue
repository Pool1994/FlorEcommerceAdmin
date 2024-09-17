<script setup lang="ts">
import {
  IWareHouseForm,
  UbigeoSelect,
  WareHouseModel,
} from "@/@app/inventory/warehouse/IWareHouse";
import WareHouseService from "@/@app/inventory/warehouse/WareHouseService";
import { EmitEvents, IModal } from "@/@core/contracts/IModal";
import { VForm } from "vuetify/components";

const { modal } = defineProps<IModal<WareHouseModel>>();
const emits = defineEmits<EmitEvents<WareHouseModel>>();
const formCategory = ref<InstanceType<typeof VForm>>();
const ubigeos = ref<Array<UbigeoSelect>>([]);
const close = () => {
  emits("update:modal", {
    show: false,
    item: undefined,
    loading: false,
    title: modal.title,
  });
};
const form = ref<IWareHouseForm>({
  name: "",
  description: "",
  address: "",
  ubigeo_id: "",
});
const save = async () => {
  try {
    if (await !formCategory.value?.validate())
      throw new Error("Ingrese los campos requeridos");
    let result;
    if (modal.item?.id) {
      result = await WareHouseService.update(form.value, modal.item?.id ?? 0);
    } else {
      result = await WareHouseService.register(form.value);
    }
    notifySuccess(result.message);
    close();
    emits("reload", result.response);
  } catch (ex: any) {
    notifyError(ex.message);
  }
};
const searchingUbigeo = async (value: string) => {
  try {
    const data = await WareHouseService.ubigeos(value);
    ubigeos.value = data;
  } catch (ex) {}
};
watch(
  () => modal.item,
  async (value) => {
    if (value) {
      form.value.name = value.name;
      form.value.description = value.description;
      form.value.address = value.address;
      await searchingUbigeo(value.ubigeo_id);
      form.value.ubigeo_id = value.ubigeo_id;
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
    :width="800"
  >
    <template #content>
      <VForm lazy-validation ref="formCategory" @submit.prevent="save" id="formWareHouse">
        <v-row>
          <v-col cols="12" md="6">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="form.name"
                  label="Nombre"
                  placeholder="Nombre"
                  :rules="[requiredValidator, alphaValidatorSpace]"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.address"
                  label="Direccion"
                  placeholder="direccion"
                />
              </VCol>
              <VCol cols="12">
                <AppAutocomplete
                  v-model="form.ubigeo_id"
                  :items="ubigeos"
                  item-title="name"
                  item-value="id"
                  label="Distrito"
                  placeholder="distrito"
                  :rules="[requiredValidator]"
                  @update:search="searchingUbigeo"
                />
              </VCol>
            </VRow>
          </v-col>
          <v-col cols="12" md="6">
            <AppTextarea
              label="Observaciones"
              rows="8"
              no-resize
              v-model="form.description"
            ></AppTextarea>
          </v-col>
        </v-row>
      </VForm>
    </template>
    <template #actions>
      <VBtn type="submit" form="formWareHouse">
        {{ modal.item?.id ? "EDITAR" : "Guardar" }}
      </VBtn>
    </template>
  </FormDialog>
</template>
