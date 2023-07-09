document.querySelector('.grid').addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit')) {
        const currentJobId = event.target.parentNode.dataset.id; // Retrieve the data-id attribute from the parent element
        const response = await fetch(`/api/jobs/${currentJobId}`);
        if (response.ok) {
            document.location.replace(`/jobs/${currentJobId}`);
        } else {
            alert('Failed to edit job');
        }
    }
  });
  