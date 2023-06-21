import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { ProgressBar, Button } from "react-bootstrap";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useForm, FormProvider } from "react-hook-form";
import { PatientContext } from "../../../context/Patient";
import Img1 from "../../../assets/images/sampleReports/sample1.png";

const useStyles = createUseStyles({
  container: {
    background: "#f3f3f3",
    height: 165,
    margin: "0px auto 25px",
    borderRadius: "0.2rem",
    border: "1px solid #aba9a9",
    "& > div.dropzone": {
      display: "flex",
      height: "100%",
      width: "100%",
      "& > div": {
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
  fileSelector: {
    fontSize: 14,
    textAlign: "center",
    "&>div>span": {
      color: "#007bff",
      fontWeight: "bold",
      cursor: "pointer",
    },
    "&>.uploadIcon": {
      fontSize: "50px",
      color: "#ccc",
      marginBottom: 18,
    },
  },
  filesList: {
    margin: "0px auto",
    "& > ul": {
      padding: "0 !important",
    },
  },
  filesLi: {
    listStyleType: "none",
    marginBottom: 15,
    "& > div": {
      display: "flex",
      "& > div.content": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        "& > div.fileDetails": {
          fontSize: "12px",
          "& > *": {
            marginRight: "15px",
          },
        },
      },
    },
  },
  uploadedFilesListContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      width: 100,
      height: "auto",
      margin: "0 15px 15px",
      "& > img": {
        width: 100,
        height: "auto",
      },
    },
  },
});

function Documents(props) {
  const classes = useStyles();

  const [state, actions] = useContext(PatientContext);
  const { patient } = state;

  const [progress, setProgress] = useState(0);

  const form = useForm();

  const { handleSubmit } = form;

  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
    [selectedFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const files = selectedFiles.map((file) => (
    <li key={file.path} className={classes.filesLi}>
      <div>
        <div className="icon"></div>
        <div className="content">
          <div className="fileDetails">
            <span className="fileName">{file.name}</span>
            <span className="fileSize">{file.size}</span>
          </div>
          <ProgressBar variant="info" className="progress-sm" now={progress} />
        </div>
      </div>
    </li>
  ));

  let images = [
    {
      url: Img1,
      title: "image title 1",
    },
    {
      url: Img1,
      title: "image title 2",
    },
    {
      url: Img1,
      title: "image title 2",
    },
    {
      url: Img1,
      title: "image title 2",
    },
    {
      url: Img1,
      title: "image title 2",
    },
    {
      url: Img1,
      title: "image title 2",
    },
  ];

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`files`, selectedFiles[i]);
    }
    formData.append("id_patient", patient.id_patient);

    actions.addDocuments(
      formData,
      (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
      () => {
        setProgress(0);
        setSelectedFiles([]);
      }
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-5">
            <section className={`container ${classes.container}`}>
              <div {...getRootProps({ className: "dropzone", name: "files" })}>
                <input {...getInputProps()} />
                <div>
                  <div className={classes.fileSelector}>
                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      className="uploadIcon"
                    />
                    <div>
                      Drag and drop, or <span>browse</span> yours files
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className={classes.filesList}>
              <ul>{files}</ul>
              <div className="text-center">
                <Button
                  className="btn btn-sm btn-primary"
                  disabled={selectedFiles.length === 0}
                  onClick={handleSubmit(onSubmit)}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
          <div className={`col-lg-7 ${classes.uploadedFilesListContainer}`}>
            {/* {images.length > 0 &&
              images.map((img, ind) => (
                <div key={ind}>
                  <img src={img.url} />
                </div>
              ))} */}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default Documents;
