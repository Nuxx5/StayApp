    <template>
  <section class="stay-preview flex column">
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
  }
}
</script>