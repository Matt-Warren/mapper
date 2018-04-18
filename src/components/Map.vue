<template>
  <v-layout wrap style="height: 200px;">
    <v-container>
      asdfasdf
      <image-uploader></image-uploader>
    </v-container>
    <location-list></location-list>
  </v-layout>
</template>

<script>
import LocationList from './LocationList'
import ImageUploader from './ImageUploader'
export default {
  name: 'Map',
  components: {
    LocationList,
    ImageUploader
  }
}
</script>

<style scoped>

</style>
