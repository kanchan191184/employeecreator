package project.employeecreator.jobRecord;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRecordRepository extends JpaRepository<JobRecord, Long> {
    List<JobRecord> findByEmployeeIdOrderByStartDate(Long employeeId);
}
