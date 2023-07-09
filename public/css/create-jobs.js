document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    }

    const createBtn = document.querySelector('.create');

    if (createBtn) {
        createBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const newJob = {
                job_title: document.getElementById('new-job-title').value.trim(),
                job_description: document.getElementById('new-job-description').value.trim(),
                job_salary: document.getElementById('new-job-salary').value.trim(),
                department_id: document.getElementById('new-job-department').value.trim(),
            };

            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            if (response.ok) {
                console.info('Job created successfully');
                location.href = '/jobs';
            } else {
                alert('something went wrong!');
            }
        });
    }
});
