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
    console.log(data.date)
    const h = this.$createElement;
    let str = (data.guests>1) ? 's':''

        this.$notify({
          title: 'New reservation!',
          message: h('i', { style: 'color: teal' }, `You have a reservation at ${data.stay.name} from ${data.date.start} until ${data.date.end}. (${data.guests} guest${str} total)`),
          duration: 0
        });
    })
  },
}
</script>

