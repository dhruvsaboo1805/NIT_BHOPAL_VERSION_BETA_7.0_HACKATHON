import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import HomeCards from "../components/HomeCards";
import TopicStudy from "../TopicStudy";
import Navbar from "../components/Navbar";
import { useTable } from "react-table";
import axios from "axios"; // Importing axios

const ApiUrl = "https://version-app-lac.vercel.app/question-list";

const columns = [
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (value === "active") {
        return ""; 
      } else if (value === "solved") {
        return "✔️"; 
      }
      return "";
    },
    style: {
      textAlign: "center",
    },
  },
  {
    Header: "Title",
    accessor: "questionName",
  },
  // {
  //   Header: "Solution",
  //   accessor: "solution",
  //   Cell: ({ value }) => (value ? <a href="#">{value}</a> : ""),
  // },
  {
    Header: "Topics",
    accessor: "topicTags",
    Cell: ({ value }) => (
      <div>
        {value && value.length > 0 ? (
          value.map((topic, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                backgroundColor: "#f0f0f0",
                padding: "3px 8px",
                margin: "2px",
                borderRadius: "12px",
                fontSize: "12px",
              }}
            >
              {topic}
            </span>
          ))
        ) : (
          <span style={{ fontStyle: "italic", color: "gray" }}>
            No topics available
          </span>
        )}
      </div>
    ),
  },
  {
    Header: "Difficulty",
    accessor: "difficulty",
    Cell: ({ value }) => {
      let difficultyColor = "";
      if (value === "easy") {
        difficultyColor = "#5cb85c"; 
      } else if (value === "medium") {
        difficultyColor = "#f0ad4e"; 
      } else if (value === "hard") {
        difficultyColor = "#d9534f"; 
      }
      return (
        <span style={{ color: difficultyColor, fontWeight: "bold" }}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      );
    },
  },
];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
   
    axios
      .get(ApiUrl)
      .then((response) => {
        setData(response.data.questions); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {/* NavBar */}
      <Navbar />

      {/* Cards */}
      <div className="home_card-container">
        {TopicStudy.map((card) => (
          <HomeCards
            key={card.id}
            imgSrc={card.image}
            title={card.topicName}
            description= {card.description}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="filters">
        <select>
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select>
          <option value="">Status</option>
          <option value="solved">Solved</option>
          <option value="attempting">Attempting</option>
        </select>

        <select>
          <option value="">Tags</option>
          <option value="arrays">Arrays</option>
          <option value="strings">Strings</option>
          <option value="dynamic programming">Dynamic Programming</option>
        </select>

        <input type="text" placeholder="Search questions" />
      </div>

      {/* Tables of problems */}
      <table
        {...getTableProps()}
        style={{
          border: "solid 1px black",
          width: "95%",
          textAlign: "left",
          borderCollapse: "collapse",
          margin: "0 auto",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "10px",
                    borderBottom: "solid 1px gray",
                    backgroundColor: "#f4f4f4",
                    textAlign: "center",
                  }}
                >
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
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      borderBottom: "solid 1px gray",
                      textAlign: "center",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
