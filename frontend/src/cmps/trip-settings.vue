<template>
  <form @submit.prevent="onReserve">
    <div class="flex column">
      <label for="start">Check in:</label>
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
      />
    </div>
    <details>
      <summary>Guests</summary>
      
        
        Adults:<button @click="removeAdult">-</button><span>{{ adults }}</span
        ><button @click="addAdult">+</button>
      
      
        Children:<button @click="removeChild">-</button
        ><span>{{ children }}</span
        ><button @click="addChild">+</button>
      
      
        Infants:<button @click="removeInfant">-</button
        ><span>{{ infants }}</span
        ><button @click="addInfant">+</button>
      
      
    </details>
    <input type="submit" value="Reserve">
  </form>
</template>

<script>
export default {
    data() {
    return {
      adults: 0,
      children: 0,
      infants: 0,
      startDate: null,
      endDate: null
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
    }
  }
</script>
