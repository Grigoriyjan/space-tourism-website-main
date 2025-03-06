document.querySelector('.humburger-btn').addEventListener('click', (event) =>{
    document.querySelector('.nav-container').classList.toggle('active')
})

document.querySelector('.close-btn').addEventListener('click', (event) =>{
    document.querySelector('.nav-container').classList.remove('active')
})