<template>

    <div class="page-wrapper">

        <div class="content container-fluid pb-0">

            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Bienvenue {{ userStore.role }}!</h3>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="fa-solid fa-calendar-alt"></i></span>
                            <div class="dash-widget-info">
                                <h3>{{ holidayCount }}</h3>
                                <span>Congés</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="fa-solid fa-user-check"></i></span>
                            <div class="dash-widget-info">
                                <h3>{{ leaveCount }}</h3>
                                <span>Présences</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="fa-regular fa-building"></i></span>
                            <div class="dash-widget-info">
                                <h3>{{ departmentCount }}</h3>
                                <span>Départements</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                    <div class="card dash-widget">
                        <div class="card-body">
                            <span class="dash-widget-icon"><i class="fa-solid fa-user"></i></span>
                            <div class="dash-widget-info">
                                <h3>{{ employeCount }}</h3>
                                <span>Employés</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="card-title">Répartition par contrat</h3>
                                    <BarChart />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="card-title">Répartition par catégorie</h3>
                                    <DonutChart></DonutChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { useUserStore } from "../stores/authStore";
import BarChart from "../components/BarChart.vue";
import DonutChart from '../components/DonutChart.vue';

export default {
  name: "Dashboard",
  components : {
    BarChart,
    DonutChart
  },
  data() {
    const userStore = useUserStore();
    return {
      userStore,
      departmentCount : 0,
      holidayCount: 0,
      employeCount : 0,
      leaveCount: 0
    }
  },
  mounted() {
    this.fetchDepartmentCount();
    this.fetchHolidayCount();
    this.fetchEmployeCount();
    this.fetchLeaveCount();
  },
  methods: {
    //Compter le nombre de departements
    fetchDepartmentCount() {
        this.$axios.get('adminDashboard.php?action=countDepartments') 
        .then((response) => {
          this.departmentCount = response.data.count;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des départements :', error);
        });
    },

     //Compter le nombre d'employés
     fetchEmployeCount() {
        this.$axios.get('adminDashboard.php?action=countUsers') 
        .then((response) => {
          this.employeCount = response.data.count;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des départements :', error);
        });
    },

    //Compter le nombre d'employés en congés
    fetchHolidayCount() {
        this.$axios.get('adminDashboard.php?action=countHoliday') 
        .then((response) => {
          this.holidayCount = response.data.count;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des départements :', error);
        });
    },
    fetchLeaveCount() {
        this.$axios.get('adminDashboard.php?action=countLeave') 
        .then((response) => {
          this.leaveCount = response.data.count;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des départements :', error);
        });
    }    
  },
};
</script>

