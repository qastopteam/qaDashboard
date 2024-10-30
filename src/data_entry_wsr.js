import React, { useEffect } from 'react';

const DataEntryWSR = () => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('zh-CN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date).replaceAll('/', '-');
    const leads = ['-- Select --', 'Jeena', 'Thazhuva', 'Sivanash', 'Jennifer'];
    const rags = ['-- Select --', 'Red', 'Amber', 'Green'];
    const test_types = [
        '-- Select --', 'Web App Testing', 'Data Testing',
        'Performance testing', 'BI Testing'
    ];
    const projects = [
        '-- Select --', 'PEPSICO_PFNA ADD CUT PORTAL',
        'MARS_US_MW_Fetch Dashboard Enhancement_2023',
        'PEPSICO_CTO CV PEPIRIS', 'PEPSICO_CTO CV_LABEL RIGHT',
        'PEPSICO_DATA FOUNDATION_FP&A',
        'T MOBILE_CUSTOMER SALESFORCE DATA PRODUCT',
        'MERCK_SOTATERCEPT_ LAUNCH DASHBOARD', 'PEPSICO_CGF_COMPASS',
        'NATIONWIDE_DATA_CURATION_SERVICE', 'QUANTUM ENERGY PARTNERS-2',
        'PEPSICO_DATA FOUNDATION_FP&A', 'PEPSICO_PFNA IWMS',
        'PROLOGIS_COO KPI Dashboard_Retainer', 'Practise - Bench',
        'PROLOGIS_STARTER PACKS_MNG_RETAINER',
        'POLEN CAPITAL MANAGEMENT_DE AND BI PROGRAM'
    ]

    const employees = [
        {
            "name": "Aarti Kyama",
            "lead": "Thazhuva",
            "project": "PEPSICO_PFNA ADD CUT PORTAL"
        },
        {
            "name": "Abhishek Gupta",
            "lead": "Jeena",
            "project": "MARS_US_MW_Fetch Dashboard Enhancement_2023"
        },
        {
            "name": "Ajit Singh",
            "lead": "Jennifer",
            "project": "Practise - Bench"
        },
        {
            "name": "Akash Gupta",
            "lead": "Thazhuva",
            "project": "PEPSICO_CTO CV PEPIRIS"
        },
        {
            "name": "Akib Basheer",
            "lead": "Thazhuva",
            "project": "PEPSICO_CTO CV_LABEL RIGHT"
        },
        {
            "name": "Amar Namdev Memane",
            "lead": "Thazhuva",
            "project": "PEPSICO_DATA FOUNDATION_FP&A"
        },
        {
            "name": "Aniket Baban Turankar",
            "lead": "Jennifer",
            "project": "T MOBILE_CUSTOMER SALESFORCE DATA PRODUCT"
        },
        {
            "name": "Anitha Paramasivan",
            "lead": "Sivanash",
            "project": "MERCK_SOTATERCEPT_ LAUNCH DASHBOARD"
        },
        {
            "name": "Anupama Vaibhav Shinde",
            "lead": "Thazhuva",
            "project": "PEPSICO_CGF_COMPASS"
        },
        {
            "name": "Arnavi Amol Patil",
            "lead": "Jeena",
            "project": "NATIONWIDE_DATA_CURATION_SERVICE"
        },
        {
            "name": "Arputha Aswin Chandra Sekar",
            "lead": "Sivanash",
            "project": "QUANTUM ENERGY PARTNERS-2"
        },
        {
            "name": "Arul Sekar",
            "lead": "Thazhuva",
            "project": "PEPSICO_DATA FOUNDATION_FP&A"
        },
        {
            "name": "Bhagya Sree Kota",
            "lead": "Thazhuva",
            "project": "PEPSICO_PFNA IWMS"
        },
        {
            "name": "Charan Kumar Thanugonda",
            "lead": "Jeena",
            "project": "PROLOGIS_COO KPI Dashboard_Retainer"
        },
        {
            "name": "Ezhilarasi Rajendran",
            "lead": "Jennifer",
            "project": "Practise - Bench"
        },
        {
            "name": "Jagadeesh Kumar Chippada",
            "lead": "Sivanash",
            "project": "QUANTUM ENERGY PARTNERS-2"
        },
        {
            "name": "Jeena Jacob",
            "lead": "Jeena",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
        {
            "name": "Jeevitha Venkatesan",
            "lead": "Jeena",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
        {
            "name": "Jenifer Baby Celus Arulraj",
            "lead": "Jennifer",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
    ]
    function getPracticeLead() {
        const selectElement =document.getElementById("PracticeLead");
        const lead_name =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        //lead_name = document.getElementById("PracticeLead").value
        document.querySelector('.practice_lead').textContent = lead_name;
        const emps= ['-- Select --'];
        for (let emp of employees){
        if (emp.lead==lead_name){
        emps.push(emp.name);
        }
        }
        document.getElementById("ResourceName").innerHTML=emps.map((employee) => `
                <option  value=${employee}>${employee}</option>
            `,
                        )
                        .join("");
    }
    function getResourceName() {
        let selectElement =document.getElementById("PracticeLead");
        let lead_name =selectElement.options[selectElement.selectedIndex].textContent;
        selectElement =document.getElementById("ResourceName");
        let resource_name =selectElement.options[selectElement.selectedIndex].textContent;
        let projects= ['-- Select --'];
        for (let emp of employees){
        if (emp.lead==lead_name){
            if(emp.name==resource_name){
                projects.push(emp.project);
            }
        }
        }
        console.log(projects);
        document.querySelector('.resource_name').textContent = resource_name;
        document.getElementById("ProjectName").innerHTML=projects.map((project) => `
            <option  value=${project}>${project}</option>
        `,
                    )
                    .join("");
    }
    function getProjectName() {
        let selectElement =document.getElementById("ProjectName");
        let output =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        document.querySelector('.project_name').textContent = output;
    }
    function getRAGStatus() {
        let output = document.getElementById("RAGStatus").value
        //document.querySelector('.rag_status').textContent = output;
        document.getElementById('rag_alert').textContent = "";
    }
    function getTestingType() {
        let output = document.getElementById("TestingType").value
        //document.querySelector('.testing_type').textContent = output;
        document.getElementById('test_type_alert').textContent = "";
    }
    function getWeeklyDeliverable() {
        let output = document.getElementById("WeeklyDeliverable").value
        //document.querySelector('.testing_type').textContent = output;
        console.log("OPT",output);
        if(output==""){
        document.getElementById('weekly_deliverables_alert').textContent = "*Please Enter Weekly Deliverables";
        }
        else{
        document.getElementById('weekly_deliverables_alert').textContent = "";
        }
    }
    function getChooseTracker() {
        let Tracker ="Weekly RAG Status"
        //output = document.getElementById("ChooseTracker").value
        //document.querySelector('.choose_tracker').textContent = output;
        //Tracker = document.getElementById("ChooseTracker").value
        
         
    }
    function AlertFunc() {
        document.getElementById('alert').textContent = "Please Fill the Mandatory Fields(*)";
        setTimeout(function () {
            document.getElementById('alert').textContent = "";
        }, 5000);
        //$('#GFG').text("Div hides after 1 second.");
    }
    function PopupFunction(Tracker) {
      var popup = document.getElementById("myPopup");
      popup.textContent = `${Tracker} Form Submitted Successfully`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    function sendInput() {
        let Tracker ="Weekly RAG Status"
        let selectElement =document.getElementById("PracticeLead");
        let practice_lead =selectElement.options[selectElement.selectedIndex].textContent;
        selectElement =document.getElementById("ResourceName");
        let resource_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("ProjectName");
        let project_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("RAGStatus");
        let rags =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("TestingType");
        let test_type =selectElement.options[selectElement.selectedIndex].textContent;
        let weekly_deliverable = document.getElementById("WeeklyDeliverable").value;
        let flag=true;
         console.log("Result",rags,"Result1",test_type);
         if(practice_lead=="-- Select --"){
          flag=false;
         }
         if(resource_name=="-- Select --"){
          flag=false;
         }
         if(project_name=="-- Select --"){
          flag=false;
         }
         if(rags=="-- Select --"){
          flag=false;
          document.getElementById('rag_alert').textContent = "*Please Select RAG Status";
         }
         if(test_type=="-- Select --"){
          flag=false;
          document.getElementById('test_type_alert').textContent = "*Please Select Testing Type";
         }
         if(weekly_deliverable==""){
          flag=false;
          document.getElementById('weekly_deliverables_alert').textContent = "*Please Enter Weekly Deliverables";
         }
         if(flag){
          /*let  sub_tasks = document.getElementById("SubTasks").value
          let impediments = document.getElementById("Impediments").value
          let action_items = document.getElementById("ActionItems").value
          let comments = document.getElementById("Comments").value
          let start_date = document.getElementById("StartDate").value
          let end_date = document.getElementById("EndDate").value
          fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.stringify({
          "Practice_Lead":practice_lead,
          "Resource_Name":resource_name,
          "Project_Name":project_name,
          "RAG_Status": rags,
          "Test_Type": test_type,
          "Weekly_Deliverable": weekly_deliverable,
          "Sub_Tasks":sub_tasks,
          "Impediments":impediments,
          "Action_Items":action_items,
          "Comments":comments,
          "Start_Date":start_date,
          "End_Date":end_date
          }),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));*/

          PopupFunction(Tracker);
               getChooseTracker();
         }
         else{
         AlertFunc();
         }
        
    }

    useEffect(() => {
        getChooseTracker();
      },[]);

    return(
    <>
    <div id="page_header">
        <h1>DataEntry-WSR</h1>
    </div>
    <div id="part1" style={{width: '48%', float: 'left', display: 'inline'}}>
    <div>
        <div>
            <h5>Input Form</h5>
        </div>
        <div id="AppliedFilters">
        <table>
            <tbody>
                <tr><td id="col_label">Practice Lead<span>*</span><td>:</td></td><td class="practice_lead"><span id="mand_fields">-- Select --</span></td></tr>
                <tr><td id="col_label">Resource Name<span>*</span><td>:</td></td><td class="resource_name"><span id="mand_fields">-- Select --</span></td></tr>
                <tr><td id="col_label">Project Name<span>*</span><td>:</td></td><td class="project_name"><span id="mand_fields">-- Select --</span></td></tr>
            </tbody>
          </table>
        </div>
    </div>
    <div>
        <div id="EntryForm">
        <table>
        <tbody>
        <tr>
            <td id="col_label">RAG Status<span>*</span><td>:</td></td>
            <td>
                <select class="select_Dropdown_Input" onChange={getRAGStatus} name="RAGStatus" id="RAGStatus">
                {rags.map((rag, index) => (
                    <option key={index} value={rag}>
                      {rag}
                    </option>
                  ))}
                </select>
            </td>
        </tr>
        <tr><td id="rag_alert"></td></tr>
        <tr>
            <td id="col_label">Testing Type<span>*</span><td>:</td></td>
            <td>
                <select class="select_Dropdown_Input" onChange={getTestingType} name="TestingType" id="TestingType">
                {test_types.map((test_type, index) => (
                    <option key={index} value={test_type}>
                      {test_type}
                    </option>
                  ))}
                </select>
            </td>
        </tr>
        <tr><td id="test_type_alert"></td></tr>
        <tr>
            <td id="col_label">Weekly Deliverable<span>*</span><td>:</td></td>
            <td><textarea class="text_Input" id="WeeklyDeliverable" onChange={getWeeklyDeliverable} placeholder="Enter Weekly Deliverable"></textarea></td>
        </tr>
        <tr><td id="weekly_deliverables_alert"></td></tr>
        <tr>
            <td id="col_label">Sub-Tasks<td>:</td></td>
            <td><textarea class="text_Input" id="SubTasks" placeholder="Enter Sub Tasks"></textarea></td>
        </tr>
        <tr>
            <td id="col_label">Impediments<td>:</td></td>
            <td><textarea class="text_Input" id="Impediments" placeholder="Enter Impediments"></textarea></td>
        </tr>
        <tr>
            <td id="col_label">Action-items<td>:</td></td>
            <td><textarea class="text_Input" id="ActionItems" placeholder="Enter Action Items"></textarea></td>
        </tr>
        <tr>
            <td id="col_label">Comments<td>:</td></td>
            <td><textarea class="text_Input" id="Comments" placeholder="Enter Comments"></textarea></td>
        </tr>
        <tr>
            <td id="col_label">Upcoming Leaves<td>:</td></td>
            <td><input class="text_Input" type="date" id="StartDate" name="From Date" placeholder="From Date" min="2015-01-01" max="2030-12-31" /> to <input class="text_Input" type="date" id="EndDate" name="To Date"  placeholder="From Date" min="2015-01-01" max="2030-12-31" /></td>
        </tr>
        </tbody>
    </table>
        </div>
        <button class="default_Button" id="Submit_Button" onClick={sendInput}>
            Submit
        </button>
        <label id="alert"></label>
    </div>
</div>
<div id="part2" style={{width: '48%', float: 'left', display: 'inline'}}>
    <div>
        <div>
            <h5>Apply Filters</h5>
        </div>
        <div id="ApplyFilters">
        <table>
          <tbody>
          <tr>
              <td id="col_label">Practice Lead<td>:</td></td>
              <td>
                    <select class="select_Dropdown_Input" onChange={getPracticeLead} name="PracticeLead" id="PracticeLead">
                      {leads.map((lead, index) => (
            <option key={index} value={lead}>
              {lead}
            </option>
          ))}
                    </select>
              </td>
          </tr>
          <tr>
              <td id="col_label">Resource Name<td>:</td></td>
              <td>
                  <select class="select_Dropdown_Input" onChange={getResourceName} name="ResourceName" id="ResourceName">
                      <option  value="-- Select --">-- Select --</option>
                  </select>
              </td>
          </tr>
          <tr>
              <td id="col_label">Project Name<td>:</td></td>
              <td>
                  <select class="select_Dropdown_Input" onChange={getProjectName} name="ProjectName" id="ProjectName">
                  {projects.map((project, index) => (
                    <option key={index} value={project}>
                      {project}
                    </option>
                  ))}
                  </select>
              </td>
          </tr>
          </tbody>
      </table>
        </div>
    </div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
</div>
    </>
    );
};

export default DataEntryWSR;