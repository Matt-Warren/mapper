<template>
  <v-navigation-drawer permanent app light :stateless="newLocationDialog" class="navDrawer">
    <v-toolbar flat>
      <v-list>
        <v-list-tile class="pt-0">
          <v-list-tile-title class="title">
            Locations
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0 locations-list" style="flex:1">
      <v-divider></v-divider>
      <v-list-tile v-for="location in locations" :key="location.id" @click="highlightZone(location.name)">
        <v-list-tile-avatar>
          <v-icon v-if="location.type == 'area'">photo_size_select_small</v-icon>
          <v-icon v-else-if="location.type == 'pin'">pin_drop</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ location.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-expansion-panel expand class="locationAdder">
      <v-expansion-panel-content>
        <div slot="header">Add a Location</div>
        <v-card class="addLocation">
          <v-text-field name="newLocation" label="Location Name" id="newLocation" color="success" required v-model="newLocationName"></v-text-field>
          <v-icon v-if="pinSelected" large @click.stop="selectPin()" color="green darken-2">pin_drop</v-icon>
          <v-icon v-else-if="!pinSelected" large @click.stop="selectPin()" color="default">pin_drop</v-icon>

          <v-icon v-if="areaSelected" large @click.stop="selectArea()" color="green darken-2">photo_size_select_small</v-icon>
          <v-icon v-else-if="!areaSelected" large @click.stop="selectArea()" color="default">photo_size_select_small</v-icon>

          <v-btn color="success" left @click.stop="addNewLocation()">Add Location</v-btn>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'LocationList',
  components: {
  },
  data () {
    return {
      newLocationDialog: false,
      pinSelected: false,
      areaSelected: true,
      newLocationName: null,
      locations: []
    }
  },
  methods: {
    highlightZone (locationName) {
      console.log(locationName)
    },
    selectPin () {
      console.log('Pin Selected')
      this.$data.areaSelected = false
      this.$data.pinSelected = !this.$data.pinSelected
    },
    selectArea () {
      console.log('Area Selected')
      this.$data.pinSelected = false
      this.$data.areaSelected = !this.$data.areaSelected
    },
    addNewLocation () {
      console.log('new location:' + this.$data.newLocationName)
      let newName = this.$data.newLocationName
      let newType = null
      if (this.$data.pinSelected) {
        newType = 'pin'
      } else if (this.$data.areaSelected) {
        newType = 'area'
      }

      let newId = this.$data.locations.length + 1
      this.$data.locations.push({id: newId, name: newName, type: newType})
      this.$data.locations.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
  }
}
</script>

<style scoped>
.addLocation {
  margin: 10px
}
.navDrawer {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.locations-list {
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
}
.navigation-drawer {
  padding: 0;
}
</style>
