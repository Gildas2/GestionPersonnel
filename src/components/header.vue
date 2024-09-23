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

      <a id="mobile_btn" class="mobile_btn"><i class="fa-solid fa-bars"></i></a>

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
          <a class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
            <span class="user-img">
              <img :src="userStore.url" alt="User Image" />
            </span>
            <span>{{ displayName }}</span>
          </a>
          <div class="dropdown-menu">
            <router-link
              v-if="userStore.role === 'admin'"
              class="dropdown-item"
              :to="{ name: 'profileAdmin' }"
              >Profil</router-link
            >
            <router-link
              v-if="userStore.role === 'employe'"
              class="dropdown-item"
              :to="{ name: 'profileEmploye' }"
              >Profil</router-link
            >
            <router-link class="dropdown-item">Paramètres</router-link>
            <router-link
              class="dropdown-item"
              :to="{ name: 'index' }"
              @click="logout"
              >Déconnexion</router-link
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useUserStore } from "../stores/authStore";

export default defineComponent({
  name: "header",
  setup() {
    const userStore = useUserStore();

    // Propriété calculée pour déterminer ce qu'il faut afficher
    const displayName = computed(() => {
      if (userStore.role === "admin") {
        return userStore.role;
      } else if (userStore.role === "employe") {
        return `${userStore.firstname} ${userStore.lastname}`;
      } 
    });

    // Fonction de déconnexion
    const logout = () => {
      userStore.logout();
    };

    return {
      displayName,
      userStore,
      logout,
    };
  },
});
</script>
