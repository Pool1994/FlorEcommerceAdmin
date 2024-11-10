<script setup lang="ts">
import { IDetailPresentationProduct } from "@/@app/inventory/products/IProductoContract";
import draggable from "vuedraggable";
import { VForm } from "vuetify/components";
import { useProductForm } from "../store/productAddOrEditStore";
const store = useProductForm();
const $props = defineProps<{
  edit?: boolean;
}>();
const $emit = defineEmits<{
  (e: "details", item: Array<IDetailPresentationProduct>): void;
}>();
const formDetailPresentation = ref<VForm>();
const details = ref<IDetailPresentationProduct[]>([]);
const unidadMedida = computed(() => {
  const id = store.form.presentation_base_id;
  return store.packagings.find((item) => item.id === id)?.description?.toUpperCase();
});
const presentationsIdDetails = computed(() =>
  details.value
    .filter((item) => item.presentation_id !== null)
    .flatMap((item) => item.presentation_id)
);
watch(
  () => store.form.presentations,
  (value) => {
    if (!!$props.edit) {
      details.value = value;
    }
  },
  { deep: true }
);

const reorder = () => {
  const newValue = details.value.map((item, index) => ({ ...item, order: index + 1 }));
  $emit("details", newValue);
};
const addDetail = () => {
  const id_base = store.form.presentation_base_id;
  let presentation_id = null;
  let presentations: any = [];
  if (details.value.length === 0) {
    presentation_id = id_base as any;
    presentations = store.packagings;
  } else {
    presentations = store.packagings.filter(
      (item) => !presentationsIdDetails.value.includes(item.id)
    );
  }
  details.value.push({
    presentation_id,
    conversion_factor: null as any,
    price: null as any,
    unite_price: null as any,
    product_id: 0,
    presentations,
    order: details.value.length + 1,
  });
};
const deleteDetail = async (id: number, index: number) => {
  try {
    details.value.splice(index, 1);
  } catch (e: any) {
    notifyError(e.message);
  }
};
const KeyDown = (e: KeyboardEvent) => {
  if (e.key === "F8") {
    e.preventDefault();
    e.stopPropagation();
    addDetail();
  }
};
const calculateImporte = (
  item: IDetailPresentationProduct,
  type: "PRICE" | "UNITE" | "QUANTITY"
) => {
  let unit_price = Number(item.unite_price);
  let price = Number(item.price);
  let quantity = Number(item.conversion_factor);

  switch (type) {
    case "PRICE":
      item.unite_price = price / quantity;
      break;
    case "UNITE":
      item.price = unit_price * quantity;
      break;
    case "QUANTITY":
      if (price > 0) {
        item.unite_price = price / quantity;
      } else if (unit_price > 0) {
        item.price = unit_price * quantity;
      } else {
        item.unite_price = 0;
      }
      break;
  }
};
const onEnd = (event: any) => {
  reorder();
};

watch(details.value, (value) => {
  reorder();
});
onMounted(() => {
  document.addEventListener("keydown", KeyDown);
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
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <AppTextField
            label="Costo Unitario"
            placeholder="0.00"
            type="number"
            :rules="[requiredValidator]"
            v-model="store.form.unit_price"
          >
            <template #append>
              <v-icon icon="tabler-exclamation-circle" size="30"></v-icon>
              <span class="ml-1">{{ unidadMedida }}</span>
            </template>
          </AppTextField>
        </v-col>
        <v-col cols="12" md="8" v-if="unidadMedida">
          <VBtn @click="addDetail" class="float-right">Nuevo Precio(F8)</VBtn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-table density="compact" class="pb-5 table-presentation">
      <thead>
        <tr>
          <th class="text-left">Presentación</th>
          <th class="text-center">Cantidad</th>
          <th class="text-center">S/. Unitario</th>
          <th class="text-center">S/. de Venta</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <template v-if="details.length > 0">
        <draggable
          v-model="details"
          tag="tbody"
          @end="onEnd"
          handle=".handle-drag"
          item-key="order"
        >
          <template #item="{ element, index }">
            <tr>
              <td>
                <div class="py-2" v-if="element.product_id === 0">
                  <AppAutocomplete
                    :items="element.presentations"
                    item-title="description"
                    item-value="id"
                    v-model="element.presentation_id"
                    :rules="[requiredValidator]"
                    hide-details
                  ></AppAutocomplete>
                </div>
                <template v-else>
                  {{ element.presentation }}
                </template>
              </td>
              <td class="text-center">
                <div class="py-2" v-if="element.product_id === 0">
                  <AppTextField
                    type="number"
                    placeholder="0.00"
                    :rules="[requiredValidator]"
                    v-model="element.conversion_factor"
                    @keyup="calculateImporte(element, 'QUANTITY')"
                  ></AppTextField>
                </div>
                <template v-else>{{ element.conversion_factor }}</template>
              </td>
              <td class="text-center">
                <div class="py-2" v-if="element.product_id === 0">
                  <AppTextField
                    type="number"
                    placeholder="0.00"
                    :rules="[requiredValidator]"
                    v-model="element.unite_price"
                    prepend-inner-icon="tabler-cash-banknote"
                    @keyup="calculateImporte(element, 'UNITE')"
                  ></AppTextField>
                </div>
                <template v-else>{{ formatMoney(element.unite_price) }}</template>
              </td>
              <td class="text-center">
                <div class="py-2" v-if="element.product_id === 0">
                  <AppTextField
                    type="number"
                    placeholder="0.00"
                    :rules="[requiredValidator]"
                    v-model="element.price"
                    prepend-inner-icon="tabler-cash-banknote"
                    @keyup="calculateImporte(element, 'PRICE')"
                  ></AppTextField>
                </div>
                <template v-else>{{ formatMoney(element.price) }}</template>
              </td>
              <td class="text-center">
                <v-btn
                  icon="tabler-arrows-down-up"
                  size="small"
                  variant="text"
                  class="handle-drag"
                  color="success"
                ></v-btn>
                <v-btn
                  v-if="element.product_id === 0"
                  @click="deleteDetail(element.presentation_id || 0, index)"
                  color="error"
                  variant="text"
                  size="small"
                  icon="tabler-trash"
                >
                </v-btn>
              </td>
            </tr>
          </template>
        </draggable>
      </template>
      <template v-else>
        <tbody>
          <tr>
            <td colspan="4" class="text-center">No hay presentaciones</td>
          </tr>
        </tbody>
      </template>
    </v-table>
  </v-card>
</template>
<style lang="scss">
.table-presentation {
  tr {
    th:nth-child(1) {
      width: 30.333333%;
    }
    th:nth-child(2),
    th:nth-child(3),
    th:nth-child(4) {
      width: 20%;
    }
    th:last-child {
      width: 9.666667%;
    }
  }
}
</style>
