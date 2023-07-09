document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.grid').addEventListener('click', async (event) => {
      if (event.target.classList.contains('jobs-edit')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/jobs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          document.location.replace(`/jobs/${id}`);
        } else {
          alert('Failed to edit job');
        }
      }
    });
  
    document.querySelector('.jobs-add').addEventListener('click', (event) => {
      // Handle job creation logic
    });
  });
  