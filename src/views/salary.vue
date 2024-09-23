<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Salaire des employés</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <a class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_salary" @click="openModal('add')"><i
                class="fa-solid fa-plus"></i> Ajouter un salaire</a>
          </div>
        </div>
      </div>

      <div class="row filter-row">
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" />
            <label class="focus-label">Nom de l'employé</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" />
            <label class="focus-label">Prénom de l'employé</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option>-- Select --</option>
              <option>En attente</option>
              <option>Approuvé</option>
              <option>Rejecté</option>
            </select>
            <label class="focus-label">Poste</label>
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
            <table class="table table-striped custom-table datatable">
              <thead>
                <tr>
                  <th>Employé</th>
                  <th>Matricule</th>
                  <th>Email</th>
                  <th>Date de début</th>
                  <th>Poste</th>
                  <th>Salaire</th>
                  <th>Fiche paie</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a href="profile.html" class="avatar"><img src="../assets/img/profiles/avatar-02.jpg"
                          alt="User Image" /></a>
                      <a href="profile.html">John Doe <span>Web Designer</span></a>
                    </h2>
                  </td>
                  <td>FT-0001</td>
                  <td>samnegildas4@gmail.com</td>
                  <td>1 Jan 2013</td>
                  <td>Web Designer</td>
                  <td>$59698</td>
                  <td>
                    <a class="btn btn-sm btn-primary">Générer un bordereau</a>
                  </td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i
                          class="material-icons">more_vert</i></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_salary" @click="openModal('edit')"><i
                            class="fa-solid fa-pencil m-r-5"></i> Modifier</a>
                        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete_salary"><i
                            class="fa-regular fa-trash-can m-r-5"></i>
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

    <div id="add_salary" class="modal custom-modal fade" role="dialog">
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
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Employé</label>
                    <select class="form-control" v-model="salary.employeId" required>
                      <option disabled value="">Select. tout</option>
                      <option v-for="(employe, index) in employees" :key="index" :value="employe.id">
                        {{ employe.lastName }} {{ employe.firstName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="col-form-label">Salaire Net</label>
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="text-primary">Les revenus</h4>
                  <div class="input-block mb-3">
                    <label class="col-form-label">De base</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">DA(40%)</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">HRA(15%)</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Transport</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Allocation</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Allocation médicale</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Autres</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <h4 class="text-primary">Deductions</h4>
                  <div class="input-block mb-3">
                    <label class="col-form-label">TDS</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">ESI</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">PF</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Absence</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Prof. Tax</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Bien-être au travail</label>
                    <input class="form-control" type="text" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Autres</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
              </div>
              <input type="hidden" v-model="salary.id">
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">{{ modalButton }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal custom-modal fade" id="delete_salary" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-header">
              <h3>Supprimer un salaire</h3>
              <p>Êtes-vous sûr de vouloir effacer?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a href="javascript:void(0);" class="btn btn-primary continue-btn">Supprimer</a>
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
  name: "salary",
  data() {
    return{
      salary : {
        id : "",
        employeId : ""
      },
      employees : [],
      modalType : "",
      modalButton : "",
      modalTitle : "",
    }
  },
  mounted() {
    this.getEmployees();
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
        this.modalTitle = "Ajouter une addition";
        this.modalButton = "Créer";
      } else if (type === "edit") {
        this.modalTitle = "Modifier une addition";
        this.modalButton = "Enregistrer";
        //this.fetchSingleSalary(id);
      }
    },
  }
};
</script>
