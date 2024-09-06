// import { render, screen, fireEvent } from "@testing-library/react";
// // import "@testing-library/jest-dom/extend-expect";
// import MyTable from "../components/Table";
// import React from "react";

// const mockJobsites = [
//   { id: 1, name: "Jobsite 1", status: "ONHOLD" },
//   { id: 2, name: "Jobsite 2", status: "COMPLETED" },
//   { id: 3, name: "Jobsite 3", status: "ONPROGRESS" },
// ];

// // Mock fetch call
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(mockJobsites),
//   })
// );

// describe("MyTable Component", () => {
//   it("renders correctly and displays jobsite data", async () => {
//     render(
//       <MyTable showModal={() => {}} setIsFullScreenModalOpen={() => {}} />
//     );

//     // Check if the search input is rendered
//     expect(screen.getByPlaceholderText("Search jobsite")).toBeInTheDocument();

//     // Check if the create button is rendered
//     expect(screen.getByText("Create")).toBeInTheDocument();

//     // Check if jobsite names are rendered
//     expect(await screen.findByText("Jobsite 1")).toBeInTheDocument();
//     expect(await screen.findByText("Jobsite 2")).toBeInTheDocument();
//     expect(await screen.findByText("Jobsite 3")).toBeInTheDocument();
//   });

//   it("filters jobsite data based on search input", async () => {
//     render(
//       <MyTable showModal={() => {}} setIsFullScreenModalOpen={() => {}} />
//     );

//     // Check if the search input is rendered
//     const searchInput = screen.getByPlaceholderText("Search jobsite");
//     fireEvent.change(searchInput, { target: { value: "Jobsite 1" } });

//     // Check if filtered jobsite is rendered
//     expect(await screen.findByText("Jobsite 1")).toBeInTheDocument();
//     expect(screen.queryByText("Jobsite 2")).not.toBeInTheDocument();
//     expect(screen.queryByText("Jobsite 3")).not.toBeInTheDocument();
//   });
// });
