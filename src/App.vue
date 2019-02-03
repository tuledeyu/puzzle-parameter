<template>
  <div id="app">
    <div id="box" style="width:700px;height:700px;border:1px solid red;justify-content: center"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  mounted(){
    let elem = document.getElementById('box')
    let text = '向右滑动填充拼图'
    this.$msg().init()
  }
}
</script>

<style>
#app {
  width: 700px;
  height: 700px;
  border: 1px solid red;
}

</style>
