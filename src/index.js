import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import GetData, {
  action as GetDataAction,
  loader as GetDataLoader,
} from "./Pages/GetData";
import CreateData, { action as CreateDataAction } from "./Pages/CreateData";
import UpdateData, { action as UpdateDataAction } from "./Pages/UpdateData";
import DeleteData, { loader as DeleteDataLoader } from "./Pages/DeleteData";
import IndexLayout from "./Layouts/IndexLayout";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<IndexLayout />}>
      <Route
        index
        element={<GetData />}
        loader={GetDataLoader}
        action={GetDataAction}
      />
      <Route
        path="/getItems"
        element={<GetData />}
        loader={GetDataLoader}
        action={GetDataAction}
      />
      <Route path="/createItems" element={<CreateData />} action={CreateDataAction} />
      <Route path="/updateItems" element={<UpdateData />} action={UpdateDataAction} />
      <Route path="/deleteItems" element={<DeleteData />} loader={DeleteDataLoader} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router}></RouterProvider>);
