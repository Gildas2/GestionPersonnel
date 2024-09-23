<template>
  <div class="main-wrapper">
    <div class="sidebar" id="sidebar">
      <div class="sidebar-inner slimscroll">
        <div id="sidebar-menu" class="sidebar-menu">
          <nav class="greedy">
            <ul class="sidebar-vertical">
              <li class="submenu">
                <a><i class="la la-dashcube"></i> <span> Tableau de bord</span><span class="menu-arrow"></span></a>
                <ul>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'adminDashboard' }">Tableau de bord (Admin)</router-link>
                  </li>
                  <li v-if="userStore.role === 'Employé'">
                    <router-link :to="{ name: 'employeDashboard' }">Tableau de bord (Employé)</router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a><i class="la la-user"></i> <span> Employés</span><span class="menu-arrow"></span></a>
                <ul>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'employes' }">Tous les employés</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'holidays' }">Congés</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'attendance' }">Présences/Absences (Admin)</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin' || userStore.role === 'Employé'">

                    <router-link :to="{ name: 'attendanceEmployee' }">Présences/Absences (Employé)</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'leaves' }">Permissions (Admin)</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin' || userStore.role === 'Employé'">
                    <router-link :to="{ name: 'leavesEmployee' }">Permissions (Employé)</router-link>
                  </li>
                </ul>
              </li>

              <li class="submenu" v-if="userStore.role === 'admin'">
                <a><i class="la la-building"></i> <span> Gestion </span><span class="menu-arrow"></span></a>
                <ul>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'poste' }">Poste</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'departement' }">Département</router-link>
                  </li>
                </ul>
              </li>

              <li class="submenu">
                <router-link><i class="la la-files-o"></i> <span> RH </span><span
                    class="menu-arrow"></span></router-link>
                <ul>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'salary' }">Gestion Salariale</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin' || userStore.role === 'Employé'">
                    <router-link :to="{ name: 'payslip' }">Bulletin de Paie</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'paysroll' }">Gestion des rénumérations</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin' || userStore.role === 'Employé'">
                    <router-link :to="{ name: 'expenses' }">Dépenses</router-link>
                  </li>
                </ul>
              </li>

              <li class="submenu" v-if="userStore.role === 'admin'">
                <a><i class="la la-briefcase"></i> <span> Emplois </span><span class="menu-arrow"></span></a>
                <ul>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'jobList' }">Postuler à un offre</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'job' }">Gestion des offres d'emploi</router-link>
                  </li>
                  <li v-if="userStore.role === 'admin'">
                    <router-link :to="{ name: 'jobApplicant' }">Liste des candidats</router-link>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a>
                  <i class="la la-cube"></i>
                  <span> Applications</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li v-if="userStore.role === 'admin' || userStore.role === 'Employé'"><a
                      href="/chatDashboard">Chat</a></li>
                  <li v-if="userStore.role === 'admin'">
                    <a :to="{ name: 'calendar' }">Calendrier</a>
                  </li>
                </ul>
              </li>
              <li>
                <router-link v-if="userStore.role === 'admin'" :to="{ name: 'profileAdmin' }"><i
                    class="la la-user-tag"></i>
                  <span> Profil </span></router-link>
                <router-link v-if="userStore.role === 'Employé'" :to="{ name: 'profileEmploye' }"><i
                    class="la la-user-tag"></i>
                  <span> Profil </span></router-link>
              </li>
              <li>
                <router-link href=""><i class="la la-cog"></i><span>Paramètres</span></router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useUserStore } from "../stores/authStore";

export default defineComponent({
  name: "sidebar",
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
});
</script>
