<template>
  <div class="account-page">
    <div class="main-wrapper">
      <div class="account-content">
        <div class="container">
          <div class="account-box">
            <div class="account-wrapper">
              <h3 class="account-title">Connexion</h3>
              <p class="account-subtitle">Accéder au tableau de bord</p>

              <form action="" method="POST">
                <div class="input-block mb-4">
                  <label class="col-form-label">Adresse mail</label>
                  <input
                    class="form-control"
                    type="text"
                    name="email"
                    v-model="Admin.email"
                  />
                </div>
                <div class="input-block mb-4">
                  <div class="row align-items-center">
                    <div class="col">
                      <label class="col-form-label">Mot de passe</label>
                    </div>
                    <div class="col-auto">
                      <a class="text-muted" href="forgot-password.html">
                        Mot de passe oublié?
                      </a>
                    </div>
                  </div>
                  <div class="position-relative">
                    <input
                      class="form-control"
                      type="password"
                      id="password"
                      v-model="Admin.password"
                      name="password"
                    />
                    <span
                      class="fa-solid fa-eye-slash"
                      id="toggle-password"
                    ></span>
                  </div>
                </div>
                <div class="input-block mb-4 text-center">
                  <router-link
                    :to="{ name: 'dashboard' }"
                    class="btn btn-primary account-btn"
                    type="submit" @click.prevent="adLogin()"
                    >Se connecter</router-link
                  >
                </div>
                <div class="account-footer">
                  <p>
                    Vous n'avez pas encore de compte ?<router-link
                      :to="{name : 'register'}">S'inscrire</router-link
                    >
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
  name: "index",
  data() {
    return{
      Admin : {
        email : null,
        password : null,
      }
    }
  },
  methods : {
    adLogin(){
      if (!this.Admin.email || !this.Admin.password) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      var data = new FormData;
      data.append('email',this.Admin.email);
      data.append('password',this.Admin.password);
      axios.get('http://localhost/Gestion_Personnel/src/Api/login.php?action=login',data).then((res)=>{
        if(res.data.error){
          console.log("Erreur", res.data);
        }else{
          console.log("réussie");
          this.$router.push("/",res.data.message);
        }
      }).catch((err) =>{
        console.log("Erreur");
      })
    }
  }
};
</script>

<style scoped></style>
