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
        }
    }
  }
</script>
