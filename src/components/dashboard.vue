<template>
  <div class="main-wrapper">
    <Header></Header>
    <Sidebar /> 
  </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useUserStore } from "../stores/authStore";
import Sidebar from "./sidebar.vue"; 
import Header from "./header.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    Sidebar,
    Header
  },
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
