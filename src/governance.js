import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Governance = () => {
    const [res, setres] = useState(<h4>
        Choose the client to list the Projects
    </h4>);
const [sdata, setsdata] = useState();
const [sopt, setsopt] = useState();


    var projectsData = {
        labels: [
            "Accuray",
            "Arch Capital",
            "Carrier",
            "Mars",
            "Mcdonalds",
            "Merck",
            "Nationwide",
            "Northen Trust",
            "Pepsico",
            "Polen",
            "Practice - Bench",
            "Prologis",
            "Ptp",
            "QEP",
            "T-Mobile",
            "Tata Steel",
        ],
        datasets: [
            {
                label: "Number of Resources",
                data: [
                    1, 1, 2, 5, 3, 4, 3, 1, 22, 2, 8, 5, 1, 2, 5, 2,
                ], // Number of resources for each project
                backgroundColor: [
                    "rgba(0, 102, 0, 0.7)", // Red
                    "rgba(76, 156, 0, 0.7)", // Blue
                    "rgba(0, 153, 76, 0.7)", // Yellow
                    "rgba(102, 204, 0, 0.7)", // Green
                    "rgba(0, 204, 0, 0.7)",
                    "rgba(0, 204, 102, 0.7)",
                    "rgba(128, 255, 0, 0.7)",
                    "rgba(0, 255, 0, 0.7)",
                    "rgba(0, 255, 128, 0.7)", // Red
                    "rgba(153, 255, 51, 0.7)", // Blue
                    "rgba(178, 255, 102, 0.7)", // Yellow
                    "rgba(204, 255, 153, 0.7)", // Green
                    "rgba(153, 255, 153, 0.7)",
                    "rgba(153, 255, 204, 0.7)",
                    "rgba(229, 255, 204, 0.7)",
                    "rgba(204, 255, 204, 0.7)", // Purple
                ],
                borderColor: [
                    "rgba(0, 102, 0, 1)", // Red
                    "rgba(76, 156, 0, 1)", // Blue
                    "rgba(0, 153, 76, 1)", // Yellow
                    "rgba(102, 204, 0, 1)", // Green
                    "rgba(0, 204, 0, 1)",
                    "rgba(0, 204, 102, 1)",
                    "rgba(128, 255, 0, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(0, 255, 128, 1)", // Red
                    "rgba(153, 255, 51, 1)", // Blue
                    "rgba(178, 255, 102, 1)", // Yellow
                    "rgba(204, 255, 153, 1)", // Green
                    "rgba(153, 255, 153, 1)",
                    "rgba(153, 255, 204, 1)",
                    "rgba(229, 255, 204, 1)",
                    "rgba(204, 255, 204, 1)", // Purple
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    var chartOptions = {
        indexAxis: "y",
        plugins: {
            legend: {
                display: false, // Hide legend for simplicity
            },
            title: {
                display: true,
                text: "RESOURCE SPREAD", // Chart title
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Start x-axis at zero
            },
        },
    };


const projectData = {
    Q1: {
        months: ["January", "February", "March"],
        data: [{ project: "Mars", values: ["", "", 5] }],
    },
    Q2: {
        months: ["April", "May", "June"],
        data: [
            { project: "Nation Wide", values: ["", 3, ""] },
            { project: "Pepsico", values: ["", 22, ""] },
            { project: "Accuray", values: ["", "", 1] },
            { project: "Arch Capital", values: ["", "", 1] },
            { project: "Carrier", values: ["", "", 2] },
            { project: "MC Donalds", values: ["", "", 3] },
            { project: "Mercks", values: ["", "", 4] },
            { project: "Northern Trust", values: ["", "", 1] },
            { project: "Polen", values: ["", "", 2] },
            { project: "PTP", values: ["", "", 1] },
            {
                project: "Quantam energy Partners",
                values: ["", "", 2],
            },
            { project: "TATA Steels", values: ["", "", 2] },
            { project: "T-Mobile", values: ["", "", 5] },
        ],
    },
    Q3: {
        months: ["July", "August", "September"],
        data: [],
    },
    Q4: {
        months: ["October", "November", "December"],
        data: [
            { project: "Practise-Bench", values: ["", "", 8] },
            { project: "Prologis", values: ["", "", 5] },
        ],
    },
};

//const ctx = document.getElementById("barChart").getContext("sd");
let barChart;

function createChart(quarter) {
    //const quarter = document.getElementById("quarterSelect").value;
    const months = projectData[quarter].months;
    const datasets = projectData[quarter].data.map(
        (project, index) => ({
            label: project.project,
            data: project.values,
            backgroundColor: `hsl(120, 100%, ${30 + index * 10}%)`,
        }),
    );
    console.log("MONTHS",months);
    console.log("DATASETS",datasets);

    if (barChart) {
        barChart.destroy();
    }
    setsdata({
        labels: months,
        datasets: datasets,
    });
    setsopt({
        scales: {
            x: {
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: "",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Resources",
                },
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
    });

    
}

function updateChart() {
    const quarter = document.getElementById("quarterSelect").value;
    createChart(quarter);
}


const data = {
    Link1: [
        { Accelerator: "Accuracy", Direct: "", SPOC: "", NEW: "1" },
    ],
    Link2: [
        {
            Accelerator: "Arch Incurance Power BI Stuff Aug",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link3: [
        {
            Accelerator: "Japan Sf Landing Layer",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
    ],
    Link4: [
        {
            Accelerator: "Mars_Global_Mw_Rtm Fast_2023_Pahse1",
            Direct: "",
            SPOC: "",
            NEW: "3",
        },
        {
            Accelerator:
                "Mars_Global_Pet_Petcare R&D Digital Ecosystem_2023",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Mars_Us_Mw_Fetch Dashboard Enhancement_2023",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link5: [
        {
            Accelerator:
                "Mcdonalds_Conjoint,Engine Refreshes & R&D Extensions",
            Direct: "",
            SPOC: "",
            NEW: "3",
        },
    ],
    Link6: [
        {
            Accelerator: "Merck_Clearsight_Forecasting",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Merck_Forecast Demands_Q4 & Q1",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        { Accelerator: "Merck_Pie", Direct: "", SPOC: "", NEW: "1" },
        {
            Accelerator: "Merck_Sotatercept_ Launch Dashboard",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link7: [
        {
            Accelerator: "Nationwide_Data_Curation_Service",
            Direct: "",
            SPOC: "",
            NEW: "3",
        },
    ],
    Link8: [
        {
            Accelerator: "Northern Trust",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link9: [
        {
            Accelerator: "Ecomm Inventory Optimization",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Cgf_Compass",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator:
                "Pepsico_Cgf_Potato Sourcing Matrix Automation",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Cto Cv Pepiris",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
        {
            Accelerator: "Pepsico_Cto Cv_Label Right",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Data Foundation_Fp&A",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Hilton_Asset Tracker Automation",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Maw Rhythm_Hotspots",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_P-Rec_Ingestion",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
        {
            Accelerator: "Pepsico_Vision Sales_Automation",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Warehouse Advanced PMI",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Warehouse Health Check_2023",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
        {
            Accelerator: "Pepsico_Warehouse Standard",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
        {
            Accelerator: "Pepsico_Wms Wvolution_2023",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Pepsico_Workflow Transformer_2023",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link10: [
        {
            Accelerator: "Polen Capital Management_De and Bi Program",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
    ],
    Link11: [{ Accelerator: "Bench", Direct: "", SPOC: "", NEW: "8" }],
    Link12: [
        {
            Accelerator: "Prologis_Coo_KPI_Dashboard_Retainer",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Prologis_Lease_Reconciliation_Tool_Testing",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Prologis_Quality_Engineering_T&M",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Prologis_Starter Pack_Mng_Retainer",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
    ],
    Link13: [
        {
            Accelerator:
                "Ptp01 – Digital Management Command Center (Dmcc)",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Ptp01 – Gartner-Furnished Credit Enhancement",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Ptp01 – Gartner-Managed It Sourcing Market",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        {
            Accelerator: "Ptp01 – Supplier Performance Risk",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link14: [
        {
            Accelerator:
                "Quantum Energy Partners_Economics, Politics And Public Policy",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
    ],
    Link15: [
        {
            Accelerator:
                "T-Mobile_Contract Lifecycle Management  & Templates",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
    ],
    Link16: [
        {
            Accelerator: "The Navigator Digital Supply Chain Audit",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        { Accelerator: "Tata Steel", Direct: "", SPOC: "", NEW: "3" },
    ],
    All: [
        { Accelerator: "Accuray", Direct: "", SPOC: "", NEW: "1" },
        { Accelerator: "Arch Capital", Direct: "", SPOC: "", NEW: "1" },
        { Accelerator: "Carrier", Direct: "", SPOC: "", NEW: "2" },
        { Accelerator: "Mars", Direct: "", SPOC: "", NEW: "3" },
        { Accelerator: "Mcdonalds", Direct: "", SPOC: "", NEW: "3" },
        { Accelerator: "Merck", Direct: "", SPOC: "", NEW: "4" },
        { Accelerator: "Nationwide", Direct: "", SPOC: "", NEW: "3" },
        {
            Accelerator: "Northen Trust",
            Direct: "",
            SPOC: "",
            NEW: "1",
        },
        { Accelerator: "Pepsico", Direct: "", SPOC: "", NEW: "22" },
        { Accelerator: "Polen", Direct: "", SPOC: "", NEW: "2" },
        {
            Accelerator: "Practice - Bench",
            Direct: "",
            SPOC: "",
            NEW: "8",
        },
        { Accelerator: "Prologis", Direct: "", SPOC: "", NEW: "4" },
        { Accelerator: "Ptp", Direct: "", SPOC: "", NEW: "4" },
        {
            Accelerator: "Quantum Energy Partners",
            Direct: "",
            SPOC: "",
            NEW: "2",
        },
        { Accelerator: "T-Mobile", Direct: "", SPOC: "", NEW: "1" },
        { Accelerator: "Tata Steel", Direct: "", SPOC: "", NEW: "3" },
    ],
};


function change_projects(event) {
    const selectElement = document.getElementById("accelerators");
const resultsContainer = document.getElementById("results");
const totalProjectsElement = document.getElementById("totalProjects");
const totalResourcesElement = document.getElementById("totalResources");
    const selectedValue = event.target.value;
    const projects = data[selectedValue];

    if (projects) {
        const html = projects
            .map(
                (project) => 
                  <div class="project-item">
                      <div class="project-name">{project.Accelerator}</div>
                      <div class="resource-count">{project.NEW}</div>
                  </div>
              
            );

        //resultsContainer.innerHTML = <>{html}</>;
        setres(html);

        // Calculate total number of projects
        const totalProjects = projects.reduce(
            (total, project) => total + parseInt(project.NEW),
            0,
        );
        totalProjectsElement.textContent = totalProjects;

        // Calculate total number of resources
        const totalResources = projects.length;
        totalResourcesElement.textContent = totalResources;
    }

}

useEffect(() => {
    createChart("Q1");
  },[]);


    return(
<>
    <div class="w-100">
        <div>
            <h3 id="sub_page_headers">Client Partners</h3>
        </div>
        <div
            class="p-3 bg-white bg-info bg-opacity-10 border border-start-0 rounded-end"
        >
            <div>
                The Quality engineering services are rendered to 16 customers
                that includes 68 resources on the various projects of the client
                partners.
            </div>
        </div>
    </div>

    <div id="sub_page_box">
        <div>
            <h3 id="sub_page_headers">Governance - Council Updates</h3>
        </div>
        <div class="bg-white border border-solid border-slate-400 p-1">
            <p> The practice hits client partner count to 17.</p>
            <p> The bench resources head count is always kept under 10.</p>
        </div>
    </div>

    <div class="container-fluid">
        <div class="flex gap-1 p-2">
            <div class="col-lg-8">
                <div class="col-lg-10 d-flex align-items-center justify-center">
                <Bar data={projectsData} options={chartOptions} />
                </div>
              <canvas id="myChart"></canvas>
            </div>

            <div class="container mt-9">
                <div class="bg-white-200 p-3 rounded-lg mb-3">=
                    <div
                        id="sub_page_box"
                        class="bg-orange-200 p-6 rounded-lg flex justify-between items-center mb-3"
                    >
                        <h5>Choose the Client</h5>
                        <select
                            id="accelerators"
                            name="accelerators"
                            class="p-2 border border-gray-300 rounded"
                            onChange={change_projects}
                        >
                            <option value="">--Select--</option>
                            <option value="All">All</option>
                            <option value="Link1">Accuray</option>
                            <option value="Link2">Arch Capital</option>
                            <option value="Link3">Carrier</option>
                            <option value="Link4">Mars</option>
                            <option value="Link5">Mcdonalds</option>
                            <option value="Link6">Merck</option>
                            <option value="Link7">Nationwide</option>
                            <option value="Link8">Northen Trust</option>
                            <option value="Link9">Pepsico</option>
                            <option value="Link10">Polen</option>
                            <option value="Link11">Practice - Bench</option>
                            <option value="Link12">Prologis</option>
                            <option value="Link13">Ptp</option>
                            <option value="Link14">
                                Quantum Energy Partners
                            </option>
                            <option value="Link15">T-Mobile</option>
                            <option value="Link16">Tata Steel</option>
                        </select>
                    </div>
                    <div class="total-box">
                        <div
                            id="sub_page_headers"
                            class="bg-orange-200 p-2 rounded-lg mb-2"
                        >
                            <h6>
                                Total Number of Projects:
                                <span id="totalResources">0</span>
                            </h6>
                        </div>
                        <div
                            id="sub_page_headers"
                            class="bg-orange-200 p-2 rounded-lg"
                        >
                            <h6>
                                Total Number of Resources:
                                <span id="totalProjects">0</span>
                            </h6>
                        </div>
                    </div>
                    <div class="flex mb-3">
                        <div
                            class="w-full border border-solid border-slate-400 p-1"
                        >
                            <div class="table-header">
                                <div
                                    id="sub_page_headers"
                                    class="header-item bg-orange-200"
                                >
                                    Projects
                                </div>
                                <div
                                    id="sub_page_headers"
                                    class="header-item bg-orange-200"
                                >
                                    Resources
                                </div>
                            </div>
                            <div id="results" class="mt-1 scrollable-container">
                                <div class="text-center text-gray-500">
                                    {res}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="container">
            <h3>Resource Release Trend for the Year 2024</h3>
            <label for="quarterSelect">Select Quarter:</label>
            <select id="quarterSelect" onChange={updateChart}>
                <option value="Q1" selected>Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
            </select>
            <div
                id="chartContainer"
                class="d-flex"
                style={{width: '100%', height: '400px'}}
            >
                
                    {sdata&&sopt&&<Bar data={sdata} options={sopt} />}

            </div>
        </div>
    </div>
</>
    );
};


export default Governance;