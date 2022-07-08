import React from "react";
import RecipeContainer from "../containers/RecipeContainer.jsx";
import DrawerSection from "../containers/DrawerSection.jsx";
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="main-container">
      <DrawerSection/>
      <RecipeContainer/>
    </div>
  )
};

export default Dashboard;