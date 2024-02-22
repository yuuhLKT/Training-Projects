document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-tab-button]');
    const questions = document.querySelectorAll('[data-faq-question]');

    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.clientHeight;

    window.addEventListener('scroll', function(){
        const position = window.scrollY; 
        
        if(position < heroHeight) {
            hiddenHeaderElements();
        } else {
            showHeaderElements();
        }
    });

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (e) {
            const targetTab = e.target.dataset.tabButton;
            const tab = document.querySelector(`[data-tab-id=${targetTab}]`);
            hiddenTabs();
            tab.classList.add('shows__list--is-active');

            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove('shows__tabs__button--is-active');
            }
            e.target.classList.add('shows__tabs__button--is-active');
        });
    }

    for(let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', openAndClose);
    }
});

function hiddenTabs() {
    const tabsContainer = document.querySelectorAll('[data-tab-id]');

    for (let i = 0; i < tabsContainer.length; i++) {
        tabsContainer[i].classList.remove('shows__list--is-active');
    }
}

function openAndClose(e) {
    const classes = 'faq__questions__item--is-open';
    const elementParent = e.target.parentNode;

    elementParent.classList.toggle(classes);
}

function hiddenHeaderElements(){
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function showHeaderElements(){
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}