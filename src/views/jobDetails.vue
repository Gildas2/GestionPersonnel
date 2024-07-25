<template>
  <div class="page-wrapper">
    <div class="content container-fluid pb-0">
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Job Details</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="admin-dashboard.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Job Details</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="job-info job-widget">
            <h3 class="job-title">Android Developer</h3>
            <span class="job-dept">App Development</span>
            <ul class="job-post-det">
              <li>
                <i class="fa-regular fa-calendar-days"></i> Post Date:
                <span class="text-blue">Feb 18, 2019</span>
              </li>
              <li>
                <i class="fa-regular fa-calendar-days"></i> Last Date:
                <span class="text-blue">May 31, 2019</span>
              </li>
              <li>
                <i class="fa-regular fa-user"></i> Applications:
                <span class="text-blue">4</span>
              </li>
              <li>
                <i class="fa-solid fa-eye"></i> Views:
                <span class="text-blue">3806</span>
              </li>
            </ul>
          </div>
          <div class="job-content job-widget">
            <div class="job-desc-title"><h4>Job Description</h4></div>
            <div class="job-description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
            <div class="job-desc-title"><h4>Job Description</h4></div>
            <div class="job-description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <ul class="square-list">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="job-det-info job-widget">
            <a
              class="btn job-btn"
              href="job-details.html#"
              data-bs-toggle="modal"
              data-bs-target="#edit_job"
              >Edit</a
            >
            <div class="info-list">
              <span><i class="fa-solid fa-chart-column"></i></span>
              <h5>Job Type</h5>
              <p>Full Time</p>
            </div>
            <div class="info-list">
              <span><i class="fa-regular fa-money-bill-1"></i></span>
              <h5>Salary</h5>
              <p>$32k - $38k</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-suitcase"></i></span>
              <h5>Experience</h5>
              <p>2 Years</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-ticket"></i></span>
              <h5>Vacancy</h5>
              <p>5</p>
            </div>
            <div class="info-list">
              <span><i class="fa-solid fa-signs-post"></i></span>
              <h5>Location</h5>
              <p>
                Dreamguy's Technologies <br />
                3864 Quiet Valley Lane, <br />
                Sherman Oaks, <br />
                California, 91403
              </p>
            </div>
            <div class="info-list">
              <p class="text-truncate">
                818-978-7102 <br />
                <a
                  href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection#a4c0c5cacdc1c8d4cbd6d0c1d6e4c1dcc5c9d4c8c18ac7cbc9"
                  title="danielporter@example.com"
                  ><span
                    class="__cf_email__"
                    data-cfemail="c2a6a3acaba7aeb2adb0b6a7b082a7baa3afb2aea7eca1adaf"
                    >[email&#160;protected]</span
                  ></a
                >
                <br />
                <a
                  href="https://www.example.com"
                  target="_blank"
                  title="https://www.example.com"
                  >https://www.example.com</a
                >
              </p>
            </div>
            <div class="info-list text-center">
              <a class="app-ends" href="job-details.html#"
                >Application ends in 2d 7h 6m</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="edit_job" class="modal custom-modal fade" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <button type="button" class="btn-close" data-bs-dismiss="modal">
          &times;
        </button>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Job</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Job Title</label>
                    <input
                      class="form-control"
                      type="text"
                      value="Web Developer"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Department</label>
                    <select class="select">
                      <option>-</option>
                      <option selected>Web Development</option>
                      <option>Application Development</option>
                      <option>IT Management</option>
                      <option>Accounts Management</option>
                      <option>Support Management</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Job Location</label>
                    <input
                      class="form-control"
                      type="text"
                      value="California"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">No of Vacancies</label>
                    <input class="form-control" type="text" value="5" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Experience</label>
                    <input class="form-control" type="text" value="2 Years" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Age</label>
                    <input class="form-control" type="text" value="-" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Salary From</label>
                    <input type="text" class="form-control" value="32k" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Salary To</label>
                    <input type="text" class="form-control" value="38k" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Job Type</label>
                    <select class="select">
                      <option selected>Full Time</option>
                      <option>Part Time</option>
                      <option>Internship</option>
                      <option>Temporary</option>
                      <option>Remote</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Status</label>
                    <select class="select">
                      <option selected>Open</option>
                      <option>Closed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Start Date</label>
                    <input
                      type="text"
                      class="form-control datetimepicker"
                      value="3 Mar 2019"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Expired Date</label>
                    <input
                      type="text"
                      class="form-control datetimepicker"
                      value="31 May 2019"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="input-block mb-3">
                    <label class="col-form-label">Description</label>
                    <textarea class="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div class="submit-section">
                <button class="btn btn-primary submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jobDetails",
  data() {
    return {};
  },
};
</script>
