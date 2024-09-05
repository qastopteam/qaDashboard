function handleGovernanceOptionClick(option) {
  const chatbotBody = document.querySelector('.chatbot-body');

  if (option === 'Governance-council updates') {
      chatbotBody.innerHTML += `
          <div class="options">
               <button class="option-button" onclick="fetchProjectsByStatus('R')">Number of Projects in Red</button>
               <button class="option-button" onclick="fetchProjectsByStatus('G')">Number of Projects in Green</button>
               <button class="option-button" onclick="fetchProjectsByStatus('A')">Number of Projects in Amber</button>
          </div>
      `;
  }
}

function fetchProjectsByStatus(status) {
  fetch(`/api/get_project_counts?rag_status=${status}`)
      .then(response => response.json())
      .then(data => {
          const chatbotBody = document.querySelector('.chatbot-body');
          let message = `<div class="bot-message"><div class="message-content"><img src="${botIconUrl}" alt="Bot" class="bot-icon">Projects in ${status}: `;
          if (Object.keys(data).length > 0) {
              for (const [key, value] of Object.entries(data)) {
                  message += `<div>${key}: ${value}</div>`;
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
