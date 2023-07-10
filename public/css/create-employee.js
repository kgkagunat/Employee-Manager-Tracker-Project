document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    const createBtn = document.querySelector('.create');

    if (createBtn) {
        createBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const newEmployee = {
                first_name: document.getElementById('new-employee-first-name').value.trim(),
                last_name: document.getElementById('new-employee-last-name').value.trim(),
                // employee_title: document.getElementById('new-employee-title').value.trim(),
                employee_manager: document.getElementById('new-employee-manager').value.trim(),
                job_id: document.getElementById('new-employee-job').value.trim(),
                department_id: document.getElementById('new-employee-department').value.trim(),
            };

            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            if (response.ok) {
                console.info('Employee created successfully');
                location.href = '/employees';
            } else {
                alert('Something went wrong!');
            }
        });
    }
});
