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
