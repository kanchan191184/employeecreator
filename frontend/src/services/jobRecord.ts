import api from "../api/api";

export interface JobRecord {
  hoursPerWeek: number;
  id: number;
  jobType: 'PERMANENT' | 'CONTRACT';
  startDate: string;
  endDate?: string;
}

  // Get all job records
  export async function getAllJobRecords(): Promise<JobRecord[]> {
    const response = await api.get<JobRecord[]>('/job-records');
    return response.data;
  }

  // Get job records for a specific employee
  export const getJobRecordsByEmployeeId = async (id: number): Promise<JobRecord[]> => {
    const response = await api.get<JobRecord[]>(`/employees/${id}/jobs`);
    return response.data;
  };

  // Post a new job record for an employee
  export const postJobRecord = async (empId: number, jr: JobRecord): Promise<JobRecord> => {
    const response = await api.post<JobRecord>(`/employees/${empId}/jobs`, jr);
    return response.data;
  };

  // Patch (update) a job record
  export const patchJobRecord = async (empId: number, jrId: number, jr: JobRecord): Promise<JobRecord> => {
    const response = await api.patch<JobRecord>(`/employees/${empId}/jobs/${jrId}`, jr);
    return response.data;
  };
