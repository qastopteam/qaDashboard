import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Overview from './Overview';
import About_Us from './about_us';
import Accelerator from './accelerator';
import Resources from './resources';
import DataEntry from './data_entry';
import DataEntryWSR from './data_entry_wsr';
import DESkillTracker from './deSkillTracker';
import DEActionItems from './deActionItems';
import DELeaveTracker from './deLeaveTracker';
import Reporting from './reporting';
import RAGStatus from './rag_status';
import InterviewPanelists from './interview_panelists';
import Governance from './governance';


const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const App = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [currentTab, setCurrentTab] = useState("Overview");


  function ToggleButton() {
    const toggleBtn1 = document.getElementById("sidebar");
    toggleBtn1.classList.toggle("sidebar-collapsed");
    toggleBtn1.classList.toggle("sidebar-expanded");
    const toggleBtn2= document.getElementById("main_content");
    toggleBtn2.classList.toggle("main_content-collapsed");
    toggleBtn2.classList.toggle("main_content-expanded");
  }
  function loadChatbot() {
    const chatbot = document.getElementById("chatbot");

        chatbot.classList.toggle("hidden");
    
  }
  function ColorTPName() {
    let responseData={};
    responseData.Current_Page=currentPage;
    responseData.Current_Tab=currentTab;
    const items = document.querySelectorAll('#Highlight_Tab');
    items.forEach(item => {
        item.classList.remove('highlight');
        if(item.innerText == responseData.Current_Tab){
            item.classList.add('highlight');
        }
    });
    const pages = document.querySelectorAll('#Highlight');
    pages.forEach(page => {
        page.classList.remove('highlight');
        if(responseData.Current_Page!=""){
        if(page.innerText == responseData.Current_Page){
            page.classList.add('highlight');
        }}
    });
  }

  useEffect(() => {
    ColorTPName()
  },[currentPage]);

  return (
      <BrowserRouter>
                <div id="dashboard_header">
            <div class="sidebar-header text-white text-center">
                <button id="toggleSidebar" onClick={ToggleButton} class="toggle-btn">
                    <i class="fas fa-bars"></i>
                </button>
                     
            </div>
        </div>
        <div class="flex">
            <nav
                id="sidebar"
                class="bg-gray-700 sidebar-expanded min-h-screen p-1 transition-all relative"
            >
                <ul class="list-none m-0 p-0 flex flex-col ">

                    <div class="sidebar_section">
                    <div class="sidebar_section_main_header" id="Highlight_Tab">
                    <li class="sidebar-item sidebar-main-item" style={{width:'80px',height:'90px'}} onClick={()=>{setCurrentTab("Overview");setCurrentPage("");ColorTPName();}}>
                        <Link to="/home" id="page-link">Overview</Link>
                    </li>
                    </div>
                    <div  class="sidebar_section_sub_header">
                    <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Overview");setCurrentPage("About Us");ColorTPName();}}>
                        <Link to="/about"
                            id="page-link"
                        >
                            <i class="fas fa-envelope"></i
                            ><span>About Us</span>
                        </Link>
                    </li>
                    <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Overview");setCurrentPage("Accelerators");ColorTPName();}}>
                        <Link to="/accelerators"
                            id="page-link"
                        >
                            <i class="fas fa-rocket"></i
                            ><span>Accelerators</span>
                        </Link>
                    </li>
                    </div>
                    </div>
                    <div class="sidebar_section">
                    <div class="sidebar_section_main_header" id="Highlight_Tab">
                    <li class="sidebar-item sidebar-main-item" style={{width:'95px',height:'105px'}} onClick={()=>{setCurrentTab("Governance");setCurrentPage("");ColorTPName();}}>
                        
                        <Link to="/governance"
                            id="page-link"
                        >
                            <span>Governance</span>
                        </Link>
                    </li>
                    </div>
                        <div  class="sidebar_section_sub_header">
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Governance");setCurrentPage("Projects");ColorTPName();}}>
                            <Link to="/projects"
                                id="page-link"
                            >
                                <i class="fas fa-project-diagram"></i
                                ><span>Projects</span>
                            </Link>
                        </li>
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Governance");setCurrentPage("Resources");ColorTPName();}}>
                            <Link to="/resources"
                                id="page-link"
                            >
                                <i class="fas fa-book"></i
                                ><span>Resources</span>
                            </Link>
                        </li>
                        </div>
                    </div>
                        <div class="sidebar_section">
                        <div class="sidebar_section_main_header" id="Highlight_Tab">
                        <li class="sidebar-item sidebar-main-item" style={{width:'18px',height:'28px'}} onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("");ColorTPName();}}>
                            <Link to="/data_entry"
                                id="page-link"
                            >
                                <span>Data_Entry</span>
                            </Link>
                        </li>
                        </div>
                            <div  class="sidebar_section_sub_header">
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("WSR");ColorTPName();}}>
                                    <Link to="/data_entry_wsr"
                                        id="page-link"
                                    >
                                        <i class="fas fa-envelope"></i
                                        ><span>WSR</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Skill Tracker");ColorTPName();}}>
                                    <Link to="/data_entry_st"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i
                                        ><span>Skill Tracker</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Action Items");ColorTPName();}}>
                                    <Link to="/data_entry_ai"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i
                                        ><span>Action Items</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Leave Tracker");ColorTPName();}}>
                                    <Link to="/data_entry_lt"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i
                                        ><span>Leave Tracker</span>
                                    </Link>
                                </li>
                                </div>
                        </div>
                        <div class="sidebar_section">
                        <div class="sidebar_section_main_header" id="Highlight_Tab">
                        <li class="sidebar-item sidebar-main-item" style={{width:'85px',height:'95px'}} onClick={()=>{setCurrentTab("Reporting");setCurrentPage("");ColorTPName();}}>
                            <Link to="/reporting"
                                id="page-link"
                            >
                                <span>Reporting</span>
                            </Link>
                        </li>
                        </div>
                        <div class="sidebar_section_sub_header">
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Reporting");setCurrentPage("RAG Status");ColorTPName();}}>
                            <Link to="/rag_status"
                                id="page-link"
                            >
                                <i class="fas fa-database"></i
                                ><span>RAG Status</span>
                            </Link>
                        </li>
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Reporting");setCurrentPage("Interview_Panelists");ColorTPName();}}>
                            <Link to="/interview_panelists"
                                id="page-link"
                            >
                                <i class="fas fa-database"></i
                                ><span>Interview_Panelists</span>
                            </Link>
                        </li>
                        </div>
                        </div>
                    <br />
                    <li class="separator"></li>
                    <li class="sidebar-item user-section">
                        <i class="fas fa-user text-black"></i
                        ><span class="text-black">@Qstopteam</span>
                    </li>
                </ul>
            </nav>
            <div id="main_content" class="content main_content-expanded flex-1 p-4">
            <Routes>
             <Route path="/home" element={<Overview/>} />
             <Route path="/about" element={<About_Us/>} />
             <Route path="/accelerators" element={<Accelerator/>} />
             <Route path="/resources" element={<Resources/>} />
             <Route path="/data_entry" element={<DataEntry/>} />
             <Route path="/data_entry_wsr" element={<DataEntryWSR/>} />
             <Route path="/data_entry_st" element={<DESkillTracker/>} />
             <Route path="/data_entry_ai" element={<DEActionItems/>} />
             <Route path="/data_entry_lt" element={<DELeaveTracker/>} />
             <Route path="/reporting" element={<Reporting/>} />
             <Route path="/rag_status" element={<RAGStatus/>} />
             <Route path="/interview_panelists" element={<InterviewPanelists/>} />
             <Route path="/governance" element={<Governance/>} />
            </Routes>
            </div>
          </div>
          <div id="chatbot-icon" onClick={loadChatbot} class="chatbot-icon">💬</div>
            <div id="chatbot" class="chatbot-container hidden">
                <div class="chatbot-header">
                    <span>Chat with us!</span>
                    <button id="close-chatbot" onClick={loadChatbot} class="close-button">x</button>
                </div>
                <div class="chatbot-body">
                    <div class="bot-message">
                        <img
                            src="{{ url_for('static', filename='images/bot-icon.png') }}"
                            alt="Bot"
                            class="bot-icon"
                        />Hi, How can I help you?
                    </div>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Governance')"
                    >
                        Governance
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Projects')"
                    >
                        Projects
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Resources')"
                    >
                        Resources
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Accelerators')"
                    >
                        Accelerators
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Data Entry')"
                    >
                        Data Entry
                    </button>
                </div>
                <div class="chatbot-input-container">
                    <input
                        type="text"
                        id="chatbot-input"
                        class="chatbot-input"
                        placeholder="Type your message..."
                    />
                    <button id="send-message" class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </BrowserRouter>
        );
   };

  export default App;
