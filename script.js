import 'core-js/stable'
import 'regenerator-runtime/runtime'

const secretNumberOverlay = document.querySelector(`.number`)

const labelMessage = document.querySelector(`.message`)
const labelScore = document.querySelector(`.score`)
const labelHighscore = document.querySelector(`.highscore`)
const labelScoreOverlay = document.querySelector(`.label-score`)

const inputNumber = document.querySelector(`.guess`)

const btnCheck = document.querySelector(`.check`)
const btnAgain = document.querySelector(`.again`)

class App {
    #secretNumber;
    #score = 20
    #highscore = 0
    constructor() {
        this.#secretNumber = Math.floor(Math.random() * 20) + 1
        btnCheck.addEventListener(`click`, this.#addHandlerCheck.bind(this))
        btnAgain.addEventListener(`click`, this.#reset.bind(this))
    }
    #addHandlerCheck() {
        // number is correctly guessed
        if (+inputNumber.value === this.#secretNumber) {
            labelMessage.textContent = `YOU WON!!!`
            this.#clear()
            inputNumber.blur()
            this.#winningUI()
            if (this.#score > this.#highscore) {
                this.#highscore = this.#score
                labelHighscore.textContent = this.#highscore
            }
        }
        //guessed number is smaller
        if (+inputNumber.value < this.#secretNumber && +inputNumber.value > 0 && this.#score >= 1) {
            labelMessage.textContent = `Too Low`
            this.#clear()
            this.#reduceScore()
            if (this.#score === 0) this.#losingUI()
        }

        //guessed number is bigger
        if (+inputNumber.value > this.#secretNumber && +inputNumber.value <= 20 && this.#score >= 1) {
            labelMessage.textContent = `Too High`
            this.#clear()
            this.#reduceScore()
            if (this.#score === 0) this.#losingUI()
        }

        // guessed number is invalid
        if (+inputNumber.value > 20 || +inputNumber.value < 0) {
            alert(`Invalid number is guessed.`)
            this.#clear()
            this.#reduceScore()
        }
    }
    #losingUI() {
        labelMessage.textContent = `YOU LOST`
        labelScoreOverlay.textContent = ``
        inputNumber.blur()
    }
    #winningUI() {
        document.body.style.backgroundColor = `#5F8D4E`
        secretNumberOverlay.style.width = `25rem`
        secretNumberOverlay.textContent = this.#secretNumber
    }
    #clear() {
        inputNumber.value = ``
        inputNumber.focus()
    }
    #reduceScore() {
        this.#score--
        labelScore.textContent = this.#score
    }
    #reset() {
        secretNumberOverlay.textContent = `?`
        this.#secretNumber = Math.floor(Math.random() * 20) + 1
        document.body.style.backgroundColor = `#222`
        secretNumberOverlay.style.width = `15rem`
        labelMessage.textContent = `Start guessing...`
        this.#score = 20
        labelScore.textContent = this.#score
    }
}
new App()
