<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Salaire des employés</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="admin-dashboard.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Salaire</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a
              href="salary.html#"
              class="btn add-btn"
              data-bs-toggle="modal"
              data-bs-target="#add_salary"
              ><i class="fa-solid fa-plus"></i> Ajouter un salaire</a
            >
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
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option value>-- Select --</option>
              <option value>Employé</option>
              <option value="1">Manager</option>
            </select>
            <label class="focus-label">Rôle</label>
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
            <label class="focus-label">Leave Status</label>
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
          <a href="salary.html#" class="btn btn-success w-100"> Search </a>
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
                  <th>Rôle</th>
                  <th>Salaire</th>
                  <th>Fiche paie</th>
                  <th class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h2 class="table-avatar">
                      <a href="profile.html" class="avatar"
                        ><img
                          src="../assets/img/profiles/avatar-02.jpg"
                          alt="User Image"
                      /></a>
                      <a href="profile.html"
                        >John Doe <span>Web Designer</span></a
                      >
                    </h2>
                  </td>
                  <td>FT-0001</td>
                  <td>
                    <a
                      href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                      class="__cf_email__"
                      data-cfemail="0c666364626863694c69746d617c6069226f6361"
                      >[email&#160;protected]</a
                    >
                  </td>
                  <td>1 Jan 2013</td>
                  <td>
                    <div class="dropdown">
                      <a
                        href="salary.html#"
                        class="btn btn-white btn-sm btn-rounded dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >Web Designer
                      </a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="salary.html#"
                          >Software Engineer</a
                        >
                        <a class="dropdown-item" href="salary.html#"
                          >Software Tester</a
                        >
                        <a class="dropdown-item" href="salary.html#"
                          >Frontend Developer</a
                        >
                        <a class="dropdown-item" href="salary.html#"
                          >UI/UX Developer</a
                        >
                      </div>
                    </div>
                  </td>
                  <td>$59698</td>
                  <td>
                    <a class="btn btn-sm btn-primary" href="salary-view.html"
                      >Generate Slip</a
                    >
                  </td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a
                        href="salary.html#"
                        class="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ><i class="material-icons">more_vert</i></a
                      >
                      <div class="dropdown-menu dropdown-menu-right">
                        <a
                          class="dropdown-item"
                          href="salary.html#"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_salary"
                          ><i class="fa-solid fa-pencil m-r-5"></i> Modifier</a
                        >
                        <a
                          class="dropdown-item"
                          href="salary.html#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_salary"
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

    <div id="add_salary" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ajouter le salaire du personnel</h5>
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
            <form action="salary.html">
              <div class="row">
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Sélectionner le personnel</label>
                    <select class="form-control">
                      <option>John Doe</option>
                      <option>Richard Miles</option>
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
                  <div class="add-more">
                    <a href="salary.html#"
                      ><i class="fa-solid fa-plus-circle"></i> Ajouter plus</a
                    >
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
                  <div class="add-more">
                    <a href="salary.html#"
                      ><i class="fa-solid fa-plus-circle"></i>Ajouter plus</a
                    >
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div id="edit_salary" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier le salaire du personnel</h5>
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
            <form action="salary.html">
              <div class="row">
                <div class="col-sm-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Sélectionner le personnel</label>
                    <select class="form-select">
                      <option>John Doe</option>
                      <option>Richard Miles</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="col-form-label">Salaire Net </label>
                  <input class="form-control" type="text" value="$4000" />
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="text-primary">Les revenus</h4>
                  <div class="input-block mb-3">
                    <label class="col-form-label">De Base</label>
                    <input class="form-control" type="text" value="$6500" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">DA(40%)</label>
                    <input class="form-control" type="text" value="$2000" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">HRA(15%)</label>
                    <input class="form-control" type="text" value="$700" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Conveyance</label>
                    <input class="form-control" type="text" value="$70" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Allocation</label>
                    <input class="form-control" type="text" value="$30" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Allocation médicale</label>
                    <input class="form-control" type="text" value="$20" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Autres</label>
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <h4 class="text-primary">Déductions</h4>
                  <div class="input-block mb-3">
                    <label class="col-form-label">TDS</label>
                    <input class="form-control" type="text" value="$300" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">ESI</label>
                    <input class="form-control" type="text" value="$20" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">PF</label>
                    <input class="form-control" type="text" value="$20" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Absence</label>
                    <input class="form-control" type="text" value="$250" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Prof. Tax</label>
                    <input class="form-control" type="text" value="$110" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Bien-être au travail</label>
                    <input class="form-control" type="text" value="$10" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Fond</label>
                    <input class="form-control" type="text" value="$40" />
                  </div>
                  <div class="input-block mb-3">
                    <label class="col-form-label">Autres</label>
                    <input class="form-control" type="text" value="$15" />
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">Enregistrer</button>
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
              <p>Êtes-vous sûr de vouloir effacer ?</p>
            </div>
            <div class="modal-btn delete-action">
              <div class="row">
                <div class="col-6">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-primary continue-btn"
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
  name: "salary",
  data() {},
};
</script>
