import { Outlet, useNavigate } from "react-router-dom"

const Details = () => {

    const navigate = useNavigate();

    return ( 
        <div>
            <div className="flex flex-row justify-center pt-6">
                <button onClick={() => navigate(-1)} className="absolute left-4 material-symbols-outlined">chevron_left</button>
                <h2 className="text-center text-lg font-bold">Call Details</h2>
            </div>
            <Outlet />
        </div>
     );
}
 
export default Details;