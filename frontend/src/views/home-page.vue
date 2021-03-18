<template>
  <section class="container home text-center">
    <img class="bgimage" src="@/assets/img/hero.jpg" alt="" />
    <div class="home-container">
      <h2>Explore Locations</h2>
      <div class="home-card">
        <ul class="clean-list flex space-around">
          <li class="card clickable" @click="openStays('Toronto')">
            <img src="@/assets/img/canada.jpg" alt="" />
            <h3>Toronto</h3>
          </li>
          <li class="card clickable" @click="openStays('London')">
            <img src="@/assets/img/canada.jpg" alt="" />
            <h3>London</h3>
          </li>
          <li class="card clickable" @click="openStays('Los Angeles')">
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
    <h1>Stay.</h1>
    <h5 class="text-center">Anywhere.</h5>
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
