document.querySelector('.grid').addEventListener('click', async (event) => {

    if (event.target.classList.contains('jobs-edit')) {
        
        const currentJobId = event.target.dataset.id; 

        const response = await fetch(`/api/jobs/${currentJobId}`);
        if (response.ok) {
            document.location.replace(`/jobs/${currentJobId}`);
        } else {
            alert('Failed to edit job');
        }
    }
});
