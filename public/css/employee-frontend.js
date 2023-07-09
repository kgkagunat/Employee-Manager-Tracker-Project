document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // UPDATE
    const updateEmployeeBtns = document.querySelectorAll('.editbtn');
  
    // Set up the event listener for the create button
    if (updateEmployeeBtns) {
      updateEmployeeBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
  
          const id = e.target.getAttribute('data-id');
          // redirect to the edit page for this employee
          window.location.href = `/employees/edit/${id}`;
  
        });
      });
    }
  });
  