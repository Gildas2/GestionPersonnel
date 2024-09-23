<template>
    <div class="account-page">
        <div class="main-wrapper">
            <div class="account-content">
                <div class="container">
                    <div class="account-box">
                        <div class="account-wrapper">
                            <h3 class="account-title">OTP</h3>
                            <p class="account-subtitle">Vérification de votre compte</p>

                            <form>
                                <div class="otp-wrap">
                                    <input ref="otpInputs" type="text" v-model="otp[0]" maxlength="1" class="otp-input"
                                        @input="moveFocus(0)" />
                                    <input ref="otpInputs" type="text" v-model="otp[1]" maxlength="1" class="otp-input"
                                        @input="moveFocus(1)" />
                                    <input ref="otpInputs" type="text" v-model="otp[2]" maxlength="1" class="otp-input"
                                        @input="moveFocus(2)" />
                                    <input ref="otpInputs" type="text" v-model="otp[3]" maxlength="1" class="otp-input"
                                        @input="moveFocus(3)" />
                                </div>
                                <div class="input-block mb-4 text-center">
                                    <button class="btn btn-primary account-btn" type="submit"
                                        @click="verifyOtp">Entrer</button>
                                </div>
                                <div class="account-footer">
                                    <p>Pas encore reçu? <a href="javascript:void(0);" @click="resendOtp">Renvoyer OTP</a></p>
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
    name: "otp",
    data() {
        return {
            otp: ['', '', '', ''],
            email: this.$route.query.email 
        };
    },
    methods: {
        moveFocus(index) {
            const nextInput = this.$refs.otpInputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        },
        verifyOtp() {
            event.preventDefault();
            const otpCode = this.otp.join('');
           
            if (otpCode.length !== 4) {
                alert("Veuillez entrer un OTP complet.");
                return;
            }

            const data = new FormData();
            data.append('otp_code', otpCode);
            data.append('email', this.email); 
            data.append('action', 'verify');

            this.$axios.post('verification.php', data)
                .then(res => {
                    console.log("Réponse de l'API:", res.data);
                    if (res.data.error) {
                        console.error("Erreur", res.data.message);
                        alert(res.data.message);
                    } else {
                        console.log("Vérification réussie", res.data.message);
                        alert(res.data.message);
                        this.$router.push({ name: "dashboard" }).then(() => {window.location.reload()});
                    }
                })
                .catch(err => {
                    console.error("Erreur", err);
                    alert("Une erreur s'est produite lors de la vérification.");
                });
        },
        resendOtp() {
            const data = new FormData();
            data.append('email', this.email);
            data.append('action', 'resend');
            this.$axios.post('verification.php', data)
                .then(res => {
                    console.log("Réponse de l'API:", res.data);
                    if (res.data.error) {
                        console.error("Erreur", res.data.message);
                        alert(res.data.message);
                    } else {
                        console.log("OTP renvoyé", res.data.message);
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.error("Erreur", err);
                    alert("Une erreur s'est produite lors de l'envoi de l'OTP.");
                });
        }
    }
}
</script>

<style scoped>
/* Ajoutez ici votre style personnalisé */
</style>
