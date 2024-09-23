<template>
  <div class="page-wrapper">
    <div class="content container-fluid pb-0">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Bulletin de paie</h3>
          </div>
          <div class="col-auto float-end ms-auto">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-white">CSV</button>
              <button class="btn btn-white">PDF</button>
              <button class="btn btn-white">
                <i class="fa-solid fa-print fa-lg"></i> Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payslip",
  setup() {},
};
</script>
