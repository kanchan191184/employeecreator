package project.employeecreator.employee;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import project.employeecreator.jobRecord.JobRecord;

@Entity
@Table(name="employees")
public class Employee {
    
     public enum JobType {
        PERMANENT,
        CONTRACT
    }

    public enum JobStatus {
        FULL_TIME,
        PART_TIME,
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String middleName;

    @Column
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

    @Column
    private String address;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.EAGER)
    private List<JobRecord> jobRecords = new ArrayList<>();

    public void addJobRecord(JobRecord jr) {
        jr.setEmployee(this);
        this.jobRecords.add(jr);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }

    public List<JobRecord> getJobRecords() {
        return jobRecords;
    }

    public void setJobRecords(List<JobRecord> jobRecords) {
        this.jobRecords = jobRecords;
    }

}
