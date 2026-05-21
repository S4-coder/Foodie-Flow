import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import useOnlineStatus from "./utils/useOnlineStatus";
import OfflinePage from "./components/OfflinePage.jsx";
import { useState } from "react";

const AppLayout = () => {
  const isOnline = useOnlineStatus();
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />
      {isOnline ? (
        <Outlet context={{ searchText }} />
      ) : (
        <OfflinePage />
      )}
      <Footer />
    </div>
  );
};

export default AppLayout;
