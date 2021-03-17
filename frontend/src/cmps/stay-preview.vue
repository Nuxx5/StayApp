    <template>
  <section class="stay-preview flex">
    <p>Stay: {{ stay.name }}</p>
    <p>Price: ${{ stay.price }}</p>
    <p>Type: {{ stay.capacity }}</p>
  </section>    
</template>
<script>
export default {
  props: ["stay"],
};
</script>