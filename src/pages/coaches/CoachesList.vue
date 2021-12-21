<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
        <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register">Register as a coach</base-button>
        </div>
        <ul v-if="filteredCoaches">
        <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                    {{ coach.firstName }}
                </li> -->
        <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.firstName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
        ></coach-item>
        </ul>
        <h1 v-else>No Coaches Found</h1>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      // return this.$store.getters["coaches/coaches"];
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true;
        } 
        if(this.activeFilters.backend && coach.areas.includes('backend')){
          return true;
        }
        if(this.activeFilters.career && coach.areas.includes('career')){
          return true;
        }
        
        return false;
      })
    },


  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    }
  },
  data() {
    return {
        activeFilters: {
          frontend: true,
          backend: true,
          career: true,
        }
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>