<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="encTable"
      class="elevation-1"
      disable-initial-sort
      :rows-per-page-items="rowsPerPageItems"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.roll }}</td>
        <td>{{ props.item.encounter }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
      </template>
      <template slot="footer">

          <v-btn
            @click.native.stop="dialog = !dialog"
            small
            color="green accent-2"
            dark
            class="text-xs-right"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn
            @click.native.stop="roll()"
            small
            color="blue accent-2"
            dark
            class="text-xs-right"
          >
            <v-icon v-if="items.length == 2">mdi-coins</v-icon>
            <v-icon v-else-if="items.length == 4">mdi-dice-d4</v-icon>
            <v-icon v-else-if="items.length == 6">mdi-dice-d6</v-icon>
            <v-icon v-else-if="items.length == 8">mdi-dice-d8</v-icon>
            <v-icon v-else-if="items.length == 10">mdi-dice-d10</v-icon>
            <v-icon v-else-if="items.length == 12">mdi-dice-d12</v-icon>
            <v-icon v-else-if="items.length == 20">mdi-dice-d20</v-icon>
            <v-icon v-else>mdi-dice-multiple</v-icon>
          </v-btn>

      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Encounter" v-model="editedItem.encounter" solo autofocus></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click.native="close">Cancel</v-btn>
          <v-btn color="success" @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EncounterTable',
  props: {
    encTable: Array
  },
  data () {
    return {
      dialog: false,
      headers: [
        {
          text: 'Roll',
          value: 'roll'
        },
        {
          text: 'Encounter',
          value: 'encounter',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'name',
          sortable: false
        }
      ],
      rowsPerPageItems: [
        8
      ],
      items: this.encTable,
      editedIndex: -1,
      editedItem: {
        roll: 0,
        encounter: ''
      },
      defaultItem: {
        roll: 0,
        encounter: ''
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.roll = this.items.length + 1
        this.items.push(this.editedItem)
      }
      this.close()
    },

    roll () {
      let min = 0
      let max = this.items.length
      console.log('max:' + max)
      let roll = Math.floor((Math.random() * max) + min)
      console.log(roll + ' Encounter is: ' + this.items[roll].encounter)
    }
  }
}
</script>

<style scoped>
.floating {
  position: relative;
}
</style>
