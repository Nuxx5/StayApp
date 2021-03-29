    <template>
  <section>
    <div class="list-container">
      <h1 v-if="this.$route.query.city" class="list-container h1">
        Stays in {{ this.$route.query.city }}
      </h1>
      <h1 v-else class="list-container h1">Places to stay near you</h1>
      <div class="list-filter">
        <button class="filter-btn">Cancellation flexibility</button>
        <button class="filter-btn">Type of place</button>
        <button
          class="filter-btn"
          v-if="filterBy.fromPrice <= 33 && filterBy.toPrice >= 500"
          @click="showModal"
        >
          Price
        </button>
        <button class="filte-btn" v-else @click="showModal">
          ${{ filterBy.fromPrice }} - ${{ filterBy.toPrice }}
        </button>
      </div>

      <div
        v-click-outside="onClickOutside"
        v-if="isShown"
        class="filter-price-modal flex column"
        :class="{ modal: isShown }"
      >
      <p class="price-header">The average nightly price is $130</p>
        <el-slider class="slider" v-model="priceRange" range :min="33" :max="500">
        </el-slider>
        <div class="modal-price">
          <div class="price-filter flex align-center">
            <div class="input-price">
              <label for="min-price">min price</label>
              <div>
                <span>$</span>
                <input
                  type="number"
                  id="min-price"
                  name="min-price"
                  placeholder="33"
                  min="33"
                  max="499"
                  v-model="priceRange[0]"
                />
              </div>
            </div>
            <span class="price-separator">-</span>
            <div class="input-price">
              <label for="max-price">max price</label>
              <div>
                <span>$</span>
                <input
                  type="number"
                  id="max-price"
                  name="max-price"
                  placeholder="500+"
                  min="34"
                  max="500"
                  v-model="priceRange[1]"
                />
              </div>
            </div>
          </div>
          <div class="modal-price-btn flex space-between">
            <button @click="clearPrice" class="clear-btn">Clear</button>
            <button @click="setFilter" class="save-btn">Save</button>
          </div>
        </div>
      </div>
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
        txt: "",
        startDate: null,
        endDate: null,
        capacity: 0,
        fromPrice: 33,
        toPrice: 500,
      },
      isShown: false,
      priceRange: [33, 500],
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    // this.filterBy = this.$store.getters.filterByForDisplay;
    console.log("this.filterBy created", this.filterBy);
  },
  methods: {
    setFilter() {
      this.filterBy.fromPrice = this.priceRange[0];
      this.filterBy.toPrice = this.priceRange[1];
      this.isShown = false;
      // if (this.$route.path !== `/stay?city=${filterBy.txt}`) {
      //   this.$router.push(`/stay?city=${filterBy.txt}`);
      // }
      // this.filterBy = this.$store.getters.filterByForDisplay;
      console.log("this.filterBy1", this.filterBy);
      console.log("priceRange", this.priceRange[0]);
      console.log("this.$route.query", this.$route.query.city);
      if (this.$route.query.city) {
        this.filterBy.txt = this.$route.query.city;
      } else this.filterBy.txt = "";
      console.log("this.filterBy2", this.filterBy);
      this.$emit("setFilter", this.filterBy);
    },
    showModal() {
      console.log("this.isShown", this.isShown);
      this.isShown = !this.isShown;
    },
    onClickOutside(event) {
      this.isShown = !this.isShown;
    },
    clearPrice() {
      this.priceRange = [33, 500];
    },
    fromPrice(minPrice) {
      console.log("minPrice", minPrice);
      if (minPrice < 33) minPrice = 33;
      this.filterBy.fromPrice = minPrice;
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