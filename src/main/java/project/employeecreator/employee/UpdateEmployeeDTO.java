package project.employeecreator.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import project.employeecreator.employee.Employee.JobStatus;
import project.employeecreator.employee.Employee.JobType;

public class UpdateEmployeeDTO {
    
    @NotBlank
    @Pattern(regexp = ".*\\S.*", message = "First Name cannot be empty")
    private String firstName;

    private String middleName;

    @NotBlank
    @Pattern(regexp = ".*\\S.*", message = "Last Name cannot be empty")
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String address;

    private JobType jobType;

    @NotBlank
    private String startDate;

    private String finishDate;

    private JobStatus jobStatus;

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public JobType getJobType() {
        return jobType;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getFinishDate() {
        return finishDate;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    
}
