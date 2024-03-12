import {useState, useEffect} from 'react'
import axios from 'axios'
//import { API_KEY, API_URL } from '@env'

const apiKey = "22fb4694cdmshbc9a99eb5caf014p1cf019jsn19ca66318a62";
const apiUrl = "https://gamecriticwebapi.azurewebsites.net/api";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const options = {
        method: 'GET',
        url: `${apiUrl}/${endpoint}`,
        params: {
            ...query
        },
        // headers: {
        //     'X-RapidAPI-Key': apiKey,
        //     'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        // }
    };
    

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data);
        } catch (error) {
            setError(error);
            console.log(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("useFetch", endpoint);
    }, [endpoint, JSON.stringify(query)]);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
   
    return {data, isLoading, error, refetch};
}

export default useFetch;
