<template>
  <vue-clip :options="options" color="accent">
    <template slot="clip-uploader-action">
      <div>
        <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
      </div>
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
        url: '/upload',
        paramName: 'file'
      }
    }
  }

}
</script>

<style scoped>
</style>

