import React from "react";
import { Card } from "../../components";
import ListFilters from "./ListFilters";
import ListWidget from "./ListWidget";

function Dashboard(props) {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-xl-5 mb-4 mb-xl-0 grid-margin">
          <p className="card-description">
            Hi, Good Morning! <b>Dr. Uday</b>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 grid-margin stretch-card">
          <Card
            title="Today's Queue"
            titleClasses="text-md-center text-xl-left"
          >
            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
              <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">50</h3>
              <i className="ti-menu-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3 grid-margin stretch-card">
          <Card
            title="Today's Appointment"
            titleClasses="text-md-center text-xl-left"
          >
            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
              <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">20</h3>
              <i className="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3 grid-margin stretch-card">
          <Card title="New Patients" titleClasses="text-md-center text-xl-left">
            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
              <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">10</h3>
              <i className="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3 grid-margin stretch-card">
          <Card title="Follow ups" titleClasses="text-md-center text-xl-left">
            <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
              <h3 className="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">50</h3>
              <i className="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
            </div>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <ListFilters />
              <div className="mt-3 mb-3 p-3" style={{ background: "#EDEDED" }}>
                <ListWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
