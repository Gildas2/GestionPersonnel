<template>
  <div class="page-wrapper job-wrapper">
    <div class="content container pb-0">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Jobs</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a>Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Jobs</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row" v-for="job in jobs" :key="job.id">
        <div class="col-md-8">
          <div class="job-info job-widget">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-dept">{{ job.departmentName }}</span>
            <ul class="job-post-det">
              <li>
                <i class="fa-regular fa-calendar-days"></i> Date de publication:
                <span class="text-blue">{{ formatDate(job.startDate) }}</span>
              </li>
              <li>
                <i class="fa-regular fa-calendar-days"></i> Dernière date:
                <span class="text-blue">{{ formatDate(job.expiredDate) }}</span>
              </li>
              <li>
                <i class="fa-regular fa-user"></i> Applications:
                <span class="text-blue">4</span>
              </li>
              <li>
                <i class="fa-solid fa-eye"></i> Views:
                <span class="text-blue">3806</span>
              </li>
            </ul>
          </div>
          <div class="job-content job-widget">
            <div class="job-desc-title">
              <h4>Description de l'emploi</h4>
            </div>
            <div class="job-description">
              <p>{{ job.description }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-det-info job-widget">
            <a class="btn job-btn" data-bs-toggle="modal" data-bs-target="#apply_job">Postuler pour cet emploi</a>
            <div class="info-list">
              <span><i class="fa-solid fa-chart-column"></i></span>
              <h5>Type d'emploi</h5>
              <p>{{ job.type }}</p>
            </div>
            <div class="info-list">
              <span><i class="fa-regular fa-money-bill-1"></i></span>
              <h5>Salaire</h5>
              <p>${{ job.salaryFrom }} - ${{ job.salaryTo }}</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-suitcase"></i></span>
              <h5>Experience</h5>
              <p>{{ job.experience }} ans</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-ticket"></i></span>
              <h5>Poste vacant</h5>
              <p>{{ job.noOfVacancies }}</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-signs-post"></i></span>
              <h5>Situation géographique</h5>
              <p>
                {{ job.location }}
              </p>
            </div>
            <div class="info-list">
              <p>
                <br />

              </p>
            </div>
            <div class="info-list text-center">
              <a class="app-ends">Fin de la candidature dans 2d 7h 6m</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="apply_job" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajoute tes détails</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">  <span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitApplication">
              <div class="input-block mb-3">
                <label class="col-form-label">Nom complet <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="apply.name" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Addresse Email <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="apply.email" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Numéro <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="apply.phoneNumber" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Message</label>
                <textarea class="form-control" v-model="apply.message"></textarea>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Télécharger ton CV <span class="text-danger">*</span></label>
                <input type="file" class="form-control" id="cv_upload" ref="cv_upload" required/>
              </div>
              <div class="submit-section">
                <button class="btn btn-primary submit-btn" type="submit">
                  Envoyer la candidature
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
      apply: {
        name: '',
        email: '',
        phoneNumber : '',
        message: '',
        file: null,
      },
    };
  },
  methods: {
    formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);

      // Sépare la date pour mettre la première lettre du mois en majuscule
      const dateParts = formattedDate.split(' ');
      dateParts[1] = dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1);

      return dateParts.join(' ');
    },
    listJobs() {
      this.$axios.get("job.php?action=listJobs")
        .then((res) => {
          if (!res.data.error) {
            this.jobs = res.data.elements || [];
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des jobs", error);
        });
    },
    submitApplication() {
      const formData = new FormData();
      formData.append('name', this.apply.name);
      formData.append('email', this.apply.email);
      formData.append('phoneNumber', this.apply.phoneNumber);
      formData.append('message', this.apply.message);
      formData.append('file', this.$refs.cv_upload.files[0]);

      this.$axios.post('jobView.php?action=addApplicant', formData)
        .then((response) => {
          console.log('Application soumise avec succès', response);
        })
        .catch((error) => {
          console.error('Erreur lors de la soumission de la demande', error);
        });
    }
  },
  mounted() {
    this.listJobs();
  }
};
</script>
