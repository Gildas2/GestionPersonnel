<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">
          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Inscription</h3>
              <p class="account-subtitle">Accès au tableau de bord</p>

              <div v-if="message" :class="messageClass" class="mb-4">
                {{ message }}
              </div>

              <form @submit.prevent="register">
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Email<span class="mandatory"> *</span>
                  </label>
                  <input class="form-control" type="email" v-model="Admin.email" required />
                </div>
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Mot de passe<span class="mandatory"> *</span>
                  </label>
                  <div class="position-relative">
                    <input class="form-control" :type="passwordFieldType" v-model="Admin.password"
                      @input="checkPasswordStrength" required />
                    <span class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility('password')"
                      style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
                  </div>
                  <div :class="passwordStrengthClass">
                      {{ passwordStrengthMessage }}
                  </div>
                </div>
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Confirmer mot de passe<span class="mandatory"> *</span>
                  </label>
                  <div class="position-relative">
                    <input class="form-control" :type="confirmPasswordFieldType" v-model="Admin.confirmPassword"
                      required />
                    <span class="fa" :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                      @click="togglePasswordVisibility('confirmPassword')"
                      style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
                  </div>
                </div>

                <!-- Ajout des boutons radio pour le rôle -->
                <div class="input-block mb-4">
                  <label class="col-form-label">Rôle<span class="mandatory"> *</span></label>
                  <div>
                    <label>
                      <input type="radio" v-model="Admin.role" value="admin" required />
                      Admin
                    </label>
                    <label style="margin-left: 10px;">
                      <input type="radio" v-model="Admin.role" value="employe" required />
                      Employé
                    </label>
                  </div>
                </div>

                <div class="input-block mb-4 text-center">
                  <button class="btn btn-primary account-btn" type="submit">
                    S'inscrire
                  </button>
                </div>
                <div class="account-footer">
                  <p>
                    J'ai déjà un compte?
                    <router-link :to="{ name: 'index' }">Connexion</router-link>
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
export default {
  name: "register",
  data() {
    return {
      Admin: {
        email: "",
        password: "",
        confirmPassword: "",
        role: "", // valeur par défaut vide
      },
      showPassword: false,
      showConfirmPassword: false,
      message: "",
      messageClass: "",
      passwordStrengthMessage: "",
      passwordStrengthClass: "",
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
    confirmPasswordFieldType() {
      return this.showConfirmPassword ? "text" : "password";
    },
  },
  methods: {
    togglePasswordVisibility(field) {
      if (field === "password") {
        this.showPassword = !this.showPassword;
      } else if (field === "confirmPassword") {
        this.showConfirmPassword = !this.showConfirmPassword;
      }
    },
    checkPasswordStrength() {
      const password = this.Admin.password;
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      if (strength === 1 || strength === 2) {
        this.passwordStrengthMessage = "Mot de passe faible";
        this.passwordStrengthClass = "text-danger";
      } else if (strength === 3 || strength === 4) {
        this.passwordStrengthMessage = "Mot de passe moyen";
        this.passwordStrengthClass = "text-warning";
      } else if (strength === 5) {
        this.passwordStrengthMessage = "Mot de passe fort";
        this.passwordStrengthClass = "text-success";
      } else {
        this.passwordStrengthMessage = "";
        this.passwordStrengthClass = "";
      }
    },
    register() {
      if (this.Admin.password !== this.Admin.confirmPassword) {
        this.message = "Les mots de passe ne correspondent pas";
        this.messageClass = "alert alert-danger";
        return;
      }

      const data = new FormData();
      data.append("email", this.Admin.email);
      data.append("password", this.Admin.password);
      data.append("role", this.Admin.role);
      data.append("action", "register");

      this.$axios
        .post("register.php", data)
        .then((res) => {
          if (res.data.error) {
            this.message = res.data.message;
            this.messageClass = "alert alert-danger";
          } else {
            this.message = res.data.message;
            this.messageClass = "alert alert-success";
            this.$router.push({
              name: "otp",
              query: { email: this.Admin.email },
            });
          }
        })
        .catch((err) => {
          this.message = "Une erreur s'est produite lors de l'inscription.";
          this.messageClass = "alert alert-danger";
        });
    },
  },
};
</script>

<style scoped>
.text-danger {
  color: red;
}

.text-warning {
  color: orange;
}

.text-success {
  color: green;
}
</style>
