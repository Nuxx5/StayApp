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
        <button
          class="filte-btn"
          v-if="filterBy.fromPrice <= 33 && filterBy.toPrice >= 3500"
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
        <el-slider v-model="priceRange" range :min="33" :max="3500">
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
                  placeholder="3500+"
                />
              </div>
            </div>
          </div>
          <div class="modal-price-btn flex space-between">
            <button>Clear</button>
            <button>Save</button>
          </div>
        </div>
      </div>
      <input
        type="number"
        placeholder="From Price"
        v-model="filterBy.fromPrice"
      />
      <input type="number" placeholder="To Price" v-model="filterBy.toPrice" />
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
        txt: "",
        startDate: null,
        endDate: null,
        capacity: 0,
        fromPrice: 33,
        toPrice: 3500,
      },
      isShown: false,
      priceRange: [],
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  created() {
    // this.filterBy = this.$store.getters.filterByForDisplay;
    console.log('this.filterBy created', this.filterBy);
  },
  methods: {
    setFilter() {
      // if (this.$route.path !== `/stay?city=${filterBy.txt}`) {
      //   this.$router.push(`/stay?city=${filterBy.txt}`);
      // }
      // this.filterBy = this.$store.getters.filterByForDisplay;
      console.log("this.filterBy1", this.filterBy);
      console.log("priceRange", this.priceRange[0]);
      console.log('this.$route.query', this.$route.query.city);
      if(this.$route.query.city){
        this.filterBy.txt = this.$route.query.city;
      } else this.filterBy.txt = '';
      console.log("this.filterBy2", this.filterBy);
      this.$emit("setFilter", this.filterBy);
      // this.$emit("setFilter", {
      //   fromPrice: this.filterBy.fromPrice,
      //   toPrice: this.filterBy.toPrice,
      // });
    },
    showModal() {
      console.log("this.isShown", this.isShown);
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