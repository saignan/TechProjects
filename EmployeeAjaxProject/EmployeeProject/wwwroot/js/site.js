$(document).ready(function () {
    fetchEmployees();
});

function fetchEmployees() {
    $.ajax({
        url: '/Employee/GetAll',
        type: 'GET',
        success: function (data) {
            var tableBody = $('#employeeTable tbody');
            tableBody.empty();
            $.each(data, function (index, employee) {
                tableBody.append(`
                    <tr>
                        <td>${employee.employeeID}</td>
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${employee.email}</td>
                        <td>
                            <button class="btn btn-info btn-sm edit-btn" onclick="showEditModal(${employee.employeeID})">Edit</button>
                            <button class="btn btn-danger btn-sm delete-btn" onclick="Delete(${employee.employeeID})">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
}


function showEditModal(id) {
    $.ajax({
        url: '/Employee/Get', 
        type: 'GET',
        data: { id: id },
        success: function (employee) {
            $("#editEmployeeId").val(employee.employeeID);
            $("#editEmployeeForm #firstName").val(employee.firstName);
            $("#editEmployeeForm #lastName").val(employee.lastName);
            $("#editEmployeeForm #dateOfBirth").val(employee.dateOfBirth.split('T')[0]);
            $("#editEmployeeForm #gender").val(employee.gender);
            $("#editEmployeeForm #email").val(employee.email);
            $("#editEmployeeForm #phoneNumber").val(employee.phoneNumber);
            $("#editEmployeeForm #hireDate").val(employee.hireDate.split('T')[0]);
            $("#editEmployeeForm #jobTitle").val(employee.jobTitle);
            $("#editEmployeeForm #department").val(employee.department);
            $("#editEmployeeForm #salary").val(employee.salary);
            $("#editEmployeeForm #city").val(employee.city);
            $("#editEmployeeForm #state").val(employee.state);

            $("#editEmployeeModal").modal('show');
        },
        error: function (xhr, status, error) {
            alert("Error loading employee details: " + error);
        }
    });
}



function editEmployee() {
    var employeeData = {
        EmployeeID: $("#editEmployeeId").val(),
        FirstName: $("#editEmployeeForm #firstName").val(),
        LastName: $("#editEmployeeForm #lastName").val(),
        DateOfBirth: $("#editEmployeeForm #dateOfBirth").val(),
        Gender: $("#editEmployeeForm #gender").val(),
        Email: $("#editEmployeeForm #email").val(),
        PhoneNumber: $("#editEmployeeForm #phoneNumber").val(),
        HireDate: $("#editEmployeeForm #hireDate").val(),
        JobTitle: $("#editEmployeeForm #jobTitle").val(),
        Department: $("#editEmployeeForm #department").val(),
        Salary: $("#editEmployeeForm #salary").val(),
        City: $("#editEmployeeForm #city").val(),
        State: $("#editEmployeeForm #state").val()
    };

    $.ajax({
        type: "POST",
        url: "/Employee/EditEmployee",
        data: employeeData,
        success: function (response) {
            if (response.success) {
                $("#editEmployeeModal").modal('hide');
                fetchEmployees();  
                alert("Employee updated successfully.");
            } else {
                alert("Error updating employee: " + response.message);
            }
        },
        error: function (xhr, status, error) {
            alert("Error updating employee: " + error);
        }
    });
}


function addEmployee() {
    debugger;
    var empData = {
        FirstName: $('#firstName').val(),
        LastName: $('#lastName').val(),
        DateOfBirth: $('#dateOfBirth').val(),
        Gender: $('#gender').val(),
        Email: $('#email').val(),
        PhoneNumber: $('#phoneNumber').val(),
        HireDate: $('#hireDate').val(),
        JobTitle: $('#jobTitle').val(),
        Department: $('#department').val(),
        Salary: $('#salary').val(),
        City: $('#city').val(),
        State: $('#state').val()
    };
    debugger;
    console.log(empData);
    $.ajax({
        url: '/Employee/Create',
        type: 'POST',
        data: empData,
        dataType: 'json',
        
        success: function () {
            $('#addEmployeeModal').modal('hide');
            fetchEmployees(); 
        },
        error: function () {
            alert('Failed to add employee.');
        }
    });
}


function Delete(id) {
    debugger;
    let confirmDelete = confirm("Are you sure you want to delete this item?");

    if (confirmDelete) {
        $.ajax({
            url: '/Employee/Delete?id=' + id,
            type: 'Delete',
            dataType: 'json',
            success: function (data) {
                alert(data);
                fetchEmployees();

            },
            error: function (xhr, status, error) {
                $('#response').html('An error occurred: ' + error);
            }
        })
    }
}

