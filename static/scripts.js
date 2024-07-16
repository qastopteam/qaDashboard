function loadChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('send-message');

    chatbotIcon.addEventListener('click', function() {
        chatbotIcon.classList.add('hidden');
        chatbotContainer.classList.remove('hidden');
    });

    closeChatbotButton.addEventListener('click', function() {
        chatbotContainer.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
        resetChatbot(); // Reset the chatbot on close
    });

    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = chatbotInput.value;
            if (message.trim()) {
                handleChatbotMessage(message, 'user');
                chatbotInput.value = '';
            }
        }
    });

    sendButton.addEventListener('click', function() {
        const message = chatbotInput.value;
        if (message.trim()) {
            handleChatbotMessage(message, 'user');
            chatbotInput.value = '';
        }
    });
}

function handleOptionClick(option) {
    const chatbotBody = document.querySelector('.chatbot-body');

    // Display the selected option
    chatbotBody.innerHTML += `<div class="user-message">${option} <img src="${userIconUrl}" alt="User" class="user-icon"></div>`;

    // Simulate a response from the chatbot
    setTimeout(() => {
        if (option === 'Projects') {
            chatbotBody.innerHTML += `

                <button class="option-button" onclick="handleOptionClick('Governance-council updates')">Governance-council updates</button>
                <button class="option-button" onclick="handleOptionClick('RAG Status')">RAG Status</button>
            `;
        } else if (option === 'Governance-council updates') {
            chatbotBody.innerHTML += `
                <div class="options">
                     <button class="option-button" onclick="fetchProjectsByStatus('R')">Number of Projects in Red</button>
                     <button class="option-button" onclick="fetchProjectsByStatus('G')">Number of Projects in Green</button>
                     <button class="option-button" onclick="fetchProjectsByStatus('A')">Number of Projects in Amber</button>
                </div>
            `;
            // Add code to fetch and display the data from the database
        } else if (option === 'RAG Status') {
            chatbotBody.innerHTML += `
                <button class="option-button" onclick="fetchProjectsDetails('R')">Details about projects in red</button>
                <button class="option-button" onclick="fetchProjectsDetails('G')">Details about projects in green</button>
                <button class="option-button" onclick="fetchProjectsDetails('A')">Details about projects in amber</button>
                <button class="option-button" onclick="fetchResourcesByStatus('R')">Resources for projects in red</button>
                <button class="option-button" onclick="fetchResourcesByStatus('G')">Resources for projects in green</button>
                <button class="option-button" onclick="fetchResourcesByStatus('A')">Resources for projects in amber</button>
            `;
        }
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 500);
}
function fetchProjectsByStatus(status) {
    const chatbotBody = document.querySelector('.chatbot-body');
    fetch(`/api/get_project_counts?rag_status=${status}`)
        .then(response => response.json())
        .then(data => {
            let message = `<div class="bot-message"><img src="${botIconUrl}" alt="Bot" class="bot-icon">Projects in ${status}: `;
            if (Object.keys(data).length > 0) {
                for (const [key,value] of Object.entries(data)) {
                    message += `<div>${value}</div>`;
                }
            } else {
                message += 'None';
            }
            message += '</div></div>';
            chatbotBody.innerHTML += message;
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        })
        .catch(error => {
            console.error('Error fetching project data:', error);
        });
}
function fetchProjectsDetails(status) {
    const chatbotBody = document.querySelector('.chatbot-body');
    fetch(`/api/projects?rag_status=${status}`)
        .then(response => response.json())
        .then(data => {
            let message = `<div class="bot-message"><div class="message-content"><img src="${botIconUrl}" alt="Bot" class="bot-icon">Project Details for ${status} Status: `;
            if (data.projects && data.projects.length > 0) {
                data.projects.forEach(project => {
                    message += `<div>Project Name: ${project.project_name}</div>`;
                    message += `<div>Impediments: ${project.impediments}</div>`;
                    message += `<div>Resource: ${project.resource}</div>`;
                });
            } else {
                message += 'No projects found';
            }
            message += '</div></div>';
            chatbotBody.innerHTML += message;
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        })
        .catch(error => {
            console.error('Error fetching project details:', error);
        });
}

function fetchResourcesByStatus(status) {
    const chatbotBody = document.querySelector('.chatbot-body');
    fetch(`/api/get_resources_by_rag_status?rag_status=${status}`)
        .then(response => response.json())
        .then(data => {
            let message = `<div class="bot-message"><div class="message-content"><img src="${botIconUrl}" alt="Bot" class="bot-icon">Resources for projects in ${status} Status: `;
            if (data.resources && data.resources.length > 0) {
                data.resources.forEach(resource => {
                    message += `<div>Project Name: ${resource.name}</div>`;
                    message += `<div>Resource: ${resource.resource}</div>`;
                });
            } else {
                message += 'No resources found';
            }
            message += '</div></div>';
            chatbotBody.innerHTML += message;
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        })
        .catch(error => {
            console.error('Error fetching resource details:', error);
        });
}


function handleChatbotMessage(message, sender) {
    const chatbotBody = document.querySelector('.chatbot-body');

    if (sender === 'user') {
        chatbotBody.innerHTML += `<div class="user-message">${message} <img src="${userIconUrl}" alt="User" class="user-icon"></div>`;
    } else {
        chatbotBody.innerHTML += `<div class="bot-message"><img src="${botIconUrl}" alt="Bot" class="bot-icon"> ${message}</div>`;
    }

    // Simulate a response from the chatbot
    if (sender === 'user') {
        setTimeout(() => {
            handleChatbotMessage('This is a simulated response.', 'bot');
        }, 1000);
    }

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function resetChatbot() {
    const chatbotBody = document.querySelector('.chatbot-body');
    chatbotBody.innerHTML = `
        <div class="bot-message"><img src="${botIconUrl}" alt="Bot" class="bot-icon">Hi, How can I help you?</div>
        <button class="option-button" onclick="handleOptionClick('Governance')">Governance</button>
        <button class="option-button" onclick="handleOptionClick('Projects')">Projects</button>
        <button class="option-button" onclick="handleOptionClick('Resources')">Resources</button>
        <button class="option-button" onclick="handleOptionClick('Accelerators')">Accelerators</button>
        <button class="option-button" onclick="handleOptionClick('Data Entry')">Data Entry</button>
    `;
}

// Initialize the chatbot
document.addEventListener("DOMContentLoaded", function() {
    loadChatbot();
});
