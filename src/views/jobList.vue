<template>
  <div class="page-wrapper job-wrapper">
    <div class="content container pb-0">
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Jobs</h3>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6"  v-for="job in jobs" :key="job.id">
          <router-link class="job-list" :to="{name : 'jobView'}">
            <div class="job-list-det">
              <div class="job-list-desc">
                <h3 class="job-list-title">{{ job.title }}</h3>
                <h4 class="job-department">{{ job.departmentName }}</h4>
              </div>
              <div class="job-type-info">
                <span class="job-types">{{ job.type }}</span>
              </div>
            </div>
            <div class="job-list-footer">
              <ul>
                <li><i class="fa-solid fa-signs-post"></i>{{ job.location }}</li>
                <li>
                  <i class="fa-regular fa-money-bill-1"></i> {{ job.salaryFrom }}f-{{ job.salaryTo }}f
                </li>
                <li><i class="fa-regular fa-clock"></i> 2 days ago</li>
              </ul>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jobList",
  data() {
    return {
      jobs : []
    };
  },
  mounted(){
    this.listJobs();
  },
  methods : {
    listJobs() {
      this.$axios.get(
          "job.php?action=listJobs"
        )
        .then((res) => {
          if (!res.data.error) {
            this.jobs = res.data.elements;
          } else {
            console.error("Erreur", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Erreur", error);
        });
    },
  }
};
</script>
