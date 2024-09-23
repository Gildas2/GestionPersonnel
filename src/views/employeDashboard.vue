<template>
  <div class="page-wrapper">
    <div class="content container-fluid pb-0">
      <div class="row">
        <div class="col-md-12">
          <div class="employee-alert-box">
            <div class="alert alert-outline-success alert-dismissible fade show">
              <div class="employee-alert-request">
                <i class="far fa-circle-question"></i>
                Your Leave Request on <span>“24th April 2024”</span> has been
                Approved!!!
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 col-md-12">
          <div class="card employee-welcome-card flex-fill">
            <div class="card-body">
              <div class="welcome-info">
                <div class="welcome-content">
                  <h4>Bienvenue, {{ userStore.firstname }}</h4>
                  <p>You have <span>4 meetings</span> today,</p>
                </div>
                <div class="welcome-img">
                  <img :src="userStore.url" class="img-fluid" alt="User" />
                </div>
              </div>
              <div class="welcome-btn">
                <router-link :to="{ name : 'profileEmploye'}" class="btn">Voir le profil</router-link>
              </div>
            </div>
          </div>
          <div class="card flex-fill">
            <div class="card-body">
              <div class="statistic-header">
                <h4>Statistiques</h4>
                <div class="dropdown statistic-dropdown">
                  <a class="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                    Aujourd'hui
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" class="dropdown-item">
                      Semaine
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      matTooltip="text" [matTooltipPosition]="above"
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      Année
                    </a>
                  </div>
                </div>
              </div>
              <div class="clock-in-info">
                <div class="clock-in-content">
                  <p>Temps de travail</p>
                  <h4>6 Hrs : 54 Min</h4>
                </div>
                <div class="clock-in-btn">
                  <a href="javascript:void(0);" class="btn btn-primary">
                    <img src="../assets/img/icons/clock-in.svg" alt="Icon" />
                    Clock-In
                  </a>
                </div>
              </div>
              <div class="clock-in-list">
                <ul class="nav">
                  <li>
                    <p>Restant</p>
                    <h6>2 Hrs 36 Min</h6>
                  </li>
                  <li>
                    <p>Heures Supp.</p>
                    <h6>0 Hrs 00 Min</h6>
                  </li>
                  <li>
                    <p>Pause</p>
                    <h6>1 Hrs 00 Min</h6>
                  </li>
                </ul>
              </div>
              <div class="view-attendance">
                <a href="attendance.html">
                  Voir les présences <i class="fe fe-arrow-right-circle"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="card info-card flex-fill">
            <div class="card-body">
              <h4>Congés à venir</h4>
              <div class="holiday-details">
                <div class="holiday-calendar">
                  <div class="holiday-calendar-icon">
                    <img src="../assets/img/icons/holiday-calendar.svg" alt="Icon" />
                  </div>
                  <div class="holiday-calendar-content">
                    <h6>Ramzan</h6>
                    <p>Mon 20 May 2024</p>
                  </div>
                </div>
                <div class="holiday-btn">
                  <a class="btn">Voir tout</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-md-12">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="statistic-header">
                <h4>Présences & Absences</h4>
                <div class="dropdown statistic-dropdown">
                  <a class="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                    2024
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" class="dropdown-item">
                      2025
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      2026
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      2027
                    </a>
                  </div>
                </div>
              </div>
              <div class="attendance-list">
                <div class="row">
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-primary">9</h4>
                      <p>Total des absences</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-pink">5.5</h4>
                      <p>Absences prises</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-success">04</h4>
                      <p>Absences non signalées</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-purple">0</h4>
                      <p>En attente d'approbation</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-info">214</h4>
                      <p>Nombres de jours de travail</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="attendance-details">
                      <h4 class="text-danger">2</h4>
                      <p>Perte de salaire</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="view-attendance">
                <a href="leaves-employee.html">
                  Demander une permission <i class="fe fe-arrow-right-circle"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="card flex-fill">
            <div class="card-body">
              <div class="statistic-header">
                <h4>Temps de travail</h4>
                <div class="dropdown statistic-dropdown">
                  <a class="dropdown-toggle" data-bs-toggle="dropdown" href="javascript:void(0);">
                    Cette semaine
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a href="javascript:void(0);" class="dropdown-item">
                      La semaine dernière
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      Ce mois
                    </a>
                    <a href="javascript:void(0);" class="dropdown-item">
                      Les 30 derniers jours
                    </a>
                  </div>
                </div>
              </div>
              <div class="working-hour-info">
                <div id="working_chart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-md-12 d-flex">
          <div class="card employee-month-card flex-fill">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-lg-9 col-md-12">
                  <div class="employee-month-details">
                    <h4>Employé du mois</h4>
                    <p>
                      Nous sommes vraiment fiers de la différence que vous avez faite, ce qui donne à chacun une raison d'applaudir et d'apprécier
                    </p>
                  </div>
                  <div class="employee-month-content">
                    <h6>Félicitations, Hanna</h6>
                    <p>UI/UX Team Lead</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-12">
                  <div class="employee-month-img">
                    <img src="../assets/img/employee-img.png" class="img-fluid" alt="User" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-md-12 d-flex">
          <div class="card flex-fill">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-sm-8">
                  <div class="statistic-header">
                    <h4>Company Policy</h4>
                  </div>
                </div>
                <div class="col-sm-4 text-sm-end">
                  <div class="owl-nav company-nav nav-control"></div>
                </div>
              </div>
              <div class="company-slider owl-carousel">
                <div class="company-grid company-soft-tertiary">
                  <div class="company-top">
                    <div class="company-icon">
                      <span class="company-icon-tertiary rounded-circle">HR</span>
                    </div>
                    <div class="company-link">
                      <a href="companies.html">HR Policy</a>
                    </div>
                  </div>
                  <div class="company-bottom d-flex">
                    <ul>
                      <li>Policy Name : Work policy</li>
                      <li>Updated on : Today</li>
                    </ul>
                    <div class="company-bottom-links">
                      <a href="employee-dashboard.html#"><i class="la la-download"></i></a>
                      <a href="employee-dashboard.html#"><i class="la la-eye"></i></a>
                    </div>
                  </div>
                </div>
                
                <div class="company-grid company-soft-info">
                  <div class="company-top">
                    <div class="company-icon">
                      <span class="company-icon-info rounded-circle">LP</span>
                    </div>
                    <div class="company-link">
                      <a href="companies.html">Leave Policy</a>
                    </div>
                  </div>
                  <div class="company-bottom d-flex">
                    <ul>
                      <li>Policy Name : Annual Leave</li>
                      <li>Updated on : 25 Jan 2023</li>
                    </ul>
                    <div class="company-bottom-links">
                      <a href="employee-dashboard.html#"><i class="la la-download"></i></a>
                      <a href="employee-dashboard.html#"><i class="la la-eye"></i></a>
                    </div>
                  </div>
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
import { defineComponent } from "vue";
import { useUserStore } from "../stores/authStore";

export default defineComponent({
  name: "employeDashboard",
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    };
  },
});
</script>
