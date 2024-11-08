import React from "react";
import "../styles/Home.css";
import HomeCards from "../components/HomeCards";
import HomeCardsData from "../HomeCardsData";
import data from "../ProblemsData";
import { useTable } from "react-table";

const columns = [
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Solution",
    accessor: "solution",
    Cell: ({ value }) => (value ? <a href="#">{value}</a> : ""),
  },
  {
    Header: "Difficulty",
    accessor: "difficulty",
  },
];
const Home = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      {/* NavBar */}
      <div className="navbar">
        <div className="navbar-left">
          <div className="logo">⚙️</div>
          <nav>
            {/* <a href="#explore">Explore</a> */}
            <a href="#problems">Problems</a>
            <a href="#contest">Contest</a>
            <a href="#discuss">Discuss</a>
          </nav>
        </div>
        <div className="navbar-right">
          <div className="icon">🔔</div>
          <div className="flame">🔥 257</div>
          <div className="profile">👤</div>
        </div>
      </div>

      {/* Cards */}
      <div className="home_card-container">
        {HomeCardsData.map((card) => (
          <HomeCards
            key={card.id}
            imgSrc={card.imgSrc}
            title={card.title}
            description={card.description}
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

      {/* tables of problems */}
      <table
        {...getTableProps()}
        style={{ border: "solid 1px black", width: "100%", textAlign: "left" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ padding: "10px", borderBottom: "solid 1px gray" }}
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
                    style={{ padding: "10px", borderBottom: "solid 1px gray" }}
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
