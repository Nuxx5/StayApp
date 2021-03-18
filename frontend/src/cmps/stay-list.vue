    <template>
  <section>
    <ul class="stay-list clean-list">
      <li
        v-for="stay in stays"
        :key="stay._id"
        class="flex align-center"
      >
        <stay-preview
          :stay="stay"
        />
        <!-- <button @click="removeStay(stay)">X</button> -->

        <router-link class="btn"
          :to="'/stay/details/' + stay._id"
          >Details</router-link
        >
        <!-- <router-link class="btn"
          :to="'/stay/edit/' + stay._id"
          >Edit</router-link
        > -->
      </li>
    </ul>
  </section>
</template>

<script>
import stayPreview from "./stay-preview.vue";
export default {
  props: ["stays"],
  methods: {
    // toggleCompleted(stay) {
    //   stay = { ...stay };
    //   if (stay.completedAt) stay.completedAt = null;
    //   else stay.completedAt = Date.now();

    //   this.$emit("saveCanges", stay);
    //   // this.$emit('toggleCompleted', stay);
    // },
    removeStay(stay) {
      this.$emit("removeStay", stay);
    },
  },

  components: {
    stayPreview,
  },
};
</script>