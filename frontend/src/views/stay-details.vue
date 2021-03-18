<template>
  <section v-if="stay" class="stay-details flex column align-center">
    <h2><span>Stay: </span>{{ stay.name }}</h2>
    <h2><span>Price: </span>${{ stay.price }}</h2>
    <h2><span>Capacity: </span>{{ stay.capacity }}</h2>
    <h2><span>amenities: </span>{{ stay.amneties }}</h2>
    <chat-app :stay="stay" />
    <router-link to="/stay" class="btn">Back</router-link>
  </section>
</template>
    <script>
import { stayService } from "../services/stay.service.js";
import chatApp from "../cmps/chat-app.vue";
export default {
  data() {
    return {
      stay: null,
    };
  },
  created() {
    const stayId = this.$route.params.stayId;
    stayService.getStayById(stayId)
    .then((stay) => {
      this.stay = stay;
    });
  },
  computed: {
    date() {
      if (this.stay.createdAt)
        return new Date(this.stay.createdAt).toLocaleDateString("he-IS");
    },
  },
  components: {
    chatApp,
  },
};
</script>