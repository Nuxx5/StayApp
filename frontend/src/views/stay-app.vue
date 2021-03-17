<template>
  <section class="stay-app main-container">
    <stay-filter @setFilter="setFilter" />
    <stay-list
      :stays="stays"
    />
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
    };
  },
  methods: {
    setFilter(filterBy) {
      // this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
    },
  },
  computed: {
    stays() {
      console.log(
        JSON.parse(JSON.stringify(this.$store.getters.staysForDisplay))
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