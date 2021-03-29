<template>
  <section class="stay-preview clickable" @click="openDetails">
    <div class="preview-img">
      <el-carousel :autoplay="false" trigger="click">
        <el-carousel-item v-for="item in 5" :key="item">
          <img :src="loadImg(item)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <p class="preview-txt-header" :class="{ opacity: noReviews }">
      <span v-if="!this.noReviews" style="color: #ff385c">󰀄 </span><span class="bold">{{ rating }}</span><span v-if="!this.noReviews" class="opacity">{{ reviews }}</span>
    </p>
    <div class="preview-txt">
      <p>{{ stay.loc.address }}</p>
      <p>{{ getName }}</p>
      <p>{{ stay.capacity }} guests</p>
      <p>
        <span class="bold">${{ stay.price }}</span> / night
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: ["stay"],
  computed: {
    // loadImg() {
    //   return this.stay.imgUrls[idx];
    // },
    rating() {
      if(this.stay.reviews.length){
        const reviewsRate = this.stay.reviews.map(reviews => reviews.rate)
        const reviewsRateAvg = reviewsRate.reduce(function(sum, val){
          return sum + val;
        }, 0) / reviewsRate.length;
        return reviewsRateAvg.toFixed(2);
      }
      else return 'no reviews yet';
    },
    reviews() {
      return ' (' + (this.stay.reviews.length ** 4 + 52) +')'
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
    loadImg(idx) {
      return this.stay.imgUrls[idx-1];
    },
  },
};
</script>