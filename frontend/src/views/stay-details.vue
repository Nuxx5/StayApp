<template>
  <section v-if="stay" class="main-container stay-details flex column">
    <h2 class="stay-title">{{ stay.name }}</h2>
    <div class="ratings flex">
      <div class="details-rating" :class="{ opacity: noReviews }">
        <span v-if="!this.noReviews" style="color:#FF385C">󰀄 </span><span class="bold">{{ rating }}</span><span v-if="!this.noReviews" class="opacity">{{ reviews }}</span>
      </div>
      <div>{{ stay.loc.address }}</div>
    </div>
    <div class="image-gallery">
      <img v-for="idx in 5" :key=idx :class="`gallery img${idx}`" :src="stay.imgUrls[`${idx-1}`]" />
    </div>
    <div class="main-content flex space-between">
      <div class="stay-details flex column">
        <div class="stay-summary">
          <p class="summary-text1 bold">
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
        <span v-if="date[0]">{{date[0]}} - {{date[1]}}</span>
        <span class="small-txt" v-else>Add your travel dates for exact pricing</span>
       <date-picker v-model="date" value-type="format" format="MMM DD, YYYY" inline range></date-picker>

      </div>
      </div>
      <tripSettings :stay="stay" :fullDate="date" @reservationMade="handleReservation" @setDate="setDate" />
      </div>
      <div class="reviews flex">
        <ul class="review-cards flex">
          <li
        v-for="review in stay.reviews"
        :key="review.id"
        class="review-card"
>
      <div v-if="review" class="review-header">
        <img :src="review.by.imgUrl">
        <div class="header-text">
          <span class="review-name bold">{{review.by.fullname}}</span>
          <p class="review-date">{{getRandomMonth()}} 2020</p>
        </div>
      </div>
      <p v-if="review" class="review-txt">{{review.txt}}</p>
      <p v-else class="no-review">No reviews (yet)</p>
      </li>
      </ul>
      </div>
      <div class="maps" style="height: 400px">
      <google-maps :pos="setPos"/>
      </div>
      <!-- <div class="stay-map" v-bind:style="{ backgroundImage: `url(${mapUrl})`}">
        {{stay.loc.address}}
      </div> -->
      
    

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
import {socketService} from "../services/socket.service.js"
export default {
  data() {
    return {
      stay: null,
      date: [],
      pos: {},
      }
    },
  created() {
    const stayId = this.$route.params.id;
    stayService.getStayById(stayId).then((stay) => {
      this.stay = stay;
    });
  },
  computed: {
    // mapUrl: function(){
    //   return `http://maps.googleapis.com/maps/api/staticmap?center=${this.stay.loc.lat},${this.stay.loc.lng}&zoom=14&size=480x250&markers=${this.stay.loc.lat},${this.stay.loc.lng}&key=AIzaSyCP18cD4FwL37eXgcB1MbLNtG9ktbkzdlw`
    // },
    rating() {
      if(this.stay.reviews.length){
        const reviewsRate = this.stay.reviews.map(reviews => reviews.rate)
        // console.log('reviewsRate', reviewsRate);
        const reviewsRateAvg = reviewsRate.reduce(function(sum, val){
          return sum + val;
        }, 0) / reviewsRate.length;
        // console.log('reviewsRateAvg', reviewsRateAvg);
        return Number.isInteger(reviewsRateAvg)? reviewsRateAvg.toFixed(1) : reviewsRateAvg.toFixed(2);
      }
      else return 'no reviews yet';
    },
    reviews() {
      return ' (' + (this.stay.reviews.length ** 4 + 52) +')'
    },
    noReviews() {
      return !this.stay.reviews.length;
    },
    setPos() {
  return {lat:this.stay.loc.lat, lng:this.stay.loc.lng}
  
  },
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
      
      this.$message({
          showClose: true,
          message: `${this.stay.name} reserved from ${reservation.startDate} to ${reservation.endDate}. (${reservation.adults+reservation.children} guests total)`,
          type: 'success'
        });
        let date = {start:reservation.startDate, end:reservation.endDate}
        let guests = reservation.children + reservation.adults
        let data = {stay: this.stay, date, guests}
        socketService.emit("stay-reserved",data)
    },
    setDate(date){
      this.date = date;
    },
    disabledBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
      },
      getRandomMonth() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var random = Math.floor(Math.random() * months.length);
        return months[random];
      }
  },
};
</script>