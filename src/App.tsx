import React, { useState } from "react";
import { SafetyProvider } from "../context/SafetyContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SmartRoute from "./pages/SmartRoute";
import Contacts from "./pages/Contacts";
import ActivityLogPage from "./pages/ActivityLog";
import Settings from "./pages/Settings";

const AppContent = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "routes":
        return <SmartRoute />;
      case "contacts":
        return <Contacts />;
      case "activity":
        return <ActivityLogPage />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

function App() {
  return (
    <SafetyProvider>
      <AppContent />
    </SafetyProvider>
  );
}

export default App;
