<script setup lang="ts">
import { IContainerImage } from "@/@app/inventory/products/IProductoContract";
import { EmitEvents, IModal } from "@/@core/contracts/IModal";
import { useProductForm } from "../store/productAddOrEditStore";
type typeActions = "ADD" | "SELECT" | "DELETE" | "FAVORITE";
const props = defineProps<IModal<string>>();
const emits = defineEmits<EmitEvents<string>>();
const imageSelectedIndex = ref(0);
const listImages = ref<Array<IContainerImage>>([]);
const imageSelected = computed(() => listImages.value.find((item) => item.selected));
const store = useProductForm();
const closeModal = () => {
  emits("update:modal", { ...props.modal, show: false });
};
const saveImages = () => {
  try {
    localStorage.setItem("gallery-images", JSON.stringify(listImages.value));
    store.form.images = [];
    listImages.value
      .filter((item) => item.hasImage)
      .forEach((item) => {
        const { favorite, urlImage, image } = item;
        store.form.images.push({
          image_url: urlImage as string,
          is_favorite: favorite as boolean,
          image,
        });
      });
    if (imageSelected.value) {
      const { favorite, urlImage } = imageSelected.value;
      store.form.photo = favorite ? urlImage : store.form.photo;
    } else {
      store.form.photo = "";
    }
    closeModal();
  } catch (e: any) {
    notifyError(e.message);
  }
};
const galleryActions = (actions: typeActions, item: IContainerImage, index: number) => {
  switch (actions) {
    case "ADD":
      break;
    case "SELECT":
      if (item.plus) {
        openDialogFiles();
      } else {
        if (item.hasImage) {
          listImages.value = listImages.value.map((item, i) => ({
            ...item,
            selected: index === i,
          }));
        }
      }
      imageSelectedIndex.value = index;
      break;
    case "DELETE":
      if (listImages.value.length <= 7) {
        if (listImages.value[index]) {
          listImages.value[index].hasImage = false;
          listImages.value[index].image = undefined;
          listImages.value[index].urlImage = undefined;
        }
      } else {
        listImages.value.splice(index, 1);
      }
      updateImages();
      break;
    case "FAVORITE":
      listImages.value = listImages.value.map((item, i) => ({
        ...item,
        favorite: i === index,
      }));
      break;
  }
};
const openDialogFiles = () => {
  const inputFile = document.getElementById("upload--img") as HTMLInputElement;
  inputFile.click();
};
const uploadImage = async (event: Event) => {
  try {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const images = Array.from(target.files);
    console.log(images);
    images.forEach((file, index) => {
      setImagesFile(file);
    });
    selectedImageByDefault();
  } catch (e: any) {
    notifyError(e.message);
  }
};
const setImagesFile = (file: File, is_favorite = false) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const url = e.target?.result as string;
    const blob = await urlToBlob(url);
    /** buscamos imagenes */
    const emptyIndex = listImages.value.findIndex((item) => !item.hasImage);
    if (emptyIndex !== -1) {
      listImages.value[emptyIndex].urlImage = URL.createObjectURL(blob);
      listImages.value[emptyIndex].hasImage = true;
      listImages.value[emptyIndex].plus = false;
      listImages.value[emptyIndex].image = file;
      listImages.value[emptyIndex].favorite = is_favorite;
      listImages.value[emptyIndex].selected = is_favorite;

      const nextIndex = emptyIndex + 1;
      if (nextIndex < listImages.value.length) {
        listImages.value[nextIndex].plus = true;
      } else {
        listImages.value.push({
          plus: true,
        });
      }
      listImages.value.forEach((item, index) => {
        if (index !== nextIndex) {
          item.plus = false;
        }
      });
    }
  };
  reader.readAsDataURL(file);
}
const selectedImageByDefault = () => {
  /** seleccionamos una imagen */
  if (listImages.value.length > 0) {
    const totalSelected = listImages.value.filter((item) => item.selected).length;
    if (totalSelected === 0) {
      const index = 0;
      listImages.value[index].selected = true;
      listImages.value[index].favorite = true;
      imageSelectedIndex.value = index;
    }
  }

}
const updateImages = () => {
  listImages.value = listImages.value.map((item) => ({
    ...item,
    plus: false,
    selected: false,
    favorite: false,
  }));
  const withImages = listImages.value.filter((item) => item.hasImage);
  const withoutImages = listImages.value.filter((item) => !item.hasImage);
  listImages.value = [...withImages, ...withoutImages];
  if (withoutImages.length > 0) {
    listImages.value[withImages.length].plus = true;
  }
  const firstWithImageIndex = listImages.value.findIndex((item) => item.hasImage);
  if (firstWithImageIndex !== -1) {
    imageSelectedIndex.value = firstWithImageIndex;
    listImages.value[firstWithImageIndex].selected = true;
    listImages.value[firstWithImageIndex].favorite = true;
  }
};
const urlToBlob = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};
const setDefault = () => {
  if (localStorage.getItem("gallery-images")) {
    const images = JSON.parse(
      localStorage.getItem("gallery-images") as string
    ) as Array<IContainerImage>;
    listImages.value = images.map((item) => ({ ...item, selected: item.favorite }));
  } else {
    for (let i = 0; i < 7; i++) {
      listImages.value.push({
        plus: i === 0,
      });
    }
  }
};
const setClass = (item: IContainerImage) => {
  let className = "xxx";
  if (item.selected) {
    className = className.concat(" selected");
  }
  if (item.plus) {
    className = className.concat(" plus");
  }
  if (item.hasImage) {
    className = className.concat(" has-image");
  }
  return className;
};

watch(
  () => store.formEdit?.images,
  (value) => {
    if (value && value.length > 0) {
      let storageImages =  localStorage.getItem("gallery-images");
      if(storageImages) return;
      value.forEach(async (item, index) => {
        const { data } = await $axiosIns.post(
          `/download/product-image`,
          {
            path: item.image_url,
          },
          {
            responseType: "blob",
          }
        );
        const file = new File([data], `image${index}`, { type: "image/png" });
        setImagesFile(file, item.is_favorite);
      });
      selectedImageByDefault();
    }
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  setDefault();
});
</script>
<template>
  <FormDialog v-model:show="modal.show" :title="modal.title" @close="closeModal" :width="600" class="main-gallery">
    <template #card-text>
      <v-card-text class="py-2">
        <div class="upload--container">
          <div class="item">
            <v-icon icon="tabler-photo" size="45"></v-icon>
          </div>
          <div class="item">
            <span class="d-block">
              <strong>Imágenes del producto </strong>
            </span>
            <small class="d-block">Agrega imágenes de referencia para tu producto</small>
          </div>
          <div class="item">
            <v-btn @click="openDialogFiles()">
              <v-icon icon="tabler-photo-up" class="mr-1"></v-icon>
              Subir imagen
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
    </template>
    <template #content>
      <div class="container--gallery">
        <div class="image">
          <template v-if="imageSelected">
            <div class="image-options">
              <v-btn size="small" variant="elevated" color="secondary"
                @click="galleryActions('FAVORITE', imageSelected, imageSelectedIndex)">
                <v-icon :icon="imageSelected.favorite ? 'tabler-star-filled' : 'tabler-star'" size="20"
                  color="success"></v-icon>
                <span class="d-block">Favorito</span>
              </v-btn>
              <v-btn size="small" v-bind="props" variant="elevated" class="py-1" color="secondary"
                @click="galleryActions('DELETE', imageSelected, imageSelectedIndex)">
                <v-icon icon="tabler-trash" size="18"></v-icon>
              </v-btn>
            </div>
            <img :src="imageSelected.urlImage" alt="Imagen seleccionada" />
          </template>
          <v-icon icon="tabler-camera-plus" size="65" v-if="!imageSelected"></v-icon>
        </div>
        <div class="images-list mt-2" :style="{ gridTemplateColumns: `repeat(${listImages.length}, 1fr)` }">
          <template v-for="(item, index) in listImages" :key="index">
            <div class="image-container" :class="setClass(item)" @click="galleryActions('SELECT', item, index)">
              <div class="background-container" :style="{ backgroundImage: `url(${item.urlImage})` }"></div>
              <template v-if="item.plus">
                <v-icon icon="tabler-plus" size="25"></v-icon>
              </template>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template #actions>
      <v-btn @click="saveImages">Guardar</v-btn>
    </template>
  </FormDialog>
  <input type="file" id="upload--img" class="d-none" accept="image/png, image/jpeg, image/webp" @change="uploadImage"
    multiple />
</template>
<style lang="scss" scoped>
.main-gallery {
  .upload--container {
    display: flex;

    .item:nth-child(2) {
      flex-grow: 2;
      padding: 0px 10px;
    }
  }

  .container--gallery {
    .image {
      position: relative;
      height: 15.625rem;
      border: 2px dashed #e9e9e9;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: contain;
      background-repeat: no-repeat;

      img {
        max-width: 27.625rem;
        max-height: 15.25rem;
        width: auto;
      }

      .image-options {
        position: absolute;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        top: 10px;
        right: 10px;

        .v-btn {
          margin-inline-end: 10px;
        }
      }
    }

    .images-list {
      display: grid;
      overflow-y: auto;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 5px;
      width: 100%;

      .image-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 4.375rem;
        max-width: 4.375rem;
        height: 4.375rem;
        border-radius: 0.25rem;
        border: 3px solid transparent;
        background-color: #1d1f2e1c;

        .background-container {
          position: absolute;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: contain;
          border-radius: 0.25rem;
          width: calc(100% - 0.1875rem);
          height: calc(100% - 0.1875rem);
        }
      }

      .image-container.plus {
        background: transparent;
        border: 2px solid #ccc;
      }

      .image-container.plus:hover {
        border-color: #00b19e;
        color: #00b19e;
        cursor: pointer;
      }

      .image-container.has-image {
        cursor: pointer;
      }

      .image-container.selected {
        border: 3px solid #e6e6e6;
      }
    }
  }
}
</style>
