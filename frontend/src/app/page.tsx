"use client";

import { Suspense } from "react";
import Loading from "./loading";
import withAuth from "./utils/withAuth";
import loading from "./loading";

const Home = () => {
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      {/* <p className="text-bankmeBlue text-5xl font-bold">Bankme</p> */}
      {/* <Suspense fallback={<p>Loading...</p>}></Suspense> */}
      <p>Home page</p>
    </div>
  );
};

export default withAuth(Home);
