const editModal = document.querySelector('.edit-modal');
let currentDepartmentId; // Variable to store departmentId

function refreshDepartments() {
    // The logic to refresh departments
}

// Populate the edit modal
document.querySelectorAll('.editbtn').forEach(button => {
    button.addEventListener('click', () => {
        currentDepartmentId = button.getAttribute('data-id'); 

        fetch(`/api/departments/${currentDepartmentId}`)
            .then(response => response.json())
            .then(department => {
                document.querySelector('.edit-modal .title-input').value = department.department_name;
                editModal.showModal();
            })
            .catch(err => console.log(err));
    });
});

// Open Create Modal
document.querySelector('.add-department').addEventListener('click', () => {
    document.querySelector('.create-modal').showModal();
});

// UPDATE
document.querySelector('.edit-modal .save').addEventListener('click', (event) => {
    event.preventDefault();
    const departmentName = document.querySelector('.edit-modal .title-input').value.trim();

    fetch(`/api/departments/${currentDepartmentId}`, { 
        method: 'PUT',
        body: JSON.stringify({ departmentName }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        editModal.close();
        refreshDepartments();
    })
    .catch(err => console.log(err));
});

// DELETE
document.querySelector('.edit-modal .delete').addEventListener('click', (event) => {
    fetch(`/api/departments/${currentDepartmentId}`, { 
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = "/departments";
    })
    .catch(err => console.log(err));
});

