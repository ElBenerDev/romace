class RomanticEscapeRoom {
    constructor() {
        this.playerName = '';
        this.currentRiddle = 0;
        this.riddles = [
            {
                title: '🌟 Primer Acertijo',
                question: 'Nuestro primer beso fue en...',
                answer: 'el parque'
            },
            {
                title: '💫 Segundo Acertijo',
                question: '¿Cuál es mi comida favorita que tú preparas?',
                answer: 'pasta'
            },
            {
                title: '✨ Tercer Acertijo',
                question: '¿En qué fecha celebramos nuestro primer aniversario? (Formato: DD/MM)',
                answer: '14/02'
            }
        ];
        this.specialMessage = '¡Te amo con todo mi corazón! ❤️';
    }

    updateProgress() {
        const progress = (this.currentRiddle / this.riddles.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    displayRiddle() {
        const riddle = this.riddles[this.currentRiddle];
        document.getElementById('riddle-title').textContent = riddle.title;
        document.getElementById('riddle-text').textContent = riddle.question;
        document.getElementById('riddle-answer').value = '';
        document.getElementById('feedback').textContent = '';
        this.updateProgress();
    }

    checkAnswer(answer) {
        const currentRiddle = this.riddles[this.currentRiddle];
        const isCorrect = answer.toLowerCase().trim() === currentRiddle.answer.toLowerCase();
        const feedback = document.getElementById('feedback');
        
        if (isCorrect) {
            feedback.textContent = '¡Correcto! 💕';
            feedback.className = 'feedback correct';
            this.currentRiddle++;
            
            setTimeout(() => {
                if (this.currentRiddle >= this.riddles.length) {
                    this.showFinalScreen();
                } else {
                    this.displayRiddle();
                }
            }, 1500);
        } else {
            feedback.textContent = 'Mmm... esa no es la respuesta correcta. ¡Inténtalo de nuevo!';
            feedback.className = 'feedback incorrect';
        }
    }

    showFinalScreen() {
        document.getElementById('final-text').textContent = 
            `¡Felicidades ${this.playerName}! Has demostrado lo especial que es nuestro amor resolviendo todos los acertijos.`;
        document.getElementById('special-message').textContent = this.specialMessage;
        this.showScreen('final-screen');
    }

    reset() {
        this.currentRiddle = 0;
        this.updateProgress();
        this.showScreen('welcome-screen');
    }
}

// Instancia global del juego
let game = new RomanticEscapeRoom();

// Funciones globales para los eventos
function startGame() {
    const nameInput = document.getElementById('player-name');
    if (nameInput.value.trim() === '') {
        alert('Por favor, ingresa tu nombre para comenzar');
        return;
    }
    game.playerName = nameInput.value;
    game.showScreen('game-screen');
    game.displayRiddle();
}

function checkAnswer() {
    const answerInput = document.getElementById('riddle-answer');
    if (answerInput.value.trim() === '') {
        alert('Por favor, ingresa una respuesta');
        return;
    }
    game.checkAnswer(answerInput.value);
}

function resetGame() {
    game.reset();
}

// Event Listeners
document.getElementById('riddle-answer').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});