<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Éléments de la Paie</h3>
          </div>
        </div>
      </div>

      <div class="page-menu">
        <div class="row">
          <div class="col-sm-12">
            <ul class="nav nav-tabs nav-tabs-bottom">
              <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#tab_additions">Additions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tab_overtime">Heures Supp.</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#tab_deductions">Déductions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="tab-content">
        <div class="tab-pane show active" id="tab_additions">
          <div class="text-end mb-4 clearfix">
            <button class="btn btn-primary add-btn" type="button" data-bs-toggle="modal" data-bs-target="#add_addition"
              @click="openModal0('add')">
              <i class="fa-solid fa-plus"></i> Ajouter une addition
            </button>
          </div>

          <div class="payroll-table card">
            <div class="table-responsive">
              <table class="table table-hover table-radius">
                <thead>
                  <tr>
                    <th>Employé</th>
                    <th>Raison</th>
                    <th>Montant</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="addition in additions" :key="addition.id">
                    <th>{{ addition.lastName }} {{ addition.firstName }}</th>
                    <th>{{ addition.reason }}</th>
                    <td>{{ addition.amount }}</td>
                    <td class="text-end">
                      <div class="dropdown dropdown-action">
                        <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                            class="material-icons">more_vert</i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_addition"
                            @click="openModal0('edit', addition.id)"><i class="fa-solid fa-pencil m-r-5"></i>
                            Modifier</a>
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_addition"
                            @click="setDeleteAdditionId(addition.id)"><i class="fa-regular fa-trash-can m-r-5"></i>
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

        <div class="tab-pane" id="tab_overtime">
          <div class="text-end mb-4 clearfix">
            <button class="btn btn-primary add-btn" type="button" data-bs-toggle="modal" data-bs-target="#add_overtime"
              @click="openModal1('add')">
              <i class="fa-solid fa-plus"></i> Ajouter une heure supp.
            </button>
          </div>

          <div class="payroll-table card">
            <div class="table-responsive">
              <table class="table table-hover table-radius">
                <thead>
                  <tr>
                    <th>Employé</th>
                    <th>Nombre d'heures</th>
                    <th>Montant</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="overtime in overtimes" :key="overtime.id">
                    <th>{{ overtime.lastName }} {{ overtime.firstName }}</th>
                    <th>{{ overtime.hour }}</th>
                    <td>{{ overtime.amount }}</td>
                    <td class="text-end">
                      <div class="dropdown dropdown-action">
                        <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                            class="material-icons">more_vert</i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_overtime"
                            @click="openModal1('edit', overtime.id)"><i class="fa-solid fa-pencil m-r-5"></i>
                            Modifier</a>
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_overtime"
                            @click="setDeleteOvertimeId(overtime.id)"><i class="fa-regular fa-trash-can m-r-5"></i>
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

        <div class="tab-pane" id="tab_deductions">
          <div class="text-end mb-4 clearfix">
            <button class="btn btn-primary add-btn" type="button" data-bs-toggle="modal" data-bs-target="#add_deduction"
              @click="openModal2('add')">
              <i class="fa-solid fa-plus"></i> Ajouter une déduction
            </button>
          </div>

          <div class="payroll-table card">
            <div class="table-responsive">
              <table class="table table-hover table-radius">
                <thead>
                  <tr>
                    <th>Employé</th>
                    <th>Raison</th>
                    <th>Montant</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="deduction in deductions" :key="deduction.id">
                    <td>{{ deduction.lastName }} {{ deduction.firstName }}</td>
                    <td>{{ deduction.reason }}</td>
                    <td>{{ deduction.amount }}</td>
                    <td class="text-end">
                      <div class="dropdown dropdown-action">
                        <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                            class="material-icons">more_vert</i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_deduction"
                            @click="openModal2('edit', deduction.id)"><i class="fa-solid fa-pencil m-r-5"></i>
                            Modifier</a>
                          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_deduction"
                            @click="setDeleteDeductionId(deduction.id)"><i class="fa-regular fa-trash-can m-r-5"></i>
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
    </div>

    <div id="add_addition" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle0 }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddition">
              <div class="input-block mb-3">
                <label class="d-block col-form-label">Assignation <span class="text-danger">*</span></label>
                <div class="input-block mb-3">
                  <select class="form-control" v-model="addition.employeId" required>
                    <option disabled value="">Select. tout</option>
                    <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                      {{ employe.lastName }} {{ employe.firstName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Raison <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="addition.reason" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Montant</label>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="addition.amount" required/>
                  <span class="input-group-text">FCFA</span>
                </div>
              </div>
              <input type="hidden" v-model="addition.id" />
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton0 }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_addition" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer une addition</h3>
              <p>Êtes-vous sûr de vouloir supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn"
                    @click="deleteAddition">Supprimer</a>
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

    <div id="add_overtime" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle1 }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitOvertime">
              <div class="input-block mb-3">
                <label class="col-form-label">Assignation <span class="text-danger">*</span></label>
                <div class="input-block mb-3">
                  <select class="form-control" v-model="overtime.employeId" required>
                    <option disabled value="">Select. tout</option>
                    <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                      {{ employe.lastName }} {{ employe.firstName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Nombres d'heures <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="overtime.hour" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Montant <span class="text-danger">*</span></label>
                <div class="input-group">
                  <input class="form-control" type="text" v-model="overtime.amount" required/>
                  <span class="input-group-text">FCFA</span>
                </div>
              </div>
              <input type="hidden" v-model="overtime.id" />
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton1 }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_overtime" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer une heure supp.</h3>
              <p>Êtes-vous sûr de vouloir supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn"
                    @click="deleteOvertime">Supprimer</a>
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

    <div id="add_deduction" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle2 }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitDeduction">
              <div class="input-block mb-3">
                <label class="d-block col-form-label">Assignation<span class="text-danger">*</span></label>
                <div class="input-block mb-3">
                  <select class="form-control" v-model="deduction.employeId" required>
                    <option disabled value="">Select. tout</option>
                    <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                      {{ employe.lastName }} {{ employe.firstName }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Raison <span class="text-danger">*</span></label>
                <input class="form-control" type="text" v-model="deduction.reason" required/>
              </div>
              <div class="input-block mb-3">
                <label class="col-form-label">Montant<span class="text-danger">*</span></label>
                <div class="input-group">
                  <input type="text" class="form-control" v-model="deduction.amount" required/>
                  <span class="input-group-text">FCFA</span>
                </div>
              </div>
              <input type="hidden" v-model="deduction.id" />
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton2 }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_deduction" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer une déduction</h3>
              <p>Êtes-vous sûr de vouloir supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn"
                    @click="deleteDeduction">Supprimer</a>
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
  name: "paysrool",
  data() {
    return {
      addition: {
        id: "",
        employeId: "",
        reason: "",
        amount: "",
      },
      overtime: {
        id: "",
        employeId: "",
        hour: "",
        amount: "",
      },
      deduction: {
        id: "",
        employeId: "",
        reason: "",
        amount: "",
      },
      employees: [],
      modalType0: "",
      modalTitle0: "",
      modalButton0: "",
      modalType1: "",
      modalTitle1: "",
      modalButton1: "",
      modalType2: "",
      modalTitle2: "",
      modalButton2: "",
      additions: [],
      overtimes: [],
      deductions: [],
      deleteAdditionId: null,
      deleteOvertimeId: null,
      deleteDeductionId: null
    };
  },
  mounted() {
    this.getEmployees();
    this.listAdditions();
    this.listOvertimes();
    this.listDeductions();
  },
  methods: {
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
    closeModal(modalId) {
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.hide();
    },
    openModal0(type, id = null) {
      this.modalType0 = type;
      if (type === "add") {
        this.modalTitle0 = "Ajouter une addition";
        this.modalButton0 = "Créer";
      } else if (type === "edit") {
        this.modalTitle0 = "Modifier une addition";
        this.modalButton0 = "Enregistrer";
        this.fetchSingleAddition(id);
      }
    },
    openModal1(type, id = null) {
      this.modalType1 = type;
      if (type === "add") {
        this.modalTitle1 = "Ajouter une heure supp.";
        this.modalButton1 = "Créer";
      } else if (type === "edit") {
        this.modalTitle1 = "Modifier une heure supp.";
        this.modalButton1 = "Enregistrer";
        this.fetchSingleOvertime(id);
      }
    },
    openModal2(type, id = null) {
      this.modalType2 = type;
      if (type === "add") {
        this.modalTitle2 = "Ajouter une déduction";
        this.modalButton2 = "Créer";
      } else if (type === "edit") {
        this.modalTitle2 = "Modifier une déduction";
        this.modalButton2 = "Enregistrer";
        this.fetchSingleDeduction(id);
      }
    },
    submitAddition() {
      const data = new FormData();
      data.append("employeId", this.addition.employeId);
      data.append("reason", this.addition.reason);
      data.append("amount", this.addition.amount);
      if (this.addition.id) {
        data.append('id', this.addition.id);
      }

      if (this.modalType0 === "add") {
        this.$axios.post(
          "addition.php?action=addAddition",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Addition ajoutée avec succès");
              this.listAdditions();
              this.addition = { id: "", employeId: "", reason: "", amount: "" };
              this.closeModal(add_addition);
            } else {
              alert("Erreur lors de l'ajout de l'addition : " + res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a eu une erreur", error);
          });
      } else if (this.modalType0 === "edit") {
        this.$axios.post(
          "addition.php?action=updateAddition",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Addition mise à jour avec succès");
              this.addition = { id: "", employeId: "", reason: "", amount: "" };
              this.listAdditions();
            } else {
              console.error("Erreur", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Erreur", error);
          });
      }
    },
    fetchSingleAddition(id) {
      if (!id) {
        console.error("ID de l'addition manquante");
        return;
      }
      const url = `addition.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.addition = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              reason: res.data.data.reason,
              amount: res.data.data.amount,
            };
          } else {
            console.error(
              "Erreur lors de la récupération de l'addition : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeleteAdditionId(id) {
      this.deleteAdditionId = id;
    },
    deleteAddition() {
      if (!this.deleteAdditionId) {
        console.error("ID de l'addition manquante pour la suppression");
        return;
      }
      this.$axios.get(
        `addition.php?action=deleteAddition&id=${this.deleteAdditionId}`
      )
        .then((res) => {
          if (!res.data.error) {
            alert("Addition supprimée avec succès");
            this.listAdditions();
            this.deleteAdditionId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listAdditions() {
      this.$axios.get(
        "addition.php?action=listAdditions"
      )
        .then((res) => {
          if (!res.data.error) {
            this.additions = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    submitOvertime() {
      const data = new FormData();
      data.append("employeId", this.overtime.employeId);
      data.append("hour", this.overtime.hour);
      data.append("amount", this.overtime.amount);
      if (this.overtime.id) {
        data.append('id', this.overtime.id);
      }

      if (this.modalType1 === "add") {
        this.$axios.post(
          "overtime.php?action=addOvertime",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Heure supp. ajoutée avec succès");
              this.listOvertimes();
              this.overtime = { id: "", employeId: "", hour: "", amount: "" };
            } else {
              alert("Erreur lors de l'ajout de heure supp. : " + res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a eu une erreur", error);
          });
      } else if (this.modalType1 === "edit") {
        this.$axios.post(
          "overtime.php?action=updateOvertime",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Heure supp. mise à jour avec succès");
              this.overtime = { id: "", employeId: "", hour: "", amount: "" };
              this.listOvertimes();
            } else {
              console.error("Erreur", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Erreur", error);
          });
      }
      else {
        alert("Renseignez vos informations");
      }
    },
    fetchSingleOvertime(id) {
      if (!id) {
        console.error("ID de l'heure supp. manquante");
        return;
      }
      const url = `overtime.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.overtime = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              hour: res.data.data.hour,
              amount: res.data.data.amount,
            };
          } else {
            console.error(
              "Erreur lors de la récupération de l'heure supp. : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeleteOvertimeId(id) {
      this.deleteOvertimeId = id;
    },
    deleteOvertime() {
      if (!this.deleteOvertimeId) {
        console.error("ID de l'heure supp. pour la suppression");
        return;
      }
      this.$axios.get(
        `overtime.php?action=deleteOvertime&id=${this.deleteOvertimeId}`
      )
        .then((res) => {
          if (!res.data.error) {
            alert("heure supp. supprimée avec succès");
            this.listOvertimes();
            this.deleteOvertimeId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listOvertimes() {
      this.$axios.get(
        "overtime.php?action=listOvertimes"
      )
        .then((res) => {
          if (!res.data.error) {
            this.overtimes = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    submitDeduction() {
      const data = new FormData();
      data.append("employeId", this.deduction.employeId);
      data.append("reason", this.deduction.reason);
      data.append("amount", this.deduction.amount);
      if (this.deduction.id) {
        data.append('id', this.deduction.id);
      }

      if (this.modalType2 === "add") {
        this.$axios.post(
          "deduction.php?action=addDeduction",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Déduction ajoutée avec succès");
              this.listDeductions();
              this.deduction = { id: "", employeId: "", reason: "", amount: "" };
            } else {
              alert("Erreur lors de l'ajout de la déduction : " + res.data.message);
            }
          })
          .catch((error) => {
            console.error("Il y a eu une erreur", error);
          });
      } else if (this.modalType2 === "edit") {
        this.$axios.post(
          "deduction.php?action=updateDeduction",
          data
        )
          .then((res) => {
            if (!res.data.error) {
              alert("Déduction mise à jour avec succès");
              this.deduction = { id: "", employeId: "", reason: "", amount: "" };
              this.listDeductions();
            } else {
              console.error("Erreur", res.data.message);
            }
          })
          .catch((error) => {
            console.error("Erreur", error);
          });
      }
      else {
        alert("Renseignez vos informations");
      }
    },
    fetchSingleDeduction(id) {
      if (!id) {
        console.error("ID de la déduction manquante");
        return;
      }
      const url = `deduction.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.deduction = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              reason: res.data.data.reason,
              amount: res.data.data.amount,
            };
          } else {
            console.error(
              "Erreur lors de la récupération de la déduction : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeleteDeductionId(id) {
      this.deleteDeductionId = id;
    },
    deleteDeduction() {
      if (!this.deleteDeductionId) {
        console.error("ID de l'addition manquante pour la suppression");
        return;
      }
      this.$axios.get(
        `deduction.php?action=deleteDeduction&id=${this.deleteDeductionId}`
      )
        .then((res) => {
          if (!res.data.error) {
            this.listDeductions();
            this.closeModal('delete_deduction');
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listDeductions() {
      this.$axios.get(
        "deduction.php?action=listDeductions"
      )
        .then((res) => {
          if (!res.data.error) {
            this.deductions = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
  }
};
</script>

<style></style>
