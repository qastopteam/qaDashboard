import React, { useEffect } from 'react';

const DESkillTracker = () => {
    const expertice_levels = [
        '--Select--', 'None', 'Interested', 'Beginner', 'Intermediate/Advanced'
    ]
    const emp_ids = [
        '-- Select --', '4733', '3840', '3295', '3171', '4859', '2640', '4701',
        '4850', '5228', '5190', '4936', '4854', '4909', '2699', '5082', '4775',
        '4393', '4862', '5189'
    ]
    const skills = [
        '-- Select --', 'Web Testing', 'Data Testing', 'Performance Testing',
        'Power BI', 'Other'
    ]
    const up_skillings = ['-- Select --', 'Yes', 'No']

    function getDynamicFilter3() {
        let output = document.getElementById("DynamicFilter3").value
        document.querySelector('.dynamic_filter_3').textContent = output;
    }
    function getDynamicFilter4() {
        let selectElement =document.getElementById("DynamicFilter4");
        let skill =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        if(skill=="Other"){
        document.getElementById("skl").innerHTML =`<input onchange="getDynamicFilter4()" type="text" id="DynamicFilter4" name="DynamicFilter4"  placeholder="Enter Skill">`;
        }
/*            else{
        tbl=`<select onchange="getDynamicFilter4()" name="DynamicFilter4" id="DynamicFilter4">
                    {% for skill in skills %}
                    <option  value={{skill}}>{{skill}}</option>
                    {% endfor %}
                  </select>`;
        document.getElementById("skl").innerHTML =tbl;
        }*/
        document.querySelector('.dynamic_filter_4').textContent = skill;
    }
    function getExpertiseLevel() {
        let output = document.getElementById("ExpertiseLevel").value
        //document.querySelector('.expertise_level').textContent = output;
        document.getElementById('expertise_level_alert').textContent = "";
    }
    function getIntUpSkill() {
        let output = document.getElementById("IntUpSkill").value
        //document.querySelector('.int_up_skill').textContent = output;
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
        let Tracker ="Skill Tracker"
         let selectElement =document.getElementById("DynamicFilter3");
         let emp_id =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("DynamicFilter4");
         let skill =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("ExpertiseLevel");
         let expertise_level =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("IntUpSkill");
         let int_up_skill =selectElement.options[selectElement.selectedIndex].textContent;
         let flag=true;
         if(emp_id=="-- Select --"){
          flag=false;
         }
         if(skill=="-- Select --"){
          flag=false;
         }
         if(expertise_level=="-- Select --"){
          flag=false;
          document.getElementById('expertise_level_alert').textContent = "*Please Select Expertise Level";
         }
         if(flag){
          /*fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.stringify({
          "Employee_ID":emp_id,
          "Skill":skill,
          "Expertise_Level":expertise_level,
          "Interest_for_Up_Skill": int_up_skill
          }),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));*/

          PopupFunction(Tracker);
             //selectElement.value=Tracker;
              // getChooseTracker();
         }
         else{
         AlertFunc();
         }
    }



    return(
        <>
        <div id="page_header">
            <h1>DataEntry</h1>
        </div>
        <div id="part1" style={{width: '48%', float: 'left', display: 'inline'}}>
    <div>
        <div>
            <h5>Input Form</h5>
        </div>
        <div id="AppliedFilters">
        <table>
            <tbody>
                <tr><td id="col_label">Employee ID<span>*</span><td>:</td></td><td class="dynamic_filter_3"><span id="mand_fields">-- Select --</span></td></tr>
                <tr><td id="col_label">Skills<span>*</span><td>:</td></td><td class="dynamic_filter_4"><span id="mand_fields">-- Select --</span></td></tr>
            </tbody>
          </table>
        </div>
    </div>
    <div>
        <div id="EntryForm">
        <table>
        <tbody>
        <tr>
            <td id="col_label">Expertise Level<span>*</span><td>:</td></td>
            <td>
                <select class="select_Dropdown_Input" onChange={getExpertiseLevel} name="ExpertiseLevel" id="ExpertiseLevel">
                {expertice_levels.map((expertice_level, index) => (
                    <option key={index} value={expertice_level}>
                      {expertice_level}
                    </option>
                  ))}
                </select>
            </td>
        </tr>
        <tr><td id="expertise_level_alert"></td></tr>
        <tr>
            <td id="col_label">Interest for Up-Skilling<td>:</td></td>
            <td>
                <select class="select_Dropdown_Input" onChange={getIntUpSkill} name="IntUpSkill" id="IntUpSkill">
                {up_skillings.map((up_skilling, index) => (
                    <option key={index} value={up_skilling}>
                      {up_skilling}
                    </option>
                  ))}
                </select>
            </td>
        </tr>
        <tr><td></td></tr>
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
              <td id="col_label">Employee ID<td>:</td></td>
              <td>
                  <select class="select_Dropdown_Input" onChange={getDynamicFilter3} name="DynamicFilter3" id="DynamicFilter3">
                {emp_ids.map((emp_id, index) => (
                    <option key={index} value={emp_id}>
                      {emp_id}
                    </option>
                  ))}
                  </select>
              </td>
          </tr>
           <tr>
              <td id="col_label">Skills<td>:</td></td>
              <td id="skl">
                  <select class="select_Dropdown_Input" onChange={getDynamicFilter4} name="DynamicFilter4" id="DynamicFilter4">
                    {skills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
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

export default DESkillTracker;