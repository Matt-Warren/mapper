<template>
  <v-layout wrap style="height: 200px;">
    <v-container>
      asdfasdf
      <image-uploader></image-uploader>

    </v-container>
    <location-list></location-list>
    <map-details :visible="showMapDetails"  :description="description" :encTable="encTable" @close="showMapDetails = false"></map-details>
    <v-btn
        fab
        @click.stop="showMapDetails = true"
        small
        color="blue accent-2"
        dark
        right
        top
        class="floating"
      >
        <v-icon large>info_outline</v-icon>
      </v-btn>
  </v-layout>
</template>

<script>
import LocationList from './LocationList'
import MapDetails from './MapDetails'
import ImageUploader from './ImageUploader'
const desc = 'hello world'
const encTbl = [
  { roll: 1, encounter: 'Nothing' },
  { roll: 2, encounter: '4 Kobolds' },
  { roll: 3, encounter: '2 Horses' },
  { roll: 4, encounter: '3 Goblins' }
]
export default {
  name: 'Map',
  components: {
    LocationList,
    MapDetails,
    ImageUploader
  },
  data () {
    return {
      showMapDetails: false,
      description: desc,
      encTable: encTbl
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.floating {
  position: relative;
}
</style>
