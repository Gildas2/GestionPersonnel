<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Présences</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <router-link class="btn add-btn" :to="{name: 'Map'}"><i class="fa-solid fa-plus"></i> Ajouter une
              localisation</router-link>
          </div>
        </div>
      </div>

      <div class="row filter-row">
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus">
            <input type="text" class="form-control floating" />
            <label class="focus-label">Nom de l'employé</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option>-</option>
              <option>Jan</option>
              <option>Feb</option>
              <option>Mar</option>
              <option>Apr</option>
              <option>May</option>
              <option>Jun</option>
              <option>Jul</option>
              <option>Aug</option>
              <option>Sep</option>
              <option>Oct</option>
              <option>Nov</option>
              <option>Dec</option>
            </select>
            <label class="focus-label">Selectionner le mois</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="input-block mb-3 form-focus select-focus">
            <select class="form-control select floating">
              <option>-</option>
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
              <option>2015</option>
            </select>
            <label class="focus-label">Sélectionner l'année</label>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="d-grid">
            <a class="btn btn-success"> Rechercher </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="table-responsive">
            <table class="table table-striped custom-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date </th>
                  <th>Entrée</th>
                  <th>Sortie</th>
                  <th>Production</th>
                  <th>Pause</th>
                  <th>Heures Supp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>19 Feb 2019</td>
                  <td>10 AM</td>
                  <td>7 PM</td>
                  <td>9 hrs</td>
                  <td>1 hrs</td>
                  <td>0</td>
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  components : {
    Datepicker,
  },
  name: "attendance",
  data() {
    return {
      attendance:{
        month: "",
        year: ""
      }
    }
  },

};
</script>
<style>
.dp__input {
  border: 1px solid #ced4da;
  border-radius: 5px;
  height: 49px;
  font-size: 1rem; 
  --dp-border-color-hover: #FF902F;
  --dp-marker-color: #FF902F;
}
.dp__theme_light{
  --dp-border-color: #FF902F;
  --dp-menu-border-color: #FF902F;
  --dp-icon-color: #959595;
   
}
:root{
  --dp-input-padding: 6px 30px 6px 12px; 
}
</style>
