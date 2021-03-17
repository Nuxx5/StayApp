    <template>
  <section class="stay-preview flex column">
    <p>Stay: {{ stay.name }}</p>
    <p>Price: ${{ stay.price }}</p>
    <p>Capacity: {{ stay.capacity }}</p>
  </section>    
</template>
<script>
export default {
  props: ["stay"],
};
</script>