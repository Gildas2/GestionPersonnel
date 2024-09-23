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
                <h6>Entrée à</h6>
                <p>{{ punchInTime }}</p>
              </div>
              <div class="punch-info">
                <div class="punch-hours">
                  <span>{{ workedHours }} heures</span>
                </div>
              </div>
              <div class="punch-btn-section">
                <input type="button" class="btn btn-primary punch-btn" value="Entrée" @click="handlePunchIn" />
                <button type="button" class="btn btn-secondary punch-btn" @click="punchOut">
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
                    11.00 AM.
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
export default {
  name: "attendanceEmployee",
  data() {
    return {
      currentDate: new Date().toLocaleDateString(),
      punchInTime: "",
      workedHours: 0,
      locationStatus: "",
      mapLinkText: "",
    };
  },
  methods: {
    handlePunchIn() {
      if (this.isMobileDevice()) {
        this.geoFindMe();
      } else {
        alert("Vous devez utiliser un appareil mobile pour enregistrer votre présence.");
      }
    },
    isMobileDevice() {
      return /Mobi|Android/i.test(navigator.userAgent);
    },
    geoFindMe() {
      this.locationStatus = "Locating…";
      if (!navigator.geolocation) {
        this.locationStatus = "La géolocalisation n'est pas supportée par votre navigateur.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.locationStatus = "";
          this.mapLinkText = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
          document.querySelector("#map-link").href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
          this.punchInTime = new Date().toLocaleTimeString(); // Set the punch-in time
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.locationStatus = "Vous avez refusé l'accès à la localisation.";
              break;
            case error.POSITION_UNAVAILABLE:
              this.locationStatus = "Les informations de localisation ne sont pas disponibles.";
              break;
            case error.TIMEOUT:
              this.locationStatus = "La demande de localisation a expiré.";
              break;
            case error.UNKNOWN_ERROR:
              this.locationStatus = "Une erreur inconnue est survenue.";
              break;
          }
        },
        { timeout: 10000 } // Timeout après 10 secondes
      );
    },
    punchOut() {
      // Logique pour enregistrer la sortie
    },
  },
};
</script>
