<template>
  <header class="main-container">
    <div class="header-container">
      <nav class="main-nav flex space-between align-center">
        <router-link to="/" class="logo flex align-center">
          <img class="logo-icon" src="@/assets/img/logo.png" alt="" />
          <span>Stay.</span>
        </router-link>
        <div class="search">
          <button v-if="headerFilter"
            @click="openFilter" class="btn flex align-center">
            <div class="txt">{{ setSearchTxt }}</div>
            <div class="search-icon">
              <img src="@/assets/img/search_m.6a5171ec.svg">
            </div>
            </button>
            </div>
        <!-- <div class="header-filter">
          <button
            class="header-filter-btn flex align-center"
            v-if="headerFilter"
            @click="openFilter"
          >
            <div class="header-search">{{ setSearchTxt }}</div>
            <div class="search-txt">🔎</div>
          </button>
        </div> -->
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
    <div class="header-filter-container" :class="{'header-ext': isSearch}">
      <stay-filter v-click-outside="onClickOutside" :class="{ 'home-filter': !isUserScrolling && isHomePage }" v-if="!isUserScrolling && isHomePage || isSearch" @setFilter="setFilter" />
    </div>
    <div v-if="isSearch" class="overlay"></div>

  </header>
</template>
<script>
import vClickOutside from "v-click-outside";
import stayFilter from "./stay-filter.vue";
export default {
  data() {
    return {
      isUserScrolling: false,
      isSearch: false,
      isHomePage: true,
      // filterBy: {
      //   txt: '',
      //   startDate: null,
      //   endDate: null,
      //   capacity: 0,
      // },
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    headerFilter() {
      return !(!this.isUserScrolling && this.$route.path === "/");
    },
    setSearchTxt() {
      // return this.filterBy.txt ? this.filterBy.txt : "city search";
      return this.$route.query.city
        ? this.$route.query.city
        : "Start your search";
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.$route.path !== "/"){
      this.isHomePage = false;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    setFilter(filterBy) {
      console.log("filterBy header", filterBy);
      this.isSearch = false;
      // this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "setFilter", filterBy: { ...filterBy } });
      if (this.$route.path !== `/stay?city=${filterBy.txt}`) {
        this.$router.push(`/stay?city=${filterBy.txt}`);
      }
      // if (this.$route.path !== "/stay") {
      //   this.$router.push("/stay");
      // }
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
      console.log('isSearch', this.isSearch);
    },
    onClickOutside(event) {
      if(this.isSearch){
        this.isSearch = false;
      }
    },
  },
  watch: {
    "$route.path"(url) {
      console.log("Changed to", url);
      if (url === "/") {
        this.isHomePage = true;
      } else this.isHomePage = false;
      console.log("isHomePage", this.isHomePage);
    },
  },
  components: {
    stayFilter,
  },
};
</script>