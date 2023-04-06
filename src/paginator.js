let cards = []
let count = 0
let actualPage = 1
let url = `https://pokeapi.co/api/v2/pokemon/`
let prevUrl = ""

let countInfo = 1

const elementForPage = 20


const containerCard = document.querySelector(".section")
const articleList = document.createElement("div")
const containerButtons = document.createElement("div")
const buttonBack = document.createElement("button")
const infoPage = document.createElement("span")
const buttonNext = document.createElement("button")
const matrizArticles = document.createElement("template")

buttonBack.className = "button-back"
infoPage.className = "info-page"
buttonNext.className = "button-next"
containerButtons.className = "container-buttons"
buttonBack.textContent = "Atrás"
infoPage.textContent = "1/10"
buttonNext.textContent = "Siguiente"
matrizArticles.className = "matriz-articles"
articleList.className = "article-list flex flex-wrap gap-12"

containerCard.append(articleList, containerButtons)
containerButtons.append(buttonBack, infoPage, buttonNext)

buttonBack.addEventListener("click", prevPage)
buttonNext.addEventListener("click", nextPage)

export const fetchForCards = (createCards) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      url = data.next
      prevUrl = data.previous
      cards = data.results
      count = data.count
      createPages(createCards)
    })
    .catch(error => console.error(error))
}


function obtainPagesCuts() {
  const initialCut = (actualPage - 1) * elementForPage
  const finalCut = initialCut + elementForPage
  return cards.slice(initialCut, finalCut)
}

function obtainTotalPages() {
  return Math.ceil(count / cards.length)
}
function nextPage() {
  countInfo = countInfo + 1
  console.log(actualPage)
  fetchForCards(createCards)

}

function prevPage() {
  countInfo = countInfo - 1
  url = prevUrl
  fetchForCards(createCards)
}

function configButtons() {
  const buttonBack = document.querySelector(".button-back")
  const buttonNext = document.querySelector(".button-next")
  if (actualPage === 1) {
    buttonBack.setAttribute("disable", true)
  } else {
    buttonBack.removeAttribute("disable")
  }

  if (actualPage === obtainTotalPages()) {
    buttonNext.setAttribute("disable", true)
  }
  else {
    buttonNext.removeAttribute("disable")
  }
}

export const createCards = (dataCard) => {
  const article = document.createElement("article")
  const imagePokemon = document.createElement("img")
  const namePokemon = document.createElement("h3")

  article.className = "article"
  imagePokemon.className = "article__image"
  namePokemon.className = "article__name"

  imagePokemon.src = dataCard.sprites.front_default
  namePokemon.textContent = dataCard.name

  article.append(imagePokemon, namePokemon)
  articleList.append(article)

}

function createPages(createCards) {
  articleList.innerHTML = ""

  const pageCut = obtainPagesCuts(actualPage)
  
  
  infoPage.textContent = `${countInfo}/${obtainTotalPages()}`

  pageCut.forEach((data) => {
    fetch(data.url)
      .then(response => response.json())
      .then(data => {
        createCards(data)
      })
  })
  configButtons()
}