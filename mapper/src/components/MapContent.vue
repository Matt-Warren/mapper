<template>
  <v-content>
    <vue-clip :options="vueClipOptions" color="accent" :on-added-file="addedFile" :on-complete="fileUploaded" v-if="!mapImg">
      <template slot="clip-uploader-action" slot-scope="params">
        <v-card height="100%" v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <h2> Browse or drag and drop your map here. </h2>
        </v-card>
      </template>
    </vue-clip>
    <div v-if="mapImg" class="map" ref="map">
      <canvas
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"

        @mousedown="mousedown"
        @mouseup="mouseup"
        @mousemove="mousemove"
      >
      </canvas>

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
      <map-details :visible="showMapDetails" :description="description" :encTable="encTable" @close="showMapDetails = false"></map-details>
    </div>
  </v-content>
</template>

<script>
import MapDetails from './MapDetails'

const desc = 'hello world'
const encTbl = [
  { roll: 1, encounter: 'Nothing' },
  { roll: 2, encounter: '4 Kobolds' },
  { roll: 3, encounter: '2 Horses' },
  { roll: 4, encounter: '3 Goblins' }
]
export default {
  name: 'MapContent',
  components: {
    MapDetails
  },

  updated () {
    console.log('after update!')
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    this.drawAllNodes()
  },

  data () {
    return {
      showMapDetails: false,
      description: desc,
      encTable: encTbl,
      vueClipOptions: {
        url: 'http://localhost:8081/upload',
        paramName: 'map',
        maxFiles: {
          limit: 1,
          message: 'You can only upload 1 file.'
        },
        acceptedFiles: {
          extensions: ['image/*'],
          message: 'You are uploading an invalid file'
        }
      },
      mapImg: null,

      // Canvas Data
      mapName: 'test.png',

      canvas: {},
      context: {},
      canvasHeight: 350,
      canvasWidth: 450,

      overPoint: null,
      dragMode: false,

      pointSize: 5,
      strokeStyle: 'darkgrey',
      fillStyle: '#fff',
      points: []
    }
  },

  methods: {
    addedFile (mapImg) {
      this.$data.mapImg = mapImg
      this.$data.mapName = mapImg.name
    },

    fileUploaded (file, status, xhr) {

    },

    removePoint (index) {
      this.points.splice(index, 1)
      this.clear()
      this.drawAllNodes()
    },

    matchPoints (checkPoint, mousePoint) {
      if (mousePoint.x > checkPoint.x + this.pointSize) {
        return false
      }

      if (mousePoint.x < checkPoint.x - this.pointSize) {
        return false
      }

      if (mousePoint.y > checkPoint.y + this.pointSize) {
        return false
      }

      if (mousePoint.y < checkPoint.y - this.pointSize) {
        return false
      }

      return true
    },

    clear () {
      let mapImageLocation = 'http://localhost:8081/' + this.$data.mapName
      let mapImg = new Image
      mapImg.src = mapImageLocation
      console.log('cleared and requesting:' + mapImageLocation)
      mapImg.onload = () => {
        console.log('drawing image: ' + mapImg)
        let widthRatio = this.$refs.map.clientWidth / mapImg.width
        let heightRatio = this.$refs.map.clientHeight / mapImg.height

        let useRatio = 1.0
        if (widthRatio === heightRatio) {
          useRatio = widthRatio
        } else if (widthRatio > heightRatio) {
          useRatio = heightRatio
        } else if (widthRatio < heightRatio) {
          useRatio = widthRatio
        }

        this.$data.canvasHeight = mapImg.height * useRatio
        this.$data.canvasWidth =  mapImg.width * useRatio
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.context.drawImage(mapImg, 0, 0, this.$data.canvasWidth, this.$data.canvasHeight)

      }


    },

    clearPoints () {
      this.points = []
      this.clear()
    },

    getMousePos (evt) {
      let rect = this.context.canvas.getBoundingClientRect()
      return {
        x: parseInt((evt.clientX - rect.left) / (rect.right - rect.left) * this.canvasWidth),
        y: parseInt((evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvasHeight)
      }
    },

    mouseup (event) {
      let mouseUpPoint = this.getMousePos(event)
      if (this.dragMode && this.overPoint) {
        this.dragPoint(this.overPoint, mouseUpPoint)
        this.dragMode = false
      } else {
        this.addNode(mouseUpPoint)
      }
    },

    dragPoint (selectedPoint, newPoint) {
      this.points.map((pointToMove) => {
        if (pointToMove.x === selectedPoint.x && pointToMove.y === selectedPoint.y) {
          pointToMove.x = newPoint.x
          pointToMove.y = newPoint.y

          this.clear()
          this.drawAllNodes()
        }
      })
    },

    mousemove (event) {
      let point = this.getMousePos(event)
      // this.selectedPoint(point)
      if (this.dragMode && this.overPoint) {
        this.dragPoint(this.overPoint, point)
      }
    },

    mousedown (event) {
      let point = this.getMousePos(event)
      if (this.isMouseOnNode(point)) {
        // point selected
        this.dragMode = true
      } else {
        this.dragMode = false
      }
    },

    isMouseOnNode (point) {
      return this.selectedPoint(point) !== null
    },

    selectedPoint (point) {
      for (let iteratedPoint of this.points) {
        if (this.matchPoints(iteratedPoint, point)) {
          this.overPoint = iteratedPoint
          return iteratedPoint
        }
      }
      this.overPoint = null
      return null
    },

    addNode (point) {
      this.context.save()
      this.drawNode(point)
      this.context.restore()
      this.points.push(point)
    },

    drawNode (point) {
      this.context.beginPath()
      this.context.moveTo(point.x - this.pointSize, point.y - this.pointSize)
      this.context.lineTo(point.x - this.pointSize, point.y + this.pointSize)
      this.context.lineTo(point.x + this.pointSize, point.y + this.pointSize)
      this.context.lineTo(point.x + this.pointSize, point.y - this.pointSize)
      this.context.lineTo(point.x - this.pointSize, point.y - this.pointSize)
      this.context.fillStyle = this.fillStyle
      this.context.fill()
      this.context.strokeStyle = this.strokeStyle
      this.context.stroke()
    },

    drawAllNodes () {
      this.context.save()
      for (let point of this.points) {
        this.drawNode(point)
      }
      this.context.restore()
    }

  }
}
</script>

<style scoped>
  .upload-action.is_dragging {
    background: green;
  }
  .map {
    height: 100%;
    width: 100%;
  }
</style>
