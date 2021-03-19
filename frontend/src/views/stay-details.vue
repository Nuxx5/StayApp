<template>
  <section v-if="stay" class="main-container stay-details flex column">
    <h2>{{ stay.name }}</h2>
    <div class="ratings flex">
      <div class="details-rating" :class="{opacity:noReviews}">{{ rating }}</div>
      <div>{{ stay.loc.address }}</div>
      </div>
      <div class="image-gallery">
        <img class="image-gallery img1" :src="stay.imgUrls[2]">
        <img class="image-gallery img2" :src="stay.imgUrls[2]">
        <img class="image-gallery img3" :src="stay.imgUrls[2]">
        <img class="image-gallery img4" :src="stay.imgUrls[2]">
        <img class="image-gallery img5" :src="stay.imgUrls[2]">
        </div>
        <div class="main-content flex space-between">
          <div class="room-details flex column">
            <div class="room-summary">
              <p class="summary-text1">Entire place hosted by {{stay.host.fullname}}</p>
              <p class="summary-text2">{{stay.capacity}} guests</p>
              <img class="summary-img" :src="stay.host.imgUrl">
              </div>
              <div class="room-desc flex column">
                <p>{{stay.summary}}</p>
                </div>
           </div>
        <tripSettings @reservationMade="handleReservation" />
          </div>
    <h2><span>amenities: </span>{{ stay.amenities }}</h2>
    <!-- <chat-app :stay="stay" /> -->
    <router-link to="/stay" class="btn">Back</router-link>
  </section>
</template>
    <script>
import { stayService } from "../services/stay.service.js";
// import chatApp from "../cmps/chat-app.vue";
import tripSettings from "../cmps/trip-settings.vue"
export default {
  data() {
    return {
      stay: null,
    };
  },
  created() {
    const stayId = this.$route.params.id;
    stayService.getStayById(stayId)
    .then((stay) => {
      console.log(stay)
      this.stay = stay;
    });
  },
  computed: {
    date() {
      if (this.stay.createdAt)
        return new Date(this.stay.createdAt).toLocaleDateString("he-IS");
    },
    rating() {
      return this.stay.reviews.length? '⭐ ' + this.stay.reviews[0].rate + ' (' + this.stay.reviews.length + ')' : 'no reviews yet'
    },
    noReviews() {
      return !this.stay.reviews.length 
    }
  },
  components: {
    // chatApp,
    tripSettings
  },
  methods:{
    handleReservation(reservation){
      console.log(reservation)
    }
  }
};
</script>