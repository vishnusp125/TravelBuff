import MainDash from "../../../Components/AdminComponents/MainDash/MainDash";
import Sidebar from "../../../Components/AdminComponents/Siderbar/Sidebar";
// import '../../components/AdminComponents/App.css'
import styled from 'styled-components';

const AdminHome = () => {
  // set the page to show
  // const page = useSelector((state) => state.admin.currentPage);

  const App = styled.div`
 color: var(--black);
 background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
`;

  const AppGlass = styled.div`
  display: grid;
  height: 97%;
  width: 97%;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  border-radius: 2rem;
  gap: 16px;
  grid-template-columns: 11rem auto 20rem;
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 10% 50% auto;
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
          <Sidebar />
          <MainDash />
          {/* {page === 'dashbord' && <MainContent />}
      {page === 'users' && <UserManagement />}
      {page === 'quiz' && <QuizManagementPage />}
      {page === 'quizadding' && <QuizAddingPage />}
      {page === 'report' && <ReportPage />} */}
        </AppGlass>
      </App>
    </>
  );
};

export default AdminHome;