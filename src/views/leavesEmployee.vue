<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Permissions</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_leave" @click="openModal('add')"><i
                class="fa-solid fa-plus"></i>
              Demander une permission</a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table leave-employee-table mb-0 datatable">
              <thead>
                <tr>
                  <th>Date de début</th>
                  <th>Date de fin</th>
                  <th>Nombre de jours</th>
                  <th>Raison</th>
                  <th class="text-center">Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="leave in leaves" :key="leave.id">
                  <td>{{ formatDate(leave.from) }}</td>
                  <td>{{ formatDate(leave.to) }}</td>
                  <td>{{ leave.numberOfDay }}</td>
                  <td>{{ leave.leaveReason }}</td>
                  <td class="text-center">
                    <div class="action-label">
                      <a class="btn btn-white btn-sm btn-rounded" href="javascript:void(0);">
                        <i class="fa-regular fa-circle-dot" :class="{
                          'text-purple': leave.status === 'Nouveau',
                          'text-info': leave.status === 'En attente',
                          'text-success': leave.status === 'Approuvé',
                          'text-danger': leave.status === 'Rejeté'
                        }"></i> {{ leave.status || 'Nouveau'}}
                      </a>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a href="leaves.html#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false"><i class="material-icons">more_vert</i></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_leave"
                          @click="openModal('edit', leave.id)"><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a>
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_approve"
                          @click="setDeleteLeaveId(leave.id)"><i class="fa-regular fa-trash-can m-r-5"></i>
                          Supprimer</a>
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

    <div id="add_leave" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitLeave">
              <div class="input-block mb-3">
                <label class="col-form-label">Date de début <span class="text-danger">*</span></label>
                <input type="date" class="form-control" v-model="Leave.from" :min="today" @change="calculateDays" required />
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Date de fin <span class="text-danger">*</span></label>
                <input type="date" class="form-control" v-model="Leave.to" :min="today" @change="calculateDays" required />
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Nombre de jours <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="Leave.noDays" readonly required>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Raison de l'absence <span class="text-danger">*</span></label>
                <textarea rows="4" class="form-control" v-model="Leave.reason" required></textarea>
              </div>
              
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="approve_leave" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Approuver</h3>
              <p>Êtes-vous sûr de vouloir approuver pour cet absence ?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn">Approuver</a>
                </div>
                <div class="col-6">
                  <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Decliner</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_approve" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer l'absence</h3>
              <p>Êtes-vous sûr de vouloir supprimer cet absence?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn" @click="deleteLeave">Supprimer</a>
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

    <Modal :popupMessage="popupMessage" :show="isModalVisible" @close="isModalVisible = false"/>

    <!-- Utilisation de ModalHandler -->
    <ModalHandler ref="modalHandler" />
  </div>
</template>

<script>
import { useUserStore } from "../stores/authStore";
import Modal from './modal.vue';
import ModalHandler from './modalHandler.vue';

export default {
  name: "leaves",
  components: {
    Modal, 
    ModalHandler
  },
  data() {
    return {
      date: null,
      Leave: {
        employeId: "",
        from: "",
        to: "",
        noDays: "",
        reason: ""
      },
      leaves: [],
      employees: [],
      modalTitle: "",
      modalButton: "",
      modalType: "",
      deleteLeaveId: null,
      today: new Date().toISOString().split('T')[0],
      popupMessage: '',
      isModalVisible: false,
      id: null,
    };
  },
  created() {
      // Initialiser userStore
        this.userStore = useUserStore();
      // Assigner directement l'ID sans condition
        this.id = this.userStore.id;
    },
  mounted() {
    this.getEmployees();
    this.listLeaves();
  },
  methods: {
    showModal(message) {
      this.popupMessage = message;
      this.isModalVisible = true;
    },
    formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
      const dateParts = formattedDate.split(' ');
      dateParts[1] = dateParts[1].charAt(0).toUpperCase() + dateParts[1].slice(1);
      return dateParts.join(' ');
    },
    calculateDays() {
      if (this.Leave.from && this.Leave.to) {
        const startDate = new Date(this.Leave.from);
        const endDate = new Date(this.Leave.to);
        const timeDiff = endDate - startDate;
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        this.Leave.noDays = dayDiff > 0 ? dayDiff : 0;
      } else {
        this.Leave.noDays = 0;
      }
    },
    getEmployees() {
      this.$axios.get("employe.php?action=getEmployees")
        .then((res) => {
          if (!res.data.error) {
            this.employees = res.data.employees;
          } else {
            console.error("Erreur lors de la récupération des employés :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },
    openModal(type, id = null) {
      this.modalType = type;
      if (type === "edit") {
        this.modalTitle = "Modifier une permission";
        this.modalButton = "Enregistrer";
        this.fetchSingleLeave(id);
      } else if (type === "add") {
        this.modalTitle = "Ajouter une permission";
        this.modalButton = "Ajouter";
        this.Leave = { id: null, employeId: "", from: "", to: "", noDays: "", reason: "" };
      }
    },
    fetchSingleLeave(id) {
      if (!id) {
        console.error("ID de l'absence manquant");
        return;
      }
      this.$axios.get(`leave.php?action=fetchSingleLeave&id=${id}`)
        .then((res) => {
          if (!res.data.error) {
            this.Leave = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              from: res.data.data.from,
              to: res.data.data.to,
              noDays: res.data.data.numberOfDay,
              reason: res.data.data.leaveReason
            };
          } else {
            console.error("Erreur lors de la récupération de l'absence :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },
    submitLeave() {
      const data = new FormData();
      data.append("employeId", this.userStore.id);
      data.append("from", this.Leave.from);
      data.append("to", this.Leave.to);
      data.append("noDays", this.Leave.noDays);
      data.append("reason", this.Leave.reason);
      if (this.Leave.id) {
        data.append("id", this.Leave.id);
      }

      const url = this.Leave.id ? "leave.php?action=updateLeave" : "leave.php?action=addLeave";
      this.$axios.post(url, data)
        .then((res) => {
          if (!res.data.error) {
            this.$refs.modalHandler.closeModal('add_leave');
            this.showModal(this.Leave.id ? "Absence mise à jour avec succès" : "Absence ajoutée avec succès");
            this.listLeaves();
          } else {
            console.error("Erreur :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },
    listLeaves() {
      this.$axios.get(`leave.php?action=listLeave&id=${this.userStore.id}`)
        .then((res) => {
          if (!res.data.error) {
            this.leaves = res.data.elements;
          } else {
            console.error("Erreur lors de la récupération des absences :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },
    setDeleteLeaveId(id) {
      this.deleteLeaveId = id;
    },
    deleteLeave() {
      this.$axios.get(`leave.php?action=deleteLeave&id=${this.deleteLeaveId}`)
        .then((res) => {
          if (!res.data.error) {
            this.$refs.modalHandler.closeModal('delete_approve');
            this.showModal("Absence supprimée avec succès");
            this.listLeaves();
          } else {
            console.error("Erreur lors de la suppression de l'absence :", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
        });
    },
  }
}
</script>

<style scoped></style>
