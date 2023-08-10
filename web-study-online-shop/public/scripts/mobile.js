const mobileMenuBtn = document.querySelector(`#mobile-menu-btn`);
const mobileMenu = document.querySelector(`#mobile-menu`);

function toggleMobileMenu() {
    mobileMenu.classList.toggle(`open`);
}

mobileMenuBtn.addEventListener(`click`, toggleMobileMenu);
