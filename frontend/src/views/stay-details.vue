<template>
  <section v-if="stay" class="main-container stay-details flex column">
    <h2 class="room-title">{{ stay.name }}</h2>
    <div class="ratings flex">
      <div class="details-rating" :class="{ opacity: noReviews }">
        {{ rating }}
      </div>
      <div>{{ stay.loc.address }}</div>
    </div>
    <div class="image-gallery">
      <img class="image-gallery img1" :src="stay.imgUrls[2]" />
      <img class="image-gallery img2" :src="stay.imgUrls[2]" />
      <img class="image-gallery img3" :src="stay.imgUrls[2]" />
      <img class="image-gallery img4" :src="stay.imgUrls[2]" />
      <img class="image-gallery img5" :src="stay.imgUrls[2]" />
    </div>
    <div class="main-content flex space-between">
      <div class="room-details flex column">
        <div class="room-summary">
          <p class="summary-text1">
            Entire place hosted by {{ stay.host.fullname }}
          </p>
          <p class="summary-text2">{{ stay.capacity }} guests</p>
          <img class="summary-img" :src="stay.host.imgUrl" />
        </div>
        <div class="room-desc flex column">
          <p>{{ stay.summary }}</p>
        </div>
        <div class="amenity-section">
          <h1>Amenities</h1>
          <div class="amenity-grid">
            <div class="amenity-item">
              <img src="../assets/img/Parking.f081ec43.svg" />
              <span>Parking</span>
            </div>
            <div class="amenity-item">
              <img src="../assets/img/Air conditioning.b1c18665.svg" />
              <span>Air conditioning</span>
            </div>
            <div class="amenity-item">
              <img src="../assets/img/TV.e782c1fe.svg" />
              <span>TV</span>
            </div>
            <div class="amenity-item">
              <img src="../assets/img/Wifi.6d265c21.svg" />
              <span>Wifi</span>
            </div>
            <div class="amenity-item">
              <img src="../assets/img/Kitchen.9817fe67.svg" />
              <span>Kitchen</span>
            </div>
            <div class="amenity-item">
              <img src="../assets/img/Essentials.223b18be.svg" />
              <span>Essentials</span>
            </div>
          </div>
        </div>
      <datepicker :value="Date.now()"></datepicker>
      </div>
      <tripSettings @reservationMade="handleReservation" />
    </div>

    <!-- <chat-app :stay="stay" /> -->
    <!-- <router-link to="/stay" class="btn">Back</router-link> -->
  </section>
</template>
    <script>
import { stayService } from "../services/stay.service.js";
import Datepicker from "vuejs-datepicker";
// import chatApp from "../cmps/chat-app.vue";
import tripSettings from "../cmps/trip-settings.vue";
export default {
  data() {
    return {
      stay: null,
    };
  },
  created() {
    const stayId = this.$route.params.id;
    stayService.getStayById(stayId).then((stay) => {
      console.log(stay);
      this.stay = stay;
    });
  },
  computed: {
    date() {
      if (this.stay.createdAt)
        return new Date(this.stay.createdAt).toLocaleDateString("he-IS");
    },
    rating() {
      return this.stay.reviews.length
        ? "⭐ " +
            this.stay.reviews[0].rate +
            " (" +
            this.stay.reviews.length +
            ")"
        : "no reviews yet";
    },
    noReviews() {
      return !this.stay.reviews.length;
    },
  },
  components: {
    // chatApp,
    tripSettings,
    Datepicker,
  },
  methods: {
    handleReservation(reservation) {
      console.log(reservation);
    },
  },
};
</script>