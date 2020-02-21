import PerfectScrollbar from 'perfect-scrollbar'

import { PATH } from './configs/path'

export const getInputVal = input => input.value

export const hideElem = elem => elem.classList.add('js-hidden')

export const showElem = elem => elem.classList.remove('js-hidden')

export const delElem = elem => elem.remove()

export const cleanElemInner = elem => { elem.innerHTML = '' }

export const cleanInput = input => { input.value = '' }

// rendering images in the recipes and ingredients
export const renderImg = (elem, src, altTxt) => {
  src && elem.setAttribute('src', src)
  elem.setAttribute('alt', altTxt)
}

// toggling elements - first - is hidden, second - is shown
export const toggleElems = (elemToHide, elemToShow) => {
  hideElem(elemToHide)
  showElem(elemToShow)
}

// perfect scrollbars init
export const scrollbarsInit = () => {
  PATH.panels.panelsArr.forEach((elem) => {
    const ps = new PerfectScrollbar(elem)
  })
}

// render error messages
export const renderErrorMsg = (errorText, renderPlace) => {
  const error = PATH.errorContainer.cloneNode(true)

  error.classList.remove('js-hidden')

  const errorMsg = error.querySelector('p')

  errorMsg.textContent = errorText

  renderPlace.appendChild(error)
}

// function which helps to find an element's parent with defined classname
export const findParent = (currentElem, parentClass) => {
  while (!currentElem.classList.contains(parentClass)) {
    currentElem = currentElem.parentNode
  }
  return currentElem
}
