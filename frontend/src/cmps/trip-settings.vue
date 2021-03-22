<template>
  <form @submit.prevent="onReserve" class="trip-settings">
    <div class="dates-reserve-container flex column">
      <div class="dates-reserve flex space-between">
        <span class="check-in">Check-in</span>|
        <span class="check-out">Check-out</span>
      </div>
      <date-picker v-model="date" value-type="format" format="MMM DD, YYYY" range range-separator="                   "></date-picker>
      <!-- <label for="start">Check in:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        value="2021-03-17"
        min="2021-03-17"
        max="2031-12-31"
        v-model="startDate"
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
        v-model="endDate"
      /> -->
    </div>
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
    <input type="submit" value="Reserve" class="reserve-submit-btn">
  </form>
</template>

<script>
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
export default {
    data() {
    return {
      adults: 0,
      children: 0,
      infants: 0,
      startDate: null,
      endDate: null,
      date: [],
      }
    },
    methods:{
        onReserve(){
            
            console.log('emiting...')
            let reservation = {startDate:this.startDate,endDate:this.endDate,infants:this.infants,children:this.children,adults:this.adults}
            this.$emit("reservationMade",reservation)
        },
        addAdult(ev) {
          ev.preventDefault()
      this.adults++;
    },
    removeAdult(ev) {
      ev.preventDefault()
      this.adults--;
      if (this.adults < 0) this.adults = 0;
    },
    addChild(ev) {
      ev.preventDefault()
      this.children++;
    },
    removeChild(ev) {
      ev.preventDefault()
      this.children--;
      if (this.children < 0) this.children = 0;
    },
    addInfant(ev) {
      ev.preventDefault()
      this.infants++;
    },
    removeInfant(ev) {
      ev.preventDefault()
      this.infants--;
      if (this.infants < 0) this.infants = 0;
    }
    },
    components: {
      DatePicker
    }
  }
</script>
