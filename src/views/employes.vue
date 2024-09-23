<template>
  <div class="page-wrapper">
    <div class="content container-fluid pb-0">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Employés</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_employee" @click="openModal('add')"><i
                class="fa-solid fa-plus"></i>Ajouter un employé</a>
            <div class="view-icons">
              <router-link :to="{ name: 'employes' }" class="grid-view btn btn-link active"><i
                  class="fa fa-th"></i></router-link>
              <router-link :to="{ name: 'employeList' }" class="list-view btn btn-link"><i
                  class="fa-solid fa-bars"></i></router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="row filter-row">
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" @keyup="fetchData" v-model="lastName" />
            <label class="focus-label">Nom de l'employé</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" @keyup="fetchData" v-model="firstName" />
            <label class="focus-label">Prénom de l'employé</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control floating" v-model="poste_nom" @change="fetchData">
              <option value="">-- Sélectionner --</option>
              <option v-for="(poste, index) in postes" :key="index" :value="poste.id">
                {{ poste.name }}
              </option>
            </select>
            <label class="focus-label">Poste</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="d-grid">
            <input type="submit" class="btn btn-success w-100" value="Rechercher" @click="fetchData()">
          </div>
        </div>


        <div class="row staff-grid-row">
          <div v-for="employe in employes" :key="employe.id" class="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
            <div class="profile-widget">
              <div class="profile-img">
                <a class="avatar"><img :src="employe.url" alt="User Image" /></a>
              </div>
              <div class="dropdown profile-action">
                <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                    class="material-icons">more_vert</i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" @click="openModal('edit', employe.id)" data-bs-toggle="modal"
                    data-bs-target="#add_employee"><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a>
                  <a class="dropdown-item" @click="setDeleteEmployeId(employe.id)" data-bs-toggle="modal"
                    data-bs-target="#delete_employee"><i class="fa-regular fa-trash-can m-r-5"></i> Supprimer</a>
                </div>
              </div>
              <h4 class="user-name m-t-10 mb-0 text-ellipsis">
                <a href="profile.html">{{ employe.lastName + ' ' + employe.firstName }}</a>
              </h4>
              <div class="small text-muted">{{ employe.poste_nom }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="add_employee" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitData">
              <div v-if="successAlert" class="alert alert-success alert-dismissible"><a href="#" class="close"
                  aria-label="close" @click="successAlert = false">&times;</a>{{ successMessage }}</div>
              <div v-if="errorAlert" class="alert alert-danger alert-dismissible"><a href="#" class="close"
                  aria-label="close" @click="errorAlert = false">&times;</a>{{ errorMessage }}</div>
              <div class="row">
                <div class="col-md-12">
                  <div class="profile-img-wrap edit-img">
                    <div v-html="uploadedImage" class="inline-block"></div>
                    <div class="fileupload btn">
                      <span class="btn-text" @click="uploadImage">ajouter</span>
                      <input class="upload" type="file" ref="file" @change="previewImage" />
                    </div>
                  </div>
                </div>

                <!-- Informations personnelles-->
                <h4 class="mb-3">Informations personnelles</h4>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Matricule <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.matricule" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Nom <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.nom" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label" id="prenom">Prénom(s) <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.prenom" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Age <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.age" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Genre <span class="text-danger">*</span></label>
                    <select class="form-control" type="text" v-model="UsersData.genre" required>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Numéro de téléphone
                      <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.numero" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Adresse mail <span class="text-danger">*</span></label>
                    <input class="form-control" type="email" v-model="UsersData.email" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Nationalité <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.nationalite" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Situation matrimoniale
                      <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.situation" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Religion <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.religion" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Mot de passe <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input class="form-control" :type="passwordFieldType" v-model="UsersData.password"
                        @input="checkPasswordStrength" required />
                      <span class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility('password')"
                        style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
                    </div>
                    <p :class="passwordStrengthClass">{{ passwordStrengthMessage }}</p>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Confirmer mot de passe <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input class="form-control" :type="confirmPasswordFieldType" v-model="UsersData.confirmPassword"
                        required />
                      <span class="fa" :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                        @click="togglePasswordVisibility('confirmPassword')"
                        style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
                    </div>
                  </div>
                </div>

                <!-- Informations professionnelles-->
                <h4 class="mb-3">Informations profesionnelles</h4>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Date de début <span class="text-danger">*</span></label>
                    <input class="form-control" v-model="UsersData.startDate" type="date"/>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Niveau Académique
                      <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="UsersData.niveau" required />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Département <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="UsersData.departmentId" required>
                      <option>Sélectionner un département</option>
                      <option v-for="(department, index) in departments" :key="index" :value="department.id">
                        {{ department.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Poste <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="UsersData.poste_id" required>
                      <option>Sélectionner un poste</option>
                      <option v-for="(poste, index) in postes" :key="index" :value="poste.id">
                        {{ poste.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">CSP(Catégorie Socioprofessionnelle)
                      <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="UsersData.csp" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Contrat <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="UsersData.contrat" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Rôle <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="UsersData.role" required>
                      <option>-- Sélectionner --</option>
                      <option>Admin</option>
                      <option>Employé</option>
                    </select>
                  </div>
                </div>

                <!-- Informations professionnelles-->
                <h4 class="mb-3">Informations bancaires</h4>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Numéro de compte</label>
                    <input class="form-control" type="text" v-model="UsersData.numeroBanque" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Nom de banque</label>
                    <input class="form-control" type="text" v-model="UsersData.nomBanque" />
                  </div>
                </div>
              </div>
              <input type="hidden" v-model="UsersData.id" />
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">
                  {{ modalButton }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="center-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="text-center">
                <p>{{ modalMessage }}</p>
                <button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  
  <div class="modal custom-modal fade" id="delete_employee" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-header">
            <h3>Supprimer un employé</h3>
            <p>Êtes-vous sûr de vouloir effacer ?</p>
          </div>
          <div class="modal-btn delete-action">
            <div class="row">
              <div class="col-6">
                <a href="javascript:void(0);" class="btn btn-primary continue-btn" @click="deleteEmployee">Supprimer</a>
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
</template>

<script>
export default {
  name: "employes",
  data() {
    return {
      UsersData: {
        id: "",
        file: '',
        matricule: "",
        nom: "",
        prenom: "",
        departmentId: "",
        startDate: "",
        poste_id: "",
        religion: "",
        numero: "",
        email: "",
        age: "",
        genre: "",
        nationalite: "",
        password: "",
        confirmPassword: "",
        role: "",
        situation: "",
        niveau: "",
        nomBanque: "",
        numeroBanque: "",
        csp: "",
        contrat: "",
      },
      departments: [],
      postes: [],
      employes: "",
      firstName: "",
      lastName: "",
      poste_nom: "",
      modalType: "",
      modalButton: "",
      modalTitle: "",
      successAlert: false,
      errorAlert: false,
      uploadedImage: '',
      deleteEmployeeId: null,
      nodata: false,
      showPassword: false,
      showConfirmPassword: false,
      passwordStrengthMessage: '',
      passwordStrengthClass: '',
      errorMessage: '',  
      successMessage: '',  
      modalMessage: '',
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
    confirmPasswordFieldType() {
      return this.showConfirmPassword ? "text" : "password";
    }
  },
  mounted() {
    this.listEmployee();
    this.getDepartments();
    this.getPostes();
  },

  methods: {
    togglePasswordVisibility(field) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      } else if (field === 'confirmPassword') {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    checkPasswordStrength() {
      const password = this.UsersData.password;
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      if (strength === 1 || strength === 2) {
        this.passwordStrengthMessage = 'Mot de passe faible';
        this.passwordStrengthClass = 'text-danger';
      } else if (strength === 3 || strength === 4) {
        this.passwordStrengthMessage = 'Mot de passe moyen';
        this.passwordStrengthClass = 'text-warning';
      } else if (strength === 5) {
        this.passwordStrengthMessage = 'Mot de passe fort';
        this.passwordStrengthClass = 'text-success';
      } else {
        this.passwordStrengthMessage = '';
        this.passwordStrengthClass = '';
      }
    },

    poste() {
      this.$router.push({ path: "/employes", hash: "#" });
    },

    resetForm() {
      this.UsersData = {
        id: "",
        matricule: "",
        nom: "",
        departmentId: "",
        poste_id: "",
        startDate: "",
        numero: "",
        religion: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        age: "",
        genre: "",
        startDate: "",
        nationalite: "",
        situation: "",
        niveau: "",
        nomBanque: "",
        numeroBanque: "",
        csp: "",
        contrat: "",
        file: "",
      };
      this.uploadedImage = '';
      this.successAlert = false;
      this.errorAlert = false;
      this.errorMessage = ''; 
      this.successMessage = ''; 
    },

    openModal(type, id = null) {
      this.modalType = type;
      if (type === "add") {
        this.modalTitle = "Ajouter un employé";
        this.modalButton = "Créer";
      } else if (type === "edit") {
        this.modalTitle = "Modifier un employé";
        this.modalButton = "Enregistrer";
        this.fetchSingleEmployee(id);
      }
    },

    getDepartments() {
      this.$axios.get("departement.php?action=getDepartments")
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

    getPostes() {
      this.$axios.get("poste.php?action=getPostes")
        .then((res) => {
          if (!res.data.error) {
            this.postes = res.data.postes;
          } else {
            console.error(
              "Erreur lors de la récupération des postes : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur!", error);
        });
    },

    showModal(message) {
      this.modalMessage = message;
      const modal = new bootstrap.Modal(document.getElementById('center-modal'));
      modal.show();
    },

    submitData() {
      this.errorAlert = false;
      this.successAlert = false;

      if (this.UsersData.password !== this.UsersData.confirmPassword) {
        this.errorAlert = true;
        this.errorMessage = "Les mots de passe ne correspondent pas.";
        return;
      }

      const formData = new FormData();
      for (const key in this.UsersData) {
        if (key !== 'confirmPassword' && this.UsersData[key]) {
          formData.append(key, this.UsersData[key]);
        }
      }

      if (this.$refs.file.files.length > 0) {
        formData.append('file', this.$refs.file.files[0]);
      }

      console.log('Form Data:', Array.from(formData.entries()));

      const url = this.modalType === 'add'
        ? 'employe.php?action=addEmploye'
        : 'employe.php?action=updateEmploye';

      this.$axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          if (res.data.error) {
            this.errorAlert = true;
            this.errorMessage = res.data.message || "Erreur lors de l'opération";
          } else {
            this.successAlert = true;
            this.successMessage = res.data.message || "Opération réussie";
            if (res.data.image) {
              this.uploadedImage = `<img src='${res.data.image}' class='img-thumbnail' width='200' />`;
            }
            this.showModal(this.modalType === 'add' ? "Employé ajouté avec succès" : "Employé mis à jour avec succès");
            this.resetForm();

            const addModal = bootstrap.Modal.getInstance(document.getElementById('add_employee'));
            if (addModal) {
              addModal.hide();
            }

            this.listEmployee();
          }
        })
        .catch(error => {
          this.errorAlert = true;
          this.errorMessage = error.response?.data?.message || "Erreur de serveur";
          console.error("Il y a eu une erreur!", error);
        });
    },

    previewImage() {
      const fileInput = this.$refs.file.files[0];
      if (fileInput) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = `<img src="${e.target.result}" class="img-thumbnail" width="200" />`;
        };
        reader.readAsDataURL(fileInput);
      }
    },

    uploadImage() {
      // Méthode pour gérer le clic sur le bouton d'ajout de fichier
      this.$refs.file.click();
    },

    fetchSingleEmployee(id) {
      this.$axios.get(`employe.php?action=fetchSingle&id=${id}`)
        .then((res) => {
          if (!res.data.error) {
            this.UsersData = {
              id: res.data.data.id,
              matricule: res.data.data.number,
              nom: res.data.data.lastName,
              prenom: res.data.data.firstName,
              departmentId: res.data.data.department_id,
              poste_id: res.data.data.poste_id,
              startDate: res.data.data.startDate,
              religion: res.data.data.religion,
              numero: res.data.data.phoneNumber,
              email: res.data.data.email,
              password: "",  
              role: res.data.data.role,
              age: res.data.data.old,
              genre: res.data.data.gender,
              nationalite: res.data.data.nationality,
              situation: res.data.data.maritalStatus,
              niveau: res.data.data.level,
              nomBanque: res.data.data.nameBank,
              numeroBanque: res.data.data.nBank,
              csp: res.data.data.csp,
              contrat: res.data.data.contract,
            };
            if (res.data.data.url) {
              this.uploadedImage = `<img src='${res.data.data.url}' class='img-thumbnail' width='200' />`;
            }
          } else {
            console.error(
              "Erreur lors de la récupération des informations de l'employé : " +
              res.data.message
            );
          }
        })
        .catch((error) => {
          console.error(
            "Il y a eu une erreur lors de la récupération des informations de l'employé!",
            error
          );
        });
    },

    setDeleteEmployeId(id) {
      this.deleteEmployeeId = id;
    },

    deleteEmployee() {
      if (!this.deleteEmployeeId) {
        console.error("ID de l/'employé manquant pour la suppression");
        return;
      }
      this.$axios.post(`employe.php?action=deleteEmploye&id=${this.deleteEmployeeId}`)
        .then(res => {
          if (!res.data.error) {
            this.showModal("Employé supprimé avec succès");

            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('delete_employee'));
            if (deleteModal) {
              deleteModal.hide();
            }
            this.listEmployee();
            this.deleteEmployeeId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch(error => {
          console.error("Erreur", error);
        })
    },

    listEmployee() {
      this.$axios.get("employe.php?action=listEmployee")
        .then(res => {
          if (!res.data.error) {
            this.employes = res.data.employes;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch(error => {
          console.error("Erreur", error);
        })
    },

    fetchData() {
      const nom = this.lastName.toLowerCase();
      const prenom = this.firstName.toLowerCase();
      const poste = this.poste_nom;

      if (poste === '') {
        this.listEmployee();
        return;
      }

      if (nom || prenom || poste) {
        this.$axios.get(`action.php?action=searchEmployes`, {
          params: {
            nom: nom,
            prenom: prenom,
            poste: poste
          }
        })
          .then((response) => {
            if (!response.data.error) {
              this.employes = response.data.employes;
              this.nodata = this.employes.length === 0;
            } else {
              console.error("Erreur lors de la recherche des employés : " + response.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a une erreur!", error);
          });
      } else {
        this.listEmployee();
      }
    },
  },
};
</script>

<style scoped>
  .upload {
    background-color: aqua;
  }
</style>
