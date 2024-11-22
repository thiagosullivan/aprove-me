"use client";

import { Suspense } from "react";
import withAuth from "./utils/withAuth";

const Home = () => {
  return (
    <div>
      <p>Home page</p>
    </div>
  );
};

export default withAuth(Home);
