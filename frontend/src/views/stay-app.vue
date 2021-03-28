<template>
  <section class="stay-app main-container">
    <stay-list :stays="stays" @setFilter="setFilter" />
  </section>
</template>

<script>
import stayList from "../cmps/stay-list.vue";
// import { stayService } from "../services/stay.service.js";
// import { showMsg } from "../services/eventBus.service.js";

export default {
  data() {
    return {
      //   stayToEdit: stayService.getEmptyStay(),
      filterBy: {
        txt: '',
        startDate: null,
        endDate: null,
        capacity: 0,
        fromPrice: 0,
        toPrice: 1000,
      },
    };
  },
  methods: {
    getStays() {
      console.log("getStays in stay-app");
      return this.$store.dispatch({ type: "loadStays" });
    },
    setFilter(filterBy) {
      console.log("filterBy stay-app", filterBy);
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
      // if (this.$route.path !== `/stay?city=${filterBy.txt}`) {
      //   this.$router.push(`/stay?city=${filterBy.txt}`);
      // }
      // if (this.$route.path !== "/stay") {
      //   this.$router.push("/stay");
      // }
    },
  },
  created() {
    if (!this.$route.query.city) {
      this.getStays();
      // this.filterBy.txt = '';
    }
    // console.log("stay-app");
    // console.log("this.$route.params;", this.$route.params);
    return this.$store.getters.staysForDisplay;
  },
  computed: {
    stays() {
      // console.log(
      //   JSON.parse(JSON.stringify(this.$store.getters.staysForDisplay))
      // );
      return this.$store.getters.staysForDisplay;
    },
  },
  watch: {
    "$route.query.city"(city) {
      console.log("Changed to", city);
      // if (this.$route.path === "/stay/") {
      if (!city) {
        console.log("inside if");
        this.getStays();
      }
    },
  },
  components: {
    stayList,
  },
};
</script>