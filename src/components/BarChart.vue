<template>
  <div class="chart-container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: ['CDI', 'CDD'], 
        datasets: [{
          label : 'Nombre d\'employés',
          backgroundColor: ['#FF902F', '#FC6075'],
          data: [] 
        }]
      }
    };
  },

  async mounted() {
    this.loaded = false;

    try {
      const response = await axios.get('http://localhost/GestionPersonnel/backend/adminDashboard.php?action=barChart');
      const users = response.data;

      // Mettre à jour les données du graphique en fonction de la réponse API
      const cdiCount = users.find(user => user.contract === 'CDI')?.count || 0;
      const cddCount = users.find(user => user.contract === 'CDD')?.count || 0;

      // Mettre à jour les données du graphique
      this.chartData.datasets[0].data = [cdiCount, cddCount];
      this.loaded = true;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  }
}
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
