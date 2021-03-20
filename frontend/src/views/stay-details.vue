<template>
  <section v-if="stay" class="main-container stay-details flex column">
    <h2 class="stay-title">{{ stay.name }}</h2>
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
      <div class="stay-details flex column">
        <div class="stay-summary">
          <p class="summary-text1">
            Entire place hosted by {{ stay.host.fullname }}
          </p>
          <p class="summary-text2">{{ stay.capacity }} guests</p>
          <img class="summary-img" :src="stay.host.imgUrl" />
        </div>
        <div class="stay-desc flex column">
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
      <!-- <datepicker :multi="true" :inline="true" :value="Date.now()"></datepicker> -->
      <div class="calendar flex column">
        <h2>{{ stay.loc.address }}</h2>
        <span>{{date[0]}} - {{date[1]}}</span>
       <date-picker v-model="date" value-type="format" format="MMM DD, YYYY" inline range></date-picker>
      </div>
      <div class="reviews flex column">
        <ul class="review-cards">
          <li
        v-for="review in stay.reviews"
        :key="review.id"
        class="review-card"
      >
      <div class="review-header">
        <img :src="review.by.imgUrl">
        <div class="header-text">
          <span class="review-name">{{review.by.fullname}}</span>
          <p class="review-date">June 2019</p>
        </div>
      </div>
      <p class="review-txt">{{review.txt}}</p>
      </li>
      </ul>
      </div>
      <div class="maps">
      <google-maps :pos="setPos"/>
      </div>
      <!-- <div class="stay-map" v-bind:style="{ backgroundImage: `url(${mapUrl})`}">
        {{stay.loc.address}}
      </div> -->
      </div>
      <tripSettings @reservationMade="handleReservation" />
    </div>

    <!-- <chat-app :stay="stay" /> -->
    <!-- <router-link to="/stay" class="btn">Back</router-link> -->
  </section>
</template>
    <script>
import { stayService } from "../services/stay.service.js";
// import Datepicker from "vuejs-datepicker";
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
// import chatApp from "../cmps/chat-app.vue";
import tripSettings from "../cmps/trip-settings.vue";
import googleMaps from "../cmps/google-maps";
export default {
  data() {
    return {
      stay: null,
      date: [],
      pos: {}
      }
    },
  created() {
    const stayId = this.$route.params.id;
    stayService.getStayById(stayId).then((stay) => {
      console.log(stay);
      this.stay = stay;
    });
  },
  computed: {
    // mapUrl: function(){
    //   return `http://maps.googleapis.com/maps/api/staticmap?center=${this.stay.loc.lat},${this.stay.loc.lng}&zoom=14&size=480x250&markers=${this.stay.loc.lat},${this.stay.loc.lng}&key=AIzaSyCP18cD4FwL37eXgcB1MbLNtG9ktbkzdlw`
    // },
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
    setPos() {
  return {lat:this.stay.loc.lat, lng:this.stay.loc.lng}
    }
  },
  components: {
    // chatApp,
    tripSettings,
    DatePicker,
    googleMaps
  },
  methods: {
    handleReservation(reservation) {
      console.log(reservation);
      if ((reservation.adults+reservation.children === 0) || reservation.startDate === null || reservation.endDate === null) return
      this.$message({
          showClose: true,
          message: `${this.stay.name} reserved from ${reservation.startDate} to ${reservation.endDate}. (${reservation.adults+reservation.children} guests total)`,
          type: 'success'
        });
    },
  },
};
</script>