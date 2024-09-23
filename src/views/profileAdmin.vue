<template>
    <div class="page-wrapper">
        <div class="content container-fluid pb-0">
            <div class="page-header">
                <div class="row">
                    <div class="col-sm-12">
                        <h3 class="page-title">Profil</h3>
                    </div>
                </div>
            </div>

            <div class="card mb-0">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="profile-view" v-for="(admin, index) in admin" :key="index">
                                <div class="profile-img-wrap">
                                    <div class="profile-img">
                                        <img :src="admin.url" alt="User Image">
                                    </div>
                                </div>
                                <div class="profile-basic">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="profile-info-left">
                                                <h3 class="user-name m-t-0 mb-0">{{ admin.lastname }} {{
                                                    admin.firstname }}</h3>
                                                <h6 class="text-muted">{{ admin.departmentName }} Team</h6>
                                                <small class="text-muted">{{ admin.posteName }}</small>
                                                <div class="staff-id">Matricule: {{ admin.number }}</div>
                                                <div class="small doj text-muted">Date De Début : {{ admin.startDate
                                                    }}</div>
                                                <div class="staff-msg"><a class="btn btn-custom">Envoyer un message</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <ul class="personal-info">
                                                <li>
                                                    <div class="title">Numéro Tél.:</div>
                                                    <div class="text">{{ admin.phoneNumber }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Email:</div>
                                                    <div class="text">{{ admin.email }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Age:</div>
                                                    <div class="text">{{ admin.old }} ans</div>
                                                </li>
                                                <li>
                                                    <div class="title">Genre:</div>
                                                    <div class="text">{{ admin.gender }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Religion</div>
                                                    <div class="text">{{ admin.religion }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Situation matrimoniale:</div>
                                                    <div class="text">{{ admin.maritalStatus }}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="pro-edit"><router-link data-bs-target="#profile_info" data-bs-toggle="modal"
                                        @click="fetchSingle(userStore.id)" class="edit-icon"><i
                                            class="fa-solid fa-pencil"></i></router-link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content">
                <div id="emp_profile" class="pro-overview tab-pane fade show active">
                    <div class="row">
                        <div class="col-md-6 d-flex">
                            <div class="card profile-box flex-fill">
                                <div class="card-body">
                                    <h3 class="card-title">Informations Professionnelles <a class="edit-icon"
                                            data-bs-toggle="modal" @click="fetchSingle(userStore.id)"
                                            data-bs-target="#personal_info_modal"><i class="fa-solid fa-pencil"></i></a>
                                    </h3>
                                    <ul class="personal-info" v-for="(admin, index) in admin" :key="index">
                                        <li>
                                            <div class="title">CSP:</div>
                                            <div class="text">{{ admin.csp }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Niveau Académique:</div>
                                            <div class="text">{{ admin.level }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Contrat:</div>
                                            <div class="text">{{ admin.contract }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex">
                            <div class="card profile-box flex-fill">
                                <div class="card-body">
                                    <h3 class="card-title">Informations bancaires<router-link class="edit-icon"
                                            data-bs-toggle="modal" @click="fetchSingle(userStore.id)"
                                            data-bs-target="#bank_info_modal"><i
                                                class="fa-solid fa-pencil"></i></router-link></h3>
                                    <ul class="personal-info" v-for="(admin, index) in admin" :key="index">
                                        <li>
                                            <div class="title">Nom de la banque:</div>
                                            <div class="text">{{ admin.nameBank }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Numéro de compte:</div>
                                            <div class="text">{{ admin.nBank }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="profile_info" class="modal custom-modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Informations Personnelles</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit="updatePersonalInfo">
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- Prévisualisation de l'image sélectionnée -->
                                    <div class="profile-img-wrap edit-img">
                                        <img :src="profile.imagePreview || userStore.url" class="inline-block"
                                            alt="Profile Image">
                                        <div class="fileupload btn">
                                            <span class="btn-text">Modifier</span>
                                            <input class="upload" type="file" @change="onImageChange">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Matricule</label>
                                                <input type="text" class="form-control" v-model="profile.number">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Nom</label>
                                                <input type="text" class="form-control" v-model="profile.lastName">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Prénom(s)</label>
                                                <input class="form-control" type="text" v-model="profile.firstName">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Genre</label>
                                                <select class="select form-control" v-model="profile.gender">
                                                    <option>Homme</option>
                                                    <option>Femme</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Date de début</label>
                                                <input type="date" class="form-control" v-model="profile.startDate">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Numéro de téléphone</label>
                                                <input type="text" class="form-control" v-model="profile.phoneNumber">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Age</label>
                                                <input type="text" class="form-control" v-model="profile.old">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Religion</label>
                                                <input type="text" class="form-control" v-model="profile.religion">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Situation matrimoniale</label>
                                                <input type="text" class="form-control" v-model="profile.maritalStatus">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Département</label>
                                                <select class="form-control" v-model="profile.departmentId">
                                                    <option>Sélectionner un département</option>
                                                    <option v-for="(department, index) in departments" :key="index"
                                                        :value="department.id">
                                                        {{ department.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-block mb-3">
                                                <label class="col-form-label">Poste</label>
                                                <select class="form-control" v-model="profile.posteId">
                                                    <option>Sélectionner un poste</option>
                                                    <option v-for="(poste, index) in postes" :key="index"
                                                        :value="poste.id">
                                                        {{ poste.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="submit-section">
                                <button class="btn btn-primary submit-btn">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div id="personal_info_modal" class="modal custom-modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Informations Professionnelles</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit="updateProfessionalInfo">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-block mb-3">
                                        <label class="col-form-label">CSP</label>
                                        <input type="text" class="form-control" v-model="profile.csp">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-block mb-3">
                                        <label class="col-form-label">Niveau Académique</label>
                                        <input class="form-control" type="text" v-model="profile.level">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-block mb-3">
                                        <label class="col-form-label">Contrat</label>
                                        <input class="form-control" type="text" v-model="profile.contract">
                                    </div>
                                </div>
                            </div>
                            <div class="submit-section">
                                <button class="btn btn-primary submit-btn">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div id="bank_info_modal" class="modal custom-modal fade" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Informations bancaires</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-block mb-3">
                                        <label class="col-form-label">Nom de la banque</label>
                                        <input type="text" class="form-control" v-model="profile.nameBank">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-block mb-3">
                                        <label class="col-form-label">Numéro de la banque</label>
                                        <input class="form-control" type="text" v-model="profile.nBank">
                                    </div>
                                </div>
                            </div>
                            <div class="submit-section">
                                <button class="btn btn-primary submit-btn" @click="updateBankInfo">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { useUserStore } from '../stores/authStore';

export default {
    data() {
        return {
            profile: {
                lastName: "",
                firstName: "",
                phoneNumber: "",
                nameBank: "",
                nBank: "",
                csp: "",
                contract: "",
                gender: "",
                departmentId: "",
                posteId: "",
                level: "",
                old: "",
                religion: "",
                startDate: "",
                number: "",
                maritalStatus: "",
                image: "",
                imagePreview: ""
            },
            admin: [],
            userStore: null,
            id: null,
            departments: [],
            postes: [],
            message: null,
            messageClass: null
        }
    },
    created() {
        // Initialiser userStore
        this.userStore = useUserStore();
        // Assigner directement l'ID sans condition
        this.id = this.userStore.id;

        this.fetchSingle(this.id);
    },
    mounted() {
        this.getDepartments();
        this.getPostes();
        this.getAdminInfo();
    },
    methods: {
        getDepartments() {
            this.$axios.get("departement.php?action=getDepartments")
                .then((res) => {
                    if (!res.data.error) {
                        this.departments = res.data.departments;
                    } else {
                        console.error(
                            "Erreur lors de la récupération des départements : " +
                            res.data.message
                        );
                    }
                })
                .catch((error) => {
                    console.error("Il y a eu une erreur!", error);
                });
        },

        getPostes() {
            this.$axios.get("poste.php?action=getPostes")
                .then((res) => {
                    if (!res.data.error) {
                        this.postes = res.data.postes;
                    } else {
                        console.error(
                            "Erreur lors de la récupération des postes : " + res.data.message
                        );
                    }
                })
                .catch((error) => {
                    console.error("Il y a eu une erreur!", error);
                });
        },

        updatePersonalInfo() {
            const formData = new FormData();

            // Ajouter les informations personnelles au FormData
            formData.append("id", this.userStore.id);
            formData.append("number", this.profile.number);
            formData.append("lastName", this.profile.lastName);
            formData.append("firstName", this.profile.firstName);
            formData.append("gender", this.profile.gender);
            formData.append("startDate", this.profile.startDate);
            formData.append("phoneNumber", this.profile.phoneNumber);
            formData.append("old", this.profile.old);
            formData.append("religion", this.profile.religion);
            formData.append("maritalStatus", this.profile.maritalStatus);
            formData.append("departmentId", this.profile.departmentId);
            formData.append("posteId", this.profile.posteId);

            // Ajouter l'image si elle a été modifiée
            if (this.profile.image) {
                formData.append("image", this.profile.image);
            }

            this.$axios.post("profile.php?action=updatePersonalInfo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    if (!res.data.error) {
                        alert("Informations personnelles mises à jour avec succès.");

                        // Mettre à jour l'image dans le store utilisateur si une nouvelle image est téléchargée
                        if (res.data.newImageUrl) {
                            this.userStore.url = res.data.newImageUrl;
                            this.profile.imagePreview = res.data.newImageUrl; 
                        }

                        // Réinitialiser le profil si nécessaire
                        this.profile = { number: "", lastName: "", firstName: "", gender: "", old: "", startDate: "", phoneNumber: "", maritalStatus: "", departmentId: "", posteId: "" };
                    } else {
                        alert("Erreur lors de la mise à jour : " + res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur", error);
                });
        },

        onImageChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.profile.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profile.imagePreview = e.target.result; 
                };
                reader.readAsDataURL(file);
            }
        },

        updateBankInfo() {
            const formData = new FormData();
            formData.append("id", this.userStore.id);
            formData.append("nameBank", this.profile.nameBank);
            formData.append("nBank", this.profile.nBank);

            this.$axios.post("profile.php?action=updateBankInfo", formData)
                .then((res) => {
                    if (!res.data.error) {
                        alert("Informations bancaires mises à jour avec succès.");
                        this.profile = { nameBank: "", nBank: "" };

                    } else {
                        console.error("Erreur lors de la mise à jour : " + res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur", error);
                });
        },

        updateProfessionalInfo() {
            const formData = new FormData();
            formData.append("id", this.userStore.id);
            formData.append("csp", this.profile.csp);
            formData.append("level", this.profile.level);
            formData.append("contract", this.profile.contract);

            this.$axios.post("profile.php?action=updateProfessionalInfo", formData)
                .then((res) => {
                    if (!res.data.error) {
                        alert("Informations professionnelles mises à jour avec succès.");
                        this.profile = { csp: "", level: "", contract: "" };
                    } else {
                        alert("Erreur lors de la mise à jour : " + res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur", error);
                });
        },

        getAdminInfo() {
            this.$axios.get("employe.php?action=getAdminInfo")
                .then(res => {
                    if (!res.data.error) {
                        this.admin = res.data.admin;
                    } else {
                        console.error("Erreur", res.data.message);
                    }
                })
                .catch(error => {
                    console.error("Erreur", error);
                })
        },
        
        fetchSingle(id) {
            this.$axios.get(`employe.php?action=fetchSingle&id=${id}`)
                .then((res) => {
                    if (!res.data.error) {
                        // Assigner les données aux sections correspondantes
                        this.profile = {
                            number: res.data.data.number,
                            lastName: res.data.data.lastName,
                            firstName: res.data.data.firstName,
                            departmentId: res.data.data.department_id,
                            posteId: res.data.data.poste_id,
                            startDate: res.data.data.startDate,
                            religion: res.data.data.religion,
                            phoneNumber: res.data.data.phoneNumber,
                            old: res.data.data.old,
                            gender: res.data.data.gender,
                            maritalStatus: res.data.data.maritalStatus,
                            nameBank: res.data.data.nameBank,
                            nBank: res.data.data.nBank,
                            level: res.data.data.level,
                            csp: res.data.data.csp,
                            contract: res.data.data.contract,

                        };
                        if (res.data.data.url) {
                            this.uploadedImage = `<img src='${res.data.data.url}' class='img-thumbnail' width='200' />`;
                        }
                    } else {
                        console.error("Erreur lors de la récupération des informations : " + res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des informations !", error);
                });
        }
    }
};
</script>
