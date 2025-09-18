// Chat functionality
let messageCount = 0;

// Bot responses
const botResponses = [
    `📊 Based on our insights, here are findings about "{query}": Many of our graduates have found success by leveraging the analytical skills developed at BITSoM. The key is to apply strategic thinking to real-world challenges.`,
    `🎯 I found relevant experiences about "{query}". Several graduates mentioned the importance of networking and building strong professional relationships during their time at BITSoM.`,
    `💡 From our transcripts regarding "{query}": Graduates consistently highlight the value of practical exposure and case-based learning in their career progression.`,
    `🚀 Graduate insights on "{query}": The interdisciplinary approach at BITSoM has helped many graduates adapt to changing industry demands and take on leadership roles.`,
    `📈 Based on our extensive database about "{query}": Many successful graduates emphasize the importance of continuous learning and staying updated with industry trends.`
];

// DOM elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');
const queryCount = document.getElementById('queryCount');
const initialTime = document.getElementById('initialTime');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial timestamp
    initialTime.textContent = getCurrentTime();
    
    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    messageInput.addEventListener('input', function() {
        sendButton.disabled = !messageInput.value.trim();
    });
    
    // Initial state
    sendButton.disabled = true;
});

// Send message function
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    sendButton.disabled = true;
    messageInput.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = getRandomResponse(message);
        addMessage(response, 'bot');
        messageInput.disabled = false;
        messageCount++;
        updateQueryCount();
    }, 1500 + Math.random() * 1000);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = `message-avatar ${sender}-avatar`;
    avatarDiv.innerHTML = sender === 'user' ? '<span>👤</span>' : '<span>🤖</span>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = `message-content ${sender}-content`;
    
    const textP = document.createElement('p');
    textP.textContent = text;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = getCurrentTime();
    
    contentDiv.appendChild(textP);
    contentDiv.appendChild(timeSpan);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

// Get random bot response
function getRandomResponse(query) {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex].replace('{query}', query);
}

// Get current time
function getCurrentTime() {
    return new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Update query count
function updateQueryCount() {
    queryCount.textContent = `${messageCount} queries processed`;
}

// Scroll to bottom
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}