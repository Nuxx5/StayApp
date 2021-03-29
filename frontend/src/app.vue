<template>
  <div id="app">
    <app-header />
    <router-view/>
     <app-footer />
  </div>
</template>

<script>

import appHeader from './cmps/app-header'
import appFooter from './cmps/app-footer'
import {socketService} from "./services/socket.service.js";

export default {
  components: {
    appHeader,
    appFooter
  },
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadStays" });
    socketService.on("show-msg",(data)=>{
    console.log('hi!')
    console.log(data)
    const h = this.$createElement;

        this.$notify({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, 'This is a reminder'),
          duration: 0
        });
    })
  },
}
</script>

