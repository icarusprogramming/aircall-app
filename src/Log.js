import  { Link, Outlet, useNavigate } from "react-router-dom"


import { useState, useEffect } from "react"

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Person';
import ArchiveIcon from '@mui/icons-material/Archive';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'; 
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import AnsweredIcon from '@mui/icons-material/PhoneCallback';
import PhoneIcon from '@mui/icons-material/Phone';
import FolderIcon from '@mui/icons-material/Folder';

const Log = () => {

    const [calls, setCalls] = useState([]);

    const getData = async () => {
        console.log("fetching data");

        const response = await fetch("https://aircall-job.herokuapp.com/activities");
        const data = await response.json();
        setCalls(data);
        console.log(data);
    }

    useEffect(() => {
        getData();
    }, []);

    const parseDate = (inputDate) => {
        const somedate = new Date(Date.parse(inputDate));
        console.log(somedate.getHours());
        somedate.getHours();

        return somedate.toLocaleString();
    }

    const navigate = useNavigate();

    return (
        <div className="container-view" style={{position: "relative"}}>

            <h2>Activity Log</h2>

            <List sx={{ width: '100%' }}>
                {calls.map((callListing) => (
                
                
                <ListItem button divider onClick={() => navigate("/details/" + callListing.id)}>
                {/* <ListItem button divider onClick={() => navigate("/details/" + callListing.id)}> */}

                <ListItemAvatar>
                    <Avatar>
                    { (callListing.call_type == "missed") ? <PhoneMissedIcon /> : ((callListing.call_type == "answered") ? <AnsweredIcon /> : <VoicemailIcon />)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={callListing.from} secondary={ parseDate(callListing.created_at)} />
                </ListItem>


            )) }</List>

            

        </div>
    );
}
 
export default Log;