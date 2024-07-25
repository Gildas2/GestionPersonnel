<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">
          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Inscription</h3>
              <p class="account-subtitle">Accès au tableau de bord</p>

              <form action="" method="POST">
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Email<span class="mandatory">*</span>
                  </label>
                  <input class="form-control" type="text" v-model="Admin.email" required />
                </div>
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Mot de passe<span class="mandatory">*</span>
                  </label>
                  <input class="form-control" type="password" v-model="Admin.password" required />
                </div>
                <div class="input-block mb-4">
                  <label class="col-form-label">
                    Confirmer mot de passe<span class="mandatory">*</span>
                  </label>
                  <input class="form-control" type="password" v-model="Admin.confirmPassword" required />
                </div>
                <div class="input-block mb-4 text-center">
                  <button class="btn btn-primary account-btn" type="submit" @click.prevent="register()">
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
import axios from 'axios';

export default {
  name: "register",
  data() {
    return {
      Admin: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    register() {
      if (this.Admin.password !== this.Admin.confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }

      const data = new FormData();
      data.append('email', this.Admin.email);
      data.append('password', this.Admin.password);

      axios.post('http://localhost/Gestion_Personnel/src/Api/register.php?action=register', data)
        .then(res => {
          console.log("Response from API:", res.data);
          if (res.data.error) {
            console.error("Erreur", res.data.message);
            alert(res.data.message);
          } else {
            console.log("Inscription réussie", res.data.message);
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.error("Erreur", err);
          alert("Une erreur s'est produite lors de l'inscription.");
        });
    }
  }
};
</script>

<style scoped></style>
