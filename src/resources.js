import React, {useState, useEffect } from 'react';

const Resources = () => {
    const employees = [
        {
            name: "Aarti Kyama",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Beginner",
            baseLocation: "Chennai",
        },
        {
            name: "Abhishek Gupta",
            webTesting: "None",
            dataTesting: "None",
            performanceTesting: "Intermediate/Advanced",
            baseLocation: "Hyderabad",
        },
        {
            name: "Ajit Singh",
            webTesting: "None",
            dataTesting: "None",
            performanceTesting: "None",
            baseLocation: "Bengaluru",
        },
        {
            name: "Akash Gupta",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Beginner",
            performanceTesting: "Beginner",
            baseLocation: "Chennai",
        },
        {
            name: "Akib Basheer",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Beginner",
            performanceTesting: "Interested",
            baseLocation: "Hyderabad",
        },
        {
            name: "Amar Namdev Memane",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Intermediate/Advanced",
            baseLocation: "Bengaluru",
        },
        {
            name: "Aniket Baban Turankar",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Chennai",
        },
        {
            name: "Anitha Paramasivan",
            webTesting: "Beginner",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Interested",
            baseLocation: "Hyderabad",
        },
        {
            name: "Anupama Vaibhav Shinde",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Beginner",
            baseLocation: "Bengaluru",
        },
        {
            name: "Arnavi Amol Patil",
            webTesting: "Interested",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Interested",
            baseLocation: "Chennai",
        },
        {
            name: "Arputha Aswin Chandra Sekar",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Hyderabad",
        },
        {
            name: "Arul Sekar",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Bengaluru",
        },
        {
            name: "Bhagya Sree Kota",
            webTesting: "Beginner",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Chennai",
        },
        {
            name: "Charan Kumar Thanugonda",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "Intermediate/Advanced",
            baseLocation: "Hyderabad",
        },
        {
            name: "Dinakara Pandian Palanisamy",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Bengaluru",
        },
        {
            name: "Ezhilarasi Rajendran",
            webTesting: "Intermediate/Advanced",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Chennai",
        },
        {
            name: "Jagadeesh Kumar Chippada",
            webTesting: "None",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Hyderabad",
        },
        {
            name: "Jeena Jacob",
            webTesting: "Intermediate/Advanced",
            dataTesting: "None",
            performanceTesting: "None",
            baseLocation: "Bengaluru",
        },
        {
            name: "Jeevitha Venkatesan",
            webTesting: "Intermediate/Advanced",
            dataTesting: "None",
            performanceTesting: "Intermediate/Advanced",
            baseLocation: "Chennai",
        },
        {
            name: "Jenifer Baby CelusArulraj",
            webTesting: "None",
            dataTesting: "Intermediate/Advanced",
            performanceTesting: "None",
            baseLocation: "Hyderabad",
        },
    ];

    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredEmployees = employees;

    function enableExpertiseDropdown() {
        const expertiseSelect = document.getElementById("expertise");
        const skillSelect = document.getElementById("skill");
        console.log("SkillSet",skillSelect)
        expertiseSelect.disabled = skillSelect.value === "all";
    }

    function showWarning(warningId, show) {
        document.getElementById(warningId).style.display = show
            ? "block"
            : "none";
    }

    function filterEmployees() {
        const skillSelect = document.getElementById("skill");
        const expertiseSelect = document.getElementById("expertise");
        const baseLocationSelect = document.getElementById("baseLocation");
        const skill = skillSelect.value;
        const expertise = expertiseSelect.value;
        const baseLocation = baseLocationSelect.value;

        filteredEmployees = employees.filter((employee) => {
            const skillMatch =
                skill === "all" || employee[skill] !== "undefined";
            const expertiseMatch =
                expertise === "all" || employee[skill] === expertise;
            const locationMatch =
                baseLocation === "all" ||
                employee.baseLocation === baseLocation;
            return skillMatch && expertiseMatch && locationMatch;
        });

        currentPage = 1;
        renderTable();
        renderPagination();
    }

    function renderTable() {
        const skillSelect = document.getElementById("skill");
        const expertiseSelect = document.getElementById("expertise");
        const pagination = document.getElementById("pagination");
        const employeeList = document
        .getElementById("employeeList")
        .querySelector("tbody")
        employeeList.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageEmployees = filteredEmployees.slice(start, end);

        if (pageEmployees.length === 0) {
            employeeList.innerHTML =
                '<tr id="noData"><td colspan="4">No data available for the selected filter combination</td></tr>';
            pagination.style.display = "none";
        } else {
            pageEmployees.forEach((employee) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${employee.name}</td><td>${skillSelect.value === "all" ? "Multiple" : skillSelect.options[skillSelect.selectedIndex].text}</td><td>${expertiseSelect.value === "all" ? "Multiple" : employee[skillSelect.value]}</td><td>${employee.baseLocation}</td>`;
                employeeList.appendChild(tr);
            });
            pagination.style.display = "flex";
        }
    }

    function renderPagination() {
        const pageNumbers = document.getElementById("pageNumbers");
        const prevPageBtn = document.getElementById("prevPage");
        const nextPageBtn = document.getElementById("nextPage");
        pageNumbers.innerHTML = "";
        const totalPages = Math.ceil(
            filteredEmployees.length / itemsPerPage,
        );

        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement("span");
            span.innerText = i;
            span.className = i === currentPage ? "current" : "";
            span.addEventListener("click", () => {
                currentPage = i;
                renderTable();
                renderPagination();
            });
            pageNumbers.appendChild(span);
        }

        prevPageBtn.classList.toggle("disabled", currentPage === 1);
        nextPageBtn.classList.toggle(
            "disabled",
            currentPage === totalPages,
        );
    }

    useEffect(() => {
        enableExpertiseDropdown();
        renderTable();
        renderPagination();
      },[]);

    return(
     <>
     <div id="page_header">
     <h1>Resources</h1>
     </div>

      <div class="flex flex-col gap-4 p-2">
       <div class="flex gap-4">
        <div id="sub_page_box" class="section_1 w-3/4 overflow-y-auto">
            <div id="sub_page_headers">
                <h3>Resource Training & Development</h3>
            </div>
            <div class="p-2">
                The Quality Engineering resources are constantly trained in the
                latest trends and technologies for delivering best-in-class
                testing services across client projects.
                <ul>
                    <li>
                        1. The practice is highly oriented towards training
                        testers from basic to full stack.
                    </li>
                    <li>
                        2. Interested individuals are given priority in
                        skill-based training as per project demands.
                    </li>
                </ul>
            </div>
        </div>

        <div id="sub_page_box" class="section_2 w-1/4 overflow-y-auto">
            <div id="sub_page_headers">
                <h3>Training Updates</h3>
            </div>
            <div class="p-2">
                <p>
                    Upcoming Trainings on Tosca starting Batch 1 from Apr 2024
                </p>
            </div>
        </div>
     </div>

     <section class="section" id="dropdown">
        <div class="filters-legend">
            <div class="filters">
                <label for="skill" class="required">Skill</label>
                <select id="skill" class="p-2 border border-gray-300 rounded" 
                    onChange={() => {
                        const skillSelect = document.getElementById("skill");
                        const expertiseSelect = document.getElementById("expertise");
                    enableExpertiseDropdown();
                    showWarning(
                        "skillWarning",
                        skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                    showWarning(
                        "expertiseWarning",
                        skillSelect.value === "all" && expertiseSelect.value !== "all",
                    );
                    filterEmployees();
                    }}
                >
                    <option value="all" selected>All</option>
                    <option value="webTesting">Web Testing</option>
                    <option value="dataTesting">Data/ETL Testing</option>
                    <option value="performanceTesting">
                        Performance Testing
                    </option>
                </select>
                <span id="skillWarning" class="warning" style={{display: 'none'}}
                    >Please select a skill.</span
                >
            </div>
            <div class="filters">
                <label for="expertise" class="required">Expertise</label>
                <select
                    id="expertise"
                    class="p-2 border border-gray-300 rounded"
                    disabled
                    onChange={() => {
                        const skillSelect = document.getElementById("skill");
                        const expertiseSelect = document.getElementById("expertise");
                        showWarning(
                            "skillWarning",
                            skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                        showWarning(
                            "expertiseWarning",
                            skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                        filterEmployees();
                    }}
                >
                    <option value="all" selected>All</option>
                    <option value="None">None</option>
                    <option value="Interested">Interested</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate/Advanced">
                        Intermediate/Advanced
                    </option>
                </select>
                <span
                    id="expertiseWarning"
                    class="warning"
                    style={{display: 'none'}}
                    >Please select a skill first.</span
                >
            </div>
            <div class="filters">
                <label for="baseLocation" class="required">Base Location</label>
                <select
                    id="baseLocation"
                    class="p-2 border border-gray-300 rounded"
                    onChange={filterEmployees}
                >
                    <option value="all" selected>All</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                </select>
            </div>=
            <button
                id="resetBtn"
                class="p-2 border border-gray-300 rounded bg-gray-800"
                onClick={() => {
                    const resetBtn = document.getElementById("resetBtn");
                    const skillSelect = document.getElementById("skill");
                    const expertiseSelect = document.getElementById("expertise");
                    const baseLocationSelect = document.getElementById("baseLocation");
                    skillSelect.value = "all";
                    expertiseSelect.value = "all";
                    baseLocationSelect.value = "all";
            
                    enableExpertiseDropdown();
                    filterEmployees();
                }}
            >
                Reset Filters
            </button>
        </div>
        <table id="employeeList">
            <thead>
                <tr>
                    <th>Resources</th>
                    <th>Skill</th>
                    <th>Expertise Level</th>
                    <th>Base Location</th>
                </tr>
            </thead>
            <tbody>
                <tr id="noData">
                    <td colspan="4">
                        No data available for the selected filter combination
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination" id="pagination">
            <button 
                id="prevPage" 
                class="disabled" 
                onClick={() => {
                if (currentPage > 1) {
                currentPage--;
                renderTable();
                renderPagination();
                }
                }}
            >Prev</button>
            <span id="pageNumbers"></span>
            <button 
                id="nextPage" 
                class="disabled" 
                onClick={() => {
                    const totalPages = Math.ceil(
                        filteredEmployees.length / itemsPerPage,
                    );
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderTable();
                        renderPagination();
                    }
                }}
            >Next</button>
        </div>
     </section>
     </div>
     </>
    );
};

export default Resources;