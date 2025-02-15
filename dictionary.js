import {getToki} from './common.js'

let tokis

let inputElement = document.querySelector('input')
let resultContainerElement = document.querySelector('.resultContainer')

inputElement.addEventListener('input', e=>search(e.target.value))
document.addEventListener('DOMContentLoaded', init)

async function init()
{
    tokis = await getToki()
    search('')
}

function search(text)
{
    clearResultElements() 
    let relevantTokis = tokis.filter(toki=>toki[0].includes(text))
    
    relevantTokis.forEach(toki => {
        generateResultElement(toki[0], toki[2])
    })
}

function generateResultElement(key, value)
{
    let newResult = document.createElement('div')
    newResult.className = 'result'

    let newResultKey = document.createElement('div')
    newResultKey.className = 'resultKey'
    newResultKey.textContent = key

    let newResultValue = document.createElement('div')
    newResultValue.className = 'resultValue'
    newResultValue.textContent = value

    newResult.appendChild(newResultKey)
    newResult.appendChild(newResultValue)
    resultContainerElement.appendChild(newResult)
}

function clearResultElements()
{
    resultContainerElement.innerHTML = ""
}