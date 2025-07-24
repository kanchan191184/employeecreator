package project.employeecreator.employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
   
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

}
