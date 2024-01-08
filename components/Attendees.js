/*
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import { updateRegLink } from "../utils/util";
import DisableReg from "./DisableReg";




const Attendees = ({
  attendees,
  id,
  click,
  setClick,
  disableRegModal,
  setDisableRegModal,
}) => {
  const [passcode, setPasscode] = useState("");
  const [attendeeState, setAttendees] = useState(
    attendees.map((attendee) => ({
      ...attendee,
      qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
    }))
  );

  const downloadQRCode = (qrCodeData, attendeeName) => {
	const svgString = qrCodeData; // Use the raw SVG string from the QR code
	const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
	const svgUrl = URL.createObjectURL(svgBlob);
  
	const image = new Image();
	image.onload = () => {
	  const canvas = document.createElement("canvas");
	  canvas.width = image.width;
	  canvas.height = image.height;
	  const ctx = canvas.getContext("2d");
	  ctx.drawImage(image, 0, 0);
  
	  // Convert to PNG
	  const pngBlob = canvas.toDataURL("image/png");
	  const downloadLink = document.createElement("a");
	  downloadLink.href = pngBlob;
	  downloadLink.download = `QRCode_${attendeeName}.png`;
	  downloadLink.click();
  
	  URL.revokeObjectURL(svgUrl);
	};
  
	// Create an image from the SVG URL
	image.src = svgUrl;
  };
  
  const data = React.useMemo(() => attendeeState, [attendeeState]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Passcode",
        accessor: "passcode",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "QR Code",
        accessor: "qrCode",
        Cell: ({ row }) => (
			<div className="flex items-center space-x-2">
			<div>
			  <QRCode value={row.original.qrCode} />
			</div>
			<button
			  onClick={() => downloadQRCode(row.original.qrCode, row.original.name)}
			  className="text-blue-500 underline cursor-pointer"
			>
			  Download
			</button>
		  </div>
	  
        ),
      },
    ],
    []
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

  const handleSearch = () => {
    const result = attendeeState.filter((item) =>
      item.passcode.startsWith(passcode)
    );
    if (result.length > 0 && passcode !== "") {
      setAttendees(result);
    }
    if (passcode === "") {
      setAttendees(attendees);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = attendeeState.filter((item) =>
      item.passcode.startsWith(passcode)
    );
    if (result.length > 0 && passcode !== "") {
      setAttendees(result);
    }
    if (passcode === "") {
      setAttendees(attendees);
    }
  };

  return (
    <div className="bg-white w-full p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-3xl font-bold md:mb-auto mb-4">
          Liste des participants
        </h2>
        {!click && (
          <button
            className={`p-4 ${click && "hidden"} text-white rounded-md bg-[#C07F00]`}
            onClick={() => setDisableRegModal(true)}
          >
            Arretez les inscriptions
          </button>
        )}
      </div>
      {disableRegModal && (
        <DisableReg
          setDisableRegModal={setDisableRegModal}
          setClick={setClick}
          updateRegLink={updateRegLink}
          id={id}
        />
      )}

      <form
        className="w-full flex items-center justify-center mb-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border-[1px] w-[80%] rounded-lg py-2 px-4 mr-3"
          placeholder="Search via Passcode"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            handleSearch();
          }}
        />
        <button className="border-[1px] p-3 rounded-full">
          <BsSearch className="text-2xl" />
        </button>
      </form>
      <div className="overflow-y-scroll max-h-[450px]">
        <table className="relative" {...getTableProps()}>
          <thead className="sticky top-0 bg-white z-10">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendees;
*/

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import { generateID, updateRegLink } from "../utils/util";
import DisableReg from "./DisableReg";
import { useEffect } from "react";
const Attendees = ({
  attendees,
  id,
  click,
  setClick,
  disableRegModal,
  setDisableRegModal,
}) => {
  const [passcode, setPasscode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendeeState, setAttendees] = useState(
    attendees.map((attendee) => ({
      ...attendee,
      qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
    }))
  );
 
  const data = React.useMemo(() => attendeeState, [attendeeState]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Passcode",
        accessor: "passcode",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "QR Code",
        accessor: "qrCode",
        Cell: ({ row }) => (
          <div>
            <QRCode value={row.original.qrCode} />
          </div>
        ),
      },
    ],
    []
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

    const handleSearch = () => {
   if (passcode === "") {
    // If the search input is empty, show all attendees
    setAttendees(attendees);
  } else {
    // If there is a search input, filter the attendees based on it
    const result = attendees.filter(
      (item) =>
        item.passcode.toLowerCase().includes(passcode.toLowerCase()) ||
        item.name.toLowerCase().includes(passcode.toLowerCase()) ||
        item.email.toLowerCase().includes(passcode.toLowerCase())
    );

    setAttendees(result);
  }

    };
  
    const handleClearSearch = () => {
      setPasscode("");
      setAttendees(attendees); // Reset to the original state
    };
   // useEffect to handle search when the passcode changes
  useEffect(() => {
    handleSearch(passcode);
  }, [passcode]);

  // useEffect to handle search when the attendees change
  useEffect(() => {
    handleSearch(passcode);
  }, [attendees]);

    
 const newpasscode = generateID();
 
 const handleSubmit = (e) => {
  e.preventDefault();

  // Check if both name and email are provided
  if (!name || !email) {
    alert("Please provide both name and email.");
    return;
  }

    // Check if an attendee with the same email already exists
    if (attendeeState.some((attendee) => attendee.email === email)) {
      alert("User with the same email already exists.");
      return;
    }

    // Create a new user object
    const newUser = {
      passcode: newpasscode,
      name,
      email,
      qrCode: `Passcode: ${passcode}\nName: ${name}\nEmail: ${email}`,
    };

    // Update the state with the new user
    setAttendees([...attendeeState, newUser]);

  // Clear the form fields
  setPasscode("");
  setName("");
  setEmail("");
};

    // Function to handle user deletion
    const handleDelete = (emailToDelete) => {
      const updatedAttendees = attendeeState.filter(
        (attendee) => attendee.email !== emailToDelete
      );
      setAttendees(updatedAttendees);
    };
  
  
  

return (
  <div className="bg-white w-full p-8">
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <h2 className="text-3xl font-bold md:mb-auto mb-4">
        Liste des participants
      </h2>
      {!click && (
        <button
          className={`p-4 ${click && "hidden"} text-white rounded-md bg-[#C07F00]`}
          onClick={() => setDisableRegModal(true)}
        >
          Arretez les inscriptions
        </button>
      )}
    </div>
    {disableRegModal && (
      <DisableReg
        setDisableRegModal={setDisableRegModal}
        setClick={setClick}
        updateRegLink={updateRegLink}
        id={id}
      />
    )}
    <input
  type="text"
  className="border-[1px] w-[80%] rounded-lg py-2 px-4 mr-3"
  placeholder="Search"
  value={passcode}
  onChange={(e) => {
    setPasscode(e.target.value);
    handleSearch();
  }}
/>
<button
          type="button"
          className="border-[1px] p-3 rounded-full"
          onClick={handleClearSearch}
        >
          Clear Search
        </button>
    <form
      className="w-full flex items-center justify-center mb-6"
      onSubmit={handleSubmit}
    >
  


      <input
        type="text"
        className="border-[1px] w-[20%] rounded-lg py-2 px-4 mr-3"
        placeholder="Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
      />
      <input
        type="text"
        className="border-[1px] w-[20%] rounded-lg py-2 px-4 mr-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="border-[1px] w-[20%] rounded-lg py-2 px-4 mr-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="border-[1px] p-3 rounded-full">Add User</button>
    </form>

    <div className="overflow-y-scroll max-h-[450px]">
      <table className="relative" {...getTableProps()}>
        <thead className="sticky top-0 bg-white z-10">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                                  {/* Add a delete button */}
                                  <td>
                    <button
                      onClick={() => handleDelete(row.original.email)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
        }
        export default Attendees