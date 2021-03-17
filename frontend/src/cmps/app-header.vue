<template>
  <header>
    <nav>
      <router-link to="/">
        <span role="img" aria-label="logo">🏨</span>
      </router-link>
      <stay-filter/>
      <router-link to="/stay">Explore</router-link>
      <router-link to="/stay/add">Become a Host</router-link>
      <router-link to="/login">☰</router-link>
    </nav>
    <section className="loggedin-user" v-if="loggedInUser">
      <router-link :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </router-link>
      <!-- <span>{{ loggedInUser.score }}</span> -->
    </section>
  </header>
</template>
<script>
export default {
  computed: {
    loggedInUser() {
    //   return this.$store.getters.loggedinUser
    }
  },
};
</script>