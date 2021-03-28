    <template>
  <section>
    <div class="list-container">
      <h1 v-if="this.$route.query.city" class="list-container h1">
        Stays in {{ this.$route.query.city }}
      </h1>
      <h1 v-else class="list-container h1">Places to stay near you</h1>
      <div class="list-filter">
        <button class="filte-btn">Cancellation flexibility</button>
        <button class="filte-btn">Type of place</button>
        <button class="filte-btn" v-if="filterBy.fromPrice < 1 && filterBy.toPrice >= 1000" @click="showModal">Price</button>
        <button class="filte-btn" v-else @click="showModal">${{filterBy.fromPrice}} - ${{filterBy.toPrice}}</button>
      </div>

      <div v-click-outside="onClickOutside" v-if="isShown" class="filter-price-modal flex column"
        :class="{ modal: isShown }">
        <el-slider v-model="value" range :max="1000">
        </el-slider>
      </div>
      <input
        type="number"
        placeholder="From Price"
        v-model="filterBy.fromPrice"
      />
      <input
        type="number"
        placeholder="To Price"
        v-model="filterBy.toPrice"
      />
      <button @click="setFilter">Filter</button>
      <ul class="stay-list clean-list preview-grid">
        <li class="list-card" v-for="stay in stays" :key="stay._id">
          <stay-preview :stay="stay" />
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
import vClickOutside from "v-click-outside";
import stayPreview from "./stay-preview.vue";
export default {
  props: ["stays"],
  data() {
    return {
      filterBy: {
        txt: '',
        startDate: null,
        endDate: null,
        capacity: 0,
        fromPrice: 0,
        toPrice: 1000,
      },
      isShown: false,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
     setFilter() {
      console.log("this.filterBy", this.filterBy);
      this.$emit("setFilter", this.filterBy);
    },
    showModal() {
      console.log('this.isShown', this.isShown);
      this.isShown = !this.isShown;
    },
    onClickOutside(event) {
      this.isShown = !this.isShown;
    },
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