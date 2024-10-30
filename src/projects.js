import React, { useEffect } from 'react';

const Projects = () => {


    
    return(
    <>
<div id="page_header">
  <h1>Projects</h1>
</div>

<div class="flex gap-4 p-2">
  <div class="flex flex-col gap-4 w-1/2">
    <div id="sub_page_box">
      <div id="sub_page_headers">
        <h3>Projects RAG Status</h3>
      </div>
      <div class="p-2">
        The Quality Engineering monitors the weekly health check for the
        projects worked on and uses this dashboard for monitoring the high-alert
        projects for solutionizing a better approach to meet the deadlines.
      </div>
    </div>

    <div id="sub_page_box">
      <div id="sub_page_headers">
        <h3>Add New Project</h3>
      </div>
      <form
        id="add-project-form"
        class="border border-solid border-slate-400 p-2 mt-2 rounded-lg"
      >
        <div class="flex gap-4">
          <input
            type="text"
            name="project_name"
            placeholder="Project Name"
            class="text_Input"
            required
          />
          <select name="rag_status" class="select_Dropdown_Input" required>
            <option value="R">Red</option>
            <option value="A">Amber</option>
            <option value="G">Green</option>
          </select>
          <input
            type="text"
            name="impediments"
            placeholder="Impediments"
            class="text_Input"
            required
          />
          <input
            type="text"
            name="resource"
            placeholder="Resource"
            class="text_Input"
            required
          />
        </div>
        <button type="submit" class="default_Button">Add Project</button>
      </form>
      <div class="mt-4 p-2">
        <input type="file" id="upload-file" accept=".csv, .xlsx" />
        <button id="upload-button" class="default_Button">
          Upload Projects
        </button>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-4 w-1/2">
    <div id="sub_page_box">
      <div id="sub_page_headers">
        <h3>Governance - Council Updates</h3>
      </div>
      <div class="p-2">
        <p>- Projects in Red = <span id="rCount">0</span></p>
        <p>- Projects in Amber = <span id="aCount">0</span></p>
        <p>- Projects in Green = <span id="gCount">0</span></p>
      </div>
    </div>
    <div id="sub_page_box">
      <div id="sub_page_headers">
        <h3>Project Overall Status</h3>
      </div>
      <div class="p-2">
        <canvas id="rag-status-chart"></canvas>
      </div>
    </div>
  </div>
</div>

<div class="flex flex-col gap-4 p-2">
  <div class="bg-gray-200 p-1 rounded-lg flex justify-between items-center">
    <h3 class="text-lg font-bold text-black-400">RAG Status</h3>
    <div class="flex gap-2">
      <select id="rag-status" name="rag_status" class="select_Dropdown_Input">
        <option value="choose">Choose a RAG Status</option>
        <option value="all">All</option>
        <option value="R">Red</option>
        <option value="A">Amber</option>
        <option value="G">Green</option>
      </select>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        class="text_Input"
      />
    </div>
  </div>
  <div class="border border-solid border-slate-400 p-1">
    <div class="flex justify-between bg-gray-400 p-2 rounded-lg">
      <div class="w-1/5 text-left font-bold">Project</div>
      <div class="w-1/5 text-left font-bold">RAG Status</div>
      <div class="w-1/5 text-left font-bold">Impediments</div>
      <div class="w-1/5 text-left font-bold">Resource</div>
      <div class="w-1/5 text-left font-bold">Actions</div>
    </div>
    <div id="results" class="mt-4 w-full">
      <p class="text-center">
        Please select a RAG status to display the tabular report.
      </p>
    </div>
    <div id="pagination-controls" class="flex justify-center mt-4">
      <button
        id="prev-page"
        class="p-2 border border-gray-300 rounded mx-1"
        disabled
      >
        Prev
      </button>
      <button
        id="next-page"
        class="p-2 border border-gray-300 rounded mx-1"
        disabled
      >
        Next
      </button>
    </div>
    <div
      id="edit-project-modal"
      class="hidden fixed z-10 inset-0 overflow-y-auto"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Edit Project
                </h3>
                <div class="mt-2">
                  <form id="edit-project-form" class="space-y-4">
                    <input
                      type="hidden"
                      id="edit-project-id"
                      name="project_id"
                    />
                    <div>
                      <label
                        for="edit-project-name"
                        class="block text-sm font-medium text-gray-700"
                        >Project Name</label
                      >
                      <input
                        type="text"
                        id="edit-project-name"
                        name="project_name"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="edit-rag-status"
                        class="block text-sm font-medium text-gray-700"
                        >RAG Status</label
                      >
                      <select
                        id="edit-rag-status"
                        name="rag_status"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="R">Red</option>
                        <option value="A">Amber</option>
                        <option value="G">Green</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="edit-impediments"
                        class="block text-sm font-medium text-gray-700"
                        >Impediments</label
                      >
                      <input
                        type="text"
                        id="edit-impediments"
                        name="impediments"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="edit-resource"
                        class="block text-sm font-medium text-gray-700"
                        >Resource</label
                      >
                      <input
                        type="text"
                        id="edit-resource"
                        name="resource"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="mt-2 p-2 bg-orange-700 text-white rounded"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                id="close-modal"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
    );
};

export default Projects;