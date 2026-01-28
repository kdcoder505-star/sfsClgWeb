document.addEventListener('DOMContentLoaded', () => {
    // Select elements with safety checks
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatClose = document.querySelector('.chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');

    if (!chatbotButton || !chatbotContainer || !chatBody) {
        console.error("Chatbot elements missing from the page.");
        return;
    }

    let isInitialised = false;

    // Toggle Chatbot
    chatbotButton.addEventListener('click', (e) => {
        e.preventDefault();
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active') && !isInitialised) {
            initChat();
            isInitialised = true;
        }
    });

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    // Initial Message
    function initChat() {
        addMessage("Hello! 👋 Welcome to SFS Assist. I'm here to help you navigate our college.", 'bot');
        setTimeout(() => {
            addMessage("Please select who you are so I can provide the best info:", 'bot');
            addRoleOptions();
        }, 800);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-msg`;
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);

        // Smooth scroll to bottom
        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: 'smooth'
        });
    }

    function addRoleOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'role-options';

        const roles = ['Visitor', 'Student', 'Parent'];
        roles.forEach(role => {
            const btn = document.createElement('div');
            btn.className = 'role-btn';
            btn.innerText = role;
            btn.addEventListener('click', () => selectRole(role));
            optionsDiv.appendChild(btn);
        });

        chatBody.appendChild(optionsDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function selectRole(role) {
        const options = document.querySelector('.role-options');
        if (options) options.remove();

        addMessage(`I am a ${role}`, 'user');

        setTimeout(() => {
            if (role === 'Visitor') {
                addMessage(`Great! Welcome to SFS. 🏛️ Are you interested in Admissions, Courses, or seeing our Campus Gallery?`, 'bot');
            } else if (role === 'Student') {
                addMessage(`Hey there! 🎓 How can I assist you? Need help with Linways login, Exam dates, or Events?`, 'bot');
            } else {
                addMessage(`Greetings! 👪 We appreciate our parents. Would you like to know about Fees, Faculty contacts, or Transport?`, 'bot');
            }
        }, 800);
    }

    // Handle User Input
    function handleUserQuery() {
        if (!chatInput) return;
        const query = chatInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        chatInput.value = '';

        setTimeout(() => {
            generateBotResponse(query.toLowerCase());
        }, 1000);
    }

    function generateBotResponse(query) {
        let response = "I'm not quite sure about that yet. Please call our helpdesk at +91 80 2783 2165 for immediate assistance!";

        if (query.includes('admission') || query.includes('apply')) {
            response = "Admissions for the 2025 session are open! Click the 'Apply Now' button in the navigation to get started.";
        } else if (query.includes('fee')) {
            response = "For detailed fee structures, please visit the accounts office or check the 'Student Support' menu.";
        } else if (query.includes('hi') || query.includes('hello')) {
            response = "Hello! I am SFS Assist. How can I help you today?";
        } else if (query.includes('mca') || query.includes('master')) {
            response = "SFS College offers a top-tier MCA program. Our MCA students are high achievers and the department is known for its excellent placement record!";
        } else if (query.includes('location') || query.includes('where')) {
            response = "Our campus is located in Electronic City, Phase 1, Bengaluru. We'd love to see you here!";
        } else if (query.includes('og') || query.includes('best student')) {
            response = "The 'OG Gang' (6 members) are hands down the best students in the MCA department! 🚀";
        }

        addMessage(response, 'bot');
    }

    if (sendMessage) {
        sendMessage.addEventListener('click', handleUserQuery);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserQuery();
        });
    }
});
