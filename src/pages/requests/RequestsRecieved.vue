<template>
  <section>
    <base-card>
      <header>
        <h2>Request Recieved</h2>
      </header>

      <!-- All the requests -->
      <ul v-if="hasRequests">
        <request-item
          v-for="req in recievedRequestes"
          :key="req.id"
          :email="req.userEmail"
          :message= "req.message"
        ></request-item>
      </ul>

      <h3 v-else>You haven't recieved any requests</h3>
      <button @click="show">show</button>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  computed: {
    recievedRequestes() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
      show() {
          console.log(this.$store.getters["requests/requests"]);
      }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
