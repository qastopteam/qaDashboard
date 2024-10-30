import React, { useEffect } from 'react';

const About_Us = () => {


    function updateContacts() {
        var areaSelect = document.getElementById("area");
        var primaryContact = document.getElementById("primary-contact");
        var secondaryContact = document.getElementById("secondary-contact");

        if (areaSelect.value === "New Proposals") {
            primaryContact.value = "Sivanash";
            secondaryContact.value = "Jennifer";
        } else if (areaSelect.value === "Practice Capability Demo") {
            primaryContact.value = "Sahil";
            secondaryContact.value = "Lokeshwaran";
        } else if (areaSelect.value === "Estimates") {
            primaryContact.value = "Thazuva";
            secondaryContact.value = "Jenna";
        } else if (areaSelect.value === "Practice Leadership Connect") {
            primaryContact.value = "Hashim";
            secondaryContact.value = "Lakshman";
        } else {
            primaryContact.value = "";
            secondaryContact.value = "";
        }
    }

    // Function to validate form fields and show success message
    function validateForm() {
        var clientPartner = document.getElementById("client-partner").value;
        var description = document.getElementById("description").value;

        if (clientPartner.trim() === "" || description.trim() === "") {
            alert("Please fill in the Client Partner and Request Description fields.");
            return false;
        }

        // Show success message
        alert("Your request has been placed successfully!");

        return true;
    }

    function initPage() {
        var form = document.getElementById("requestForm");
        var sendButton = form.querySelector("button[type=submit]");

            sendButton.disabled = !form.checkValidity();
    }

    useEffect(() => {
        var form = document.getElementById("requestForm");
        var sendButton = form.querySelector("button[type=submit]");

        // Initially disable the button
        sendButton.disabled = true;
      },[]);

  return (
    <>
    <div class="container">
        <div id="page_header">
          <h1>About us</h1>
        </div>
        <main>
            <section class="section" style={{margin: '1rem'}}>
                <div id="sub_page_box">
                <h2 id="sub_page_headers">Why choose Quality Engineering?</h2>
                <p class="p-2">Our team ensures the highest quality by delivering comprehensive testing and certification for your product, making it bug-free. We utilize multi-level, multi-browser, and multi-tests through advanced accelerators, automated tools, and cutting-edge technologies.</p>
                </div>
                <div class="row equal-height-cards">
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3>New Proposals</h3>
                            </div>
                            <div class="p-2">
                                <p>We are delighted to work with you on creating test proposals for our existing or new clients.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3 >Practice Capability Demo</h3>
                            </div>
                            <div class="p-2">
                                <p>We would be pleased to showcase our expertise in Quality Assurance and Delivery as part of our current engagements, utilizing our test accelerators.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3>Estimates</h3>
                            </div>
                            <div class="p-2">
                                <p>We can collaborate on the test estimates and revisions for QE expansion using our ROI templates.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3>Practice Leadership Connect</h3>
                            </div>
                            <div class="p-2">
                                <p>We would love to hear your feedback and thoughts on how we can improve and serve you better.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3 >Quality Assurance Strategies</h3>
                            </div>
                            <div class="p-2">
                                <p>Explore our comprehensive strategies for ensuring product quality and reliability.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div id="sub_page_box" class="card">
                            <div id="sub_page_headers">
                                <h3>Client Success Stories</h3>
                            </div>
                            <div class="p-2">
                                <p>Read about our successful engagements and how we have helped clients achieve their goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="form-section">
                <form id="requestForm" onInput={initPage} onSubmit={validateForm} class="border p-3">
                    <fieldset>
                        <legend id="page_sub-headers">Request Form</legend>
                        <div class="form-group">
                            <label for="area">Choose Area:</label>
                            <select id="area" name="area" class="form-control" onChange={updateContacts}>
                                <option value="">Choose an Area</option>
                                <option value="New Proposals">New Proposals</option>
                                <option value="Practice Capability Demo">Practice Capability Demo</option>
                                <option value="Estimates">Estimates</option>
                                <option value="Practice Leadership Connect">Practice Leadership Connect</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="primary-contact">Point of Contact - Primary:</label>
                            <input type="text" id="primary-contact" name="primary-contact" class="form-control" aria-label="Primary Point of Contact"/>
                        </div>
                        <div class="form-group">
                            <label for="secondary-contact">Point of Contact - Secondary:</label>
                            <input type="text" id="secondary-contact" name="secondary-contact" class="form-control" aria-label="Secondary Point of Contact"/>
                        </div>
                        <div class="form-group">
                            <label for="client-partner">Client Partner:</label>
                            <input type="text" id="client-partner" name="client-partner" class="form-control" aria-label="Client Partner" required />
                        </div>
                        <div class="form-group">
                            <label for="description">Request Description:</label>
                            <textarea id="description" name="description" class="form-control" rows="4" aria-label="Request Description" required></textarea>
                        </div>
                        <button type="submit" class="default_Button">Send Request</button>
                    </fieldset>
                </form>
            </section>
        </main>
    </div>
    </>
  );
};

export default About_Us;