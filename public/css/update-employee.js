window.addEventListener("DOMContentLoaded", (event)=>{

    let dialog = document.querySelector('.edit-modal');
    
    let saveButton = document.querySelector('.edit-modal .save');
    let deleteButton = document.querySelector('.edit-modal .delete');
    
    // UPDATE
    saveButton.addEventListener('click', async (event) => {
      console.log(saveButton.dataset.id)
        console.log("Save button clicked");
        event.preventDefault();
    
        const employeeId = saveButton.dataset.id;
        const employeeFirstName = document.getElementById('edit-employee-first-name').value.trim();
        const employeeLastName = document.getElementById('edit-employee-last-name').value.trim();
        const employeeTitle = document.getElementById('edit-employee-title').value.trim();
        const employeeManager = document.getElementById('edit-employee-manager').value.trim();
        const employeeJob = document.querySelector('#edit-employee-job option:checked').value;
        const employeeDepartment = document.querySelector('#edit-employee-department option:checked').value;
        
  
        fetch(`/api/employees/${employeeId}`, {
            method: 'PUT',
            body: JSON.stringify({
                first_name: employeeFirstName,
                last_name: employeeLastName,
                title: employeeTitle,
                manager: employeeManager,
                job_id: employeeJob,
                department_id: employeeDepartment
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(data => {
            console.log('Success:', data);
            window.location.href = '/employees';
        })
        .catch(err => console.error(err));
    });
  
    // DELETE
    deleteButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const employeeId = deleteButton.getAttribute('data-id');
  
      fetch(`/api/employees/${employeeId}`, {
        method: 'DELETE',
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = '/employees';
      })
      .catch(err => console.error(err));
    });
  });
  