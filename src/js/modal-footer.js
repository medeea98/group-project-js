
var modal = document.getElementById('myModal');


function openModal() {
    modal.style.display = 'block';

    window.addEventListener('keydown', closeModalOnEscape);
    window.addEventListener('click', closeModalOnClickOutside);
}


function closeModal() {
    modal.style.display = 'none';
    
    window.removeEventListener('keydown', closeModalOnEscape);
    window.removeEventListener('click', closeModalOnClickOutside);
}


function closeModalOnEscape(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
}


function closeModalOnClickOutside(event) {
    if (event.target === modal) {
        closeModal();
    }
}

