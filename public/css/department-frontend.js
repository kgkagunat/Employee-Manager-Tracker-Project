// Global Query
const addModal = document.querySelector('.add-modal');
const editModal = document.querySelector('.edit-modal');
const departmentContainer = document.querySelector('.card-layout'); // assuming this is the container for the departments

// Function to create department card
function createDepartmentCard(department) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const editDiv = document.createElement('div');
    editDiv.classList.add('department-edit');
    const editButton = document.createElement('button');
    editButton.classList.add('editbtn');
    editButton.setAttribute('data-id', department.id);
    editDiv.appendChild(editButton);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('department-title');
    const titleH3 = document.createElement('h3');
    titleH3.textContent = department.department_name;
    titleDiv.appendChild(titleH3);

    const jobsDiv = document.createElement('div');
    jobsDiv.classList.add('department-jobs');
    const ul = document.createElement('ul');
    department.jobs.forEach(job => {
        const li = document.createElement('li');
        li.textContent = job.job_name;
        ul.appendChild(li);
    });
    jobsDiv.appendChild(ul);

    cardDiv.appendChild(editDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(jobsDiv);

    return cardDiv;
}



// Populate departments
function refreshDepartments() {
    fetch('/api/departments')
    .then(response => response.json())
    .then(departments => {
        departmentContainer.innerHTML = ''; // clear existing departments
        departments.forEach(department => {
            const departmentCard = createDepartmentCard(department);
            departmentContainer.appendChild(departmentCard);
        });

        // Populate the edit modal
        document.querySelectorAll('.editbtn').forEach(button => {
            button.addEventListener('click', () => {
                const departmentId = button.getAttribute('data-id');

                fetch(`/api/departments/${departmentId}`)
                .then(response => response.json())
                .then(department => {
                    document.querySelector('.edit-modal .title-input').value = department.department_name;
                    document.querySelector('.edit-modal .delete').setAttribute('data-id', department.id);
                    editModal.showModal();
                })
                .catch(err => console.log(err));
            });
        });
    })
    .catch(err => console.log(err));
}

// call refreshDepartments to populate departments when page loads
refreshDepartments();


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

// UPDATE
let currentEditingId = null;
document.querySelector('.edit-modal .save').addEventListener('click', (event) => {
    event.preventDefault();

    if (currentEditingId === null) {
        return;
    }

    const departmentName = document.querySelector('.edit-modal .title-input').value.trim();

    fetch(`/api/departments/${currentEditingId}`, {
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


// Populate the edit modal
document.querySelectorAll('.editbtn').forEach(button => {
    button.addEventListener('click', () => {
        const departmentId = button.getAttribute('data-id');
        currentEditingId = departmentId;

        fetch(`/api/departments/${departmentId}`)
        .then(response => response.json())
        .then(department => {
            document.querySelector('.edit-modal .title-input').value = department.department_name;
            document.querySelector('.edit-modal .delete').setAttribute('data-id', department.id);
            editModal.showModal();
        })
        .catch(err => console.log(err));
    });
});