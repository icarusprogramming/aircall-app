import  { Link, Outlet, useNavigate } from "react-router-dom"


import { useState, useEffect } from "react"

import { Reorder } from "framer-motion"

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
    const [archive, setArchive] = useState(false);

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

    // const changeArchived = (id) => {
    //     let newLog = calls.map(call => {
    //         if (call.id == id) {
    //             return { ...call, is_archived: true};
    //         } else {
    //             return call
    //         }
    //    })
    //    setCalls(newLog);
    //    setArchived(id)
    // }

    const setArchived = async (id, bool) => {

        let newLog = calls.map(call => {
            if (call.id == id) {
                return { ...call, is_archived: bool};
            } else {
                return call
            }
        })
        setCalls(newLog);

        const response = await fetch("https://aircall-job.herokuapp.com/activities/" + id, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({is_archived: true})
        });
        const data = await response.json();
        //setCalls(data);
        console.log(data);
    }

    const reset = async () => {

        let newLog = calls.map(call => {
            return { ...call, is_archived: false};
        })
        setCalls(newLog);

        const response = await fetch("https://aircall-job.herokuapp.com/reset");
        const data = await response.json();
        console.log(data);
    }


    return (
        <div className="container-view" style={{position: "relative"}}>

            <nav className="flex flex-row items-center justify-between py-3 px-2">
                <div className="">
                    <h2 className="text-xl font-bold">Activity Log</h2>
                </div>
                <div className="space-x-8 text-base">
                    <button onClick={() => setArchive(false)} className={"hover:text-[#2AC420] border-[#2AC420] " + (archive ? "" : "border-b-2")}>Inbox</button>
                    <button onClick={() => setArchive(true)} className={"hover:text-[#2AC420] border-[#2AC420] " + (!archive ? "" : "border-b-2")}>Archived</button>
                </div>
            </nav>

            
            <Reorder.Group values={calls} >
                {calls.map((callListing) => (callListing.is_archived == archive) && (   //Remove True statement
                <Reorder.Item dragListener={false} className="my-2 py-2 group flex flex-row justify-center items-center rounded bg-gray-100 pr-3" key={callListing.id}>
                
                    <span className="material-symbols-outlined fill text-3xl mx-4">{ (callListing.call_type == "missed") ? 'phone_missed' : ((callListing.call_type == "answered") ? "phone" : "voicemail" )} </span>
                    <div className="flex-grow">
                        <p className="text-lg">{callListing.from}</p>
                        <p className="text-sm opacity-80">{ parseDate(callListing.created_at)}</p>
                        {/* <ListItemText primary={callListing.from} secondary={ parseDate(callListing.created_at)} /> */}

                    </div>
                    <button className="transition duration-75 opacity-0 group-hover:opacity-100 material-symbols-outlined text-xl p-2" onClick={() => navigate("/details/" + callListing.id)} >info</button>
                    <button className="transition duration-75 opacity-0 group-hover:opacity-100 material-symbols-outlined text-xl p-2" onClick={() => setArchived(callListing.id, !archive)}>{archive ? "unarchive" : "archive"}</button>
                
                </Reorder.Item>



            )) }
            { archive && (<Reorder.Item dragListener={false} onClick={reset} className="hover:text-black hover:cursor-pointer my-2 py-2 group flex flex-row justify-center items-center rounded bg-gray-100 pr-3" key={"archiveAll"}>
                
                <button className="opacity-80 material-symbols-outlined fill text-2xl mx-3">unarchive</button>
                <span className="opacity-80 text-base">{ 'Unarchive All' } </span>
            
            </Reorder.Item>)}
            
            </Reorder.Group>

            

        </div>
    );
}
 
export default Log;