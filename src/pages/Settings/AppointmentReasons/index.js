import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const Index = () => {
  const form = useForm();
  const { handleSubmit, reset } = form;
  return (
    <>
      <div>
        <FormProvider {...form}></FormProvider>
        <Button color="primary" size="sm" style={{ marginLeft: 20 }}>
          Add
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-borderless"></table>
      </div>
    </>
  );
};

export default Index;
