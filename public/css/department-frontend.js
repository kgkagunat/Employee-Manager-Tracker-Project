// Global Query
const addModal = document.querySelector('.add-modal');
const editModal = document.querySelector('.edit-modal');




// Populate departments
function refreshDepartments() {
    fetch('/api/departments')
    .then(response => response.json())
    .then(departments => {
        // Clear out the current list of departments
        const cardLayout = document.querySelector('.card-layout');
        cardLayout.innerHTML = '';

        // Iterate through each department
        departments.forEach(department => {
            // Create a new card for each department
            const card = document.createElement('div');
            card.className = 'card';

            // Create the department edit button
            const departmentEdit = document.createElement('div');
            departmentEdit.className = 'department-edit';
            const editBtn = document.createElement('button');
            editBtn.className = 'editbtn';
            editBtn.dataset.id = department.id;
            const editIcon = document.createElement('span');
            editIcon.className = 'material-symbols-outlined openbtn';
            editIcon.textContent = 'edit_square';
            editBtn.appendChild(editIcon);
            departmentEdit.appendChild(editBtn);

            // Create the department title
            const departmentTitle = document.createElement('div');
            departmentTitle.className = 'department-title';
            const titleH3 = document.createElement('h3');
            titleH3.textContent = department.department_name;
            departmentTitle.appendChild(titleH3);

            // Create the job list for the department
            const departmentJobs = document.createElement('div');
            departmentJobs.className = 'department-jobs';
            const jobsUL = document.createElement('ul');
            department.jobs.forEach(job => {
                const jobLI = document.createElement('li');
                jobLI.textContent = job.job_name;
                jobsUL.appendChild(jobLI);
            });
            departmentJobs.appendChild(jobsUL);

            // Append everything to the card
            card.appendChild(departmentEdit);
            card.appendChild(departmentTitle);
            card.appendChild(departmentJobs);

            // Append the card to the layout
            cardLayout.appendChild(card);
        });

        // Reattach edit button event listeners
        document.querySelectorAll('.editbtn').forEach(button => {
            button.addEventListener('click', () => {
                const departmentId = button.getAttribute('data-id');

                fetch(`/api/departments/${departmentId}`)
                .then(response => response.json())
                .then(department => {
                    document.querySelector('.edit-modal .title-input').value = department.department_name;
                    document.querySelector('.edit-modal .save').setAttribute('data-id', department.id);
                    document.querySelector('.edit-modal .delete').setAttribute('data-id', department.id);
                    editModal.showModal();
                })
                .catch(err => console.log(err));
            });
        });
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