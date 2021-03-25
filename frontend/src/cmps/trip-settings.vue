<template>
  <section>
    <div class="trip-settings">
      <div class="trip-card">
        <div class="trip-header">
          <p>
            <span class="bold">${{ stay.price }}</span> / night
          </p>
          <div>
            <span>star</span>
            <span>4.8</span>
            <span>(6)</span>
          </div>
        </div>
        <form class="trip-form" v-if="stay" @submit.prevent="onReserve">
          <div class="trip-data">
            <div class="trip-dates flex item-center">
              <div class="check-in">
                <date-picker class="date-hide" v-model="date" value-type="format" format="MMM DD, YYYY" range></date-picker>
                <div class="check-in-title">Check-in</div>
                <span v-if="!date[0]" class="check-in-date">Add date</span>
                <span class="date-show">{{date[0]}}</span>
              </div>
              <div class="check-out">
                <div class="check-in-title">Check-out</div>
                <span v-if="!date[1]" class="check-in-date">Add date</span>
                <span class="date-show">{{date[1]}}</span>
              </div>
            </div>
            <button class="guest-modal-btn">
              Guests
            </button>
          </div>
          <button class="reserve-submit-btn">Reserve</button>
        </form>
      </div>
    </div>
  

  <form v-if="stay" @submit.prevent="onReserve" class="trip-settings">
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

      
    <details>
      <summary>Guests</summary>
      <div class="flex column">
        <div>
          Adults:<button @click="removeAdult">-</button><span>{{ adults }}</span
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
    </details>
  </form>
  </section>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: ["stay"],
  // , "date"
  data() {
    return {
      adults: 0,
      children: 0,
      infants: 0,
      startDate: null,
      endDate: null,
      date: [],
    };
  },
  created() {
    // console.log('date', this.date);
  },
  computed: {
    // date() {
    //   console.log("date", this.date);
    //   return this.date;
    // },
  },
  methods: {
    onReserve() {
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
  },
  components: {
    DatePicker,
  },
};
</script>
