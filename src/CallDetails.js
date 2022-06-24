import { useParams } from "react-router-dom"

import { useEffect, useState } from "react";

const CallDetails = () => {
    const params = useParams();

    const [calls, setCalls] = useState([]);

    const getData = async () => {
        console.log("fetching data");

        const response = await fetch("https://aircall-job.herokuapp.com/activities/" + params.callID);
        const data = await response.json();
        setCalls(data);
        console.log(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return ( 
        <div>
            {params.callID}
        </div>
     );
}
 
export default CallDetails;