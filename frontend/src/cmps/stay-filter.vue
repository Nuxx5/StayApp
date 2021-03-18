<template>
  <form class="stay-filter  space-evenly">
    <div class="flex column">
      <label> search a stay: </label>
      <input
      type="text"
      v-model="filterBy.txt"
      @input="setFilter"
      placeholder="Where are you going?"
    />
    </div>
     <div class="flex column">
    <label for="start">Check in:</label>
    <input type="date" id="start" name="trip-start"
       value="2021-03-17"
       min="2021-03-17" max="2031-12-31" v-model="filterBy.startDate"
      @input="setFilter">
     </div>
     <div class="flex column">
    <label for="end">Check out:</label>
    <input type="date" id="end" name="trip-end"
       value="2021-03-19"
       min="2021-03-17" max="2031-12-31" v-model="filterBy.endDate"
      @input="setFilter">
     </div>
      <div  class="flex column">
    <label> Add guests: <span>{{sumOfGuests}}</span></label>
  <p>Adults:<button @click="removeAdult">-</button><span>{{adults}}</span><button @click="addAdult">+</button></p>
  <p>Children:<button @click="removeChild">-</button><span>{{children}}</span><button @click="addChild">+</button></p>
  <p>Infants:<button @click="removeInfant">-</button><span>{{infants}}</span><button @click="addInfant">+</button></p>
     </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
        adults: 0,
        children: 0,
        infants: 0,
      filterBy: {
        txt: '',
        startDate: null,
        endDate: null,
        capacity: 0,
      },
    };
  },
  computed: {
        sumOfGuests() {
        console.log('in methods')  
        this.filterBy.capacity = this.adults + this.children + this.infants
        return this.filterBy.capacity
  },
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
//     sumOfGuests() {
//         console.log('in methods')  
//         this.filterBy.capacity = this.adults + this.children + this.infants
//         return this.filterBy.capacity
//   },
    addAdult(){
        this.adults++
    },
    removeAdult(){
        this.adults--
    },
    addChild(){
        this.children++
    },
    removeChild(){
        this.children--
    },
    addInfant(){
        this.infants++
    },
    removeInfant(){
        this.infants--
    }
  },
};
</script>