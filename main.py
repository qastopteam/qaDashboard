import sqlite3

from flask import Flask, render_template, request
# from govroutes import govroutes
from models import db
from routes import proutes  # Import the blueprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///projects.db'
db.init_app(app)

app.register_blueprint(proutes)  # Register the blueprint

# app.register_blueprint(govroutes)


@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')


@app.route("/governance")
def governance():
    return render_template('governance.html')


@app.route("/projects")
def projects():
    return render_template('projects.html')


@app.route("/resources")
def resources():
    return render_template('resources.html')


@app.route("/reports")
def reports():
    return render_template('reports.html')


@app.route("/contact_us")
def contacts():
    return render_template('contact_us.html')


@app.route("/accelerators")
def accelerators():
    return render_template('accelerators.html')

@app.route("/data_entry")
def dataentry():
    connection = sqlite3.connect("test.db")
    #print(connection.total_changes)
    cursor = connection.cursor()
    '''cursor.execute(
        "CREATE TABLE IF NOT EXISTS example (id INTEGER, name TEXT, age INTEGER)"
    )
    cursor.execute("INSERT INTO example VALUES (1, 'alice', 20)")
    cursor.execute("INSERT INTO example VALUES (2, 'bob', 30)")
    cursor.execute("INSERT INTO example VALUES (3, 'eve', 40)")
    connection.commit()'''

    cursor.execute("SELECT * FROM example")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    title = 'Home'
    trackers = [
        'Weekly RAG Status', 'Skill Tracker',
        'Action Items for Practice - Request',
        'Action Items for Practice - Feedback', 'Leave Tracker'
    ]
    leads = ['-- Select --', 'Jeena', 'Thazhuva', 'Sivanash', 'Jennifer']
    rags = ['-- Select --', 'Red', 'Amber', 'Green']
    test_types = [
        '-- Select --', 'Web App Testing', 'Data Testing',
        'Performance testing', 'BI Testing'
    ]
    expertice_levels = [
        '--Select--', 'None', 'Interested', 'Beginner', 'Intermediate/Advanced'
    ]
    emp_ids = [
        '-- Select --', '4733', '3840', '3295', '3171', '4859', '2640', '4701',
        '4850', '5228', '5190', '4936', '4854', '4909', '2699', '5082', '4775',
        '4393', '4862', '5189'
    ]
    skills = [
        '-- Select --', 'Web Testing', 'Data Testing', 'Performance Testing',
        'Power BI', 'Other'
    ]
    up_skillings = ['-- Select --', 'Yes', 'No']
    area_of_supports_Request = ['Request']
    area_of_supports_Feedback = ['Feedback']
    client_names = ['-- Select --', 'Mars', 'Prologis', 'Nationwide', 'Other']
    request_types = ['-- Select --', 'Accelerator', 'Support']
    leave_types = [
        '-- Select --', 'Planned Leave', 'Un-Planned Leave', 'Maternity Leave',
        'Paternity Leave', 'Adoption Leave'
    ]
    projects = [
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

    employees = [
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

    # return render_template('index.html', title=title)
    return render_template('dataEntry.html',
                           title=title,
                           trackers=trackers,
                           leads=leads,
                           projects=projects,
                           emp_ids=emp_ids,
                           employees=employees,
                           test_types=test_types,
                           rags=rags,
                           expertice_levels=expertice_levels,
                           skills=skills,
                           up_skillings=up_skillings,
                           area_of_supports_Request=area_of_supports_Request,
                           area_of_supports_Feedback=area_of_supports_Feedback,
                           client_names=client_names,
                           request_types=request_types,
                           leave_types=leave_types)


@app.route('/gip', methods=['GET', 'POST'])
def gip():
    bd = request.get_json()
    print(bd)
    return bd


if __name__ == '__main__':
    app.run(debug=True)
