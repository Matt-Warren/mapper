<template>
  <v-dialog v-model="show" lazy persistent max-width="60%">
    <v-toolbar tabs>
      <v-toolbar-title>Map Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="error" @click.stop="cancel()">Cancel</v-btn>
      <v-btn color="success" @click.stop="saveDetails()">Save</v-btn>
      <v-tabs centered slot="extension" v-model="tabs">
        <v-tab :key="1">Description</v-tab>
        <v-tab :key="2">Encounter Table</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" height="800px">
      <v-tab-item :key="1">
        <v-card flat height="600px" class="tab-card elevation-10">
          <v-text-field multi-line no-resize rows="22" color="accent">
          </v-text-field>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="2">
        <v-card flat height="600px" class="tab-card">
          <encounter-table :encTable="encTable"></encounter-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>
</template>

<script>
import EncounterTable from './EncounterTable'
export default {
  name: 'MapDetails',
  components: {
    EncounterTable
  },
  props: {
    visible: Boolean,
    description: String,
    encTable: Array
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }

  },
  data () {
    return {
      tabs: null
    }
  },
  methods: {
    saveDetails () {
      console.log('Saving Details for Map')
      this.show = false
    },
    cancel () {
      console.log('Cancel Saving Details for Map')
      this.show = false
    }
  }
}
</script>

<style scoped>
.tab-card {
  padding: 10px;
}
</style>
