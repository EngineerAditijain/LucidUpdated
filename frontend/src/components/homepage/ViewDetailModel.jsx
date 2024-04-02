import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Edit from "../../Edit code.svg";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { PublishLoader } from "../PublishLoader/loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  view,
  setView,
  item,
  setItem,
  refetch,
  setRefetch,
  selectedZone,
}) {
  const [edit, setEdit] = React.useState(false);
  const [updatedResourcesRecord, setUpdatedResourcesRecord] = React.useState(
    item.ResourceRecords
  );
  let options = [
    "A",
    "AAAA",
    "CAA",
    "CNAME",
    "DS",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
    "DNSSEC",
  ];
  const handleOpen = () => setView(true);
  const handleClose = () => setView(false);
  const handleInputChange = (index, value) => {
    let updatedRecord = [...item.ResourceRecords];
    updatedRecord[index].Value = value;
    setUpdatedResourcesRecord(updatedRecord);
  };

  const handleNameChange = (event) => {
    // Update the 'name' property in the 'item' state when the input changes
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    setEdit(true);
    let userData = {
      Name: item.Name,
      Type: item.Type,
      TTL: item.TTL,
      ResourceRecords: updatedResourcesRecord
        ? updatedResourcesRecord
        : item.ResourceRecords,
    };

    // console.log("userData",userData);
    axios
      .put(
        `${window.location.origin}/updateRecordSet`,
        {
          ...userData,
          hostedZoneId: selectedZone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      )
      .then((res) => {
        // alert(res.data.message);
        setEdit(false);
        setRefetch(!refetch);
      });

    setView(false);
  };

  return (
    <div>
      {edit ? (
        <>
          <PublishLoader open={edit} />
        </>
      ) : (
        <Modal
          open={view}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label>Name :</label>
              <input
                type="text"
                name="Name"
                value={item.Name}
                onChange={handleNameChange}
              ></input>
              <label>TTL :</label>
              <input
                type="number"
                name="TTL"
                value={item.TTL}
                onChange={handleNameChange}
              ></input>
              <label>Type : </label>
              <Select
                value={item.Type}
                onChange={handleNameChange}
                name="Type"
                displayEmpty
                size="small"
                sx={{
                  minWidth: "120px",
                  background: "#DFDCF7",
                  borderRadius: "5px",
                  "& .MuiSelect-selectMenu": {
                    color: "#5262bc", // Custom color for selected value
                  },
                  "& .MuiInputLabel-root": {
                    color: "#5262bc", // Custom color for label
                  },
                  "& .MuiInputBase-root": {
                    color: "#5262bc", // Custom color for entered text
                  },
                }}
              >
                {options.map((item, ind) => (
                  <MenuItem value={item} key={ind}>
                    {item}
                  </MenuItem>
                ))}
              </Select>

              <div>
                {item.ResourceRecords?.map((record, index) => (
                  <div key={index}>
                    <label>{`Ip address ${index + 1}: `}</label>
                    <input
                      type="text"
                      value={record.Value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  className="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                >
                  Save
                </Button>
                <Button
                  className="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // setEdit(false);
                    setView(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
