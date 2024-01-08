
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import { updateRegLink } from "../utils/util";
import DisableReg from "./DisableReg";
import { generateID } from "../utils/util";
import { useEffect } from "react";


const Attendees = ({
  attendees,
  id,
  click,
  setClick,
  disableRegModal,
  setDisableRegModal,
}) => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [passcode, setPasscode] = useState("");
  const [attendeeState, setAttendees] = useState(
    attendees.map((attendee) => ({
      ...attendee,
      qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
    }))
  );
  const downloadQRCode = (qrCodeData, attendeeName) => {
    const svgString = qrCodeData;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `QRCode_${attendeeName}.svg`;
  
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original.email)}
            className="text-red-500"
          >
            Delete
          </button>
        ),
      }
    ],
    []
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

const handleReset = ()=>{
  setAttendees(
    attendees.map((attendee) => ({
      ...attendee,
      qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
    }))
  );
}
    const handleSearch = () => {
      if (passcode === "") {
        handleReset();
      } else {
        const result = attendees.filter(
          (item) =>
            item.passcode.toLowerCase().includes(passcode.toLowerCase()) ||
            item.name.toLowerCase().includes(passcode.toLowerCase()) ||
            item.email.toLowerCase().includes(passcode.toLowerCase())
        );
  
        setAttendees(
          result.map((attendee) => ({
            ...attendee,
            qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
          }))
        );
      }
    };

      // useEffect to handle search when the passcode changes
  useEffect(() => {
    handleSearch(passcode);
  }, [passcode]);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Entrez votre nom et votre email svp!.");
      return;
    }

    if (attendeeState.some((attendee) => attendee.email === email)) {
      alert("Cet utilisateur existe deja.");
      return;
    }

    const newPasscode = generateID();
    const newUser = {
      passcode: newPasscode,
      name,
      email,
      qrCode: `Passcode: ${newPasscode}\nName: ${name}\nEmail: ${email}`,
    };

    setAttendees([...attendeeState, newUser]);

    setPasscode("");
    setName("");
    setEmail("");
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


 /* const handleSearch = useCallback(() => {
    if (passcode === "") {
      setAttendees(
        attendees.map((attendee) => ({
          ...attendee,
          qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
        }))
      );
    } else {
      const result = attendees.filter(
        (item) =>
          item.passcode.toLowerCase().includes(passcode.toLowerCase()) ||
          item.name.toLowerCase().includes(passcode.toLowerCase()) ||
          item.email.toLowerCase().includes(passcode.toLowerCase())
      );

      setAttendees(
        result.map((attendee) => ({
          ...attendee,
          qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
        }))
      );
    }
  }, [passcode, attendees]);

  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
  }, [passcode, attendees, debouncedSearch]);

  const handleClearSearch = () => {
    setPasscode("");
    setAttendees(
      attendees.map((attendee) => ({
        ...attendee,
        qrCode: `Passcode: ${attendee.passcode}\nName: ${attendee.name}\nEmail: ${attendee.email}`,
      }))
    );
  };
import React, { useState, useEffect, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import { useTable } from "react-table";
import QRCode from "qrcode.react";
import { generateID, updateRegLink } from "../utils/util";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendeeState, setAttendees] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please provide both name and email.");
      return;
    }

    if (attendeeState.some((attendee) => attendee.email === email)) {
      alert("User with the same email already exists.");
      return;
    }

    const newPasscode = generateID();
    const newUser = {
      passcode: newPasscode,
      name,
      email,
      qrCode: `Passcode: ${newPasscode}\nName: ${name}\nEmail: ${email}`,
    };

    setAttendees([...attendeeState, newUser]);

    setPasscode("");
    setName("");
    setEmail("");
  };

 

  const handleDelete = (emailToDelete) => {
    const updatedAttendees = attendeeState.filter(
      (attendee) => attendee.email !== emailToDelete
    );
    setAttendees(updatedAttendees);
  };

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
           
              className="text-blue-500 underline cursor-pointer"
            >
              Download
            </button>
          </div>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original.email)}
            className="text-red-500"
          >
            Delete
          </button>
        ),
      },
    ],

  );

  const table = useTable({ columns, data: attendeeState });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

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

      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          className="border-[1px] w-[80%] rounded-lg py-2 px-4 mr-3"
          placeholder="Search"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
          
          }}
        />
        <button
          type="button"
          className="border-[1px] p-3 rounded-full"
          
        >
          Clear Search
        </button>
      </div>

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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendees;*/
