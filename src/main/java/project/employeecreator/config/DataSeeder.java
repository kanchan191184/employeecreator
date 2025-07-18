package project.employeecreator.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import project.employeecreator.employee.Employee;
import project.employeecreator.employee.EmployeeRepository;

@Configuration
public class DataSeeder {
    
        @Bean
        CommandLineRunner seedDatabase(EmployeeRepository employeeRepository) {
            return args -> {

                // Clear all existing data to avoid duplication on restart
                employeeRepository.deleteAll();

                // ---- Create Employee Entities ---

                Employee emp1 = new Employee();
                emp1.setFirstName("John");
                emp1.setMiddleName("Anne");
                emp1.setLastName("Thomas");
                emp1.setEmail("john7@dummy.com");
                emp1.setPhoneNumber("40477009000");
                emp1.setAddress("123 King's road");
                emp1.setJobType(Employee.JobType.PERMANENT);
                emp1.setStartDate("2024-01-15");
                emp1.setFinishDate("2024-06-15");
                emp1.setJobStatus(Employee.JobStatus.PART_TIME);

                Employee emp2 = new Employee();
                emp2.setFirstName("Mary");
                emp2.setMiddleName("");
                emp2.setLastName("Johnson");
                emp2.setEmail("mary9@dummy.com");
                emp2.setPhoneNumber("40477009111");
                emp2.setAddress("12 Carter road");
                emp2.setJobType(Employee.JobType.CONTRACT);
                emp2.setStartDate("2023-01-15");
                emp2.setFinishDate("2025-08-15");
                emp2.setJobStatus(Employee.JobStatus.FULL_TIME);

                Employee emp3 = new Employee();
                emp3.setFirstName("David");
                emp3.setMiddleName("Boss");
                emp3.setLastName("Thomas");
                emp3.setEmail("david@dummy.com");
                emp3.setPhoneNumber("40477009567");
                emp3.setAddress("12 Market road");
                emp3.setJobType(Employee.JobType.PERMANENT);
                emp3.setStartDate("2024-01-15");
                emp3.setFinishDate("2024-06-15");
                emp3.setJobStatus(Employee.JobStatus.PART_TIME);

                Employee emp4 = new Employee();
                emp4.setFirstName("Maria");
                emp4.setMiddleName("");
                emp4.setLastName("Johnson");
                emp4.setEmail("maria@dummy.com");
                emp4.setPhoneNumber("40477005641");
                emp4.setAddress("21 Carter road");
                emp4.setJobType(Employee.JobType.PERMANENT);
                emp4.setStartDate("2023-01-15");
                emp4.setFinishDate("2025-08-15");
                emp4.setJobStatus(Employee.JobStatus.FULL_TIME);

                employeeRepository.save(emp1);
                employeeRepository.save(emp2);
                employeeRepository.save(emp3);
                employeeRepository.save(emp4);
            };
        }
}
