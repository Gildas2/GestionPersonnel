<template>
  <div>
    <router-view />
    <dashboard v-if="showDashboard" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import dashboard from "./components/dashboard.vue";

export default {
  components: {
    dashboard,
  },
  setup() {
    const route = useRoute();
    const showDashboard = computed(() => {
      return route.name !== 'register' && route.name !== 'index' && route.name !== 'otp' && route.name !== 'forgotPassword' && route.name !== 'resetPassword'&& route.name !== 'notification' && route.name !== 'chatDashboard' && route.name !== 'chat';
    });

    return {
      showDashboard,
    };
  },
};
</script>
