import MainDash from "../../../Components/AdminComponents/MainDash/MainDash";
import Sidebar from "../../../Components/AdminComponents/Siderbar/Sidebar";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "../UserManagement/UserMangement";
import GuideMangement from "../GuideManagement/GuideMangement";
import GuideProfile from "../GuideProfile/GuideProfile";

const AdminHome = () => {
  const navigate = useNavigate();
  const [pages, setPage] = useState('dashboard')
  console.log('pages', pages);
  useEffect(() => {
    const token = localStorage.getItem('admin');
    if (!token) {
      navigate('/adminLogin');
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const App = styled.div`
 color: "black";
 background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

  const AppGlass = styled.div`
  display: grid;
  height: 97%;
  width: 97%;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  border-radius: 2rem;
  gap: 16px;
  grid-template-columns: 11rem auto 1rem;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 20% 50% auto;
    overflow-y: scroll;
}
@media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
}
`;

  return (
    <>
      <App>
        <AppGlass>
          <Sidebar setPage={setPage} />
          {pages === 'dashboard' && <MainDash />}
          {pages === 'users' && <UserManagement />}
          {pages === 'guides' && <GuideMangement />}
          {pages === 'approvals' && <GuideProfile />}
        </AppGlass>
      </App>
    </>
  );
};

export default AdminHome;