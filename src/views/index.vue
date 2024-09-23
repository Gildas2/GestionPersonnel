<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">
          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Connexion</h3>
              <p class="account-subtitle">Accéder au tableau de bord</p>

              <!-- Affichage des messages -->
              <div v-if="message" :class="messageClass" class="mb-4">
                {{ message }}
              </div>

              <form @submit.prevent="adLogin">
                <div class="input-block mb-4">
                  <label class="col-form-label">Adresse mail</label>
                  <input
                    class="form-control"
                    type="email"
                    v-model="Admin.email"
                    required
                  />
                </div>
                <div class="input-block mb-4">
                  <div class="row align-items-center">
                    <div class="col">
                      <label class="col-form-label">Mot de passe</label>
                    </div>
                    <div class="col-auto">
                      <router-link
                        class="text-muted"
                        :to="{ name: 'forgotPassword' }"
                      >
                        Mot de passe oublié?
                      </router-link>
                    </div>
                  </div>
                  <div class="position-relative">
                    <input
                      class="form-control"
                      :type="passwordFieldType"
                      v-model="Admin.password"
                      required
                    />
                   <span
                      class="fa"
                      :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility"
                      style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"
                    ></span> 
                  </div>
                </div>
                <div class="input-block mb-4 text-center">
                  <button class="btn btn-primary account-btn" type="submit">
                    Se connecter
                  </button>
                </div>
                <div class="account-footer">
                  <p>
                    Vous n'avez pas encore de compte ?
                    <router-link :to="{ name: 'register' }">
                      S'inscrire
                    </router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/authStore';

export default {
  name: "index",
  data() {
    return {
      Admin: {
        email: null,
        password: null,
      },
      showPassword: false,
      message: '',
      messageClass: '',
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async adLogin() {
      let data = new FormData();
      data.append("email", this.Admin.email);
      data.append("password", this.Admin.password);
      data.append('action', 'login');

      try {
        const res = await this.$axios.post('index.php', data);

        if (res.data.error) {
          this.message = res.data.message;
          this.messageClass = "alert alert-danger";
        } else {
          const userStore = useUserStore();
          userStore.saveUser({
            id: res.data.data.id,
            email: this.Admin.email,
            lastname: res.data.data.lastname, 
            firstname: res.data.data.firstname,
            gender : res.data.data.gender,
            maritalStatus : res.data.data.maritalStatus,
            old : res.data.data.old,
            number : res.data.data.number,
            csp : res.data.data.csp,
            contract : res.data.data.contract,
            level : res.data.data.level,
            phoneNumber : res.data.data.phoneNumber,
            nationality : res.data.data.nationality,
            nameBank : res.data.data.nameBank,
            nBank : res.data.data.nBank,
            startDate : res.data.data.startDate,
            religion : res.data.data.religion,
            url : res.data.data.url,
            role: res.data.data.role,
            departmentName : res.data.data.departmentName,
            posteName : res.data.data.posteName,

          });

          this.message = res.data.message;
          this.messageClass = "alert alert-success";
          this.$router.push({name : "dashboard"}).then(() => {window.location.reload()});
        }
      } catch (err) {
        this.message = "Une erreur s'est produite lors de la connexion.";
        this.messageClass = "alert alert-danger";
      }
    },
  },
};
</script>
