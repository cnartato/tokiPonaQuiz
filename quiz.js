import {getToki} from './common.js'

const optionsCount = 5

let tokis
let currentToki 
let MODE = 'englishToToki' || 'tokiToEnglish'

const displayElement = document.querySelector('.display')
const optionsContainerElement = document.querySelector('.optionsContainer')
const winContainerElement = document.querySelector('.winContainer')
document.addEventListener('DOMContentLoaded', init)

async function init()
{
    tokis = await getToki()

    if(Math.random()>.5) MODE = 'tokiToEnglish'

    if(MODE == 'tokiToEnglish') optionsContainerElement.style.flexDirection = 'column'

    newRound()
}


function newRound()
{
    if(!tokis) return

    clearOptionElements ()

    currentToki = pullRandomToki()
    
    displayElement.textContent = MODE == 'tokiToEnglish' ? currentToki[0] : currentToki[2]

    for (let i = 0; i < optionsCount; i++) {
        if(i==0) //The first option is correct, the rest are random
            generateOptionElement(MODE == 'tokiToEnglish' ? currentToki[2] : currentToki[0], true)
        else 
        {
            let subToki = pullRandomToki()
            //If random toki is the correct answer, keep trying to pick another one instead
            while(subToki == currentToki) {
                subToki = pullRandomToki() //too lazy to fix this
            }
            generateOptionElement(MODE == 'tokiToEnglish' ? subToki[2] : subToki[0], false)
        }
    }
}

function generateOptionElement (name, isCorrect)
{
    let newOption = document.createElement('button')
    newOption.className = 'option'
    newOption.textContent = name

    if(MODE == 'tokiToEnglish') newOption.style.fontSize = '16px'

    newOption.style.order = Math.floor(Math.random() * 100)
    newOption.setAttribute('correct',isCorrect)
    newOption.addEventListener('click', e=>selectOption(isCorrect,e))
    optionsContainerElement.appendChild(newOption)
}

function selectOption(isCorrect, e)
{
    if(isCorrect) {
        document.body.classList.add('greenify')
        setTimeout(timer=> {
            document.body.classList.remove('greenify')
        }, 0)
        generateWinElement(currentToki[0])

        newRound()
    }
    else 
    {
        displayElement.textContent = currentToki[0] + ' = ' + currentToki[2]

        e.target.style.background = 'red'
        let correctA = document.querySelector('[correct=true]')
        correctA.style.background = 'green'
    }
}

function generateWinElement(name)
{
    let newWin = document.createElement('div')
    newWin.className = 'win'
    newWin.textContent = name
    winContainerElement.appendChild(newWin)
}

function clearOptionElements()
{
    optionsContainerElement.innerHTML = ""
}

function pullRandomToki()
{
    let num = Math.floor(Math.random() * tokis.length)
    return tokis[num]
}