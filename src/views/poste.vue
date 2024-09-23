<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Poste</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="admin-dashboard.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Poste</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a
              class="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#add_edit_designation"
              @click="openModal('add')"
              ><i class="fa-solid fa-plus"></i> Ajouter un poste</a
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table mb-0 datatable">
              <thead>
                <tr>
                  <th class="width-thirty">#</th>
                  <th>Poste</th>
                  <th>Département</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(poste, index) in postes" :key="poste.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ poste.posteName }}</td>
                  <td>{{ poste.departementName }}</td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a
                        class="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="material-icons">more_vert</i></a
                      >
                      <div class="dropdown-menu dropdown-menu-right">
                        <a
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#add_edit_designation"
                          @click="openModal('edit', poste.id)"
                          ><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a
                        >
                        <a
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_designation"
                          @click="setDeletePosteId(poste.id)"
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

    <div
      id="add_edit_designation"
      class="modal custom-modal fade"
      role="dialog"
    >
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
                  >Nom du poste <span class="text-danger">*</span></label
                >
                <input
                  class="form-control"
                  type="text"
                  v-model="Admin.posteName"
                  required
                />
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label"
                  >Département <span class="text-danger">*</span></label
                >
                <select
                  class="form-control"
                  v-model="Admin.departmentId"
                  required
                >
                  <option disabled value="">Sélectionner un département</option>
                  <option
                    v-for="(department, index) in departments"
                    :key="index"
                    :value="department.id"
                  >
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <input type="hidden" v-model="Admin.id" />
              <div class="submit-section">
                <button
                  type="button"
                  class="btn btn-primary submit-btn"
                  @click="submitPoste"
                >
                  {{ modalButton }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_designation" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer un poste</h3>
              <p>Êtes-vous sûr de vouloir supprimer ce poste?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-primary continue-btn"
                    @click="deletePoste"
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
export default {
  name: "poste",
  data() {
    return {
      Admin: {
        id: "",
        posteName: "",
        departmentId: "",
      },
      departments: [],
      postes: [],
      modalType: "",
      modalTitle: "",
      modalButton: "",
      deletePosteId: null,
    };
  },
  mounted() {
    this.getDepartments();
    this.listPostes();
  },
  methods: {
    poste() {
      this.$router.push({ path: "/poste" });
    },
    getDepartments() {
      this.$axios.post(
          "departement.php?action=getDepartments"
        )
        .then((res) => {
          if (!res.data.error) {
            this.departments = res.data.departments;
          } else {
            console.error(
              "Erreur lors de la récupération des départements : " +
                res.data.message
            );
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
        this.modalButton = "Créer";
        this.Admin = { id: null, posteName: "", departmentId: "" };
      } else if (type === "edit") {
        this.modalTitle = "Modifier un poste";
        this.modalButton = "Enregistrer";
        this.fetchSinglePoste(id);
      }
    },
    submitPoste() {
      const data = new FormData();
      data.append("Nom", this.Admin.posteName);
      data.append("IdDepartement", this.Admin.departmentId);
      if (this.Admin.id) {
        data.append('id', this.Admin.id);
      }

      if (this.Admin.posteName != "" && this.Admin.departmentId != "") {
        if (this.modalType === "add") {
          this.$axios.post(
              "poste.php?action=addPoste",
              data
            )
            .then((res) => {
              if (!res.data.error) {
                alert("Poste ajouté avec succès");
                this.listPostes();
                this.Admin = { id: "", posteName: "", departmentId: "" };
              } else {
                alert("Erreur lors de l'ajout du poste : " + res.data.message);
              }
            })
            .catch((error) => {
              console.error("Il y a eu une erreur", error);
            });
        } else if (this.modalType === "edit") {
          this.$axios.post(
              "poste.php?action=updatePoste",
              data
            )
            .then((res) => {
              if (!res.data.error) {
                alert("Poste mis à jour avec succès");
                this.Admin = { id: "", posteName: "", departmentId: "" };
                this.listPostes();
              } else {
                console.error("Erreur", res.data.message);
              }
            })
            .catch((error) => {
              console.error("Erreur", error);
            });
        }
      } else {
        alert("Renseignez vos informations");
      }
    },
    fetchSinglePoste(id) {
      if (!id) {
        console.error("ID du poste manquant");
        return;
      }
      const url = `poste.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.Admin = {
              id: res.data.data.id,
              posteName: res.data.data.name,
              departmentId: res.data.data.department_id,
            };
          } else {
            console.error(
              "Erreur lors de la récupération du poste : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeletePosteId(id) {
      this.deletePosteId = id;
    },
    deletePoste() {
      if (!this.deletePosteId) {
        console.error("ID du poste manquant pour la suppression");
        return;
      }
      this.$axios.get(
          `poste.php?action=deletePoste&id=${this.deletePosteId}`
        )
        .then((res) => {
          if (!res.data.error) {
            alert("Poste supprimé avec succès");
            this.listPostes();
            this.deletePosteId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listPostes() {
      this.$axios.get(
          "poste.php?action=listPostes"
        )
        .then((res) => {
          if (!res.data.error) {
            this.postes = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
  },
};
</script>
