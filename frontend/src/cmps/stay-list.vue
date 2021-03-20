    <template>
  <section>
    <div class="list-container">
      <h1 v-if="this.$route.query.city" class="list-container h1"> Stays in {{this.$route.query.city}}</h1>
      <h1 v-else class="list-container h1"> Places to stay near you</h1>
    <ul class="stay-list clean-list preview-grid">
      <li class="list-card"
        v-for="stay in stays"
        :key="stay._id"
      >
        <stay-preview
          :stay="stay"
        />
        <!-- <button @click="removeStay(stay)">X</button> -->

        <!-- <router-link class="btn"
          :to="'/stay/' + stay._id"
          >Details</router-link> -->
        <!-- <router-link class="btn"
          :to="'/stay/edit/' + stay._id"
          >Edit</router-link
        > -->
      </li>
    </ul>
    </div>
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