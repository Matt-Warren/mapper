<template>
  <v-layout>
    <location-list></location-list>
    <map-content></map-content>
  </v-layout>
</template>

<script>
import LocationList from './LocationList'
import MapContent from './MapContent'

export default {
  name: 'MapView',
  components: {
    LocationList,
    MapContent
  }
}
</script>

<style scoped>

</style>
