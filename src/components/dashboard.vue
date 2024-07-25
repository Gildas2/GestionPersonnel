<template>
  <div class="main-wrapper">
    <div class="header">
      <a id="toggle_btn" href="javascript:void(0);">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>

      <a id="mobile_btn" class="mobile_btn" @click="navigateToSidebar()"
        ><i class="fa-solid fa-bars"></i
      ></a>

      <ul class="nav user-menu">
        <li class="nav-item">
          <div class="top-nav-search">
            <a href="javascript:void(0);" class="responsive-search">
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
            <form action="search.html">
              <input
                class="form-control"
                type="text"
                placeholder="Rechercher ici"
              />
              <button class="btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            @click="dashboard()"
            class="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i class="fa-regular fa-bell"></i>
            <span class="badge rounded-pill">3</span>
          </a>
          <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
              <span class="notification-title">Notifications</span>
              <a href="javascript:void(0)" class="clear-noti"> Effacer tout </a>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a
            @click="dashboard()"
            class="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <i class="fa-regular fa-comment"></i
            ><span class="badge rounded-pill">8</span>
          </a>
          <div class="dropdown-menu notifications">
            <div class="topnav-dropdown-header">
              <span class="notification-title">Messages</span>
              <a href="javascript:void(0)" class="clear-noti"> Effacer tout </a>
            </div>
            <div class="topnav-dropdown-footer">
              <a href="chat.html">Voir tous les messages</a>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown has-arrow main-drop">
          <a
            @click="dashboard()"
            class="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
          >
            <span class="user-img"
              ><img src="../assets/img/avatar/avatar-27.jpg" alt="User Image" />
              <span class="status online"></span
            ></span>
            <span>Admin</span>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="">Profil</a>
            <a class="dropdown-item" href="settings.html">Paramètres</a>
            <router-link class="dropdown-item" :to="{ name: 'index' }"
              >Déconnexion</router-link
            >
          </div>
        </li>
      </ul>
    </div>

  <div class="sidebar" id="sidebar">
  <div class="sidebar-inner slimscroll">
    <div id="sidebar-menu" class="sidebar-menu">
      <ul class="sidebar-vertical">
        <li>
          <a><i class="la la-dashcube"></i> <span> Tableau de bord</span><span class="menu-arrow"></span></a>
          <ul>
            <li><a href="">Tableau de bord (Employé)</a></li>
            <li><a href="">Tableau de bord (Admin)</a></li>
          </ul>
        </li>
        <li class="submenu">
          <a><i class="la la-user"></i> <span> Employés</span><span class="menu-arrow"></span></a>
          <ul>
            <li><router-link :to="{ name : 'employes'}">Tous les employés</router-link></li>
            <li>
              <router-link :to="{ name : 'holidays'}">Congés</router-link>
            </li>
            <li><router-link :to="{ name : 'attendance'}">Présences (Admin)</router-link></li>
            <li><router-link :to="{ name : 'attendanceEmployee'}">Présences (Employé)</router-link></li>
            <li><router-link :to="{ name : 'leaves'}">Absences (Admin)</router-link></li>
            <li><router-link :to="{ name : 'leavesEmployee'}">Absences (Employé)</router-link></li>
          </ul>
        </li>

        <li class="submenu">
          <a><i class="la la-files-o"></i> <span> Gestion </span><span class="menu-arrow"></span></a>
          <ul>
            <li><router-link :to="{ name : 'poste'}">Poste</router-link></li>
            <li><router-link  :to="{ name : 'departement'}">Département</router-link></li>
          </ul>
        </li>

        <li class="submenu">
          <a><i class="la la-files-o"></i> <span> RH </span><span class="menu-arrow"></span></a>
          <ul>
            <li><router-link :to="{name : 'salary'}">Gestion Salariale</router-link></li>
            <li><router-link :to="{name : 'payslip'}">Bulletin de Paie</router-link></li>
            <li><router-link :to="{name : 'paysroll'}">Gestion des rénumérations</router-link></li>
            <li><router-link :to="{name : 'expenses'}">Dépenses</router-link></li>
          </ul>
        </li>
        
        <li class="submenu">
          <a><i class="la la-briefcase"></i> <span> Emplois </span><span class="menu-arrow"></span></a>
          <ul>
            <li><router-link :to="{name : 'jobList'}">Postuler à un offre</router-link></li>
            <li><router-link :to="{name : 'job'}">Gestion des offres d'emploi</router-link></li>
            <li><router-link :to="{name : 'jobApplicant'}">Liste des candidats</router-link></li>
          </ul>
        </li>
        <li class="submenu">
          <router-link ><i class="la la-cube"></i> <span> Applications</span><span class="menu-arrow"></span></router-link>
          <ul>
            <li><router-link :to="{name : 'chat'}">Chat</router-link></li>
            <li><a href="">Calendrier</a></li>
            <li><a href="">Contacts</a></li>
            <li><a href="">Email</a></li>
            <li><a href="">Gestionnaire de fichiers</a></li>
          </ul>
        </li>
        <li class="submenu">
          <a><i class="la la-user-tag"></i> <span> Profil </span></a>
        </li>
        <li>
          <a href=""><i class="la la-cog"></i> <span>Paramètres</span></a>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>

</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {

    };
  },
  methods: {
    navigateToSidebar() {
      this.$router.push({ path: "/dashboard", hash: "#sidebar" });
    },
    dashboard() {
      this.$router.push({ path: "/dashboard", hash: "#" });
    },
  },
};
</script>
