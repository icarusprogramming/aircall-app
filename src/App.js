import  { Link, Outlet, useNavigate } from "react-router-dom"

import "./css/app.css"
import "./css/body.css"
import "./css/header.css"

import Header from "./Header"

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


function App() {

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
    <div className="container" style={{position: "relative"}}>
        <Header/>
        {/* <Link to="/log">Log</Link> |{" "}
        <Link to="/details">Details</Link>

          <List sx={{ width: '100%' }}>
            {calls.map((callListing) => (
            
            
            <ListItem button divider>
              <ListItemAvatar>
                <Avatar>
                  { (callListing.call_type == "missed") ? <PhoneMissedIcon /> : ((callListing.call_type == "answered") ? <AnsweredIcon /> : <VoicemailIcon />)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={callListing.from} secondary={ parseDate(callListing.created_at)} />
            </ListItem>


          )) }</List> */}

          <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels divider>
              <BottomNavigationAction onClick={() => navigate("/log")} label="Activity Log" icon={<PhoneIcon />} />
              <BottomNavigationAction onClick={() => navigate("/details")} label="Archived calls" icon={<FolderIcon />} />
            </BottomNavigation>
          </Paper>
      





        <Outlet />
    </div>
  );
}

export default App;
