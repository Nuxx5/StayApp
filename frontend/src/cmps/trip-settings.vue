<template>
  <section>
    <div class="trip-settings">
      <div class="trip-card">
        <div class="trip-header">
          <p>
            <span class="bold">${{ stay.price }}</span> / night
          </p>
          <div class="trip-ratings flex">
            <div class="trip-rating" :class="{ opacity: noReviews }">
              <span v-if="!this.noReviews" style="color:#FF385C">󰀄</span> {{ rating }}
            </div>
          </div>
          <!-- <div>
            <span>star</span>
            <span>4.8</span>
            <span>(6)</span>
          </div> -->
        </div>
        <form class="trip-form" v-if="stay" @submit.prevent="onReserve">
          <div class="trip-data">
            <div class="trip-dates flex item-center">
              <div class="check-in">
                <date-picker
                  class="date-hide"
                  v-model="date"
                  value-type="format"
                  format="MMM DD, YYYY"
                  range
                ></date-picker>
                <div class="check-in-title">Check-in</div>
                <span v-if="!date[0]" class="check-in-date">Add date</span>
                <span class="date-show">{{ date[0] }}</span>
              </div>
              <div class="check-out">
                <date-picker
                  class="date-hide"
                  v-model="date"
                  value-type="format"
                  format="MMM DD, YYYY"
                  range
                ></date-picker>
                <div class="check-in-title">Check-out</div>
                <span v-if="!date[1]" class="check-in-date">Add date</span>
                <span class="date-show">{{ date[1] }}</span>
              </div>
            </div>

            <span @click="showModal" class="box">
              <div class="filter-guests flex column">
                <span class="title">Guests</span>
                <span class="desc" v-if="sumOfGuests">{{ sumOfGuests }} guest<span v-if="sumOfGuests > 1">s</span></span>
                <span class="desc" v-else>Add guests</span>
              </div>
            </span>

            <div
              v-click-outside="onClickOutside"
              v-if="isShown"
              class="guests-modal flex column"
              :class="{ modal: isShown }"
            >
              <div class="container-btns">
                <div class="btn-container">
                  <div class="txt flex column">
                    <span class="title">Adults:</span>
                    <span class="subtitle">Age 13 or above</span>
                  </div>
                  <div class="btns">
                    <div @click="removeAdult" class="guest-btn">-</div>
                    <p>{{ adults }}</p>
                    <div @click="addAdult" class="guest-btn">+</div>
                  </div>
                </div>
                <div class="btn-container">
                  <div class="txt flex column">
                    <span class="title">Children:</span>
                    <span class="subtitle">Ages 2-12</span>
                  </div>
                  <div class="btns">
                    <div @click="removeChild" class="guest-btn">-</div>
                    <p>{{ children }}</p>
                    <div @click="addChild" class="guest-btn">+</div>
                  </div>
                </div>
                <div class="btn-container">
                  <div class="txt flex column">
                    <span class="title">Infants:</span>
                    <span class="subtitle">Under 2</span>
                  </div>
                  <div class="btns">
                    <div @click="removeInfant" class="guest-btn">-</div>
                    <p>{{ infants }}</p>
                    <div @click="addInfant" class="guest-btn">+</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <button class="guest-modal-btn">
              Guests
            </button> -->
          </div>
          <button class="reserve-submit-btn">Check availability</button>
        </form>
      </div>
    </div>

    <!-- <form v-if="stay" @submit.prevent="onReserve" class="trip-settings"> -->
      <!-- <div class="dates-reserve-container flex space-between">
      <div class="dates-reserve">
        <div class="check-in">Check-in</div>
        <button>{{date[0]}}
          <span class="date-picker-2">
            <span style="opacity:1">{{date[0]}}</span>
            <date-picker v-model="date" value-type="format" format="MMM DD, YYYY" range></date-picker>
          </span>
        </button>
      </div>
      <div class="dates-reserve ">
        <div class="check-out">Check-out</div>
        <span>{{date[1]}}
          <span class="date-picker-2">
            <date-picker v-model="date" value-type="format" format="MMM DD, YYYY" range></date-picker>
          </span>
        </span>
      </div>
    </div> -->

      <!-- <details>
        <summary>Guests</summary>
        <div class="flex column">
          <div>
            Adults:<button @click="removeAdult">-</button
            ><span>{{ adults }}</span
            ><button @click="addAdult">+</button>
          </div>

          <div>
            Children:<button @click="removeChild">-</button
            ><span>{{ children }}</span
            ><button @click="addChild">+</button>
          </div>

          <div>
            Infants:<button @click="removeInfant">-</button
            ><span>{{ infants }}</span
            ><button @click="addInfant">+</button>
          </div>
        </div>
      </details> -->

    <!-- </form> -->
  </section>
</template>

<script>
import vClickOutside from "v-click-outside";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: ["stay"],
  // , "date"
  data() {
    return {
      adults: 1,
      children: 0,
      infants: 0,
      startDate: null,
      endDate: null,
      date: [],
      filterBy: {
        txt: "",
        startDate: null,
        endDate: null,
        capacity: 0,
      },
      isShown: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    // console.log('date', this.date);
  },
  computed: {
    sumOfGuests() {
      this.filterBy.capacity = this.adults + this.children;
      return this.filterBy.capacity;
    },
    rating() {
      return this.stay.reviews.length
        ? this.stay.reviews[0].rate +
            " (" +
            this.stay.reviews.length +
            ")"
        : "no reviews yet";
    },
    noReviews() {
      return !this.stay.reviews.length;
    },
    // date() {
    //   console.log("date", this.date);
    //   return this.date;
    // },
  },
  methods: {
    onReserve() {
      if(!this.date[0] || !this.date[1] || !this.adults) return
      console.log("emiting...");
      let reservation = {
        startDate: this.date[0],
        endDate: this.date[1],
        infants: this.infants,
        children: this.children,
        adults: this.adults,
      };
      this.$emit("reservationMade", reservation);
    },
    addAdult(ev) {
      ev.preventDefault();
      this.adults++;
    },
    removeAdult(ev) {
      ev.preventDefault();
      this.adults--;
      if (this.adults < 0) this.adults = 0;
    },
    addChild(ev) {
      ev.preventDefault();
      this.children++;
    },
    removeChild(ev) {
      ev.preventDefault();
      this.children--;
      if (this.children < 0) this.children = 0;
    },
    addInfant(ev) {
      ev.preventDefault();
      this.infants++;
    },
    removeInfant(ev) {
      ev.preventDefault();
      this.infants--;
      if (this.infants < 0) this.infants = 0;
    },
    showModal() {
      this.isShown = !this.isShown;
    },
    onClickOutside(event) {
      this.isShown = !this.isShown;
    },
  },
  components: {
    DatePicker,
  },
};
</script>
