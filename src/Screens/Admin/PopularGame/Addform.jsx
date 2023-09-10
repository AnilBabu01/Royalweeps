import React, { useState } from "react";
import camera from "../../../assets/camera.png";
import Swal from "sweetalert2";
import { backendApiUrl } from "../../../config/config";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const formData = new FormData();

function Addform({ setOpen }) {
  const [gamename, setgamename] = useState("");
  const [gameversion, setgameversion] = useState("");
  const [gamedownloads, setgamedownloads] = useState("");
  const [gamebonus, setgamebonus] = useState("");
  const [gameurl, setgameurl] = useState("");
  const [img1, setimg1] = useState("");
  const [previewprofile1, setpreviewprofile1] = useState("");
  const [showloader, setshowloader] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setshowloader(true);
      formData.set("gamename", gamename);
      formData.set("gameversion", gameversion);
      formData.set("gamedownload", gamedownloads);
      formData.set("gamebonus", gamebonus);
      formData.set("downloadurl", gameurl);
      formData.set("gameimg", img1);

      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("tokengame")}`;

      const res = await axios.post(`${backendApiUrl}populargame`, formData);

      if (res?.status) {
        setOpen(false);
        setshowloader(false);
        Swal.fire("Great!", res?.data?.msg, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <form onSubmit={handlesubmit}>
            <div style={{ marginTop: "0.2rem" }}>
              <label htmlFor="dharamshalaname">Game Name</label>
              <input
                style={{ width: "100%", marginTop: "0.2rem" }}
                type="textarea"
                id="dharamshalaname"
                placeholder="enter the game name"
                className="forminput_add_user10"
                value={gamename}
                name="gamename"
                onChange={(e) => setgamename(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "0.2rem" }}>
              <label htmlFor="dharamshalaname">Game Version</label>
              <input
                style={{ width: "100%", marginTop: "0.2rem" }}
                type="textarea"
                id="dharamshalaname"
                placeholder="enter the game Version"
                className="forminput_add_user10"
                value={gameversion}
                name="gameversion"
                onChange={(e) => setgameversion(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "0.2rem" }}>
              <label htmlFor="dharamshalaname">Game Downloads</label>
              <input
                style={{ width: "100%", marginTop: "0.2rem" }}
                type="textarea"
                id="dharamshalaname"
                placeholder="enter the game Downloads"
                className="forminput_add_user10"
                value={gamedownloads}
                name="gamedownloads"
                onChange={(e) => setgamedownloads(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}>
              <label htmlFor="dharamshalaname">Game Bonus</label>
              <input
                style={{ width: "100%", marginTop: "0.5rem" }}
                type="textarea"
                id="dharamshalaname"
                placeholder="enter the game Bonus"
                className="forminput_add_user10"
                value={gamebonus}
                name="gamebonus"
                onChange={(e) => setgamebonus(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}>
              <label htmlFor="dharamshalaname">Game Url</label>
              <input
                style={{ width: "100%", marginTop: "0.5rem" }}
                type="textarea"
                id="dharamshalaname"
                placeholder="enter the game Url"
                className="forminput_add_user10"
                value={gameurl}
                name="gameurl"
                onChange={(e) => setgameurl(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              {previewprofile1 ? (
                <>
                  <div className="main_img_divvvv">
                    <img className="dharamshala_imgggg" src={previewprofile1} />
                  </div>
                </>
              ) : (
                <>
                  <div className="main_img_divvvv">
                    <img src={camera} />
                  </div>
                </>
              )}

              <div className="formdivvv_imf">
                <input
                  type="file"
                  onChange={(e) => {
                    setimg1(e.target.files[0]);

                    setpreviewprofile1(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>

            <div className="save-div-btn">
              <button className="save-div-btn-btn">
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: "21px",
                      height: "21px",
                      color: "white",
                    }}
                  />
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="save-div-btn-btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addform;
