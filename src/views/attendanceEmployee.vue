<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Présences</h3>
          </div>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="card punch-status">
            <div class="card-body">
              <h5 class="card-title">
                Fiche de temps <small class="text-muted">{{ currentDate }}</small>
              </h5>
              <div class="punch-det">
                <h6>Heure d'arrivée</h6>
                <p v-if="punchInTime">{{ punchInTime }}</p>
                <p v-else>Pas encore enregistrée</p>
              </div>
              <div class="punch-info">
                <div class="punch-hours">
                  <span>{{ workedHours }} heures</span>
                </div>
              </div>
              <div class="punch-btn-section">
                <input type="button" class="btn btn-primary punch-btn" value="Entrée" @click="handlePunch('in')" />
                <button type="button" class="btn btn-secondary punch-btn" @click="handlePunch('out')">
                  Sortie
                </button>
              </div>
              <div class="location-status" id="status">{{ locationStatus }}</div>
              <a id="map-link" target="_blank">{{ mapLinkText }}</a>
              <div class="statistics">
                <div class="row">
                  <div class="col-md-6 col-6 text-center">
                    <div class="stats-box">
                      <p>Pause</p>
                      <h6>30 mn</h6>
                    </div>
                  </div>
                  <div class="col-md-6 col-6 text-center">
                    <div class="stats-box">
                      <p>Heures supp</p>
                      <h6>3 hrs</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card att-statistics">
            <div class="card-body">
              <h5 class="card-title">Statistiques</h5>
              <div class="stats-list">
                <div class="stats-info">
                  <p>
                    Aujourd'hui
                    <strong>3.45 <small>/ 8 hrs</small></strong>
                  </p>
                  <div class="progress">
                    <div class="progress-bar bg-primary w-31" role="progressbar" aria-valuenow="31" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
                <div class="stats-info">
                  <p>
                    Cette semaine
                    <strong>28 <small>/ 40 hrs</small></strong>
                  </p>
                  <div class="progress">
                    <div class="progress-bar bg-warning w-31" role="progressbar" aria-valuenow="31" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
                <div class="stats-info">
                  <p>
                    Ce mois
                    <strong>90 <small>/ 160 hrs</small></strong>
                  </p>
                  <div class="progress">
                    <div class="progress-bar bg-success w-62" role="progressbar" aria-valuenow="62" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
                <div class="stats-info">
                  <p>
                    Remaining
                    <strong>90 <small>/ 160 hrs</small></strong>
                  </p>
                  <div class="progress">
                    <div class="progress-bar bg-danger w-62" role="progressbar" aria-valuenow="62" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
                <div class="stats-info">
                  <p>
                    Heures Supp <strong>4</strong>
                  </p>
                  <div class="progress">
                    <div class="progress-bar bg-info w-62" role="progressbar" aria-valuenow="22" aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card recent-activity">
            <div class="card-body">
              <h5 class="card-title">Activité d'aujourd'hui</h5>
              <ul class="res-activity-list">
                <li>
                  <p class="mb-0">Entrée à</p>
                  <p class="res-activity-time">
                    <i class="fa-regular fa-clock"></i>
                    {{ punchInTime }}
                  </p>
                </li>
                <li>
                  <p class="mb-0">Sortie à</p>
                  <p class="res-activity-time">
                    <i class="fa-regular fa-clock"></i>
                    {{ punchOutTime }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../stores/authStore';

export default {
  data() {
    return {
      userCoordinates: null,
      time: null,
      userStore: null,
      currentDate: new Date().toLocaleDateString(),
      punchInTime: null,
      punchOutTime: null,
      hasPunchedIn: false, 
      punchInDate: null,  
    };
  },
  mounted() {
    this.userStore = useUserStore();
    this.getPunchInTime();
    this.getPunchOutTime();
  },
  methods: {
    async handlePunch(action) {
      const position = await this.geoFindMe();
      if (position) {
        const { latitude, longitude } = position.coords;
        this.userCoordinates = { latitude, longitude };
        const punchTime = new Date();

        await this.checkAndSavePunch(action, latitude, longitude, punchTime);
      }
    },

    async checkAndSavePunch(action, latitude, longitude, punchTime) {
      try {
        const response = await axios.get('http://localhost/GestionPersonnel/backend/employe.php?action=getCoordinates');
        const locations = response.data.locations;

        const isWithinDistance = locations.some(location => {
          const distance = this.getDistanceFromLatLonInM(latitude, longitude, location.latitude, location.longitude);
          return distance < 100;
        });

        if (isWithinDistance) {
          const endpoint = action === 'in' ? 'saveEnterTime' : 'saveExitTime';
          const saveUrl = `http://localhost/GestionPersonnel/backend/attendance.php?action=${endpoint}`;
          const data = {
            time: punchTime.toISOString(),
            user_id: this.userStore.id,
          };

          try {
            const saveResponse = await axios.post(saveUrl, data);
            console.log(`Heure de ${action === 'in' ? 'entrée' : 'sortie'} enregistrée avec succès`, saveResponse.data);
          } catch (error) {
            console.error(`Erreur lors de l'enregistrement de l'heure de ${action === 'in' ? 'entrée' : 'sortie'}:`, error);
          }
        } else {
          console.log('Hors de portée de 100 mètres');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification ou de l\'enregistrement:', error);
      }
    },

    geoFindMe() {
      return new Promise((resolve, reject) => {
        const status = document.querySelector("#status");
        const mapLink = document.querySelector("#map-link");
        mapLink.href = "";
        mapLink.textContent = "";

        const success = (position) => {
          resolve(position);
        };

        const error = (error) => {
          console.error("Erreur de géolocalisation :", error);
          status.textContent = "Erreur de géolocalisation. Vérifiez vos paramètres.";
          reject(error);
        };

        if (!navigator.geolocation) {
          status.textContent = "La géolocalisation n'est pas supportée par votre navigateur.";
          reject(new Error("Géolocalisation non supportée"));
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
        }
      });
    },

    getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Rayon de la Terre en mètres
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // Distance en mètres
    }, 

    getPunchInTime() {
      this.$axios
        .post("attendance.php?action=getPunchInTime", { user_id: this.userStore.id })
        .then((res) => {
          if (!res.data.error) {
            this.punchInTime = res.data.punchInTime; 
          } else {
            console.error("Erreur :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },

    getPunchOutTime() {
      this.$axios
        .post("attendance.php?action=getPunchOutTime", { user_id: this.userStore.id })
        .then((res) => {
          if (!res.data.error) {
            this.punchOutTime = res.data.punchOutTime; 
          } else {
            console.error("Erreur :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },

  }
};
</script>
