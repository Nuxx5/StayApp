<template>
  <!-- <form @submit.prevent="setFilter"> -->
  <!-- <form class="stay-filter space-evenly" @submit.prevent="setFilter"> -->
  <section class="filter-container flex justify-center align-center">
    <div class="wrapper flex">
      <span class="box">
        <div class="filter-location flex column">
          <span class="title">Location</span>
          <input
            class="desc"
            type="text"
            v-model="filterBy.txt"
            placeholder="Where are you going?"
            @keyup.enter="setFilter"
          />
        </div>
      </span>
      <span class="box">
        <div class="filter-dates flex column">
          <span class="title">Dates</span>
          <date-picker
            class="desc"
            v-model="date"
            type="date"
            format="MMM DD"
            range
            range-separator="  -  "
            placeholder="Check in - Check out"
          ></date-picker>
        </div>
      </span>
      <span @click="showModal" class="box">
        <div class="filter-guests flex column">
          <span class="title">Guests</span>
          <span class="desc-guests" v-if="sumOfGuests">{{ sumOfGuests }} guest<span v-if="sumOfGuests > 1">s</span></span>
                <span class="desc-guests" v-else>Add guests</span>
          <!-- <span class="desc-guests">Add guests: {{ sumOfGuests }}</span> -->
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
      <div @click="setFilter" class="search-icon-filter">
        <div class="search-btn">
          <img src="@/assets/img/search_m.6a5171ec.svg" />
        </div>
      </div>
      <!-- </div> -->
    </div>
  </section>
  <!-- </form> -->
</template>

<script>
import vClickOutside from "v-click-outside";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  data() {
    return {
      adults: 0,
      children: 0,
      infants: 0,
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
    console.log("filter", this.filterBy);
  },
  computed: {
    sumOfGuests() {
      this.filterBy.capacity = this.adults + this.children;
      return this.filterBy.capacity;
    },
  },
  methods: {
    setFilter() {
      this.filterBy.startDate = this.date[0];
      this.filterBy.endDate = this.date[1];
      console.log("this.filterBy", this.filterBy);
      this.$emit("setFilter", this.filterBy);
    },
    addAdult() {
      this.adults++;
    },
    removeAdult() {
      this.adults--;
      if (this.adults < 0) this.adults = 0;
    },
    addChild() {
      this.children++;
    },
    removeChild() {
      this.children--;
      if (this.children < 0) this.children = 0;
    },
    addInfant() {
      this.infants++;
    },
    removeInfant() {
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