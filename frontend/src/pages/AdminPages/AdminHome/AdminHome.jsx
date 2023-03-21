import MainDash from "../../../Components/AdminComponents/MainDash/MainDash";
import Sidebar from "../../../Components/AdminComponents/Siderbar/Sidebar";
// import styled from 'styled-components';
import { useState } from "react";
import UserManagement from "../UserManagement/UserMangement";
import GuideMangement from "../GuideManagement/GuideMangement";
import GuideProfile from "../GuideProfile/GuideProfile";
import BookingsMgt from "../BookingsMgt/BookingsMgt";

const AdminHome = () => {
  const [pages, setPage] = useState('dashboard')

  //   const App = styled.div`
  //  color: "black";
  //  background-image: linear-gradient(120deg, #ffff 0%, #ffff 100%);
  //   height: 100vh;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // `;

  //   const AppGlass = styled.div`
  //   display: grid;
  //   height: 100%;
  //   width: 100%;
  //   background-image: linear-gradient(to top, #eee5fc 0%, #eee5fc 100%);
  //   ${'' /* gap: 16px;x */}
  //   grid-template-columns: 11rem auto 2rem;
  //   overflow-y:scroll;
  // @media screen and (max-width: 1200px) {
  //     ${'' /* grid-template-columns: 20% 50% auto; */}
  //     overflow-y: scroll;
  // }
  // @media screen and (max-width: 768px) {
  //     grid-template-columns: 1fr;
  //     overflow-y:scroll;
  // }
  // `;
  return (
    <div>
      <Sidebar setPage={setPage} />
      <div style={{ marginLeft: "210px",marginTop:"50px"}}>
        {/* <App> */}
        {/* <AppGlass> */}
        {pages === 'dashboard' && <MainDash />}
        {pages === 'users' && <UserManagement />}
        {pages === 'guides' && <GuideMangement />}
        {pages === 'approvals' && <GuideProfile />}
        {pages === 'bookings' && <BookingsMgt />}
        {/* </AppGlass> */}
        {/* </App> */}
      </div>
    </div>
  );
};

export default AdminHome;