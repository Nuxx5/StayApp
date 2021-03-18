    <template>
  <section class="stay-preview flex column clickable" @click="openDetails">
    <p>{{ stay.name }}</p>
    <p>{{ stay.capacity }} guests</p>
    <p>${{ stay.price }} / night</p>
    <img :src="loadImg"/>
    <!-- <img class="card" src="@/assets/img/stay1.jpg"/> -->
  </section>    
</template>
<script>
export default {
  props: ["stay"],
  computed: {
    loadImg() {
      return this.stay.imgUrls[0]
    }
  },
  methods: {
    openDetails() {
      this.$router.push(`/stay/${this.stay._id}`)
    }
  }
}
</script>