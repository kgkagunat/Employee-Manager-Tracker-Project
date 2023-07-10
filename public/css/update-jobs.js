window.addEventListener("DOMContentLoaded", (event)=>{

  let dialog = document.querySelector('.edit-modal');
  console.log("Dialog:", dialog);  // Check whether the dialog is correctly selected
  
  let saveButton = document.querySelector('.edit-modal .save');
  let deleteButton = document.querySelector('.edit-modal .delete');
  
  console.log("Save button:", saveButton);  // Check whether the saveButton is correctly selected
  console.log("Delete button:", deleteButton);  // Check whether the deleteButton is correctly selected
  
  // UPDATE
  saveButton.addEventListener('click', async (event) => {
      console.log("Save button clicked");  // Check whether the saveButton click event is firing
      event.preventDefault();
  
      const jobId = saveButton.dataset.id;
      const jobTitle = document.getElementById('job-title').value.trim();
      const jobDescription = document.getElementById('job-description').value.trim();
      const jobSalary = document.getElementById('job-salary').value.trim();
      const jobDepartment = document.querySelector('#job-department option:checked').value;
      console.log(jobId, jobTitle, jobDescription, jobSalary, jobDepartment); 
  
      fetch(`/api/jobs/${jobId}`, {
          method: 'PUT',
          body: JSON.stringify({
              job_title: jobTitle,
              job_description: jobDescription,
              job_salary: jobSalary,
              department_id: jobDepartment
          }),
          headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          window.location.href = '/jobs';  // Redirect to /jobs page
      })
      .catch(err => console.error(err));
  });
  
// DELETE
    deleteButton.addEventListener('click', async (event) => {
    //console.log("Delete button clicked");  // Check whether the deleteButton click event is firing
    event.preventDefault();

    const jobId = deleteButton.getAttribute('data-id');

    fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/jobs';  // Redirect to /jobs page
    })
    .catch(err => console.error(err));
});
});