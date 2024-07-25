<template>
    <div class="page-wrapper">

<div class="content container-fluid">

<div class="page-header">
<div class="row align-items-center">
<div class="col">
<h3 class="page-title">Congés</h3>
<ul class="breadcrumb">
<li class="breadcrumb-item"><a href="admin-dashboard.html">Dashboard</a></li>
<li class="breadcrumb-item active">Congés</li>
</ul>
</div>
<div class="col-auto float-end ms-auto">
<a href="holidays.html#" class="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_holiday"><i class="fa-solid fa-plus"></i> Add Holiday</a>
</div>
</div>
</div>

<div class="row">
<div class="col-md-12">
<div class="table-responsive">
<table class="table table-striped custom-table mb-0">
<thead>
<tr>
<th>#</th>
<th>Titre </th>
<th>Date des congés</th>
<th>Jour</th>
<th class="text-end">Action</th>
</tr>
</thead>
<tbody>
<tr class="holiday-upcoming">
<td>6</td>
<td>Bakrid</td>
<td>2 Sep 2019</td>
<td>Saturday</td>
<td class="text-end">
<div class="dropdown dropdown-action">
<a href="holidays.html#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
<div class="dropdown-menu dropdown-menu-right">
<a class="dropdown-item" href="holidays.html#" data-bs-toggle="modal" data-bs-target="#edit_holiday"><i class="fa-solid fa-pencil m-r-5"></i> Edit</a>
<a class="dropdown-item" href="holidays.html#" data-bs-toggle="modal" data-bs-target="#delete_holiday"><i class="fa-regular fa-trash-can m-r-5"></i> Delete</a>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>

<div class="modal custom-modal fade" id="add_holiday" role="dialog">
<div class="modal-dialog modal-dialog-centered" role="document">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title">Add Holiday</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">
<form>
<div class="input-block mb-3">
<label class="col-form-label">Holiday Name <span class="text-danger">*</span></label>
<input class="form-control" type="text">
</div>
<div class="input-block mb-3">
<label class="col-form-label">Holiday Date <span class="text-danger">*</span></label>
<div class="cal-icon"><input class="form-control datetimepicker" type="text"></div>
</div>
<div class="submit-section">
<button class="btn btn-primary submit-btn">Submit</button>
</div>
</form>
</div>
</div>
</div>
</div>

<div class="modal custom-modal fade" id="delete_holiday" role="dialog">
<div class="modal-dialog modal-dialog-centered">
<div class="modal-content">
<div class="modal-body">
<div class="form-header">
<h3>Delete Holiday</h3>
<p>Are you sure want to delete?</p>
</div>
<div class="modal-btn delete-action">
<div class="row">
<div class="col-6">
<a href="javascript:void(0);" class="btn btn-primary continue-btn">Supprimer</a>
</div>
<div class="col-6">
<a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Annuler</a>
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
export default {
    name: "holidays",
    data() {
        return {

        }
    },
}
</script>

<style>

</style>