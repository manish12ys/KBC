class KBCGame {
    constructor() {
        this.currentLevel = 1;
        this.currentQuestion = null;
        this.selectedOption = null;
        this.gameEnded = false;
        this.lifelines = {
            fiftyFifty: true,
            phoneAFriend: true,
            askAudience: true
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('welcomeScreen');
    }

    bindEvents() {
        // Welcome screen
        document.getElementById('startGame').addEventListener('click', () => this.startGame());

        // Game screen
        document.getElementById('finalAnswer').addEventListener('click', () => this.submitAnswer());
        document.getElementById('quitGame').addEventListener('click', () => this.quitGame());

        // Options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectOption(e.target.closest('.option-btn')));
        });

        // Lifelines
        document.getElementById('fiftyFifty').addEventListener('click', () => this.useFiftyFifty());
        document.getElementById('phoneAFriend').addEventListener('click', () => this.usePhoneAFriend());
        document.getElementById('askAudience').addEventListener('click', () => this.useAskAudience());

        // Result screen
        document.getElementById('playAgain').addEventListener('click', () => this.resetGame());
        document.getElementById('shareResult').addEventListener('click', () => this.shareResult());

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startGame() {
        this.currentLevel = 1;
        this.gameEnded = false;
        this.resetLifelines();
        this.showScreen('gameScreen');
        this.loadQuestion();
        this.updatePrizeLadder();
    }

    loadQuestion() {
        this.currentQuestion = questions[this.currentLevel - 1];
        this.selectedOption = null;

        // Update UI
        document.getElementById('questionNumber').textContent = `Question ${this.currentLevel} of 15`;
        document.getElementById('currentPrize').textContent = this.currentQuestion.prize;
        document.getElementById('questionText').textContent = this.currentQuestion.question;

        // Load options
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, index) => {
            const optionKey = ['A', 'B', 'C', 'D'][index];
            btn.querySelector('.option-text').textContent = this.currentQuestion.options[optionKey];
            btn.classList.remove('selected', 'correct', 'wrong', 'disabled');
            btn.disabled = false;
        });

        // Reset final answer button
        document.getElementById('finalAnswer').disabled = true;
    }

    selectOption(optionBtn) {
        if (this.gameEnded) return;

        // Remove previous selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Select new option
        optionBtn.classList.add('selected');
        this.selectedOption = optionBtn.dataset.option;

        // Enable final answer button
        document.getElementById('finalAnswer').disabled = false;
    }

    submitAnswer() {
        if (!this.selectedOption || this.gameEnded) return;

        this.gameEnded = true;
        const isCorrect = this.selectedOption === this.currentQuestion.correct;

        // Show correct/wrong answers
        document.querySelectorAll('.option-btn').forEach(btn => {
            const option = btn.dataset.option;
            if (option === this.currentQuestion.correct) {
                btn.classList.add('correct');
            } else if (option === this.selectedOption && !isCorrect) {
                btn.classList.add('wrong');
            }
            btn.disabled = true;
        });

        // Wait for animation then proceed
        setTimeout(() => {
            if (isCorrect) {
                this.handleCorrectAnswer();
            } else {
                this.handleWrongAnswer();
            }
        }, 2000);
    }

    handleCorrectAnswer() {
        if (this.currentLevel === 15) {
            // Won the game!
            this.showResult(true, this.currentQuestion.prize, this.currentLevel);
        } else {
            // Next question
            this.currentLevel++;
            this.gameEnded = false;
            this.loadQuestion();
            this.updatePrizeLadder();
        }
    }

    handleWrongAnswer() {
        // Calculate safe level prize
        let safePrize = "₹0";
        if (this.currentLevel > 10) {
            safePrize = "₹3,20,000";
        } else if (this.currentLevel > 5) {
            safePrize = "₹10,000";
        }

        this.showResult(false, safePrize, this.currentLevel - 1);
    }

    quitGame() {
        if (this.currentLevel === 1) {
            this.showResult(false, "₹0", 0);
        } else {
            const prize = questions[this.currentLevel - 2].prize;
            this.showResult(false, prize, this.currentLevel - 1);
        }
    }

    showResult(won, prize, questionsAnswered) {
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const finalPrize = document.getElementById('finalPrize');
        const questionsAnsweredSpan = document.getElementById('questionsAnswered');

        if (won) {
            resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultIcon.className = 'result-icon win';
            resultTitle.textContent = 'Congratulations!';
            resultMessage.textContent = `You are the winner of ${prize}!`;
        } else {
            resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
            resultIcon.className = 'result-icon lose';
            resultTitle.textContent = 'Game Over!';
            resultMessage.textContent = `You take home ${prize}`;
        }

        finalPrize.textContent = prize;
        questionsAnsweredSpan.textContent = `${questionsAnswered}/15`;

        this.showScreen('resultScreen');
    }

    updatePrizeLadder() {
        document.querySelectorAll('.prize-item').forEach((item, index) => {
            const level = 15 - index;
            item.classList.remove('current', 'completed');
            
            if (level === this.currentLevel) {
                item.classList.add('current');
            } else if (level < this.currentLevel) {
                item.classList.add('completed');
            }
        });
    }

    // Lifeline implementations
    useFiftyFifty() {
        if (!this.lifelines.fiftyFifty || this.gameEnded) return;

        this.lifelines.fiftyFifty = false;
        document.getElementById('fiftyFifty').disabled = true;

        // Remove 2 wrong options
        const correctOption = this.currentQuestion.correct;
        const options = ['A', 'B', 'C', 'D'].filter(opt => opt !== correctOption);
        const toRemove = options.sort(() => 0.5 - Math.random()).slice(0, 2);

        document.querySelectorAll('.option-btn').forEach(btn => {
            if (toRemove.includes(btn.dataset.option)) {
                btn.classList.add('disabled');
                btn.disabled = true;
            }
        });
    }

    usePhoneAFriend() {
        if (!this.lifelines.phoneAFriend || this.gameEnded) return;

        this.lifelines.phoneAFriend = false;
        document.getElementById('phoneAFriend').disabled = true;

        // Generate friend's advice (80% chance of correct answer)
        const isCorrect = Math.random() < 0.8;
        const advice = isCorrect ? this.currentQuestion.correct : 
                      ['A', 'B', 'C', 'D'].filter(opt => opt !== this.currentQuestion.correct)[0];

        const confidence = Math.floor(Math.random() * 30) + 60; // 60-90% confidence
        document.getElementById('friendAdvice').textContent = 
            `I think the answer is ${advice}. I'm about ${confidence}% confident about this.`;

        this.showModal('phoneModal');
    }

    useAskAudience() {
        if (!this.lifelines.askAudience || this.gameEnded) return;

        this.lifelines.askAudience = false;
        document.getElementById('askAudience').disabled = true;

        // Generate audience poll (correct answer gets highest percentage)
        const correctOption = this.currentQuestion.correct;
        const percentages = this.generateAudiencePoll(correctOption);

        document.querySelectorAll('.poll-bar').forEach(bar => {
            const option = bar.dataset.option;
            const percentage = percentages[option];
            bar.querySelector('.poll-percentage').textContent = `${percentage}%`;
            bar.querySelector('.poll-fill').style.setProperty('--width', `${percentage}%`);
            
            // Animate the fill
            setTimeout(() => {
                bar.querySelector('.poll-fill').style.width = `${percentage}%`;
            }, 100);
        });

        this.showModal('audienceModal');
    }

    generateAudiencePoll(correctOption) {
        const percentages = { A: 0, B: 0, C: 0, D: 0 };
        
        // Correct answer gets 40-70%
        percentages[correctOption] = Math.floor(Math.random() * 31) + 40;
        
        // Distribute remaining percentage among other options
        let remaining = 100 - percentages[correctOption];
        const otherOptions = ['A', 'B', 'C', 'D'].filter(opt => opt !== correctOption);
        
        otherOptions.forEach((option, index) => {
            if (index === otherOptions.length - 1) {
                percentages[option] = remaining;
            } else {
                const max = Math.floor(remaining / (otherOptions.length - index));
                const value = Math.floor(Math.random() * max);
                percentages[option] = value;
                remaining -= value;
            }
        });

        return percentages;
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    resetLifelines() {
        this.lifelines = {
            fiftyFifty: true,
            phoneAFriend: true,
            askAudience: true
        };

        document.querySelectorAll('.lifeline-btn').forEach(btn => {
            btn.disabled = false;
        });
    }

    resetGame() {
        this.currentLevel = 1;
        this.currentQuestion = null;
        this.selectedOption = null;
        this.gameEnded = false;
        this.resetLifelines();
        this.showScreen('welcomeScreen');
    }

    shareResult() {
        const prize = document.getElementById('finalPrize').textContent;
        const questions = document.getElementById('questionsAnswered').textContent;
        
        const text = `I just played KBC Quiz and won ${prize}! I answered ${questions} questions correctly. Can you beat my score?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'KBC Quiz Result',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                alert('Result copied to clipboard!');
            });
        }
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KBCGame();
});
