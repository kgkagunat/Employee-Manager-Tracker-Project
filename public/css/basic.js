function myFunction(x) {
    x.classList.toggle("change");
    document.getElementById("dropdown").classList.toggle("show");
}

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.openbtn');
const closeModal = document.querySelector('.closebtn');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})