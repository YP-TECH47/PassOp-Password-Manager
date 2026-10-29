import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [siteName, setsiteName] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    localStorage.getItem("formDetails") &&
      setformDetails(JSON.parse(localStorage.getItem("formDetails")));

   
  }, []);

  const [formDetails, setformDetails] = useState([]);

  const [editId, seteditId] = useState(null);

  const handelSave = () => {
    const newEntry = {
      id: Date.now(),
      Sitename: siteName,
      Username: userName,
      Password: password,
    };

    setformDetails([...formDetails, newEntry]);

    clearFields();
    savetoocalstorage([...formDetails, newEntry]);
     toast("🦄 Wow so easy!", {
      position: "bottom-right",
      autoClose: 3,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 5000,
      theme: "light",
      transition: "Bounce",
    });
  };
  const savetoocalstorage = (e) => {
    localStorage.setItem("formDetails", JSON.stringify(e));
  };
  const handelDelete = (id) => {
    const updatedList = formDetails.filter((item) => item.id !== id);

    setformDetails(updatedList);
    savetoocalstorage(updatedList);
  };

  const handelEdit = (item) => {
    setsiteName(item.Sitename);
    setuserName(item.Username);
    setpassword(item.Password);

    seteditId(item.id);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handelShow = (e) => {
    setShow(!show);
    if (show) {
      imagecontent = "src/assets/eye_open.png";
    } else {
      imagecontent = "src/assets/eye_close.png";
    }
  };

  const handelUpdate = () => {
    const updatedList = formDetails.map((item) => {
      if (item.id === editId) {
        return {
          ...item,
          Sitename: siteName,
          Username: userName,
          Password: password,
        };
      }

      return item;
    });

    setformDetails(updatedList);

    seteditId(null);

    clearFields();
    savetoocalstorage(updatedList);
  };

  const clearFields = () => {
    setsiteName("");
    setuserName("");
    setpassword("");
  };

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen  transform bg-green-300 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]    p-10 rounded-lg shadow-lg mx-auto mt-20 flex flex-col items-center">
      <input
        className="text-white p-2 bg-gray-500 rounded-2xl w-full col-auto border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="Enter Site"
        value={siteName}
        onChange={(e) => setsiteName(e.target.value)}
      />

      <br />
      <br />

      <input
        className="text-white p-2 bg-gray-500 rounded-2xl w-full col-auto border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="Enter Username"
        value={userName}
        onChange={(e) => setuserName(e.target.value)}
      />

      <br />
      <br />

      <div className="passwords flex items-center gap-2   w-full">
        <input
          className="text-white p-2 bg-gray-500 rounded-2xl w-full col-auto border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={handelShow}>
          <img
            className="w-7 h-7"
            src={show ? "src/assets/eye_close.png" : "src/assets/eye_open.png"}
            alt="eyeimage"
          />
        </button>
      </div>
      <br />
      <br />

      {editId ? (
        <button
          className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          onClick={handelUpdate}
          disabled={!siteName || !userName || !password}
        >
          Update
        </button>
      ) : (
        <button
          className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          onClick={handelSave}
          disabled={!siteName || !userName || !password}
        >
          <lord-icon
            src="https://cdn.lordicon.com/laducuyh.json"
            trigger="hover"
          ></lord-icon>
          Save
        </button>
      )}

      <hr />

      <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

      <table className="table-auto w-full rounded-md overflow-hidden mb-10">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="py-2">Site</th>
            <th className="py-2">Username</th>
            <th className="py-2">Password</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-green-100">
          {formDetails.map((item, index) => {
            return (
              <tr key={index}>
                <td className="py-2 border border-white text-center">
                  <div className="flex items-center justify-center ">
                    <a href={item.Sitename} target="_blank">
                      {item.Sitename}
                    </a>
                    <div
                      className="lordiconcopy size-7 cursor-pointer"
                      onClick={() => {
                        copyText(item.Sitename);
                      }}
                    >
                      <lord-icon
                        style={{
                          width: "25px",
                          height: "25px",
                          paddingTop: "3px",
                          paddingLeft: "3px",
                        }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                      ></lord-icon>
                    </div>
                  </div>
                </td>
                <td className="py-2 border border-white text-center">
                  <div className="flex items-center justify-center ">
                    <span>{item.Username}</span>
                    <div
                      className="lordiconcopy size-7 cursor-pointer"
                      onClick={() => {
                        copyText(item.Username);
                      }}
                    >
                      <lord-icon
                        style={{
                          width: "25px",
                          height: "25px",
                          paddingTop: "3px",
                          paddingLeft: "3px",
                        }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                      ></lord-icon>
                    </div>
                  </div>
                </td>
                <td className="py-2 border border-white text-center">
                  <div className="flex items-center justify-center ">
                    <span>{item.Password}</span>
                    <div
                      className="lordiconcopy size-7 cursor-pointer"
                      onClick={() => {
                        copyText(item.Password);
                      }}
                    >
                      <lord-icon
                        style={{
                          width: "25px",
                          height: "25px",
                          paddingTop: "3px",
                          paddingLeft: "3px",
                        }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                      ></lord-icon>
                    </div>
                  </div>
                </td>
                <td className="justify-center py-2 border border-white text-center">
                  <span
                    className="cursor-pointer mx-1"
                    onClick={() => {
                      handelEdit(item);
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </span>
                  <span
                    className="cursor-pointer mx-1"
                    onClick={() => {
                      handelDelete(item.id);
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </div>
  );
}

export default App;
