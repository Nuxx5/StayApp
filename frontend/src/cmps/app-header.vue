<template>
  <header class="main-container">
    <div class="header-container">
    <nav class="main-nav flex space-between align-center">
      <router-link to="/" class="logo">
        <!-- <span role="img" aria-label="logo">🏨</span> -->
        <img class="logo-icon" src="@/assets/img/logo.png" alt="" />
        <span>Stay.</span>
      </router-link>
      <div class="header-filter">
        <button
          class="header-filter-btn flex align-center"
          v-if="headerFilter"
          @click="openFilter"
        >
          <div class="header-search">Start your search</div>
          <div>🔎</div>
          <!-- <img src="" alt="" /> -->
        </button>
      </div>
      <div class="nav-menu">
        <router-link to="/stay">Explore</router-link>
        <router-link to="/stay/add">Become a Host</router-link>
        <router-link to="/login">☰</router-link>
      </div>
    </nav>
    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <!-- <span>{{ loggedInUser.score }}</span> -->
    </section>
    </div>
    <stay-filter v-if="isSearch" @setFilter="setFilter" />
  </header>
</template>
<script>
import stayFilter from "./stay-filter.vue";
export default {
  data() {
    return {
      isUserScrolling: false,
      isSearch: false,
      isHomePage: false,
      filterBy: {
        txt: "",
        startDate: null,
        endDate: null,
        capacity: 0,
      },
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    headerFilter() {
      return (!(!this.isUserScrolling && this.$route.path === "/"));
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    setFilter(filterBy) {
      console.log("filterBy header", filterBy);
      this.$store.commit({ type: "setFilter", filterBy });
      // this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
      if (this.$route.path !== "/stay") {
        this.$router.push("/stay");
      }
    },
    handleScroll(event) {
      if (window.scrollY > 0) {
        this.isUserScrolling = true;
        this.isSearch = false;
      } else this.isUserScrolling = false;
    },
    openFilter() {
      // this.isUserScrolling = !this.isUserScrolling
      // this.$emit("isSearch", this.isSearch)
      this.isSearch = true;
      console.log(this.isSearch);
    },
  },
  components: {
    stayFilter,
  },
};
</script>