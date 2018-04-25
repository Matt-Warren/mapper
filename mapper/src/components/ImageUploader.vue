<template>
  <vue-clip :options="options" color="accent" style="height: '100%'">
    <template slot="clip-uploader-action">
      <v-card height="100%" class="pt-5">
        <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
      </v-card>
    </template>

    <template slot="clip-uploader-body" slot-scope="props">
      <div v-for="file in props.files" v-bind:key="file.dataUrl">
        <img v-bind:src="file.dataUrl" />
        {{ file.name }} {{ file.status }}
      </div>
    </template>

  </vue-clip>
</template>

<script>
export default {

  data () {
    return {
      options: {
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
      }
    }
  }

}
</script>

<style scoped>
.imageUploader {
  margin: "10px";
}
</style>
