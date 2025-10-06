<template>
  <div class="chart-container">
    <Doughnut
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { onMounted, ref } from "vue";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: ['Cadre', 'Cadre supérieur', 'Employé', 'Cadre moyen'],
  datasets: [
    {
      backgroundColor: ['#FF902F', '#36A2EB', '#6C757D', '#FC6075'],
      data: []
    }
  ]
});

const chartOptions = ref({
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
    }
  }
});

const loaded = ref(false);

onMounted(async () => {
  try {
    let response = await axios.get("http://localhost/GestionPersonnel/backend/adminDashboard.php?action=donutChart");
    let data = response.data;

    // Transformer les données reçues en un format utilisable par le graphique
    const categories = ['Employé', 'Cadre moyen', 'Cadre', 'Cadre supérieur'];
    const counts = categories.map(cat => {
      const category = data.find(d => d.csp === cat);
      return category ? category.count : 0;
    });

    chartData.value.datasets[0].data = counts;
    loaded.value = true;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.chart-container {
  max-width: 600px;
  max-height: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
