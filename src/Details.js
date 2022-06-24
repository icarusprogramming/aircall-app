import { Outlet } from "react-router-dom"

const Details = () => {
    return ( 
        <div>
            <h2>Call Details</h2>
            <Outlet />
        </div>
     );
}
 
export default Details;