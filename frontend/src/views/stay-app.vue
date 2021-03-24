<template>
  <section class="stay-app main-container">
    <stay-list :stays="stays" />
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
        txt: "",
        startDate: null,
        endDate: null,
        capacity: 0,
      },
    };
  },
  methods: {},
  created() {
    // if(!this.$route.query.city)
    // this.filterBy.txt = '';
    // console.log("stay-app");
    // console.log("this.$route.params;", this.$route.params);
    console.log("this.$route.query", this.$route.query.city);
    return this.$store.getters.staysForDisplay;
  },
  computed: {
    stays() {
      console.log(
        JSON.parse(JSON.stringify(this.$store.getters.staysForDisplay))
      );
      return this.$store.getters.staysForDisplay;
    },
  },
  watch: {
    // "$route.query.city"(city) {
    //   if (this.$route.path === "/stay") {
    //     console.log("Changed to stay", city);
    //     console.log("filterBy", filterBy);
    //   }
      // //   this.$route.go()
      // this.$router.go()
      //   this.$router.push("/stay")
      // this.staysDisplay();
    // },
  },
  components: {
    stayList,
  },
};
</script>