document.addEventListener("DOMContentLoaded", function () {
    const numbersContainer = document.querySelector('.numbers-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    const totalPages = 20;
    const itemsPerPage = 7;
    let currentPage = 1;

    function generateNumbers(startPage, endPage) {
        numbersContainer.innerHTML = '';
        for (let i = startPage; i <= endPage; i++) {
            const number = document.createElement('div');
            number.classList.add('number');
            number.textContent = i;
            if (i === currentPage) {
                number.classList.add('active');
            }
            number.addEventListener('click', function () {
                currentPage = i;
                generateNumbers(getStartPage(), getEndPage());
            });
            numbersContainer.appendChild(number);
        }
    }

    function getStartPage() {
        return Math.max(1, currentPage - Math.floor(itemsPerPage / 2));
    }

    function getEndPage() {
        return Math.min(totalPages, getStartPage() + itemsPerPage - 1);
    }

    function updatePagination() {
        if (currentPage === 1) {
            leftArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'block';
        }

        if (currentPage === totalPages) {
            rightArrow.style.display = 'none';
        } else {
            rightArrow.style.display = 'block';
        }
    }

    leftArrow.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            generateNumbers(getStartPage(), getEndPage());
            updatePagination();
        }
    });

    rightArrow.addEventListener('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            generateNumbers(getStartPage(), getEndPage());
            updatePagination();
        }
    });

    // Initialize pagination
    generateNumbers(getStartPage(), getEndPage());
    updatePagination();
});
