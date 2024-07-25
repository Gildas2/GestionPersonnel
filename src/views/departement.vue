<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Département</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="admin-dashboard.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Département</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a
              class="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#add_department"
              @click="openModal('add')"
              ><i class="fa-solid fa-plus"></i> Ajouter un département</a
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div>
            <table class="table table-striped custom-table mb-0 datatable">
              <thead>
                <tr>
                  <th class="width-thirty">#</th>
                  <th>Nom Du Département</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(departement, index) in departments" :key="departement.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ departement.name }}</td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a
                        @click="departement()"
                        class="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="material-icons">more_vert</i></a
                      >
                      <div class="dropdown-menu dropdown-menu-right">
                        <a
                          class="dropdown-item"
                          @click="openModal('edit', departement.id)"
                          data-bs-toggle="modal"
                          data-bs-target="#add_department"
                          ><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a> 
                        <a
                          class="dropdown-item"
                          @click="setDeleteDepartementId(departement.id)"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_department"
                          ><i class="fa-regular fa-trash-can m-r-5"></i>
                          Supprimer</a
                        >
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

    <div id="add_department" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-block mb-3">
                <label class="col-form-label"
                  >Nom du département<span class="text-danger">*</span></label
                >
                <input class="form-control" type="text" v-model="Admin.departmentName" required/>
              </div>
              <input type="hidden" v-model="Admin.id">
              <div class="submit-section">
                <button class="btn btn-primary submit-btn" @click.prevent="submitData">{{ modalButton }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_department" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer un département</h3>
              <p>Êtes-vous sûr de vouloir de supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-primary continue-btn"
                    @click="deleteDepartement"
                    >Supprimer</a
                  >
                </div>
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    data-bs-dismiss="modal"
                    class="btn btn-primary cancel-btn"
                    >Annuler</a
                  >
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
import axios from 'axios';

export default {
  name: "departement",
  data() {
    return {
      Admin: {
        id: null,
        departmentName: ''
      },
      departments: [],
      modalType: "",
      modalButton: "",
      modalTitle: "", 
      deleteDepartmentId: null
    };
  },
  mounted() {
    this.listDepartment();    
  },
  methods: {
    departement() {
      this.$router.push({ path: "/departement" });
    },

    openModal(type, id = null) {
      this.modalType = type;
      if (type === "add") {
        this.modalTitle = "Ajouter un département";
        this.modalButton = "Créer";
        this.Admin = { id: null, departmentName: "" };
      } else if (type === "edit") {
        this.modalTitle = "Modifier un département";
        this.modalButton = "Enregistrer";
        this.fetchSingleDepartment(id);
      }
    },

    submitData() {
      const data = new FormData();
      data.append('nom', this.Admin.departmentName); 
      if(this.Admin.id){
        data.append('id', this.Admin.id);
      }

      if (this.Admin.departmentName != "") {
        if (this.modalType === 'add') {
          axios.post('http://localhost/GestionPersonnel/backend/departement.php?action=addDepartment', data)
            .then(res => {
              console.log(res.data);
              if (!res.data.error) {
                alert('Département ajouté avec succès');
                this.Admin.departmentName = ''; // Réinitialisez le champ
                this.listDepartment(); // Revenir à la liste des départements
              } else {
                console.log('Erreur lors de l\'ajout du département : ' + res.data.message);
              }
            })
            .catch(error => {
              console.error("Il y a eu une erreur!", error);
            });
        } else if (this.modalType === 'edit') {
          axios.post('http://localhost/GestionPersonnel/backend/departement.php?action=updateDepartment', data)
            .then(res => {
              console.log(res.data);
              if (!res.data.error) {
                alert('Département mis à jour avec succès');
                this.Admin = { id: null, departmentName: "" }; // Réinitialisez les champs
                this.listDepartment(); // Revenir à la liste des départements
              } else {
                console.log('Erreur lors de la mise à jour du département : ' + res.data.message);
              }
            })
            .catch(error => {
              console.error("Il y a eu une erreur!", error);
            });
        }
      } else {
        alert("Le nom du département est requis");
      }
    },

    fetchSingleDepartment(id) {
      if (!id) {
        console.error("ID du département manquant");
        return;
      }
      const url = `http://localhost/GestionPersonnel/backend/departement.php?action=fetchSingle&id=${id}`;
      axios.get(url)
        .then(res => {
          if (!res.data.error) {
            this.Admin = {
              id: res.data.data.id,
              departmentName: res.data.data.name,
            };
          } else {
            console.error("Erreur lors de la récupération du département : " + res.data.message);
          }
        })
        .catch(error => {
          console.error("Il y a eu une erreur", error);
        });
    },

    setDeleteDepartementId(id) {
      this.deleteDepartmentId = id;
    },

    deleteDepartement() {
      if (!this.deleteDepartmentId) {
        console.error("ID du département manquant pour la suppression");
        return;
      }
      axios.post(`http://localhost/GestionPersonnel/backend/departement.php?action=deleteDepartment&id=${this.deleteDepartmentId}`)
        .then(res => {
          if (!res.data.error) {
            alert("Département supprimé avec succès");
            this.listDepartment();
            this.deleteDepartmentId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch(error => {
          console.error("Erreur", error);
        });
    },

    listDepartment() {
      axios.get("http://localhost/GestionPersonnel/backend/departement.php?action=listDepartments")
        .then(res => {
          if (!res.data.error) {
            this.departments = res.data.departments;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch(error => {
          console.error("Erreur", error);
        });
    },
  },
};
</script>
