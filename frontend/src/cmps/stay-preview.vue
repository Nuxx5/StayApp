    <template>
  <section class="stay-preview flex column clickable" @click="openDetails">
    <img :src="loadImg"/>
    <p :class="{opacity:noReviews}">{{ rating }}</p>
    <p>{{ stay.name }}</p>
    <p>{{ stay.capacity }} guests</p>
    <p><span class="bold">${{ stay.price }}</span> / night</p>
    <!-- <img class="card" src="@/assets/img/stay1.jpg"/> -->
  </section>    
</template>
<script>
export default {
  props: ["stay"],
  computed: {
    loadImg() {
      return this.stay.imgUrls[0]
    },
    rating() {
      return this.stay.reviews.length? '⭐ ' + this.stay.reviews[0].rate + ' (' + this.stay.reviews.length + ')' : 'no reviews yet'
    },
    noReviews() {
      return !this.stay.reviews.length 
    }
  },
  methods: {
    openDetails() {
      this.$router.push(`/stay/${this.stay._id}`)
    },
  }
}
</script>