document.querySelector('.grid').addEventListener('click', async (event) => {
    console.log("Grid clicked");  // Check whether the grid click event is firing

    if (event.target.classList.contains('jobs-edit')) { // correction here
        console.log("Edit button clicked");  // Check whether the editButton click event is firing

        const currentJobId = event.target.dataset.id; // correction here
        console.log("Job ID:", currentJobId);  // Check whether the job ID is being logged

        const response = await fetch(`/api/jobs/${currentJobId}`);
        if (response.ok) {
            console.log("Job fetch successful");  // Check whether the job fetch is successful

            document.location.replace(`/jobs/${currentJobId}`);
        } else {
            console.log("Job fetch failed");  // Check whether the job fetch is failing

            alert('Failed to edit job');
        }
    }
});
