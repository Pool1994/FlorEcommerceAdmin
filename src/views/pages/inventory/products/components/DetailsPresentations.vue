<script setup lang="ts">
import { IDetailPresentationProduct } from "@/@app/inventory/products/IProductoContract";
import { VForm } from "vuetify/components";
import { useProductForm } from "../store/productAddOrEditStore";
const store = useProductForm();
const $props  = defineProps<{
  edit?:boolean
}>();
const $emit = defineEmits<{
  (e: "details", item: Array<IDetailPresentationProduct>): void;
}>();
const formDetailPresentation = ref<VForm>();
const form = ref<IDetailPresentationProduct>({
  presentation_id: null as any,
  description: null as any,
  conversion_factor: null as any,
  price: null as any,
  presentation:""
});
const details = ref<IDetailPresentationProduct[]>([]);
watch(() =>store.form.presentations,(value) =>{
  if(!!$props.edit){
    details.value = value;
  }
},{deep:true});
watch(details.value, (value) => {
  $emit("details", value);
  clear();
});
const clear = () => {
  form.value = {
    presentation_id: null as any,
    description: null as any,
    conversion_factor: null as any,
    price: null as any,
    presentation: ""
  };
};
const addDetail = async () => {
  try {
    const validForm = await formDetailPresentation.value?.validate();
    if (!validForm?.valid) return;
    const exist = details.value.find(
      (i) => i.presentation_id == form.value.presentation_id
    );
    if (exist) throw new Error("Presentación ya existe");
    form.value.presentation =  store.packagings.find((i) => i.id == form.value.presentation_id)?.description as string;
    details.value.push(JSON.parse(JSON.stringify(form.value)));
  } catch (e: any) {
    notifyError(e.message);
  }
};
const deleteDetail = async (id: number) => {
  try {
    const index = details.value.findIndex((i) => i.presentation_id == id);
    if (index !== -1) {
      details.value.splice(index, 1);
    }
  } catch (e: any) {
    notifyError(e.message);
  }
};
onMounted(() => {
  store.getPackagings();
});
</script>
<template>
  <v-card>
    <v-card-title>
      <h5 class="text-uppercase">Detalle de presentaciones</h5>
      <h5 class="text-secondary">
        Personaliza las presentaciones de tu producto según cómo lo quieras vender.
      </h5>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="!(!!edit)">
      <v-form lazy-validation ref="formDetailPresentation">
        <v-row>
          <v-col cols="12" md="12">
            <AppTextField
              label="Descripcion"
              placeholder="ingrese una descripcion ejemplo: sabor fresa"
              v-model="form.description"
            ></AppTextField>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <AppSelect
              label="Presentación"
              :items="store.packagings"
              item-title="description"
              item-value="id"
              v-model="form.presentation_id"
              :rules="[requiredValidator]"
              hide-details
            ></AppSelect>
          </v-col>
          <v-col cols="12" md="3">
            <AppTextField
              label="Cantidad Unitaria"
              type="number"
              placeholder="0.00"
              :rules="[requiredValidator]"
              v-model="form.conversion_factor"
            ></AppTextField>
          </v-col>
          <v-col cols="12" md="3">
            <AppTextField
              label="Precio"
              type="number"
              placeholder="0.00"
              :rules="[requiredValidator]"
              v-model="form.price"
            ></AppTextField>
          </v-col>
          <v-col cols="12" md="2" class="">
            <v-btn block class="mt-5" @click="addDetail">
              <v-icon icon="tabler-plus"></v-icon>
              Agregar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-item>
      <v-table density="compact">
        <thead>
          <tr>
            <th>Presentación</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th v-if="!(!!edit)">Accion</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="details.length > 0">
            <tr v-for="item in details" :key="item.presentation_id">
              <td>
                {{
                 item.presentation
                }}
              </td>
              <td>{{ item.description || "-" }}</td>
              <td>{{ item.conversion_factor }}</td>
              <td>{{ formatMoney(item.price) }}</td>
              <td v-if="!(!!edit)">
                <v-btn
                  @click="deleteDetail(item.presentation_id)"
                  color="error"
                  variant="text"
                  size="small"
                >
                  <v-icon icon="tabler-trash" size="small"></v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">No hay presentaciones</td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>
