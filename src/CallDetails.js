import { useParams } from "react-router-dom"

import { useEffect, useState } from "react";

const CallDetails = () => {
    
    const params = useParams();
    const [call, setCall] = useState();

    const getData = async () => {

        //fetch call details
        const response = await fetch("https://aircall-job.herokuapp.com/activities/" + params.callID);
        const data = await response.json();
        setCall(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return ( 
        //page doesn't try to render until call details are fetched
        call && (
        <div>
            <div className="text-base text-center pt-16 text-gray-600 capitalize">
                <p className="">{ `${call.direction} call from:`}</p>
                <p className="text-black text-xl py-4"> {`${call.from}`} </p>
                <p className="py-1"> {call.to ? `To:` : ""} </p>
                <p className="text-black text-xl py-4"> {call.to ? call.to : ""} </p>
                <p className=""> {"was " + (call.call_type == "voicemail" ? "sent to voicemail" : call.call_type) + " at:"} </p>
                <p className="pt-2"> {`${call.created_at}`} </p>
            </div>

         
        </div>)
     );
}
 
export default CallDetails;