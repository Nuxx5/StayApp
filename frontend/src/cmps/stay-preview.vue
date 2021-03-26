<template>
  <section class="stay-preview clickable" @click="openDetails">
    <div class="preview-img">
      <img :src="loadImg" />
    </div>
    <p :class="{ opacity: noReviews }">
      <span v-if="!this.noReviews" style="color: #ff385c">󰀄</span> {{ rating }}
    </p>
    <div class="preview-txt">
      <p>{{ stay.loc.address }}</p>
      <p>{{ getName }}</p>
      <p>{{ stay.capacity }} guests</p>
      <p>
        <span class="bold">${{ stay.price }}</span> / night
      </p>
    </div>
    <!-- <img class="card" src="@/assets/img/stay1.jpg"/> -->
  </section>
</template>
<script>
export default {
  props: ["stay"],
  computed: {
    loadImg() {
      return this.stay.imgUrls[0];
    },
    rating() {
      return this.stay.reviews.length
        ? this.stay.reviews[0].rate + " (" + this.stay.reviews.length + ")"
        : "no reviews yet";
    },
    noReviews() {
      return !this.stay.reviews.length;
    },
    getName() {
      return this.stay.name.length <= 27
        ? this.stay.name
        : `${this.stay.name.substring(0, 27)}...`;
    },
  },
  methods: {
    openDetails() {
      this.$router.push(`/stay/${this.stay._id}`);
    },
  },
};
</script>