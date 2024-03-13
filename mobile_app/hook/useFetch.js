import {useState, useEffect} from 'react'
import axios from 'axios'
//import { API_KEY, API_URL } from '@env'

const apiKey = "22fb4694cdmshbc9a99eb5caf014p1cf019jsn19ca66318a62";
const apiUrl = "https://muddy-pear-sunbonnet.cyclic.app/api";

const useFetch = (endpoint, query, isScroll = false) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    
    const options = {
        method: 'GET',
        url: `${apiUrl}/${endpoint}`,
        params: {
            ...query
        },
    };

    const fetchData = async () => {
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
        //console.log("useFetch", endpoint, JSON.stringify(query));
    }, [endpoint, JSON.stringify(query), isScroll]);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
   
    return {data, isLoading, error, refetch, totalPages};
}

export default useFetch;
