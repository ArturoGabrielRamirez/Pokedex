import { typesNames, navBar, footerNav } from "./dataUtils"




export function createNavBar(container, links) {
  const header = document.querySelector(".header")
  const footer = document.querySelector(".footer")
  const nav = document.createElement("nav")
  nav.className = "nav-container__nav flex"
  links.forEach((link) => {
    const navLink = document.createElement("a")
    const navIcon = document.createElement("img")
    navLink.className = "nav-container__nav__link"
    navIcon.className = "nav-container__nav__link__icon"
    navLink.href = link.link
    navIcon.src = link.image
    
    container == header ? navIcon.classList.add("w-12") : navIcon.classList.add("w-6")
    
    
    navLink.append(navIcon)
    nav.append(navLink)
  })
  
  container == header ? header.append(nav) : footer.append(nav)
  
}

export function impLayOut() {
  const header = document.querySelector(".header")
  const titleContainer = document.createElement("div")
  const title = document.createElement("h1")
  const main = document.querySelector(".main")
  const containerCard = document.querySelector(".section")
  const mainTitle = document.createElement("h2")
  const inputPokemon = document.createElement("input")
  const buttonCall = document.createElement("button")
  const card = document.createElement("div")
  const footer = document.querySelector(".footer")

  buttonCall.addEventListener("click", callAPI)

  titleContainer.className = "title-container"
  title.className = "title-container__title"
  mainTitle.className = "main__title"
  inputPokemon.className = "main__input"
  buttonCall.className = "main__button"
  containerCard.classList.add("container-card")
  card.className = "container-card__card"


  title.textContent = "Poke-Poke-Dex"
  mainTitle.textContent = "Poke-Poke-Mon"
  inputPokemon.placeholder = "Buscar Pokemon"
  buttonCall.textContent = "Buscar"
  footer.textContent = "Hecho con ❤️ por @Arturito"

  createNavBar(header, navBar)
  createNavBar(footer, footerNav)

  main.append(containerCard)
  containerCard.prepend(mainTitle, inputPokemon, buttonCall, card)
  header.append(titleContainer)
  titleContainer.append(title)


}

export const callAPI = () => {
  const inputPokemon = document.querySelector(".main__input")
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemon.value}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Pokemon no encontrado")
      }
    })
    .then(data => createCardPokemon(data))
    .catch(error => console.error(error))
}

export const createCardPokemon = (data) => {
  const containerCard = document.querySelector(".container-card__card")

  containerCard.innerHTML = ""

  const imagePokemon = document.createElement("img")
  const namePokemon = document.createElement("h3")

  imagePokemon.src = data.sprites.front_default
  namePokemon.textContent = data.name

  containerCard.append(imagePokemon, namePokemon)
}


export function createChips(article, types) {
  types.forEach(
    (type) => {
      const chipType = document.createElement("div")
      const typePokemon = document.createElement("p")
      chipType.className = `chip-type flex justify-center items-center m-1 font-medium py-1 px-2 text-white rounded-full text-white ${typesNames[type.type.name]}`
      typePokemon.className = "article__type"
      typePokemon.textContent = type.type.name
      article.append(chipType)
      chipType.append(typePokemon)
    }
  )
}



