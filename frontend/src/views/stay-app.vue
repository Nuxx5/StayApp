<template>
  <section class="stay-app main-container">
    <!-- <stay-filter v-if="!isUserScrolling" @setFilter="setFilter" /> -->
    <stay-list
      :stays="stays"
    />
    <div class="big"/>
  </section>
</template>

<script>
import stayList from "../cmps/stay-list.vue";
import stayFilter from "../cmps/stay-filter.vue";
import { stayService } from "../services/stay.service.js";
// import { showMsg } from "../services/eventBus.service.js";

export default {
  data() {
    return {
      stayToEdit: stayService.getEmptyStay(),
      // isUserScrolling: false
    };
  },
  methods: {
    setFilter(filterBy) {
      // this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
    },
    // handleScroll (event) {
    //   // Any code to be executed when the window is scrolled
    //   if (window.scrollY > 0) {
    //     this.isUserScrolling = true;
    //     this.isSearch = false;
    //   }
    //   else this.isUserScrolling = false
    // }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    stays() {
      console.log(
        // JSON.parse(JSON.stringify(this.$store.getters.staysForDisplay))
      );
      return this.$store.getters.staysForDisplay;
    },
  },
  components: {
    stayList,
    stayFilter,
  },
};
</script>