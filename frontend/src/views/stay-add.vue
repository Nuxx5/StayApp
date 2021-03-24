<template>
  <div class="host-container main-container">
    <div class="host-content flex">
      <div class="host-txt">
        <h2>BECOME A HOST</h2>
        <h1>A space to share,</h1>
        <h1>a world to gain</h1>
        <p>Hosting can help you turn your extra space into</p>
        <p>extra income and pursue more of what you love.</p>
        <button class="get-started-btn" @click="openForm">Get started</button>
      </div>
      <div class="host-form" v-if="isForm">
        <form class="main-form" @submit.prevent="addStay">
          <div class="form-header">
            Please fill out the details below about yourself and your stay
          </div>
          <div class="form-txt">
            <input
              type="text"
              class="form-input"
              v-model="stayToEdit.host.fullname"
              placeholder="Enter your full name"
            />
            <input
              type="text"
              class="form-input"
              v-model="stayToEdit.name"
              placeholder="Enter your stay name"
            />
            <input
              type="text"
              class="form-input"
              v-model="stayToEdit.summary"
              placeholder="Describe your stay"
            />
            <select v-model="stayToEdit.loc.address" class="form-input">
              <option value disabled>Located at</option>
              <option value="Toronto">Toronto</option>
              <option value="London">London</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Haifa">Haifa</option>
            </select>
            <input
              type="number"
              min="0"
              class="form-input"
              v-model="stayToEdit.price"
              placeholder="How much will you charge per night"
            />
            <input
              type="number"
              min="0"
              class="form-input"
              v-model="stayToEdit.capacity"
              placeholder="How many guests can you accommodate"
            />
          </div>
          <button class="apply-btn">Apply</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { stayService } from "../services/stay.service.js";
export default {
  name: "stay-add",
  data() {
    return {
      stayToEdit: stayService.getEmptyStay(),
      isForm: false,
    };
  },
  methods: {
    openForm() {
      this.isForm = true;
    },
    addStay() {
      const stay = { ...this.stayToEdit };
      console.log("stay add", stay);
      this.$store.dispatch({ type: "saveStay", stay }).then(() => {
        // showMsg('Stay added')
        this.stayToEdit = stayService.getEmptyStay();
        this.$router.push("/stay");
      });
      // .catch(err => {
      //     showMsg('Cannot add Stay', 'danger')
      // })
    },
  },
};
</script>