import { authInstance } from "../Api/axiosInstance";

export const addCandidate = async (candidateData) => {
  console.log('candidate data', candidateData)
  try {
    const response = await authInstance.post(`/api/candidates/addCandidate`, candidateData);
    return response.data;
  } catch (error) {
    console.error("Error adding candidate:", error);
    throw error;
  }
};


export const fetchCandidates = async () => {
  const response = await authInstance.get(`/api/candidates/getAllCandidates` );
  console.log("fetched data", response)
  return response.data.data; 
};

export const updateCandidateStatus = async (candidateId, status) => {
  try {
    const response = await authInstance.patch(`/api/candidates/updateStatus/${candidateId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  const response = await authInstance.get(`/api/candidates/getAllEmployees` );
  console.log("fetched data", response)
  return response.data.data; 
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await authInstance.delete(`/api/candidates/deleteEmployee/${employeeId}`);
    console.log("deleted employee", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const updateEmployee = async (employeeId, data) => {
  try {
    const response = await authInstance.patch(`/api/candidates/updateEmployee/${employeeId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};


export const fetchAttendanceRecords = async () => {
  try {
    const response = await authInstance.get(`/api/candidates/getAll`);
    console.log("Fetched attendance data", response);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    throw error;
  }
};


// Update attendance status
export const updateAttendanceStatus = async (recordId, status) => {
  try {
    const response = await authInstance.patch(`/api/candidates/updateStatus/${recordId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating attendance status:", error);
    throw error;
  }
};