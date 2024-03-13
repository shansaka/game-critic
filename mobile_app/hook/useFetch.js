// useFetch.js
import {useState, useCallback} from 'react'
import axios from 'axios'

const apiKey = "22fb4694cdmshbc9a99eb5caf014p1cf019jsn19ca66318a62";
const apiUrl = "https://game-critic.onrender.com/api";

const useFetch = (endpoint, query, isScroll = false, body = null) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const options = {
        method: body ? 'POST' : 'GET',
        url: `${apiUrl}/${endpoint}`,
        params: {
            ...query
        },
        data: body,
    };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options); 
            if ('data' in response.data) {
                if(isScroll){
                    setData(prevData => [...prevData, ...response.data.data]);
                }
                else{
                    setData(response.data.data);
                }
                setTotalPages(response.data.totalPages);
            } else {
                setData(response.data);
            }
            return response.data;
        } catch (error) {
            setError(error);
            console.log(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, JSON.stringify(query), isScroll, JSON.stringify(body)]);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
   
    return {data, isLoading, error, refetch, totalPages, fetchData};
}

export default useFetch;