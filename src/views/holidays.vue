<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Congés</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="admin-dashboard.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Congés</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_holiday" @click="openModal('add')">
              <i class="fa-solid fa-plus"></i> Ajouter des congés
            </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom de l'employé</th>
                  <th>Date de début</th>
                  <th>Date de fin</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="holiday-upcoming" v-for="(holiday, index) in holidays" :key="holiday.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ holiday.firstName }} {{ holiday.lastName }}</td>
                  <td>{{ formatDate(holiday.startDate) }}  </td>
                  <td>{{ formatDate(holiday.endDate) }}</td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a href="holidays.html#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="material-icons">more_vert</i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_holiday" @click="openModal('edit', holiday.id)">
                          <i class="fa-solid fa-pencil m-r-5"></i> Modifier
                        </a>
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_holiday" @click="setDeleteHolidayId(holiday.id)">
                          <i class="fa-regular fa-trash-can m-r-5"></i> Supprimer
                        </a>
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

    <div class="modal custom-modal fade" id="add_holiday" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-block mb-3">
                <label class="col-form-label">Nom de l'employé<span class="text-danger">*</span></label>
                <select class="form-control" required v-model="Holiday.employeId">
                  <option disabled value="">Sélectionner un employé</option>
                  <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                    {{ employe.lastName }} {{ employe.firstName }} 
                  </option>
                </select>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Date de début<span class="text-danger">*</span></label>
                <input class="form-control" type="date" v-model="Holiday.dateDebut" :min="today" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Date de fin<span class="text-danger">*</span></label>       
                <input class="form-control" type="date" v-model="Holiday.dateFin" :min="today" required/>   
              </div>
              <input type="hidden" v-model="Holiday.id" />
              <div class="submit-section">
                <button class="btn btn-primary submit-btn" type="button" @click="submitData">
                  {{ modalButton }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_holiday" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer des congés</h3>
              <p>Êtes-vous sûr de vouloir effacer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn" @click="deleteHoliday">Supprimer</a>
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
  name: "holidays",
  data() {
    return {
      Holiday: {
        id: "",
        employeId: "",
        dateDebut: "",
        dateFin: ""
      },
      holidays: [],
      employees: [],
      modalTitle: "",
      modalButton: "",
      modalType: "",
      deleteHolidayId: "",
      today: new Date().toISOString().split('T')[0],
    };
  },
  mounted() {
    this.getEmployees();
    this.listHoliday();
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
    getEmployees() {
      this.$axios.get("employe.php?action=getEmployees")
        .then((res) => {
          if (!res.data.error) {
            this.employees = res.data.employees;
          } else {
            console.error("Erreur lors de la récupération des employés :" + res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a une erreur!", error);
        });
    },
    openModal(type, id = null) {
      this.modalType = type;
      if (type === "add") {
        this.modalTitle = "Ajouter des congés";
        this.modalButton = "Créer";
        this.Holiday = { id: null, employeId: "", dateDebut: "", dateFin: "" };
      } else if (type === "edit") {
        this.modalTitle = "Modifier les congés";
        this.modalButton = "Enregistrer";
        this.fetchSingleHoliday(id);
      }
    },
    fetchSingleHoliday(id) {
      if (!id) {
        console.error("ID des congés manquants");
        return;
      }
      this.$axios.get(`holiday.php?action=fetchSingle&id=${id}`)
        .then((res) => {
          if (!res.data.error) {
            this.Holiday = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              dateDebut: res.data.data.startDate,
              dateFin: res.data.data.endDate,
            };
          } else {
            console.error("Erreur lors de la récupération des congés : " + res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a une erreur lors de la récupération des données:", error);
        });
    },
    submitData() {
      const data = new FormData();
      data.append("employeId", this.Holiday.employeId);
      data.append("dateDebut", this.Holiday.dateDebut);
      data.append("dateFin", this.Holiday.dateFin);
      if (this.Holiday.id) {
        data.append("id", this.Holiday.id);
      }

      if(this.Holiday.employeId != "" && this.Holiday.dateDebut != "" && this.Holiday.dateFin != ""){
        if (this.modalType === "add") {
          this.$axios.post("holiday.php?action=addHoliday", data)
          .then((res) => {
            if (!res.data.error) {
              this.listHoliday();
              console.log("Congés ajoutés avec succès:", res.data);
            } else {
              console.error("Erreur lors de l'ajout du congé:", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a une erreur lors de l'ajout du congé:", error);
          });
      } else if (this.modalType === "edit") {
        this.$axios.post("holiday.php?action=updateHoliday", data)
          .then((res) => {
            if (!res.data.error) {
              console.log("Congé mis à jour avec succès:", res.data);
              this.listHoliday();
            } else {
              console.error("Erreur lors de la mise à jour du congé:", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a une erreur lors de la mise à jour du congé:", error);
          });
      }
      }
    },
    listHoliday() {
      this.$axios.get("holiday.php?action=listHoliday")
        .then((res) => {
          if (!res.data.error) {
            this.holidays = res.data.elements;
          } else {
            console.error("Erreur lors de la récupération des congés:", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a une erreur lors de la récupération des congés:", error);
        });
    },
    setDeleteHolidayId(id) {
      this.deleteHolidayId = id;
    },
    deleteHoliday() {
      this.$axios.get(`holiday.php?action=deleteHoliday&id=${this.deleteHolidayId}`)
        .then((res) => {
          if (!res.data.error) {
            this.listHoliday();
            $("#delete_holiday").modal("hide");
            console.log("Congé supprimé avec succès:", res.data);
          } else {
            console.error("Erreur lors de la suppression du congés:", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Il y a une erreur lors de la suppression du congés:", error);
        });
    },
  }
};

</script>