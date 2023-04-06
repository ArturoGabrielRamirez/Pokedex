/* voy a hacer bem */
const navBar = [
  {
    name: "link1",
    image: "/img/open-pokedex.svg",
    link: "#"
  },
  {
    name: "link2",
    image: "/img/psyduck_icon-icons.com_67509.png",
    link: "#"
  },
  {
    name: "link3",
    image: "/img/Pokemon_Trainer_Girl_icon-icons.com_67515.png",
    link: "#"
  },
  {
    name: "link4",
    image: "/img/Pokemon_Trainer_Boy_icon-icons.com_67516.png",
    link: "#"
  },
]

const footerNav = [
  {
    name: "Instagram",
    image: "/img/instagram.png",
    link: "https://www.instagram.com/arturito_/"
  },
  {
    name: "Twitter",
    image: "/img/instagram.png",
    link: "https://twitter.com/Arturito_"
  },
  {
    name: "Youtube",
    image: "/img/instagram.png",
    link: "https://www.youtube.com/channel/UC0ZQZ1X1Z0ZQZ1X1Z0ZQZ1X"
  },
]

function createNavBar(container, links) {
  const nav = document.createElement("nav")
  nav.className = "nav-container__nav"
  links.forEach((link) => {
    const navLink = document.createElement("a")
    const navIcon = document.createElement("img")
    navLink.className = "nav-container__nav__link"
    navIcon.className = "nav-container__nav__link__icon"
    navLink.href = link.link
    navIcon.src = link.image
    navLink.append(navIcon)
    nav.append(navLink)
  })
  container.append(nav)
}

export function impLayOut() {
  const layOut = document.getElementById("layOut")
  const header = document.createElement("header")
  const titleContainer = document.createElement("div")
  const title = document.createElement("h1")
  const main = document.createElement("main")
  const containerCards = document.createElement("section")
  const mainTitle = document.createElement("h2")
  const inputPokemon = document.createElement("input")
  const buttonCall = document.createElement("button")
  const cards = document.createElement("div")
  const footer = document.createElement("footer")

  buttonCall.addEventListener("click", callAPI)

  layOut.className = "lay-out"
  header.className = "header"
  titleContainer.className = "title-container"
  title.className = "title-container__title"
  main.className = "main"
  mainTitle.className = "main__title"
  inputPokemon.className = "main__input"
  buttonCall.className = "main__button"
  containerCards.className = "container-cards"
  cards.className = "container-cards__cards"
  footer.className = "footer"

  title.textContent = "Poke-Poke-Dex"
  mainTitle.textContent = "Poke-Poke-Mon"
  inputPokemon.placeholder = "Buscar Pokemon"
  buttonCall.textContent = "Buscar"
  footer.textContent = "Hecho con ❤️ por @Arturito"

  createNavBar(header, navBar)
  createNavBar(footer, footerNav)

  main.append(mainTitle, inputPokemon, buttonCall, containerCards)
  layOut.append(header, main, footer)
  header.append(titleContainer)
  titleContainer.append(title)
  containerCards.append(cards)

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
  const imagePokemon = document.createElement("img")
  const namePokemon = document.createElement("h3")
  const containerCards = document.querySelector(".container-cards__cards")

  imagePokemon.src = data.sprites.front_default
  namePokemon.textContent = data.name

  containerCards.append(imagePokemon, namePokemon)
}




