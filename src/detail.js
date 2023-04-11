import { createChips } from "./utils"
import { createNavBar } from "./utils"
import {  navBar, footerNav } from "./dataUtils"

const header = document.querySelector(".header")
const footer = document.querySelector(".footer")


createNavBar(header, navBar)
let subUrl = window.location.search.substring(6)
let url = `https://pokeapi.co/api/v2/pokemon/${subUrl}`
let pokemonData = {}


function checkLink() {
  if (window.location.search === "") {
    window.location.href = "index.html"
  } else {
    detailCard()
  }
}


function detailCard() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      pokemonData = data
      console.log(pokemonData)

      const containerCard = document.querySelector(".section")
      const card = document.createElement("div")
      const cardImage = document.createElement("img")
      const cardName = document.createElement("h2")
      const cardId = document.createElement("p")
      const abilitieCard = document.createElement("h2")
      const abilitiesList = document.createElement("ul")
      
      abilitieCard.textContent = "Habilidades"
      abilitiesList.className = "abilities-list"
      
      pokemonData.abilities.forEach(element => {
        const abilityItem = document.createElement("li")
        abilityItem.textContent = element.is_hidden == true ? element.ability.name + " (Oculta)" : element.ability.name
        
        abilitiesList.append(abilityItem)
      });
      card.append(abilitieCard)
      card.append(abilitiesList)

      createChips(card, pokemonData.types)
      
      card.className = "card"
      cardImage.className = "card__image"
      cardName.className = "card__name"
      cardId.className = "card__id"
      
      cardImage.src = pokemonData.sprites.front_default
      cardName.textContent = pokemonData.name
      cardId.textContent = `ID: ${pokemonData.id}`

      containerCard.append(card)
      card.append(cardImage, cardName, cardId)
      
    }
    )
    .catch(error => console.error(error))

  }

checkLink()
createNavBar(footer, footerNav)
