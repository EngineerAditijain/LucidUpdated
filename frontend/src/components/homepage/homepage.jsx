import React, { useEffect, useState } from "react";
import "./homepage.css";
import Header from "../Header/header";
import Table from "../Table/table";
import ViewDetailModel from "./ViewDetailModel";
import axios from "axios";
import img1 from "../../images.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeHeader from "./header/homeHeader";
import { Box, LinearProgress, Typography } from "@mui/material";
import { PublishLoader } from "../PublishLoader/loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Homepage = ({
  user,
  selectedZone,
  setSelectedZone,
  setSubheader,
  loading,
  setLoading,
}) => {
  const [list, setList] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [item, setItem] = useState({});
  const [view, setView] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [refetchHost, setRefetchHost] = useState(false);
  const token = localStorage.getItem("token");
  const [selectedDomainDetail, setSelectedDomainDetail] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);

  useEffect(() => {
    setLoading(true); // Set loading state to true before API call

    axios
      .get(`${window.location.origin}/getHostedZone`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      })
      .then((res) => {
        setDomainList(res.data?.data);
        setSelectedZone(res.data?.data[0].Id);
        setSubheader(res.data?.data[0].Name);
        setRefetch(!refetch)
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast("something goes wrong with Network!");
      })
      .finally(() => {
        // setLoading(false); // Set loading state to false after API call completes
      });
  }, [refetchHost]);

  useEffect(() => {
    setLoading(true);
    const selectedDomainObject = domainList.find(
      (domain) => domain.Id === selectedZone
    );
    if(selectedDomainObject){
        setSelectedDomainDetail(selectedDomainObject);
        setSubheader(selectedDomainObject.Name);
    }
    
    {
      selectedZone.length > 0 &&
        axios
          .get(`${window.location.origin}/getAllRecordSets`, {
            params: {
              hostedZoneId: selectedZone,
            },
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request headers
            },
          })
          .then((res) => {
            let dummy = [];
            res?.data?.records.map((item, index) => {
              dummy.push({
                id: index + 1,
                // IP:item?.ResourceRecords,
                ...item,
              });
            });

            setList(dummy);
            setFilteredData(dummy);
          })
          .catch((error) => {
            console.error("Error:", error.message);
            toast("something goes wrong with Network!");
          })
          .finally(() => {
            setLoading(false); // Set loading state to false after API call completes
          });
    }
  }, [refetch,selectedZone]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = list.filter(
      (item) =>
        (item.email &&
          typeof item.email === "string" &&
          item.email.toLowerCase().includes(searchInput.toLowerCase())) ||
        (typeof item.phone === "number" &&
          item.phone.toString().includes(searchInput.toLowerCase())) ||
        (item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(searchInput.toLowerCase()))
    );

    setFilteredData(filtered);
  }, [searchInput]);

  const [sortType, setSortType] = useState(null);

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleDelete = ({ item }) => {
    setItem(item);
    doDelete();
  };
  const doDelete = async (item) => {
    setLoading(true);
    try {
      // Set loading state to true before API call

      const response = await axios.delete(
        `${window.location.origin}/deleteRecord`,
        {
          data: {
            ...item,
            hostedZoneId: selectedZone,
          },
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );

      if (response.status === 200) {
        console.log("User deleted successfully:", response.data.message);
        setRefetch(!refetch);
        toast.success("Record Deleted successfully");
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.error("Error deleting user:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading state to false after API call completes (success or error)
    }
  };

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("storedList"));
    if (storedList) {
      setList(storedList);
    }
    const storedSortType = localStorage.getItem("storedSortType");
    if (storedSortType) {
      setSortType(storedSortType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storedList", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("storedSortType", sortType);
  }, [sortType]);

  return (
    <>
      {loading ? (
        <>
          <PublishLoader open={loading} />
        </>
      ) : (
        <div className="homepage">
          <Header user={user} />

          <div className="container">
            <ToastContainer />
            {selectedZone.length > 0 && (
              <HomeHeader
                filteredData={filteredData}
                domainList={domainList}
                setSelectedZone={setSelectedZone}
                selectedZone={selectedZone}
                setSubheader={setSubheader}
                selectedDomainDetail={selectedDomainDetail}
                refetchHost={refetchHost}
                setRefetchHost={setRefetchHost}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {filteredData.length > 0 && selectedZone.length > 0 ? (
                <>
                  <div
                    style={{
                      width: "95%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginLeft: "2%",
                    }}
                  >
                    <Typography>Record Details -</Typography>
                    <Table
                      filteredData={filteredData}
                      setView={setView}
                      setItem={setItem}
                      doDelete={doDelete}
                    />
                    <ViewDetailModel
                      view={view}
                      setView={setView}
                      item={item}
                      setItem={setItem}
                      refetch={refetch}
                      setRefetch={setRefetch}
                      selectedZone={selectedZone}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      alignItems: "center",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img src={img1} />
                    No data
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
