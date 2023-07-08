// Global Query
const addModal = document.querySelector('.add-modal');
const editModal = document.querySelector('.edit-modal');




// Populate departments
function refreshDepartments() {
    fetch('/api/departments')
    .then(response => response.json())
    .then(departments => {
        // TODO: Do 
    })
    .catch(err => console.log(err));
};




// CREATE
document.querySelector('.add-modal .save').addEventListener('click', (event) => {
    event.preventDefault();

    const departmentName = document.querySelector('.add-modal .title-input').value.trim();

    fetch('/api/departments', {
        method: 'POST',
        body: JSON.stringify({ departmentName }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        addModal.close();
        refreshDepartments();
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
        refreshDepartments();
    })
    .catch(err => console.log(err));
});




// Populate the edit modal
document.querySelectorAll('.editbtn').forEach(button => {
    button.addEventListener('click', () => {

        const departmentId = button.getAttribute('data-id');

        fetch(`/api/departments/${departmentId}`)
            .then(response => response.json())
            .then(department => {
                document.querySelector('.edit-modal .title-input').value = department.department_name;

                // UPDATE
                document.querySelector('.edit-modal .save').addEventListener('click', (event) => {
                    event.preventDefault();

                    const departmentName = document.querySelector('.edit-modal .title-input').value.trim();

                    fetch(`/api/departments/${departmentId}`, {
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

                document.querySelector('.edit-modal .delete').setAttribute('data-id', department.id);
                editModal.showModal();
            })
            .catch(err => console.log(err));
    });
});