<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">
                    <div class="account-box">
                        <div class="account-wrapper">
                            <h3 class="account-title">Mot de passe oublié?</h3>
                            <p class="account-subtitle">Entrez votre email pour obtenir un lien de réinitialisation de
                                mot de passe</p>

                            <form @submit.prevent="recover">
                                <div class="input-block mb-4">
                                    <label class="col-form-label">Adresse Email</label>
                                    <input class="form-control" type="email" v-model="email" required>
                                </div>
                                <div class="input-block mb-4 text-center">
                                    <button class="btn btn-primary account-btn" type="submit">Réinitialiser le mot de
                                        passe</button>
                                </div>
                                <div class="account-footer">
                                    <p>Vous vous souvenez de votre mot de passe ? <router-link
                                            :to="{ name: 'index' }">Connexion</router-link></p>
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
    name: 'forgotPassword',
    data() {
        return {
            email: ""
        }
    },
    methods: {
        recover() {
            const data = new FormData();
            data.append('email', this.email);
            data.append('action', 'recover');  

            this.$axios.post('recover_psw.php', data)
                .then(res => {
                    if (!res.data.error) {
                        console.log("Réinitialisation réussie", res.data.message);
                        alert(res.data.message);
                        this.$router.push({ name: 'notification' })
                    } else {
                        console.error("Erreur", res.data.message);
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.error("Erreur", err);
                    alert("Une erreur s'est produite lors de la réinitialisation du mot de passe.");
                });
        }

    }

}
</script>

<style lang="scss" scoped></style>