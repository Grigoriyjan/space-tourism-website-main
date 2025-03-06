const pages = [
    'home',
    'destination',
    'crew',
    'technology'
]

const links = document.querySelectorAll('.nav-link');

let currPageIndex = 0;

function ChangeBackgrounds() {
    const body = document.body;
    const pageClass = pages[parseInt(currPageIndex)]
    const screenWidth = window.innerWidth;

    let imageUrl = '';

    if (screenWidth < 768) {
        imageUrl = `./assets/${pageClass}/background-${pageClass}-mobile.jpg`;
      } else if (screenWidth < 1440) {
        imageUrl = `./assets/${pageClass}/background-${pageClass}-tablet.jpg`;
      } else {
        imageUrl = `./assets/${pageClass}/background-${pageClass}-desktop.jpg`;
    }
    body.style.backgroundImage = `url(${imageUrl})`;

}

window.addEventListener('load', ChangeBackgrounds);
window.addEventListener('resize', ChangeBackgrounds);

links.forEach((link) =>{
    link.addEventListener('click', () =>{
        loadPage(link.getAttribute('data-index'))
    })
})

async function loadPage(index) {
    if (index < 0 || index >= pages.length) return;
    links[currPageIndex].classList.remove('active')
    links[index].classList.toggle('active')
    const content = document.querySelector('.content');
    try {
        const response = await fetch(`html/${pages[index]}.html`);
        if (!response.ok) throw new Error('Страница не найдена');
        const html = await response.text();
        content.innerHTML = html;
        currPageIndex = index; // Обновляем текущий индекс
        ChangeBackgrounds()
    } catch (error) {
        content.innerHTML = '<h1>Ошибка загрузки</h1>';
    }
}

loadPage(0)