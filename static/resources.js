document.addEventListener('DOMContentLoaded', function () {
    const employees = [
        { name: 'Aarti Kyama', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'Basics' },
        { name: 'Abhishek Gupta', webTesting: 'No', dataTesting: 'No', performanceTesting: 'Yes' },
        { name: 'Ajit Singh', webTesting: 'No', dataTesting: 'No', performanceTesting: 'No' },
        { name: 'Akash Gupta', webTesting: 'Yes', dataTesting: 'Basics', performanceTesting: 'Basics' },
        { name: 'Akib Basheer', webTesting: 'Yes', dataTesting: 'Basics', performanceTesting: 'Interested' },
        { name: 'Amar Namdev Memane', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'Yes' },
        { name: 'Aniket Baban Turankar', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Anitha Paramasivan', webTesting: 'Basics', dataTesting: 'Yes', performanceTesting: 'Interested' },
        { name: 'Anupama Vaibhav Shinde', webTesting: 'Yes', dataTesting: 'Interested', performanceTesting: 'Basics' },
        { name: 'Arnavi Amol Patil', webTesting: 'Interested', dataTesting: 'Yes', performanceTesting: 'Interested' },
        { name: 'Arputha Aswin Chandra Sekar', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Arul Sekar', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Bhagya Sree Kota', webTesting: 'Basics', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Charan Kumar Thanugonda', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'Yes' },
        { name: 'Dinakara Pandian Palanisamy', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Ezhilarasi Rajendran', webTesting: 'Yes', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Jagadeesh Kumar Chippada', webTesting: 'No', dataTesting: 'Yes', performanceTesting: 'No' },
        { name: 'Jeena Jacob', webTesting: 'Yes', dataTesting: 'No', performanceTesting: 'No' },
        { name: 'Jeevitha Venkatesan', webTesting: 'Yes', dataTesting: 'No', performanceTesting: 'Yes' },
        { name: 'Jenifer Baby Celus Arulraj', webTesting: 'No', dataTesting: 'Yes', performanceTesting: 'No' }
    ];

    const webTestingSelect = document.getElementById('webTesting');
    const dataTestingSelect = document.getElementById('dataTesting');
    const performanceTestingSelect = document.getElementById('performanceTesting');
    const employeeList = document.getElementById('employeeList');

    function updateEmployeeList() {
        const webTesting = webTestingSelect.value;
        const dataTesting = dataTestingSelect.value;
        const performanceTesting = performanceTestingSelect.value;

        const filteredEmployees = employees.filter(employee => {
            return (webTesting === 'all' || employee.webTesting === webTesting) &&
                   (dataTesting === 'all' || employee.dataTesting === dataTesting) &&
                   (performanceTesting === 'all' || employee.performanceTesting === performanceTesting);
        });

        employeeList.value = filteredEmployees.map(employee => employee.name).join('\n');
    }

    webTestingSelect.addEventListener('change', updateEmployeeList);
    dataTestingSelect.addEventListener('change', updateEmployeeList);
    performanceTestingSelect.addEventListener('change', updateEmployeeList);

    // Initial population of the employee list
    updateEmployeeList();
});
