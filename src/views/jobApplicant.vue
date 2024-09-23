<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Candidats</h3>
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
                  <th>Nom complet</th>
                  <th>Email</th>
                  <th>N. de téléphone</th>
                  <th>Date de dépôt</th>
                  <th class="text-center">Statut</th>
                  <th>CV</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection" class="__cf_email__"
                      data-cfemail="8ce6e3e4e2e8e3e9cce9f4ede1fce0e9a2efe3e1">[email&#160;protected]</a></td>
                  <td>9876543210</td>
                  <td>9 Feb 2019</td>
                  <td class="text-center">
                    <div class="dropdown action-label">
                      <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" 
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-regular fa-circle-dot text-info"></i> Nouveau
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item"><i
                            class="fa-regular fa-circle-dot text-info"></i> Nouveau</a>
                        <a class="dropdown-item"><i
                            class="fa-regular fa-circle-dot text-success"></i> Hired</a>
                        <a class="dropdown-item"><i
                            class="fa-regular fa-circle-dot text-danger"></i> Rejeté</a>
                        <a class="dropdown-item"><i
                            class="fa-regular fa-circle-dot text-danger"></i> Interviewed</a>
                      </div>
                    </div>
                  </td>
                  <td><a class="btn btn-sm btn-primary"><i class="fa-solid fa-download"></i>
                      Download</a></td>
                  <td class="text-end">
                    <div class="dropdown dropdown-action">
                      <a  class="action-icon dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false"><i class="material-icons">more_vert</i></a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item"><i class="fa-regular fa-clock m-r-5"></i>
                          Schedule Interview</a>
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

</template>

<script>
export default {
  name: "jobApplication",
  data() {
    return {

    }
  }
}
</script>

<style></style>