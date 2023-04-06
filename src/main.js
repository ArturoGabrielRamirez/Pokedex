import '../style.css'
import { impLayOut } from './utils'
import { createCards, fetchForCards } from './paginator'


fetchForCards(createCards)
impLayOut()

