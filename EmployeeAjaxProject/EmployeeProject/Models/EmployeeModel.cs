using System.ComponentModel.DataAnnotations;

namespace EmployeeProject.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime HireDate { get; set; }
        public string JobTitle { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
