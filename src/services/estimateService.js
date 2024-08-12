import axios from "axios";

// Instance of Axios with default configurations
const apiClient = axios.create({
  baseURL: "https://df26-2403-a080-c04-2e01-34ec-a195-3157-609c.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // Set the header
  },
});

// API call for save data function
export const saveData = async ({ employeeId,
    name,
    estimateName,
    estimateDate,
    platform,
    technology,
    summary,
    otherTools }) => {
    try {
      const response = await apiClient.post(
        "/save",
        { employeeId,
            name,
            estimateName,
            estimateDate,
            platform,
            technology,
            summary,
            otherTools },
        {
          headers: {
            Authorization: "Bearer YOUR_API_TOKEN", // replace with actual token or other headers
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    }
  };

  //API Call for seach data fun
  export const searchData = async (keys) => {
    try {
        const response = await apiClient.get(`/search`, {
            params: { keys },
            headers: {
                Authorization: "Bearer YOUR_API_TOKEN", // Use the actual token or other headers if needed
            },
        });
        console.log('API Response:', response);
        return response.data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
    }
};