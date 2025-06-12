const getBaseURL = () => sessionStorage.getItem("Base_URL") || "https://midbserver.co.in:5001";
const getApiKey = () => sessionStorage.getItem("authApiKey") || "b986ce110c4e7c523882db76b5rft124";

export const apiConfig = {
  getBaseURL,
  getApiKey,
};
