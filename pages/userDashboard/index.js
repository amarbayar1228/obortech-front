import React from "react";
import BaseLayout from "../../components/Layout/BaseLayout";
import Head from "next/head";
const UserDashboard = () => {
  return (
    <div>
      <Head>
        <title>USER DASHBOARD | OBORTECH</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="../../public/img/OBORTECH_logo_H_clean_White.svg"
        />
      </Head>
      <BaseLayout pageName="userDashboard">dashboard</BaseLayout>
    </div>
  );
};

export default UserDashboard;
