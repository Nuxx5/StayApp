<template>
  <!-- <form @submit.prevent="setFilter"> -->
  <!-- <form class="stay-filter space-evenly" @submit.prevent="setFilter"> -->
  <section class="filter-container flex justify-center align-center">
    <div class="filter-location flex column">
      <label>Location</label>
      <input
        type="text"
        v-model="filterBy.txt"
        placeholder="Where are you going?"
        @keyup.enter="setFilter"
      />
    </div>
    <!-- <div class="flex column">
      <label for="start">Check in:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        value="2021-03-17"
        min="2021-03-17"
        max="2031-12-31"
        v-model="filterBy.startDate"
      />
    </div>
    <div class="flex column">
      <label for="end">Check out:</label>
      <input
        type="date"
        id="end"
        name="trip-end"
        value="2021-03-19"
        min="2021-03-17"
        max="2031-12-31"
        v-model="filterBy.endDate"
      />
    </div> -->
    <div class="filter-dates flex column">
      <label>Dates</label>
      <date-picker v-model="date" type="date" format="MMM DD, YYYY" range range-separator="  -  " placeholder="Check in - Check out"></date-picker>
    </div>
    <div class="filter-guests flex column">
      <button @click="showModal">
        <label>Guests</label>
        <span class="flex"
          >Add guests: <span>{{ sumOfGuests }}</span></span
        >
      </button>
      <div
      v-click-outside="onClickOutside"
      v-if="isShown"
      class="guests-modal flex column"
      :class="{ modal: isShown }"
    >
      <p>
        Adults:<button @click="removeAdult">-</button><span>{{ adults }}</span
        ><button @click="addAdult">+</button>
      </p>
      <p>
        Children:<button @click="removeChild">-</button
        ><span>{{ children }}</span
        ><button @click="addChild">+</button>
      </p>
      <p>
        Infants:<button @click="removeInfant">-</button
        ><span>{{ infants }}</span
        ><button @click="addInfant">+</button>
      </p>
    </div>

    </div>
    
    <!-- <el-popover
    placement="bottom"
    title="Title"
    width="200"
    offset="200"
    trigger="click">
    <el-button slot="reference">Add guests: <span>{{ sumOfGuests }}</span></el-button>
  </el-popover> -->

    
    <div class="search-btn">
      <button class="filter-search" @click="setFilter">🔎</button>
    </div>
  </section>
  <!-- </form> -->
</template>

<script>
import vClickOutside from "v-click-outside";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  data() {
    return {
      adults: 0,
      children: 0,
      infants: 0,
      date:[],
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
  created(){
console.log('filter', this.filterBy);
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
      console.log('this.filterBy', this.filterBy);
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