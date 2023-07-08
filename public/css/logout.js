document.querySelector('#logout').addEventListener('click', event => {
    event.preventDefault();
    
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        location.replace('/login');
      } else {
        console.log(data.message);
      }
    });
  });
  