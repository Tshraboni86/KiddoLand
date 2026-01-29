// script.js - Main JavaScript for KiddoLand

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });

    // ===== ALPHABET LEARNING =====
    if (window.location.pathname.includes('alphabet')) {
        initializeAlphabetGame();
    }

    // ===== MATH QUIZ =====
    if (window.location.pathname.includes('math-quiz')) {
        initializeMathQuiz();
    }

    // ===== LOGIN/REGISTER TABS =====
    initializeAuthTabs();
});

// ===== ALPHABET GAME FUNCTIONS =====
function initializeAlphabetGame() {
    const letterCards = document.querySelectorAll('.letter-card');
    const letterSound = document.getElementById('letterSound');
    const letterDisplay = document.querySelector('.current-letter');
    const wordDisplay = document.querySelector('.letter-word');
    
    // Sample words for each letter
    const letterWords = {
        'A': 'Apple', 'B': 'Ball', 'C': 'Cat', 'D': 'Dog',
        'E': 'Elephant', 'F': 'Fish', 'G': 'Giraffe', 'H': 'House',
        'I': 'Ice Cream', 'J': 'Jelly', 'K': 'Kite', 'L': 'Lion',
        'M': 'Monkey', 'N': 'Nest', 'O': 'Orange', 'P': 'Panda',
        'Q': 'Queen', 'R': 'Rabbit', 'S': 'Sun', 'T': 'Turtle',
        'U': 'Umbrella', 'V': 'Violin', 'W': 'Whale', 'X': 'Xylophone',
        'Y': 'Yoyo', 'Z': 'Zebra'
    };

    letterCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            letterCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            const letter = this.querySelector('.letter').textContent;
            
            // Update displays
            if (letterDisplay) letterDisplay.textContent = letter;
            if (wordDisplay) wordDisplay.textContent = letterWords[letter] || 'Word';
            
            // Play sound (simulated)
            playLetterSound(letter);
            
            // Show congratulation message
            showMessage(`Great! ${letter} is for ${letterWords[letter] || 'something fun!'}`, 'success');
        });
    });

    // Auto-play first letter
    if (letterCards.length > 0) {
        letterCards[0].click();
    }
}

function playLetterSound(letter) {
    // In a real app, you would play actual audio files
    console.log(`Playing sound for letter ${letter}`);
    
    // Simulate sound with visual feedback
    const activeCard = document.querySelector('.letter-card.active');
    if (activeCard) {
        activeCard.style.animation = 'bounce 0.5s';
        setTimeout(() => {
            activeCard.style.animation = '';
        }, 500);
    }
}

// ===== MATH QUIZ FUNCTIONS =====
let currentQuestion = 0;
let score = 0;
let questions = [];

function initializeMathQuiz() {
    // Generate sample math questions
    questions = [
        {
            question: "What is 2 + 3?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "How many apples are in 2 groups of 3?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "What is 10 - 4?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "How many sides does a triangle have?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "What is 5 × 2?",
            options: ["8", "9", "10", "11"],
            correct: 2
        }
    ];

    loadQuestion();
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            selectOption(this);
        });
    });

    // Initialize next button
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestion];
    document.querySelector('.question').textContent = q.question;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = q.options[index];
        option.classList.remove('selected', 'correct', 'wrong');
    });

    // Update progress
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Hide next button initially
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) nextBtn.style.display = 'none';
}

function selectOption(optionElement) {
    // Remove selection from all options
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select clicked option
    optionElement.classList.add('selected');
    
    const selectedIndex = Array.from(document.querySelectorAll('.option')).indexOf(optionElement);
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    
    // Show feedback
    if (isCorrect) {
        optionElement.classList.add('correct');
        score++;
        showMessage("Correct! 🎉", 'success');
    } else {
        optionElement.classList.add('wrong');
        showMessage("Try again! 💪", 'error');
    }
    
    // Show next button
    document.getElementById('nextQuestion').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizCard = document.querySelector('.quiz-card');
    const percentage = Math.round((score / questions.length) * 100);
    
    quizCard.innerHTML = `
        <h2>Quiz Completed! 🎉</h2>
        <div class="score-display">
            Your Score: <span style="color: var(--purple); font-size: 3rem;">${score}/${questions.length}</span>
        </div>
        <div style="text-align: center; margin: 2rem 0;">
            <div style="font-size: 5rem; color: ${percentage >= 80 ? 'var(--green)' : percentage >= 60 ? 'var(--orange)' : 'var(--pink)'}">
                ${percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
            </div>
            <p style="font-size: 1.5rem; color: var(--purple); margin: 1rem 0;">
                ${percentage >= 80 ? 'Excellent! You\'re a math star!' : 
                  percentage >= 60 ? 'Good job! Keep practicing!' : 
                  'Nice try! Practice makes perfect!'}
            </p>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-primary" onclick="restartQuiz()">
                <i class="fas fa-redo btn-icon"></i> Try Again
            </button>
            <button class="btn btn-secondary" onclick="window.location.href='/dashboard'">
                <i class="fas fa-home btn-icon"></i> Back to Dashboard
            </button>
        </div>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    initializeMathQuiz();
}

// ===== AUTHENTICATION FUNCTIONS =====
function initializeAuthTabs() {
    const tabs = document.querySelectorAll('.tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected form
            if (tabId === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 2000;">
            <div style="background: ${type === 'success' ? 'var(--green)' : type === 'error' ? 'var(--pink)' : 'var(--blue)'}; 
                        color: white; padding: 1rem 2rem; border-radius: 15px; 
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// ===== PARENT DASHBOARD FUNCTIONS =====
function updateTimeLimit() {
    const slider = document.getElementById('timeLimit');
    const display = document.getElementById('timeDisplay');
    if (slider && display) {
        display.textContent = `${slider.value} minutes`;
    }
}

function sendProgressReport() {
    const email = document.getElementById('reportEmail');
    if (email && email.value) {
        showMessage(`Progress report sent to ${email.value}`, 'success');
        email.value = '';
    } else {
        showMessage('Please enter a valid email address', 'error');
    }
}

// ===== PROGRESS TRACKING =====
function updateProgress(subject, progress) {
    // In a real app, this would save to a database
    localStorage.setItem(`progress_${subject}`, progress);
    
    // Update progress bar
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// ===== DRAG AND DROP (for future enhancement) =====
function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.querySelector('.drop-zone');
    
    if (!dragItems.length || !dropZone) return;
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.textContent);
            this.style.opacity = '0.5';
        });
        
        item.addEventListener('dragend', function() {
            this.style.opacity = '1';
        });
    });
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = 'var(--light-blue)';
    });
    
    dropZone.addEventListener('dragleave', function() {
        this.style.backgroundColor = '';
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        this.innerHTML = `<div style="font-size: 2rem;">${data}</div>`;
        this.style.backgroundColor = 'var(--green)';
        showMessage('Great job! 🎉', 'success');
    });
}

// Initialize drag and drop when page loads
document.addEventListener('DOMContentLoaded', setupDragAndDrop);

// ===== GAME FUNCTIONS =====
function startGame(gameType) {
    showMessage(`Starting ${gameType} game!`, 'info');
    // In a real app, this would navigate to the game page
}

function collectReward() {
    const points = Math.floor(Math.random() * 50) + 10;
    showMessage(`🎉 You earned ${points} points!`, 'success');
    
    // Update points display if exists
    const pointsDisplay = document.getElementById('pointsDisplay');
    if (pointsDisplay) {
        const currentPoints = parseInt(pointsDisplay.textContent) || 0;
        pointsDisplay.textContent = currentPoints + points;
    }
}