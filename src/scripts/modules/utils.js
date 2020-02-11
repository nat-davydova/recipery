import PerfectScrollbar from 'perfect-scrollbar'

import { PATH } from './configs/path'

// get input value
export const getInputVal = input => input.value

// hide elem
export const hideElem = elem => elem.classList.add('js-hidden')

// show elem
export const showElem = elem => elem.classList.remove('js-hidden')

// toggling elements - one - is hidden, second - is shown
export const toggleElems = (elemToHide, elemToShow) => {
  hideElem(elemToHide)
  showElem(elemToShow)
}

// delete elem
export const delElem = elem => elem.remove()

// perfect scrollbars init
export const scrollbarsInit = () => {
  PATH.panels.panelsArr.forEach((elem) => {
    const ps = new PerfectScrollbar(elem)
  })
}

// clean element inner HTML
export const cleanElemInner = elem => { elem.innerHTML = '' }

// clean input
export const cleanInput = input => { input.value = '' }

// render error messages
export const renderErrorMsg = (errorText, renderPlace) => {
  const error = PATH.errorContainer.cloneNode(true)

  error.classList.remove('js-hidden')

  const errorMsg = error.querySelector('p')

  errorMsg.textContent = errorText

  renderPlace.appendChild(error)
}

// find a parent function
export const findParent = (currentElem, parentClass) => {
  while (!currentElem.classList.contains(parentClass)) {
    currentElem = currentElem.parentNode
  }
  return currentElem
}

// splitting array to pages function
export const pageSplit = (arr, itemsPerPage, currentPage) => {
  const startInd = itemsPerPage * currentPage - itemsPerPage

  const finalInd = itemsPerPage * currentPage

  return arr.length >= itemsPerPage * currentPage ? arr.slice(startInd, finalInd) : null
}

// pagination script
export const pagination = (pagination, arr, itemsPerPage, currentPage) => {
  // page splitting
  return pageSplit(arr, itemsPerPage, currentPage)
}
