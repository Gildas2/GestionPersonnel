<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">
                    <div class="account-box">
                        <div class="account-wrapper">
                            <form @submit.prevent="resetPassword">
                                <div class="input-block mb-3">
                                    <label class="col-form-label">Nouveau mot de passe</label>
                                    <div class="position-relative">
                                        <input
                                            class="form-control"
                                            :type="passwordFieldType"
                                            v-model="password"
                                            @input="checkPasswordStrength"
                                            required
                                        />
                                        <span class="fa"
                                              :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                                              @click="togglePasswordVisibility"
                                              style="cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></span>
                                    </div>
                                </div>
                                <p :class="passwordStrengthClass">{{ passwordStrengthMessage }}</p>
                                
                                <!-- Message de succès ou d'erreur -->
                                <div v-if="message" :class="messageClass" class="my-3">{{ message }}</div>
                                
                                <div class="input-block mb-3 text-center">
                                    <button class="btn btn-primary account-btn" type="submit">Entrer</button>
                                </div>
                                <div class="account-footer">
                                    <p>Se connecter en tant qu'utilisateur? <router-link
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
import axios from 'axios';

export default {
    name: "resetPassword",
    data() {
        return {
            password: "",
            token: this.$route.query.token,
            email: this.$route.query.email,
            showPassword: false,
            message: '',
            messageClass: '',
            passwordStrengthMessage: '',
            passwordStrengthClass: '',
        };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? "text" : "password";
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        checkPasswordStrength() {
            const password = this.password;
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[a-z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;

            if (strength === 1 || strength === 2) {
                this.passwordStrengthMessage = 'Mot de passe faible';
                this.passwordStrengthClass = 'text-danger';
            } else if (strength === 3 || strength === 4) {
                this.passwordStrengthMessage = 'Mot de passe moyen';
                this.passwordStrengthClass = 'text-warning';
            } else if (strength === 5) {
                this.passwordStrengthMessage = 'Mot de passe fort';
                this.passwordStrengthClass = 'text-success';
            } else {
                this.passwordStrengthMessage = '';
                this.passwordStrengthClass = '';
            }
        },
        resetPassword() {
            const data = new FormData();
            data.append('password', this.password);
            data.append('token', this.token);
            data.append('email', this.email);
            data.append('action', 'reset');

            this.$axios.post('reset_psw.php', data)
                .then(res => {
                    if (res.data.error) {
                        this.message = res.data.message;
                        this.messageClass = "alert alert-danger";
                    } else {
                        this.message = res.data.message;
                        this.messageClass = "alert alert-success";
                        setTimeout(() => {
                            this.$router.push({ name: 'index' });
                        }, 2000); // Attendre 2 secondes avant de rediriger
                    }
                })
                .catch(err => {
                    this.message = "Une erreur s'est produite lors de la réinitialisation du mot de passe.";
                    this.messageClass = "alert alert-danger";
                });
        }
    }
}
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
.alert {
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}
</style>
