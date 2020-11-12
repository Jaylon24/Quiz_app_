const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById ('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestions(shuffledQuestions[currentQuestionIndex])
}

function showQuestions(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
          button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.appendChild(button)
  })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
         answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
   const selectedButton = e.target
   const correct = selectButton.dataset.correct
   setStatusClass(document.body, correct)
   Array.from(answerButtonsElement.children).forEach(button => {
       setStatusClass(button.button.dataset.correct)
   })
   if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
      startButton.innerText = 'Restart'
      startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
   question: 'What is 2 + 2?',
   answers: [
       {text: '4', correct: true },
       {text: '24', correct: false },
   ]
  },
  {
      question: 'Who is the best current NBA player?',
      answers: [
          {text: 'Kevin Durant', correct: false},
          {text: 'Stephen Curry', correct: false},
          {text: 'John Wall', correct: false},
          {text: 'Lebron James', correct: true},
      ]
  },
  {
     question: 'Who is the King of the Jungle?',
     answers: [
         {text: 'Hippo', correct: false},
         {text: 'Lion', correct: true},
         {text: 'Shark', correct: false},
         {text: 'Tiger', correct: false},
     ]
 
  }
 
 
 ]