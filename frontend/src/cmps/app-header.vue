<template>
<section>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <span role="img" aria-label="logo">🏨</span>
        <span>Stay.</span>
      </router-link>
      <!-- <button v-if="isUserScrolling" @click="openSearchBar">Search...</button> -->
      <router-link to="/stay">Explore</router-link>
      <router-link to="/stay/add">Become a Host</router-link>
      <router-link to="/login">☰</router-link>
  <stay-filter v-if="isUserScrolling" />
    </nav>
    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <!-- <span>{{ loggedInUser.score }}</span> -->
    </section>
     
  </header> 
      </section>
</template>
<script>
import stayFilter from "../cmps/stay-filter.vue";
export default {
  data() {
    return {
      isUserScrolling: false,
      isSearch: false,
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      if (window.scrollY > 0) {
        this.isUserScrolling = true;
        this.isSearch = false;
      }
      else this.isUserScrolling = false
    },
    openSearchBar() {
      // this.isUserScrolling = !this.isUserScrolling
      this.$emit("isSearch", this.isSearch)
      this.isSearch = true;
      console.log(this.isSearch);
    },
  },
  components: {
    stayFilter,
  },
};
</script>