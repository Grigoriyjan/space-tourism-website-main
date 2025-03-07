const pages = [
    'home',
    'destination',
    'crew',
    'technology'
]

const links = document.querySelectorAll('.nav-link');

let currPageIndex = 0;
let currInfoIndex = 0;
let screenStatus= ''
loadPage(currPageIndex)


function FillInfo(index) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        let localData = null
        currInfoIndex = index
        switch (currPageIndex) {
            case 1:
                localData = data.destinations[index]
                document.querySelector('.planet_img').src = localData.images.webp
                document.querySelector('.planet_name').textContent = localData.name
                document.querySelector('.planet_paragraph').textContent = localData.description
                document.getElementById('distance').innerHTML = `AVG. DISTANCE <br> <span class="info">${localData.distance}</span>`
                document.getElementById('travel_time').innerHTML = `EST. TRAVEL TIME  <br> <span class="info">${localData.travel}</span>`
                break;
            case 2:
                localData = data.crew[index]
                document.querySelector('.speciality').textContent = localData.role
                document.querySelector('.member_name').textContent = localData.name
                document.querySelector('.member_bio').textContent = localData.bio
                document.querySelector('.crew_member-img').src = localData.images.webp
                break;
            case 3:
                localData = data.technology[index]
                document.querySelector('.tech-img').src = screenStatus === 'tablet' ? localData.images.landscape : localData.images.portrait
                document.querySelector('.tech_name').textContent = localData.name
                document.querySelector('.tech_description').textContent = localData.description
                break;
            default:
                break;
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке JSON:', error);
      });
}
function ChangeInfo() {
    const changeBtns = document.querySelectorAll('.change-btn')
    changeBtns.forEach((btn, index) =>{
        btn.addEventListener('click', () =>{
            btn.classList.toggle('active')
            changeBtns[currInfoIndex].classList.remove('active')
            FillInfo(index)
        })
    })
}

function ChangeBackgrounds() {

    const body = document.body;
    const pageClass = pages[currPageIndex]
    const screenWidth = window.innerWidth;

    let imageUrl = '';

    if (screenWidth < 768) {
        imageUrl = `./assets/${pageClass}/background-${pageClass}-mobile.jpg`;
      } else if (screenWidth < 1440) {
        imageUrl = `./assets/${pageClass}/background-${pageClass}-tablet.jpg`;
        screenStatus = 'tablet'
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
        currPageIndex = parseInt(index); // Обновляем текущий индекс
        if (currPageIndex > 0) ChangeInfo()
        ChangeBackgrounds()
    } catch (error) {
        content.innerHTML = '<h1>Ошибка загрузки</h1>';
    }
}