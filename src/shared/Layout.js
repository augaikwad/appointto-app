import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ isFullPageLayout = false, children }) {
  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";

  return (
    <div
      className={`container-scroller ${
        isFullPageLayout ? "full-page-container" : "app-page-container"
      }`}
    >
      {navbarComponent}
      <div
        className={`container-fluid page-body-wrapper ${
          isFullPageLayout ? "full-page-wrapper" : "app-page-wrapper"
        }`}
      >
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper" style={{ padding: "1.7rem 2.5rem" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
