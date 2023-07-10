document.querySelectorAll('.editbtn').forEach((button) => {
  button.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      
      try {
          const response = await fetch(`/api/employees/${id}`);
          if (response.ok) {
              window.location.href = `/employees/${id}`;
          } else {
              alert('Failed to edit employee');
          }
      } catch (error) {
          console.error('Fetch failed:', error);
          alert('Failed to edit employee');
      }
  });
});
