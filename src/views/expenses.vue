<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Dépenses</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_expense" @click="openModal('add')"><i
                class="fa-solid fa-plus"></i> Ajouter une dépense</a>
          </div>
        </div>
      </div>

      <div class="row filter-row">
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" />
            <label class="focus-label">Nom de l'article</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option>-- Select --</option>
              <option>Loren Gatlin</option>
              <option>Tarah Shropshire</option>
            </select>
            <label class="focus-label">Acheté par</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option>-- Select --</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>
            <label class="focus-label">Mode de paiement</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus">
            <div class="cal-icon">
              <input class="form-control floating datetimepicker" type="text" />
            </div>
            <label class="focus-label">De</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus">
            <div class="cal-icon">
              <input class="form-control floating datetimepicker" type="text" />
            </div>
            <label class="focus-label">A</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <a class="btn btn-success w-100"> Rechercher </a>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table mb-0 datatable">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Payé sur</th>
                  <th>Date de paiement</th>
                  <th>Payé par</th>
                  <th>Prix</th>
                  <th>Mode de paiement</th>
                  <th class="text-center">Status</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="expense in expenses" :key="expense.id">
                  <td>
                    <strong>{{ expense.itemName }}</strong>
                  </td>
                  <td>{{ expense.purchaseFrom }}</td>
                  <td>{{ expense.purchaseDate }}</td>
                  <td>
                    <h2 class="table-avatar">
                      <a class="avatar avatar-xs"><img :src="expense.url" alt="User Image" /></a>
                      <a>{{ expense.lastName }} {{ expense.firstName }}</a>
                    </h2>
                  </td>
                  <td>{{ expense.amount }}</td>
                  <td>{{ expense.paidBy }}</td>
                  <td class="text-center">
                    <div class="dropdown action-label">
                      <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-regular fa-circle-dot" :class="{
                          'text-danger': expense.status === 'En attente',
                          'text-success': expense.status === 'Approuvé',
                        }"></i> {{ expense.status || 'En attente' }}
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" @click="updateStatus(expense.id, 'En attente')">
                          <i class="fa-regular fa-circle-dot text-danger"></i> En attente
                        </a>
                        <a class="dropdown-item" @click="updateStatus(expense.id, 'Approuvé')">
                          <i class="fa-regular fa-circle-dot text-success"></i> Approuvé
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                          class="material-icons">more_vert</i></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_expense"
                          @click="openModal('edit', expense.id)"><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a>
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_expense"
                          @click="setDeleteExpenseId(expense.id)"><i class="fa-regular fa-trash-can m-r-5"></i>
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

    <div id="add_expense" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitExpense">
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Nom de l'article <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="expense.itemName" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Acheté sur <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="expense.purchaseFrom" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Date d'achat <span class="text-danger">*</span></label>
                    <input class="form-control" type="date" v-model="expense.purchaseDate" />
                    
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Acheté par <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="expense.employeId" required>
                      <option disabled value="">Select. tout</option>
                      <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                        {{ employe.lastName }} {{ employe.firstName }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Prix <span class="text-danger">*</span></label>
                    <input class="form-control" type="text" v-model="expense.amount" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Mode de paiement <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="expense.paidBy">
                      <option>Cash</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Statut</label>
                    <select class="form-control" v-model="expense.status">
                      <option>En attente</option>
                      <option>Approuvé</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Justificatifs</label>
                    <input class="form-control" type="file" ref="file" @change="onFileChange" />
                  </div>
                </div>
              </div>
              <div class="attach-files">
                <ul>
                  <li v-for="(file, index) in files" :key="index">
                    <img :src="file.url" :alt="`Image ${index + 1}`" />
                    <a class="fa fa-close file-remove" @click="removeFile(index)"></a>
                  </li>
                </ul>
              </div>
              <input type="hidden" v-model="expense.id">
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_expense" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer une dépense</h3>
              <p>Êtes-vous sûr de vouloir supprimer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn"
                    @click="deleteExpense">Supprimer</a>
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
  name: "expenses",
  data() {
    return {
      expense: {
        id: "",
        employeId: "",
        itemName: "",
        purchaseFrom: "",
        purchaseDate: "",
        amount: "",
        paidBy: "",
        status: "",
        file: "",
      },
      employees: [],
      expenses: [],
      modalType: "",
      modalButton: "",
      modalTitle: "",
      deleteExpenseId: ""
    }
  },
  mounted() {
    this.getEmployees();
    this.listExpenses();
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
    openModal(type, id = null) {
      this.modalType = type;
      if (type === "add") {
        this.modalTitle = "Ajouter une dépense";
        this.modalButton = "Soumettre";
      } else if (type === "edit") {
        this.modalTitle = "Modifier une dépense";
        this.modalButton = "Enregistrer";
        this.fetchSingleExpense(id);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.files.push({ file, url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    resetExpense() {
      this.expense = {
        id: "",
        employeId: "",
        itemName: "",
        purchaseFrom: "",
        purchaseDate: "",
        amount: "",
        paidBy: "",
        status: "",
        file: "", 
      };
      if (this.$refs.file) {
        this.$refs.file.value = null;
      }
    },
    submitExpense() {
      const data = new FormData();
      data.append("employeId", this.expense.employeId);
      data.append("itemName", this.expense.itemName);
      data.append("purchaseFrom", this.expense.purchaseFrom);
      data.append("purchaseDate", this.expense.purchaseDate);
      data.append("amount", this.expense.amount);
      data.append("status", this.expense.status);
      data.append("paidBy", this.expense.paidBy);
      if (this.expense.id) {
        data.append('id', this.expense.id);
      }
      if (this.$refs.file && this.$refs.file.files.length > 0) {
        data.append('file', this.$refs.file.files[0]);
      }

      const endpoint = this.modalType === "add" ? "expense.php?action=addExpense" : "expense.php?action=updateExpense";

      this.$axios.post(endpoint, data)
        .then((res) => {
          if (!res.data.error) {
            const successMessage = this.modalType === "add" ? "Dépense ajoutée avec succès" : "Dépense mise à jour avec succès";
            alert(successMessage);
            this.listExpenses();
            this.resetExpense();
          } else {
            alert("Erreur lors de l'ajout ou de la mise à jour de la dépense : " + res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    fetchSingleExpense(id) {
      if (!id) {
        console.error("ID de la dépense est manquante");
        return;
      }
      const url = `expense.php?action=fetchSingle&id=${id}`;
      this.$axios.get(url)
        .then((res) => {
          if (!res.data.error) {
            this.expense = {
              id: res.data.data.id,
              employeId: res.data.data.employe_id,
              itemName: res.data.data.itemName,
              purchaseFrom: res.data.data.purchaseFrom,
              purchaseDate: res.data.data.purchaseDate,
              amount: res.data.data.amount,
              status: res.data.data.status,
              paidBy: res.data.data.paidBy,
            };
          } else {
            console.error(
              "Erreur lors de la récupération de la dépense : " + res.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Il y a eu une erreur", error);
        });
    },
    setDeleteExpenseId(id) {
      this.deleteExpenseId = id;
    },
    deleteExpense() {
      if (!this.deleteExpenseId) {
        console.error("ID de la dépense manquante pour la suppression");
        return;
      }
      this.$axios.get(
        `expense.php?action=deleteExpense&id=${this.deleteExpenseId}`
      )
        .then((res) => {
          if (!res.data.error) {
            alert("Dépense supprimée avec succès");
            this.listExpenses();
            this.deleteExpenseId = null;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    listExpenses() {
      this.$axios.get(
        "expense.php?action=listExpenses"
      )
        .then((res) => {
          if (!res.data.error) {
            this.expenses = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
    updateStatus(expenseId, status) {
      this.$axios.post(`expense.php?action=updateStatus`, {
        id: expenseId,
        status: status
      })
        .then(response => {
          console.log(response.data);
          if (!response.data.error) {
            const expense = this.expenses.find(l => l.id === expenseId);
            if (leave) {
              expense.status = status;
            }
            alert('Statut mis à jour avec succès');
          } else {
            alert('Erreur lors de la mise à jour du statut : ' + response.data.message);
          }
        })
        .catch(error => {
          console.error('Erreur:', error.response ? error.response.data : error);
          alert('Une erreur s\'est produite. Vérifiez la console pour plus de détails.');
        });
    }
  }
};
</script>
