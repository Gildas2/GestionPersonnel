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
    Header, 
  },
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
});
</script>
