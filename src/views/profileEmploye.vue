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
                            <div class="profile-view">
                                <div class="profile-img-wrap">
                                    <div class="profile-img">
                                        <img :src="userStore.url" alt="User Image">
                                    </div>
                                </div>
                                <div class="profile-basic">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="profile-info-left">
                                                <h3 class="user-name m-t-0 mb-0">{{ userStore.lastname }} {{
                                                    userStore.firstname }}</h3>
                                                <h6 class="text-muted">{{ userStore.departmentName }} Team</h6>
                                                <small class="text-muted">{{ userStore.posteName }}</small>
                                                <div class="staff-id">Matricule: {{ userStore.number }}</div>
                                                <div class="small doj text-muted">Date De Début : {{ userStore.startDate
                                                    }}</div>
                                                <div class="staff-msg"><a class="btn btn-custom">Envoyer un message</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <ul class="personal-info">
                                                <li>
                                                    <div class="title">Numéro Tél.:</div>
                                                    <div class="text">{{ userStore.phoneNumber }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Email:</div>
                                                    <div class="text">{{ userStore.email }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Age:</div>
                                                    <div class="text">{{ userStore.old }} ans</div>
                                                </li>
                                                <li>
                                                    <div class="title">Genre:</div>
                                                    <div class="text">{{ userStore.gender }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Religion</div>
                                                    <div class="text">{{ userStore.religion }}</div>
                                                </li>
                                                <li>
                                                    <div class="title">Situation matrimoniale:</div>
                                                    <div class="text">{{ userStore.maritalStatus }}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal"
                                        class="edit-icon"><i class="fa-solid fa-pencil"></i></a></div>
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
                                            data-bs-toggle="modal" data-bs-target="#personal_info_modal"><i
                                                class="fa-solid fa-pencil"></i></a></h3>
                                    <ul class="personal-info">
                                        <li>
                                            <div class="title">CSP:</div>
                                            <div class="text">{{ userStore.csp }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Niveau Académique:</div>
                                            <div class="text">{{ userStore.level }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Contrat:</div>
                                            <div class="text">{{ userStore.contract }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 d-flex">
                            <div class="card profile-box flex-fill">
                                <div class="card-body">
                                    <h3 class="card-title">Informations bancaires<a class="edit-icon"
                                            data-bs-toggle="modal" data-bs-target="#bank_info_modal"><i
                                                class="fa-solid fa-pencil"></i></a></h3>
                                    <ul class="personal-info">
                                        <li>
                                            <div class="title">Nom de la banque:</div>
                                            <div class="text">{{ userStore.nameBank }}</div>
                                        </li>
                                        <li>
                                            <div class="title">Numéro de compte:</div>
                                            <div class="text">{{ userStore.nBank }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";
import { useUserStore } from "../stores/authStore";

export default defineComponent({
    name: "profileEmploye",
    setup() {
        const userStore = useUserStore();
        return {
            userStore
        };
    },
});
</script>
