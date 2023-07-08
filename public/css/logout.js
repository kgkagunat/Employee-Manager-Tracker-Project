document.querySelector('#logout').addEventListener('click', async (event) => {
    event.preventDefault();

    const response = await fetch('/logout', {
        method: 'GET',
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        console.log('Failed to log out');
    }
});
