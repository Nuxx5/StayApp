<template>
  <section class="home text-center">
    <div class="hero-img main-container">
      <!-- <img class="bgimage" src="@/assets/img/hero.jpg" alt="" /> -->
      <!-- <div class="home-filter"> -->
        <!-- <stay-filter v-if="!isUserScrolling" @setFilter="setFilter" /> -->
      <!-- </div> -->
      <div class="main-txt">
        <h1>Stay.</h1>
        <h1>Anywhere.</h1>
      </div>
    </div>
    <div class="main-container">
      <h2>Explore Locations</h2>
      <div class="home-card">
        <ul class="clean-list card-gallery">
          <li class="card clickable" @click="setStay('Toronto')">
            <img src="@/assets/img/toronto.jpg" alt="" />
            <h3>Toronto</h3>
          </li>
          <li class="card clickable" @click="setStay('London')">
            <img src="@/assets/img/london2.jpg" alt="" />
            <h3>London</h3>
          </li>
          <li class="card clickable" @click="setStay('Los Angeles')">
            <img src="@/assets/img/losangeles.jpg" alt="" />
            <h3>Los Angeles</h3>
          </li>
          <li class="card clickable" @click="setStay('Paris')">
            <img src="@/assets/img/paris.jpg" alt="" />
            <h3>Paris</h3>
          </li>
          <li class="card clickable" @click="setStay('Berlin')">
            <img src="@/assets/img/berlin.jpg" alt="" />
            <h3>Berlin</h3>
          </li>
          <li class="card clickable" @click="setStay('Haifa')">
            <img src="@/assets/img/haifa.jpg" alt="" />
            <h3>Haifa</h3>
          </li>
        </ul>
      </div>
      <div class="home-about">
        <h2 class="about-header">About Stay.</h2>
        <div class="about-txt flex">
          <div class="about-txt-card">
            <h3>Who we are</h3>
            <p>
              Stay experiences are not your typical tour. Whether you’re on a trip, 
              exploring your own city, or staying at home,learn something new from an expert host.
              Choose from dance lessons, pasta-making—even yoga with goats.
            </p>
          </div>
          <div class="about-txt-card">
            <h3>Our services</h3>
            <p>
              Whether you’re looking for a treehouse for the weekend or an entire home for the whole family,
              a warm welcome awaits. Behind every stay is a real person who can give you the details you need
              to check in and feel at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import stayFilter from "../cmps/stay-filter.vue";
import {socketService} from "../services/socket.service.js";
export default {
  name: "home",
  data() {
    return {
      isUserScrolling: false,
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
  computed: {},
  created() {
    window.addEventListener("scroll", this.handleScroll);
    socketService.setup()
    socketService.on("stay-reserved",()=>{
    console.log('hi!')
    const h = this.$createElement;

        this.$notify({
          title: 'Title',
          message: h('i', { style: 'color: teal' }, 'This is a reminder')
        });
    })
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    setStay(city) {
      this.filterBy.txt = city;
      console.log('filterBy', this.filterBy);
      var filterBy = this.filterBy
      // this.setFilter(filterBy);
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
      // this.$store.commit({ type: "setFilter", filterBy });
      this.$router.push(`/stay?city=${city}`);
    },
    setFilter(filterBy) {
      console.log("filterBy home", filterBy);
      this.$store.commit({ type: "setFilter", filterBy });
      // this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
      // this.$router.push("/stay");
      this.$router.push(`/stay?city=${filterBy.txt}`);
    },
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      if (window.scrollY > 0) {
        this.isUserScrolling = true;
        // this.isSearch = false;
      } else this.isUserScrolling = false;
    },
  },
  components: {
    stayFilter,
  },
};
</script>
