import {getToki} from './common.js'

let tokis

let textareaElement = document.querySelector('textarea')
let displayElement = document.querySelector('.output')

textareaElement.addEventListener('input', e=>translate(e.target.value))
document.addEventListener('DOMContentLoaded', init)

async function init()
{
    tokis = await getToki()
    textareaElement.value = decodeURIComponent(window.location.hash.substring(1)) 
    translate(textareaElement.value)
}

function translate(text)
{
    window.location.hash = text 

    let words = text.split(/\s|\n/g)

    let translatedWords = []

    for (let i = 0; i < words.length; i++) {
        let word = words[i]

        let toki = tokis.find(item=>{
            return item[0] == word
        })

        let newWord = ''

        if(toki) newWord = toki[2].match(/(?<=[A-Z]+\s)([^,;]+)/g)[0]
        else newWord = word

        translatedWords.push(newWord)
    }

    displayElement.textContent = translatedWords.join(' ')
}