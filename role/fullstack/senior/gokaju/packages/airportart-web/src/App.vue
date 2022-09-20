<script setup lang="ts">
import AirportCard from "./components/AirportCard.vue";
import AirportsLayout from "./components/AirportsLayout.vue";
import AirportsContainer from "./components/AirportsContainer.vue";
import { AirportService, Airport } from "./services/airports";
import { HttpService } from "./services/http";
import { ref, onMounted } from "vue";

const airportService = new AirportService(new HttpService());

const airports = ref<Airport[]>([]);
const loading = ref(false);
const orderBy = ref("priorityOrder");
const total = ref(0);
const getAirPorts = async () => {
  loading.value = true;
  const airportList = await airportService.getAirports(orderBy.value);
  airports.value = airportList.airports;
  total.value = airportList.total;
  loading.value = false;
};

onMounted(async () => {
  getAirPorts();
  console.log("mounted", import.meta.env.VITE_API_URL);
});
</script>

<template>
  <AirportsLayout>
    <div class="title">AZULO | Gokaju Technical Test</div>
    <div>List of airports</div>
    <div class="header">
      <label for="orderBy"> order By :</label>
      <select v-model="orderBy" id="orderBy" @change="getAirPorts">
        <option value="name">Name</option>
        <option value="priorityOrder">Priority</option>
        <option value="airportOperatorId">Airport Operator</option>
      </select>
    </div>
    <AirportsContainer>
      <AirportCard
        v-for="airport in airports"
        :key="airport.id"
        :code="airport.code"
        :name="airport.name"
        :province-or-state="airport.state"
        :country="airport.country"
        :airport-operator="airport.operator"
      />
    </AirportsContainer>
    <div class="footer">total: {{ total }}</div>
  </AirportsLayout>
</template>

<style scoped>
.header {
  font-size: 1em;
  display: flex;
  justify-content: flex-end;
}
.title {
  font-size: 1.5em;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}
.footer {
  font-size: 1em;
  text-align: right;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
