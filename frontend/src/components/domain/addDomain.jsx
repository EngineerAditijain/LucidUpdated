import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Edit from "../../Edit code.svg";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";
import { PublishLoader } from "../PublishLoader/loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

export default function AddDomain({
  view,
  setView,
  refetchHost,
  selectedZone,
//   setLoading,
//   loading,
  setRefetchHost
}) {
  const [loading, setLoading] = React.useState(false);
  const [item, setItem] = React.useState({Name:""});
  const history = useHistory();
 
  const handleClose = () => setView(false);


  const handleNameChange = (event) => {
    // Update the 'name' property in the 'item' state when the input changes
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const token = localStorage.getItem("token");

  const handleEdit = () => {
    setLoading(true);
    let userData = {
        domainName: item.Name,
        };

    // console.log("userData",userData);
    axios
      .post(
        `${window.location.origin}/createHostedZone`,
        {
          ...userData,
        //   hostedZoneId: selectedZone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      )
      .then((res) => {
        // alert(res.data.message);
        setLoading(false);
        history.push("/home");
        setRefetchHost(!refetchHost);
      });

    setView(false);
  };

  return (
    <div>
      {loading ? (
        <>
          <PublishLoader open={loading} />
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
              <label>Enter Domain Name :</label>
              <input
                type="text"
                name="Name"
                value={item.Name}
                onChange={handleNameChange}
                style={{border:"2px solid black"}}
              ></input>
            
              

              
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
