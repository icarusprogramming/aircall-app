import  {  Outlet  } from "react-router-dom"

import "./css/app.css"
import "./css/body.css"
import "./css/header.css"

import Header from "./Header"


function App() {

  return (
    <div className="container font-poppins" style={{position: "relative"}}>
        
        {/* display the aircall logo */}
        <Header/>

        {/* display the nested content */}
        <Outlet />

    </div>
  );
}

export default App;
