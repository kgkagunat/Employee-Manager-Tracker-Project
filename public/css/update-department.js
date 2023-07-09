// UPDATE 
document.querySelector('.edit-modal .save').addEventListener('click', (event) => {
    const departmentId = event.target.getAttribute('data-id');
    const department_name = document.getElementById("department-title").value.trim();
    
    fetch(`/api/departments/${departmentId}`, {
        method: 'PUT',
        body: JSON.stringify({ department_name }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = '/departments';  // This will redirect to /departments page
    })
    .catch(err => console.log(err));
});

// DELETE
document.querySelector('.edit-modal .delete').addEventListener('click', (event) => {
    const departmentId = event.target.getAttribute('data-id');

    fetch(`/api/departments/${departmentId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = "/departments";
    })
    .catch(err => console.log(err));
});
