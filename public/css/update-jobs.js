document.querySelector('.edit-modal .save').addEventListener('click', async (event) => {
    event.preventDefault();

    // get the current job id from the data-id attribute of the save button
    const currentJobId = event.target.parentNode.dataset.id;

    // Fetching details for the PUT request
    const jobTitle = document.getElementById('job-title').value.trim();
    const jobDescription = document.getElementById('job-description').value.trim();
    const jobSalary = document.getElementById('job-salary').value.trim();
    const jobDepartment = document.getElementById('job-department').value.trim();

    const response = await fetch(`/api/jobs/${currentJobId}`, {
        method: 'PUT',
        body: JSON.stringify({ 
            job_title: jobTitle,
            job_description: jobDescription,
            job_salary: jobSalary,
            department_id: jobDepartment
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log('Job updated successfully');
        location.href = '/jobs';
    } else {
        alert('Failed to update job');
    }
});

document.querySelector('.edit-modal .delete').addEventListener('click', async (event) => {
    event.preventDefault();

    // get the current job id from the data-id attribute of the delete button
    const currentJobId = event.target.parentNode.dataset.id;
    
    const response = await fetch(`/api/jobs/${currentJobId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Job deleted successfully');
        location.href = '/jobs';
    } else {
        console.log('Failed to delete job');
    }
});
