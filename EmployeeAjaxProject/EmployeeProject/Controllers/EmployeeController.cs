using EmployeeProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EmployeeProject.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

     
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees.ToListAsync();
            return Json(employees);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var employee = _context.Employees
                .FirstOrDefault(e => e.EmployeeID == id);

            if (employee == null)
            {
                return NotFound(); 
            }

            return Json(employee); 
        }

        [HttpPost]
        public IActionResult Create(EmployeeModel employee)
        {
            if (ModelState.IsValid)
            {
                _context.Employees.Add(employee);
                 _context.SaveChanges();
                return Json(new { success = true, data = employee });
            }
            return BadRequest(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
        }

        [HttpPost]
        public IActionResult EditEmployee(EmployeeModel employee)
        {
            if (ModelState.IsValid)
            {
                var existingEmployee = _context.Employees
                    .FirstOrDefault(e => e.EmployeeID == employee.EmployeeID);

                if (existingEmployee != null)
                {
                 
                    existingEmployee.FirstName = employee.FirstName;
                    existingEmployee.LastName = employee.LastName;
                    existingEmployee.DateOfBirth = employee.DateOfBirth;
                    existingEmployee.Gender = employee.Gender;
                    existingEmployee.Email = employee.Email;
                    existingEmployee.PhoneNumber = employee.PhoneNumber;
                    existingEmployee.HireDate = employee.HireDate;
                    existingEmployee.JobTitle = employee.JobTitle;
                    existingEmployee.Department = employee.Department;
                    existingEmployee.Salary = employee.Salary;
                    existingEmployee.City = employee.City;
                    existingEmployee.State = employee.State;
                    _context.SaveChanges();

                    return Json(new { success = true });
                }
                else
                {
                    return Json(new { success = false, message = "Employee not found." });
                }
            }
            return Json(new { success = false, message = "Invalid data." });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Json(employee);
        }
    }
}
