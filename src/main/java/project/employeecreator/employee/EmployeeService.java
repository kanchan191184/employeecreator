package project.employeecreator.employee;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;
    
    public EmployeeService(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

   public List<Employee> findAll() {
    return this.employeeRepository.findAll();
   }

    public Optional<Employee> findById(Long id) {
        return this.employeeRepository.findById(id);
    }

    public Employee create(CreateEmployeeDTO data) {
        Employee newEmp = modelMapper.map(data, Employee.class);
        Employee savedEmployee = this.employeeRepository.save(newEmp);

        return savedEmployee;
    }

    public boolean deleteById(Long id) {
        // check if the employee exists
        Optional<Employee> foundemp = this.findById(id);
        if (foundemp.isEmpty()) {
            return false;
        }
        Employee empFromDb = foundemp.get();
        this.employeeRepository.delete(empFromDb);
        return true;
    }

    public Optional<Employee> updateById(Long id, UpdateEmployeeDTO data) {
        Optional<Employee> foundEmp =  this.findById(id);

        if(foundEmp.isEmpty()) {
            return foundEmp;
        }

        Employee empFromDB = foundEmp.get();

        this.modelMapper.map(data, empFromDB);
        this.employeeRepository.save(empFromDB);
        return Optional.of(empFromDB);
    }
}