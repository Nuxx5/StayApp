<template>
  <section class="home text-center">
    <div class="hero-img">
      <img class="bgimage" src="@/assets/img/hero.jpg" alt="" />
      <div class="bottom-left">
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
        <h2>About Stay.</h2>
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
    return {};
  },
  computed: {},
  created() {},
  methods: {
    openStays(city) {
      this.$router.push(`/stay?city=${city}`);
    },
  },
  components: {
    stayFilter
  },
};
</script>
