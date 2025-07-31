// KBC Quiz Questions Database
const questions = [
    // Level 1 - ₹1,000
    {
        level: 1,
        question: "What is the capital of India?",
        options: {
            A: "Mumbai",
            B: "New Delhi",
            C: "Kolkata",
            D: "Chennai"
        },
        correct: "B",
        prize: "₹1,000"
    },
    
    // Level 2 - ₹2,000
    {
        level: 2,
        question: "Which planet is known as the Red Planet?",
        options: {
            A: "Venus",
            B: "Jupiter",
            C: "Mars",
            D: "Saturn"
        },
        correct: "C",
        prize: "₹2,000"
    },
    
    // Level 3 - ₹3,000
    {
        level: 3,
        question: "Who wrote the Indian National Anthem?",
        options: {
            A: "Rabindranath Tagore",
            B: "Bankim Chandra Chattopadhyay",
            C: "Sarojini Naidu",
            D: "Mahatma Gandhi"
        },
        correct: "A",
        prize: "₹3,000"
    },
    
    // Level 4 - ₹5,000
    {
        level: 4,
        question: "What is the largest mammal in the world?",
        options: {
            A: "African Elephant",
            B: "Blue Whale",
            C: "Giraffe",
            D: "Hippopotamus"
        },
        correct: "B",
        prize: "₹5,000"
    },
    
    // Level 5 - ₹10,000 (Safe Level)
    {
        level: 5,
        question: "In which year did India gain independence?",
        options: {
            A: "1945",
            B: "1946",
            C: "1947",
            D: "1948"
        },
        correct: "C",
        prize: "₹10,000"
    },
    
    // Level 6 - ₹20,000
    {
        level: 6,
        question: "Which is the longest river in the world?",
        options: {
            A: "Amazon River",
            B: "Nile River",
            C: "Yangtze River",
            D: "Mississippi River"
        },
        correct: "B",
        prize: "₹20,000"
    },
    
    // Level 7 - ₹40,000
    {
        level: 7,
        question: "Who invented the telephone?",
        options: {
            A: "Thomas Edison",
            B: "Alexander Graham Bell",
            C: "Nikola Tesla",
            D: "Benjamin Franklin"
        },
        correct: "B",
        prize: "₹40,000"
    },
    
    // Level 8 - ₹80,000
    {
        level: 8,
        question: "What is the chemical symbol for Gold?",
        options: {
            A: "Go",
            B: "Gd",
            C: "Au",
            D: "Ag"
        },
        correct: "C",
        prize: "₹80,000"
    },
    
    // Level 9 - ₹1,60,000
    {
        level: 9,
        question: "Which Mughal emperor built the Taj Mahal?",
        options: {
            A: "Akbar",
            B: "Shah Jahan",
            C: "Aurangzeb",
            D: "Humayun"
        },
        correct: "B",
        prize: "₹1,60,000"
    },
    
    // Level 10 - ₹3,20,000 (Safe Level)
    {
        level: 10,
        question: "What is the speed of light in vacuum?",
        options: {
            A: "3 × 10⁸ m/s",
            B: "3 × 10⁶ m/s",
            C: "3 × 10⁷ m/s",
            D: "3 × 10⁹ m/s"
        },
        correct: "A",
        prize: "₹3,20,000"
    },
    
    // Level 11 - ₹6,25,000
    {
        level: 11,
        question: "Which hormone is known as the 'stress hormone'?",
        options: {
            A: "Insulin",
            B: "Adrenaline",
            C: "Cortisol",
            D: "Thyroxine"
        },
        correct: "C",
        prize: "₹6,25,000"
    },
    
    // Level 12 - ₹12,50,000
    {
        level: 12,
        question: "In which year was the first iPhone released?",
        options: {
            A: "2006",
            B: "2007",
            C: "2008",
            D: "2009"
        },
        correct: "B",
        prize: "₹12,50,000"
    },
    
    // Level 13 - ₹25,00,000
    {
        level: 13,
        question: "What is the smallest country in the world?",
        options: {
            A: "Monaco",
            B: "San Marino",
            C: "Vatican City",
            D: "Liechtenstein"
        },
        correct: "C",
        prize: "₹25,00,000"
    },
    
    // Level 14 - ₹50,00,000
    {
        level: 14,
        question: "Who was the first person to walk on the moon?",
        options: {
            A: "Buzz Aldrin",
            B: "Neil Armstrong",
            C: "Michael Collins",
            D: "John Glenn"
        },
        correct: "B",
        prize: "₹50,00,000"
    },
    
    // Level 15 - ₹1,00,00,000 (Jackpot)
    {
        level: 15,
        question: "Which particle is known as the 'God Particle'?",
        options: {
            A: "Proton",
            B: "Neutron",
            C: "Higgs Boson",
            D: "Electron"
        },
        correct: "C",
        prize: "₹1,00,00,000"
    }
];

// Prize ladder for reference
const prizeLadder = [
    "₹1,000",
    "₹2,000", 
    "₹3,000",
    "₹5,000",
    "₹10,000",    // Safe level
    "₹20,000",
    "₹40,000",
    "₹80,000",
    "₹1,60,000",
    "₹3,20,000",  // Safe level
    "₹6,25,000",
    "₹12,50,000",
    "₹25,00,000",
    "₹50,00,000",
    "₹1,00,00,000" // Jackpot
];

// Safe levels where players can't go below
const safeLevels = [5, 10]; // Level 5 (₹10,000) and Level 10 (₹3,20,000)
