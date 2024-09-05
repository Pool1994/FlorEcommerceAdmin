<script setup lang="ts">
const category = async() => {
  try{
    const {data} = await $axiosIns.get('/category/list');
    console.log(data);
  }catch(err){
    console.error(err)
  }
}
</script>
<template>
  <VBtn @click="category"></VBtn>
</template>
