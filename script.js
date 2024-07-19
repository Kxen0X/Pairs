const startBtn = document.querySelector('.startButton'),
   startBlock = document.querySelector('.before__game'),
   chooseLevelBtns = document.querySelectorAll('.chooseLevel button'),
   cardsBlock = document.querySelector('.cards'),
   game = document.querySelector('.game'),
   img = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg8', 'bg9', 'bg10']
let cards = 0
let points = 0
let btnCnt
startBtn.addEventListener('click', () => {
   startBlock.classList.add('active__choose__level')
})
chooseLevelBtns.forEach((btn) => {
   btn.addEventListener('click', () => {
      game.classList.add('active__choose__level')
      setTimeout(() => {
         startBlock.remove()
         changeCardsNum(btn.textContent)
      }, 1000)
   })
})
const changeCardsNum = (btnContent) => {
   if (btnContent === 'Просто') {
      btnCnt = btnContent
      cards = 10
      makeCards(cards)
      return
   }
   if (btnContent === 'Средне') {
      btnCnt = btnContent
      cards = 16
      makeCards(cards)
      return
   }
   if (btnContent === 'Сложно') {
      btnCnt = btnContent
      cards = 24
      makeCards(cards)
      return
   }
}

const NUM_OF_NUMBERS = 9

let nums = []

const numOfCards = []

let firstCard = '',
   secondCard = ''

const makeCards = (num) => {
   for (let j = 0; j < cards; j++) {
      numOfCards.push(j)
   }
   for (let i = 0; i < num; i++) {
      while (numOfCards.length > 0) {
         const number = getRandomNum(1, NUM_OF_NUMBERS)

         const firstCardIdx = getRandomNum(0, numOfCards.length - 1)

         nums[numOfCards[firstCardIdx]] = number

         numOfCards.splice(firstCardIdx, 1)

         const secondCardIdx = getRandomNum(0, numOfCards.length - 1)

         nums[numOfCards[secondCardIdx]] = number

         numOfCards.splice(secondCardIdx, 1)
      }

      makeCard(num)
   }
}

const winGame = () => {
   const div = document.createElement('div')
   div.classList.add('win__game')

   div.innerHTML = `
   <span class='WinGame'>
   Вы прошли Игру! </span>
   <span class='points'>
   Ваши очки: ${points}</span>
   `
   document.body.appendChild(div)

   setTimeout(() => {
      div.classList.add('Up__win__game')
   }, 1000)
}

const firstCardEqualsSecondCard = (first, second) => {
   if (first.textContent !== second.textContent) {
      setTimeout(() => {
         first.classList.remove('rotated')
         second.classList.remove('rotated')
         firstCard = ''
         secondCard = ''
      }, 500)
      if (points !== 0) {
         if (btnCnt === 'Просто') {
            points -= 10
            return
         }
         if (btnCnt === 'Средне') {
            points -= 15
            return
         }
         if (btnCnt === 'Сложно') {
            points -= 20
            return
         }
      }
   } else {
      firstCard = ''
      secondCard = ''
      points += 20
      cards -= 2

      if (cards === 0) {
         setTimeout(() => winGame(), 1000)
      }
   }
}

const clickOnCard = (card) => {
   if (card.classList.contains('rotated')) return

   card.classList.add('rotated')

   if (!firstCard) {
      firstCard = card

      return
   }

   if (firstCard !== card) {
      secondCard = card

      firstCardEqualsSecondCard(firstCard, secondCard)
   }
}

const appendCard = (num, card) => {
   if (num === 10) {
      addToBlock(card, 1)
   } else if (num === 16) {
      addToBlock(card, 2)
   } else if (num === 24) {
      addToBlock(card, 3)
   }
}

const addToBlock = (card, num) => {
   cardsBlock.classList.add(`cards__active${num}`)
   cardsBlock.appendChild(card)
}

const makeCard = (num) => {
   let cardBack = document.createElement('div'),
      cardFace = document.createElement('div'),
      card = document.createElement('div')

   cardBack.style.background = `url(./img/${
      img[Math.floor(Math.random() * img.length)]
   }.jpg)`

   cardBack.style.backgroundSize = '100% 100%'
   cardBack.style.backgroundPosition = 'center center'

   cardFace.classList.add('card-face')
   cardBack.classList.add('card-back')

   cardFace.textContent = nums[Math.floor(Math.random() * nums.length)]

   nums.splice(nums.indexOf(+cardFace.textContent), 1)

   card.classList.add('imgandfgc')
   card.addEventListener('click', () => {
      clickOnCard(card)
   })
   card.appendChild(cardBack)
   card.appendChild(cardFace)
   appendCard(num, card)
}

const getRandomNum = (min, max) => Math.round(Math.random() * (max - min) + min)
