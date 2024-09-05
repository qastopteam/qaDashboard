document.addEventListener("DOMContentLoaded", function() {
    loadChatbot();
});

function loadChatbot() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotInput = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('send-message');

    chatbotIcon.addEventListener('click', () => {
        chatbotIcon.classList.add('hidden');
        chatbotContainer.classList.remove('hidden');
    });

    closeChatbotButton.addEventListener('click', () => {
        chatbotContainer.classList.add('hidden');
        chatbotIcon.classList.remove('hidden');
        resetChatbot();
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage(chatbotInput.value);
        }
    });

    sendButton.addEventListener('click', () => {
        sendChatMessage(chatbotInput.value);
    });
}

function sendChatMessage(message) {
    if (message.trim()) {
        handleChatbotMessage(message, 'user');
        document.getElementById('chatbot-input').value = '';
    }
}

function handleOptionClick(option) {
    const chatbotBody = document.querySelector('.chatbot-body');
    chatbotBody.innerHTML += `<div class="user-message">${option} <img src="${userIconUrl}" alt="User" class="user-icon"></div>`;

    setTimeout(() => {
        switch (option) {
            case 'Governance':
                handleGovernanceOptionClick('Governance-council updates');
                break;
            case 'Accelerators':
                handleAcceleratorOptionClick('Accelerator option');
                break;
            case 'Resources':
                handleResourcesOptionClick('Resources option');
                break;
            case 'Data Entry':
                handleDataEntryOptionClick('Data Entry option');
                break;
            case 'Weekly RAG Status':
                downloadReport();
                break;
            default:
                handleGeneralOptionClick(option);
                break;
        }
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 500);
}

function handleGeneralOptionClick(option) {
    const chatbotBody = document.querySelector('.chatbot-body');
    if (option === 'Projects') {
        chatbotBody.innerHTML += `
            <button class="option-button" onclick="handleOptionClick('Overall RAG Status')">Overall RAG Status</button>
            <button class="option-button" onclick="handleOptionClick('Track-wise RAG Status')">Track RAG Status</button>
        `;
    } else if (option === 'Overall RAG Status') {
        chatbotBody.innerHTML += `
            <div class="options">
                <button class="option-button" onclick="handleOptionClick('Weekly RAG Status')">Weekly RAG Status</button>
                <button class="option-button" onclick="handleOptionClick('Monthly RAG Status')">Monthly RAG Status</button>
                <button class="option-button" onclick="handleOptionClick('Quarterly RAG Status')">Quarterly RAG Status</button>
            </div>
        `;
    } else if (option === 'Track-wise RAG Status') {
        chatbotBody.innerHTML += `
            <button class="option-button" onclick="handleOptionClick('Weekly RAG Status')">Weekly Track Status</button>
            <button class="option-button" onclick="handleOptionClick('Monthly Track Status')">Monthly Track Status</button>
            <button class="option-button" onclick="handleOptionClick('Quarterly Track Status')">Quarterly Track Status</button>
        `;
    }
}

async function downloadReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    try {
        const [projectDetailsResponse, projectCountsResponse] = await Promise.all([
            fetch('/api/projects?rag_status=all'),
            fetch('/api/get_project_counts')
        ]);

        const projectDetailsData = await projectDetailsResponse.json();
        const projectCountsData = await projectCountsResponse.json();

        console.log('Project Details Data:', projectDetailsData);
        console.log('Project Counts Data:', projectCountsData);

        addTitleAndCounts(doc, projectCountsData);
        await addBarChart(doc, projectCountsData);
        addProjectDetails(doc, projectDetailsData);

        doc.save('project_report.pdf');
    } catch (error) {
        console.error('Error generating report:', error);
    }
}

function addTitleAndCounts(doc, projectCountsData) {
    doc.setFontSize(16);
    doc.text('Weekly RAG Report for QE Delivery', 105, 10, null, null, 'center');

    doc.setFontSize(14);

    doc.autoTable({
        head: [['Metrics', 'Project#']],
        body: [
            ['Red', projectCountsData.R],
            ['Amber', projectCountsData.A],
            ['Green', projectCountsData.G],
        ],
        startY: 20,
    });

    doc.text('Project Overall Status', 35, doc.lastAutoTable.finalY + 20, null, null, 'center');
}

async function addBarChart(doc, projectCountsData) {
    const chartConfig = {
        type: 'bar',
        data: {
            labels: ['Red', 'Amber', 'Green'],
            datasets: [{
                data: [projectCountsData.R, projectCountsData.A, projectCountsData.G],
                backgroundColor: ['#FF6384', '#FFCE56', '#4BC0C0']
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Number of Projects',
                fontSize: 16,
            }
        }
    };

    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    console.log('Chart URL:', chartUrl);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(chartUrl);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onload = function () {
                const dataUrl = reader.result;
                if (!dataUrl.startsWith('data:image/png')) {
                    reject(new Error('Invalid image URL'));
                } else {
                    doc.addImage(dataUrl, 'PNG', 10, doc.lastAutoTable.finalY + 30, 160, 80);
                    doc.setFontSize(12);
                    doc.text('-The projects which are mentioned in Red need immediate assistance from Practice Delivery Team.', 10, doc.lastAutoTable.finalY + 120);
                    doc.text('-The projects which are mentioned in Amber need action from Operations Team.', 10, doc.lastAutoTable.finalY + 130);

                    resolve();
                }
            };

            reader.onerror = function (error) {
                console.error('Error reading image blob:', error);
                reject(new Error('Failed to read image blob'));
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching chart image:', error);
            reject(new Error('Failed to fetch chart image'));
        }
    });
}

function addProjectDetails(doc, projectDetailsData) {
    const colors = { R: 'Red', A: 'Amber', G: 'Green' };

    ['R', 'A'].forEach(status => {
        const projects = projectDetailsData.projects.filter(project => project.rag_status === status);

        if (projects.length > 0) {
            doc.addPage();
            doc.setFontSize(14);
            doc.text(`Project Details for ${colors[status]} Status`, 10, 10);

            doc.autoTable({
                head: [['Project Name', 'Impediments', 'Resource']],
                body: projects.map(project => [project.project_name, project.impediments, project.resource]),
                startY: 20,
            });
        }
    });
}

function handleChatbotMessage(message, sender) {
    const chatbotBody = document.querySelector('.chatbot-body');

    if (sender === 'user') {
        chatbotBody.innerHTML += `<div class="user-message">${message} <img src="${userIconUrl}" alt="User" class="user-icon"></div>`;
    } else {
        chatbotBody.innerHTML += `<div class="bot-message"><img src="${botIconUrl}" alt="Bot" class="bot-icon"> ${message}</div>`;
    }

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
