<template>
  <div class="host-container flex">
    <div class="host-txt">
      <h2>BECOME A HOST</h2>
      <h1>A space to share,</h1>
      <h1>a world to gain</h1>
      <p>Hosting can help you turn your extra space into</p>
      <p>extra income and pursue more of what you love.</p>
      <button>Get started</button>
    </div>
    <div class="host-form">
      <form @submit.prevent="addHost">
        <div class="form-header">
          Please fill the below details about you and your stay
        </div>
        <div class="form-txt">
          <input
            type="text"
            v-model="stay.host.fullname"
            placeholder="Please type your full name"
          />
          <input
            type="text"
            v-model="stay.name"
            placeholder="Please type your stay name"
          />
          <input
            type="text"
            v-model="stay.summary"
            placeholder="Please shortly describe your stay"
          />
          <select v-model="stay.loc.address">
            <option value="toronto">Toronto</option>
            <option value="london">London</option>
            <option value="los angeles">Los Angeles</option>
          </select>
          <input
            type="number"
            v-model="stay.price"
            placeholder="How much will you charge for a night"
          />
          <input
            type="number"
            v-model="stay.accommodates"
            placeholder="How many accommodates in yor stay"
          />
        </div>
        <button>Apply</button>
      </form>
    </div>
  </div>
</template>

<script>
import { stayService } from "../services/stay.service.js";
export default {
  name: "stay-add",
  data() {
    return {
      stay: stayService.getEmptyStay(),
    };
  },
  //   computed: {
  //     users() {
  //       return this.$store.getters.users;
  //     },
  //     loggedinUser() {
  //       return this.$store.getters.loggedinUser;
  //     },
  //   },
  //   created() {
  //     this.loadUsers()
  //   },
  //   methods: {
  //     async doLogin() {
  //       if (!this.loginCred.username) {
  //         this.msg = "Please enter username/password"
  //         return;
  //       }
  //       try {
  //         await this.$store.dispatch({ type: "login", userCred: this.loginCred });
  //         this.$router.push('/')
  //       } catch(err) {
  //           console.log(err)
  //           this.msg = "Failed to login"
  //       }
  //     },
  //     doLogout() {
  //       this.$store.dispatch({ type: "logout" });
  //     },
  //     async doSignup() {
  //       if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
  //         this.msg = "Please fill up the form"
  //         return
  //       }
  //       await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
  //       this.$router.push('/')

  //     },
  //     loadUsers() {
  //       this.$store.dispatch({ type: "loadUsers" });
  //     },
  //     async removeUser(userId) {
  //       try {
  //         await this.$store.dispatch({ type: "removeUser", userId })
  //         this.msg = 'User removed'
  //       } catch(err) {
  //         this.msg = 'Failed to remove user'
  //       }
  //     }
  //   }
};
</script>