<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Emplois</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_job" @click="openModal('add')"><i
                class="fa-solid fa-plus"></i> Ajouter un emploi </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table mb-0 datatable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titre du poste</th>
                  <th>Département</th>
                  <th>Date de début</th>
                  <th>Date d'expiration</th>
                  <th class="text-center">Type de poste</th>
                  <th class="text-center">Statut</th>
                  <th>Candidats</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(job, index) in jobs" :key="job.id">
                  <td>{{ index + 1 }}</td>
                  <td><a>{{ job.title }}</a></td>
                  <td>{{ job.departmentName }}</td>
                  <td>{{ job.startDate}}</td>
                  <td>{{ job.expiredDate }}</td>
                  <td class="text-center">
                    <div class="dropdown action-label">
                      <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-regular fa-circle-dot" :class="{
                          'text-info': job.type === 'Temps plein',
                          'text-sucess': job.type === 'Temps partiel',
                          'text-danger': job.type === 'Stage',
                          'text-warning': job.type === 'Temporaire',
                          'text-warning': job.type === 'Autre'
                        }"></i>{{ job.type || 'Stage' }}
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" @click="updateType(job.id, 'Temps plein')">
                          <i class="fa-regular fa-circle-dot text-info"></i> Temps plein
                        </a>
                        <a class="dropdown-item" @click="updateType(job.id, 'Temps partiel')">
                          <i class="fa-regular fa-circle-dot text-success"></i> Temps partiel
                        </a>
                        <a class="dropdown-item" @click="updateType(job.id, 'Stage')">
                          <i class="fa-regular fa-circle-dot text-danger"></i> Stage
                        </a>
                        <a class="dropdown-item" @click="updateType(job.id, 'Temporaire')">
                          <i class="fa-regular fa-circle-dot text-warning"></i> Temporaire
                        </a>
                        <a class="dropdown-item" @click="updateType(job.id, 'Autre')">
                          <i class="fa-regular fa-circle-dot text-warning"></i> Autre
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">
                    <div class="dropdown action-label">
                      <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-regular fa-circle-dot" :class="{
                          'text-info': job.status === 'Ouvert',
                          'text-sucess': job.status === 'Fermé',
                          'text-danger': job.status === 'Annulé'
                        }"></i>{{ job.status || 'Annulé' }}
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" @click="updateStatus(job.id, 'Ouvert')"><i class="fa-regular fa-circle-dot text-info"></i>
                          Ouvert</a>
                        <a class="dropdown-item" @click="updateStatus(job.id, 'Fermé')"><i class="fa-regular fa-circle-dot text-success"></i>
                          Fermé</a>
                        <a class="dropdown-item" @click="updateStatus(job.id, 'Annulé')"><i class="fa-regular fa-circle-dot text-danger"></i>
                          Annulé</a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="job-applicants.html" class="btn btn-sm btn-primary">3 Candidates</a>
                  </td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                          class="material-icons">more_vert</i></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" @click="openModal('edit', job.id)" data-bs-toggle="modal"
                          data-bs-target="#add_job"><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a>
                        <a class="dropdown-item" @click="setDeleteJobId(job.id)" data-bs-toggle="modal"
                          data-bs-target="#delete_job"><i class="fa-regular fa-trash-can m-r-5"></i> Supprimer</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div id="add_job" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Titre du poste <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="job.title" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Département <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="job.departmentId" required>
                      <option disabled value="">--Select--</option>
                      <option v-for="(department, index) in departments" :key="index" :value="department.id">
                        {{ department.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Lieu de travail <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="job.location" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Nombre de postes vacants <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="job.noOfVacancies" required />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Experience <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="job.experience" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Age <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="job.age" required />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label"> Salaire de <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="job.salaryFrom" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Salaire à <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="job.salaryTo" required />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Type de poste <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="job.type" required>
                      <option>Temps plein</option>
                      <option>Temps partiel</option>
                      <option>Stage</option>
                      <option>Temporaire</option>
                      <option>Télétravail</option>
                      <option>Autres</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Statut <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="job.status" required>
                      <option>Ouvert</option>
                      <option>Fermé</option>
                      <option>Annulé</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Date de début <span class="text-danger">*</span></label>
                    <input type="date" class="form-control" :min="today" v-model="job.startDate" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Date d'expiration<span class="text-danger">*</span></label>
                    <input type="date" :min="today" class="form-control" v-model="job.expiredDate" required />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Description<span class="text-danger">*</span></label>
                    <textarea class="form-control" v-model="job.description" required></textarea>
                  </div>
                </div>
              </div>
              <input type="hidden" v-model="job.id">
              <div class="submit-section">
                <button class="btn btn-primary submit-btn" @click="submitJob">{{ modalButton }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_job" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer un poste</h3>
              <p>Etes-vous sûr de vouloir supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn" @click="deleteJob">Supprimer</a>
                </div>
                <div class="col-6">
                  <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Annuler</a>
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
export default {
  name: "job",
  data() {
    return {
      job: {
        id: "",
        departmentId: "",
        title: "",
        location: "",
        noOfVacancies: "",
        experience: "",
        age: "",
        status: "",
        salaryFrom: "",
        salaryTo: "",
        startDate: "",
        expiredDate: "",
        type: "",
        description: ""
      },
      modalButton: "",
      modalTitle: "",
      modalType: "",
      departments: [],
      jobs: [],
      deleteJobId: null,
      today: new Date().toISOString().split('T')[0],
    };
  },
  mounted() {
    this.getDepartments();
    this.listJobs();
  },
  methods: {
    getDepartments() {
      this.$axios.post("departement.php?action=getDepartments")
        .then((res) => {
          if (!res.data.error) {
            this.departments = res.data.departments;
          } else {
            console.error("Erreur lors de la récupération des départements : " + res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur!", error);
        });
    },
    openModal(type, id = null) {
      this.modalType = type;
      if (type === "add") {
        this.modalTitle = "Ajouter un poste";
        this.modalButton = "Soumettre";
        this.job = { id: "", departmentId: "", title: "", location: "", status: "", type: "", startDate: "", expiredDate: "", noOfVacancies: "", experience: "", description: "" }; // Réinitialiser les valeurs
      } else if (type === "edit") {
        this.modalTitle = "Modifier un poste";
        this.modalButton = "Enregistrer";
        this.fetchSingleJob(id);
      }
    },
    submitJob() {
      const data = new FormData();
      data.append("departmentId", this.job.departmentId);
      data.append("title", this.job.title);
      data.append("location", this.job.location);
      data.append("noOfVacancies", this.job.noOfVacancies);
      data.append("experience", this.job.experience);
      data.append("type", this.job.type);
      data.append("age", this.job.age);
      data.append("status", this.job.status);
      data.append("startDate", this.job.startDate);
      data.append("salaryFrom", this.job.salaryFrom);
      data.append("salaryTo", this.job.salaryTo);
      data.append("expiredDate", this.job.expiredDate);
      data.append("description", this.job.description);
      if (this.job.id) {
        data.append('id', this.job.id);
      }

      if (this.modalType === "add") {
        this.$axios.post("job.php?action=addJob", data)
          .then((res) => {
            if (!res.data.error) {
              alert("Offre d'emploi ajoutée avec succès");
              this.listJobs();
              this.job = { id: "", departmentId: "", title: "", location: "", status: "", type: "", startDate: "", expiredDate: "", noOfVacancies: "", experience: "", description: "" }; // Réinitialiser les valeurs
            } else {
              alert("Erreur lors de l'ajout de l'offre d'emploi : " + res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a eu une erreur", error);
          });
      } else if (this.modalType === "edit") {
        this.$axios.post("job.php?action=updateJob", data)
          .then((res) => {
            if (!res.data.error) {
              alert("Offre d'emploi mise à jour avec succès");
              this.job = { id: "", departmentId: "", title: "", location: "", status: "", type: "", startDate: "", expiredDate: "", noOfVacancies: "", experience: "", description: "" }; // Réinitialiser les valeurs
              this.listJobs();
            } else {
              console.error("Erreur", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Erreur", error);
          });
      } else {
        alert("Renseignez vos informations");
      }
    },
    fetchSingleJob(id) {
      if (!id) {
        console.error("ID de l'offre d'emploi manquant");
        return;
      }
      const url = `job.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.job = {
              id: res.data.data.id,
              departmentId: res.data.data.department_id,
              title: res.data.data.title,
              location: res.data.data.location,
              experience: res.data.data.experience,
              type: res.data.data.type,
              startDate: res.data.data.startDate,
              expiredDate: res.data.data.expiredDate,
              salaryFrom: res.data.data.salaryFrom,
              salaryTo: res.data.data.salaryTo,
              description: res.data.data.description,
              noOfVacancies: res.data.data.noOfVacancies,
              status: res.data.data.status,
              age: res.data.data.age
            };
          } else {
            console.error("Erreur lors de la récupération de l'offre d'emploi : " + res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeleteJobId(id) {
      this.deleteJobId = id;
    },
    deleteJob() {
      if (!this.deleteJobId) {
        console.error("ID de l'offre d'emploi manquant pour la suppression");
        return;
      }
      this.$axios.get(`job.php?action=deleteJob&id=${this.deleteJobId}`)
        .then((res) => {
          if (!res.data.error) {
            alert("Offre d'emploi supprimée avec succès");
            this.listJobs();
            this.deleteJobId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listJobs() {
      this.$axios.get("job.php?action=listJobs")
        .then((res) => {
          if (!res.data.error) {
            this.jobs = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    updateType(id, type) {
      const data = new FormData();
      data.append("id", id);
      data.append("type", type);

      this.$axios.post(`job.php?action=updateType`, data)
        .then(res => {
          console.log(res.data);
          if (!res.data.error) {
            alert('Type mis à jour avec succès');
            const jobIndex = this.jobs.findIndex(job => job.id === id);
            if (jobIndex !== -1) {
              this.jobs[jobIndex].type = type; 
            }
          } else {
            alert('Erreur lors de la mise à jour du statut : ' + res.data.message);
          }
        })
        .catch(error => {
          console.error('Erreur:', error.res ? error.res.data : error);
          alert('Une erreur s\'est produite. Vérifiez la console pour plus de détails.');
        });
    },
    updateStatus(id, status) {
      const data = new FormData();
      data.append("id", id);
      data.append("status", status);

      this.$axios.post(`job.php?action=updateStatus`, data)
        .then(res => {
          console.log(res.data);
          if (!res.data.error) {
            alert('Statut mis à jour avec succès');
            const jobIndex = this.jobs.findIndex(job => job.id === id);
            if (jobIndex !== -1) {
              this.jobs[jobIndex].status = status; 
            }
          } else {
            alert('Erreur lors de la mise à jour du statut : ' + res.data.message);
          }
        })
        .catch(error => {
          console.error('Erreur:', error.res ? error.res.data : error);
          alert('Une erreur s\'est produite. Vérifiez la console pour plus de détails.');
        });
    }
  }
};
</script>
