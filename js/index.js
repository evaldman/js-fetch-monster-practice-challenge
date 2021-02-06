const url = 'http://localhost:3000/monsters/'
let currentPage = 1
const container = document.getElementById('monster-container')
// document.addEventListener('DOMContentLoaded', function())

// function numberOfPages(){
//     let numberOfMonsters
//     fetch(url)
//     .then(response => response.json())
//     .then(monsterData => numberOfMonsters = monsterData.length)
  
// }

function fetchMonsters(limit, page){
    fetch(`${url}?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(monsterData => monsterData.forEach(monster => renderMonster(monster)))
}

function renderMonster(monster){
    
    const thisMonster = document.createElement('div')
    thisMonster.setAttribute('data-monster-id', monster.id)

    const thisName = document.createElement('h2')
    thisName.innerHTML = `Name: ${monster.name}`

    const thisAge = document.createElement('h4')
    thisAge.innerHTML = `Age: ${monster.age}`

    const thisDescription = document.createElement('p')
    thisDescription.innerHTML = `Description: ${monster.description}`

    thisMonster.append(thisName, thisAge, thisDescription)
    container.append(thisMonster)
}

function renderCreateForm(){
    const createForm = document.createElement('form')
    createForm.id = "monster-form"

    const nameField = document.createElement('input')
    nameField.id = "name"
    nameField.placeholder = "name"

    const ageField = document.createElement('input')
    ageField.id = "age"
    ageField.placeholder = "age"

    const descriptionField = document.createElement('input')
    descriptionField.id = "description"
    descriptionField.placeholder = "description"

    const submitButton = document.createElement('button')
    submitButton.innerHTML = "Submit"

    createForm.append(nameField, ageField, descriptionField, submitButton)
    document.getElementById('create-monster').append(createForm)
}

function createMonster(monsterSubmission){
    monsterSubmission.preventDefault()
    const name = monsterSubmission.target.querySelector('input#name').value
    const age = monsterSubmission.target.querySelector('input#age').value
    const description = monsterSubmission.target.querySelector('input#description').value

    const newMonster = {name, age, description}
    // console.log(newMonster)
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(monsterData => renderMonster(monsterData))

    monsterSubmission.target.reset()
}

function nextPage(){
    currentPage++
    Array.from(container.children).forEach(monster => {
        monster.remove()
    })
    fetchMonsters(50, currentPage)
}

function previousPage(){
    if (currentPage > 0) {
        currentPage--
        Array.from(container.children).forEach(monster => {
            monster.remove()
        })
        fetchMonsters(50, currentPage)
    }
}

document.getElementById('back').addEventListener('click', previousPage)
document.getElementById('forward').addEventListener('click', nextPage)


renderCreateForm()
fetchMonsters(50, 1)

document.getElementById("monster-form").addEventListener('submit', createMonster)