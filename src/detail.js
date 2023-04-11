import { createChips } from "./utils"
import { createNavBar } from "./utils"
import { navBar, footerNav } from "./dataUtils"


export const team = localStorage.getItem("team") ? JSON.parse(localStorage.getItem("team")) : []
team.forEach(teamForeach)

const header = document.querySelector(".header")
const footer = document.querySelector(".footer")


createNavBar(header, navBar)
let subUrl = window.location.search.substring(6)
let url = `https://pokeapi.co/api/v2/pokemon/${subUrl}`
let pokemonData = {}


export function createTeamGenerator() {
  const teamGeneratorContainer = document.querySelector(".team-generator")
  const teamGeneratorList = document.querySelector(".team-generator__list")

  teamGeneratorContainer.append(teamGeneratorList)

}

export function teamForeach() {
  const teamGeneratorList = document.querySelector(".team-generator__list")

  teamGeneratorList.innerHTML = ""

  team.forEach((element) => {


    const teamGeneratorItem = document.createElement("li")
    const teamGeneratorItemName = document.createElement("h3")
    const teamGeneratorItemImg = document.createElement("img")


    teamGeneratorItem.className = "team-generator__list__item"
    teamGeneratorItemName.className = "team-generator__list__item__name"
    teamGeneratorItemImg.className = "team-generator__list__item__img"

    teamGeneratorItemName.textContent = element.name
    teamGeneratorItemImg.src = element.sprites.front_default


    teamGeneratorList.append(teamGeneratorItem)
    teamGeneratorItem.append(teamGeneratorItemName, teamGeneratorItemImg)
  }

  )
}

function checkLink() {
  if (window.location.search === "") {
    window.location.href = "index.html"
  } else {
    detailCard()
  }
}

export function saveToStorage() {
  console.log(team)
  localStorage.setItem("team", JSON.stringify(team))
}

export function addPokemonToTeam() {

  const buttonAdd = document.createElement("button")

  buttonAdd.className = "button-add"
  buttonAdd.textContent = "Agregar a equipo"

  buttonAdd.addEventListener("click", () => {

    function checkPokemon(team, pokemon) {
      return team.some(team => team.name === pokemon.name)
    }

    if (team.length < 6 || checkPokemon(team, pokemonData) == false) {
    }
    if (checkPokemon(team, pokemonData)) {
      alert("El pokemon ya esta en el equipo")
    }
    else {
      if(team.length < 6){
      team.push(pokemonData)
      saveToStorage()
      createTeamGenerator()
      teamForeach()
      }
      else{
        alert("El equipo esta lleno")
      }
    }


  })
  return buttonAdd
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


      const buttonAdd = addPokemonToTeam()


      console.log(buttonAdd)

      containerCard.append(card)
      card.append(cardImage, cardName, cardId, buttonAdd)


    }
    )
    .catch(error => console.error(error))

}

checkLink()
createNavBar(footer, footerNav)
