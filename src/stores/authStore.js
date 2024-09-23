import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    number: null,
    lastname: null,
    firstname: null,
    gender: null,
    maritalStatus: null,
    old: null,
    csp: null,
    contract: null,
    level: null,
    phoneNumber: null,
    email: null,
    nationality: null,
    nameBank: null,
    nBank: null,
    startDate: null,
    religion: null,
    url: null,
    role: null,
    departmentName: null,
    posteName: null,
  }),
  actions: {
    saveUser(userData) {
      this.id = userData.id;
      this.number = userData.number;
      this.lastname = userData.lastname;
      this.firstname = userData.firstname;
      this.gender = userData.gender;
      this.maritalStatus = userData.maritalStatus;
      this.old = userData.old;
      this.csp = userData.csp;
      this.contract = userData.contract;
      this.level = userData.level;
      this.phoneNumber = userData.phoneNumber;
      this.email = userData.email;
      this.nationality = userData.nationality;
      this.nameBank = userData.nameBank;
      this.nBank = userData.nBank;
      this.startDate = userData.startDate;
      this.religion = userData.religion;
      this.url = userData.url;
      this.role = userData.role;
      this.departmentName = userData.departmentName;
      this.posteName = userData.posteName;
    },
    clearUser() {
      this.$reset();
    },
    logout() {
      this.clearUser();
      localStorage.removeItem('user');
      this.$router.push({ name: 'index' });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
});
