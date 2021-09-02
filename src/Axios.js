import axios from "axios"
const instance = axios.create({
    baseUrl: `https://newsapi.org/v2/everything?q=SEARCH_PARAM&apiKey=API_KEY`
})
export default instance;