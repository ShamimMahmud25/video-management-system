import { resetUpdateVideoState } from "@/slices/videoSlice";
import { Grid, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SucessComponent from "./SucessComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import { useUpdateVideoById } from "@/hooks/useUpdateVideoById";

export default function EditVideo({
  url,
  description,
  title,
  handleCancel,
  video,
}) {
  const dispatch = useDispatch();
  const { handleUpdate, loading } = useUpdateVideoById();
  const videoData = useSelector((state) => state.videos);
  const [newUrl, setNewUrl] = useState(url);
  const [showUpdate, setShowUpdate] = useState(true);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
    if (e.target.value == "") {
      setUrlError("this field is mendatory");
    } else {
      setUrlError("");
    }
  };
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    if (e.target.value == "") {
      setTitleError("this field is mendatory");
    } else {
      setTitleError("");
    }
  };
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    if (e.target.value == "") {
      setDescriptionError("this field is mendatory");
    } else {
      setDescriptionError("");
    }
  };
  const handleUpdateBtn = () => {
    setShowUpdate(false);
    const data = {
      url: newUrl,
      title: newTitle,
      description: newDescription,
      _id: video._id,
    };
    handleUpdate(data);
  };
  useEffect(() => {
    return () => {
      dispatch(resetUpdateVideoState());
    };
  }, []);
  return (
    <div>
      <div className="page-title">Edit video</div>
      {showUpdate && (
        <Grid container className="edit-container">
          <Grid item className="edit-item-container">
            <TextField
              id="outlined-basic"
              label="URL"
              multiline
              maxRows={4}
              value={newUrl}
              onChange={handleUrlChange}
              className="edit-item"
              error={urlError !== ""}
              helperText={urlError}
            />
            <TextField
              id="outlined-basic"
              label="Title"
              multiline
              maxRows={4}
              value={newTitle}
              onChange={handleTitleChange}
              className="edit-item"
              error={titleError !== ""}
              helperText={titleError}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              multiline
              maxRows={4}
              value={newDescription}
              onChange={handleDescriptionChange}
              className="edit-item"
              error={descriptionError !== ""}
              helperText={descriptionError}
            />
            <Grid className="flex justify-start space-x-20 items-end mt-20">
              <Button
                onClick={handleUpdateBtn}
                className="update-button btn"
                variant="contained"
                disabled={
                  urlError != "" ||
                  titleError != "" ||
                  descriptionError != "" ||
                  newUrl === "" ||
                  newTitle === "" ||
                  newDescription === ""
                }
              >
                Update
              </Button>
              <Button
                onClick={handleCancel}
                className="cancel-button btn"
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!showUpdate && (
        <>
          {loading && <LoadingComponent message="Updating....." />}
          {!loading && videoData.updateVideoError && (
            <ErrorComponent
              message={videoData.updateVideoError}
              onBtnClicked={handleCancel}
              buttonText="Okay"
            />
          )}
          {!loading && videoData.updateVideoSuccess && (
            <SucessComponent
              message="Update sucessfully"
              onBtnClicked={handleCancel}
              buttonText="Okay"
            />
          )}
        </>
      )}
    </div>
  );
}
