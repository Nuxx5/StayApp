<template>
  <section class="home text-center">
    <div class="hero-img">
      <img class="bgimage" src="@/assets/img/hero.jpg" alt="" />
      <div class="home-filter">
        <stay-filter v-if="!isUserScrolling" @setFilter="setFilter" />
      </div>
      <div>
        <h1>Stay.</h1>
        <h3 class="text-center">Anywhere.</h3>
      </div>
    </div>
    <div class="main-container">
      <h2>Explore Locations</h2>
      <div class="home-card">
        <ul class="clean-list flex space-between">
          <li class="card clickable" @click="openStays('toronto')">
            <img src="@/assets/img/canada.jpg" alt="" />
            <h3>Toronto</h3>
          </li>
          <li class="card clickable" @click="openStays('london')">
            <img src="@/assets/img/canada.jpg" alt="" />
            <h3>London</h3>
          </li>
          <li class="card clickable" @click="openStays('los angeles')">
            <img src="@/assets/img/canada.jpg" alt="" />
            <h3>Los Angeles</h3>
          </li>
        </ul>
      </div>
      <div class="home-about">
        <h2 class="about-header">About Stay.</h2>
        <div class="about-txt flex">
          <div class="about-txt-card">
            <h3>Who we are</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae perferendis dignissimos nihil, id, sequi repudiandae
              doloribus nisi culpa nulla tempora a harum aliquam ab, iusto qui
              minus eaque nostrum? Voluptates.
            </p>
          </div>
          <div class="about-txt-card">
            <h3>Our services</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae perferendis dignissimos nihil, id, sequi repudiandae
              doloribus nisi culpa nulla tempora a harum aliquam ab, iusto qui
              minus eaque nostrum? Voluptates.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import stayFilter from "../cmps/stay-filter.vue";
export default {
  name: "home",
  data() {
    return {
      isUserScrolling: false
    };
  },
  computed: {},
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openStays(city) {
      this.$router.push(`/stay?city=${city}`);
    },
    setFilter(filterBy) {
      console.log('filterBy home', filterBy);
      // this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
    },
    handleScroll (event) {
      // Any code to be executed when the window is scrolled
      if (window.scrollY > 0) {
        this.isUserScrolling = true;
        // this.isSearch = false;
      }
      else this.isUserScrolling = false
    }
  },
  components: {
    stayFilter
  },
};
</script>
