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
        // refreshDepartments();
    })
    .catch(err => console.log(err));
});