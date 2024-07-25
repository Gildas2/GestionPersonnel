import { createRouter, createWebHistory } from "vue-router";
import register from "../views/register.vue";
import index from "../views/index.vue";
import employes from "../views/employes.vue";
import dashboard from '../components/dashboard.vue';
import departement from '../views/departement.vue';
import poste from '../views/poste.vue';
import holidays from '../views/holidays.vue';
import leaves from '../views/leaves.vue';
import attendanceEmployee from '../views/attendanceEmployee.vue';
import attendance from '../views/attendance.vue';
import leavesEmployee from '../views/leavesEmployee.vue';
import salary from '../views/salary.vue';
import payslip from '../views/payslip.vue';
import expenses from '../views/expenses.vue';
import paysroll from '../views/paysroll.vue';
import job from '../views/job.vue';
import jobDetails from '../views/jobDetails.vue';
import jobList from '../views/jobList.vue';
import jobView from '../views/jobView.vue';
import jobApplicant from '../views/jobApplicant.vue';
import chat from '../views/chat.vue';
import employeList from '../views/employeList.vue';

const routes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: dashboard
    },
    {
        path: "/register",
        name: "register",
        component: register
    },
    {
        path: "/",
        name: "index",
        component: index
    },
    {
        path: "/employes",
        name: "employes",
        component: employes
    },
    {
        path: "/departement",
        name: "departement",
        component: departement
    },
    {
        path: "/poste",
        name: "poste",
        component: poste
    },
    {
        path: "/holidays",
        name: "holidays",
        component: holidays
    },
    {
        path: "/leaves",
        name: "leaves",
        component: leaves
    },
    {
        path: "/leavesEmployee",
        name: "leavesEmployee",
        component: leavesEmployee       
    },
    {
        path: "/attendanceEmployee",
        name: "attendanceEmployee",
        component: attendanceEmployee
    },
    {
        path: "/attendance",
        name: "attendance",
        component: attendance
    },
    {
        path: "/salary",
        name: "salary",
        component: salary
    },
    {
        path: "/payslip",
        name: "payslip",
        component: payslip
    },
    {
        path: "/expenses",
        name: "expenses",
        component: expenses
    },
    {
        path: "/paysroll",
        name: "paysroll",
        component: paysroll
    },
    {
        path: "/job",
        name: "job",
        component: job
    },
    {
        path: "/jobDetails",
        name: "jobDetails",
        component: jobDetails
    },
    {
        path: "/jobList",
        name: "jobList",
        component: jobList
    },
    {
        path: "/jobView",
        name: "jobView",
        component: jobView
    },
    {
        path: "/jobApplicant",
        name: "jobApplicant",
        component: jobApplicant
    },
    {
        path: "/chat",
        name: "chat",
        component: chat
    },
    {
        path: "/employeList",
        name: "employeList",
        component: employeList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
