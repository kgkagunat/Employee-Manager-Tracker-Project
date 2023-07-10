document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    // Functionality for CREATE button
    const createBtn = document.querySelector('.create');

    if (createBtn) {
        createBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Collect inputs
            const newDepartment = {
                department_name: document.getElementById('new-department-title').value.trim(),
                description: document.getElementById('new-department-description').value.trim(),
            };

            // Send POST request to create a new department
            fetch('/api/departments', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                // Make sure to serialize the JSON body
                body: JSON.stringify(newDepartment),
            }).then((response) => {
                if (response.ok) {
                    console.info('Department created successfully');
                    location.href = '/departments';
                } else {
                    alert('something went wrong!');
                }
            });
        });
    }
});
