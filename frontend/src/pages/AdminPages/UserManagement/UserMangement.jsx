import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getUsers } from '../../../redux/api.js'
import axios from 'axios';
import Sidebar from '../../../Components/AdminComponents/Siderbar/Sidebar'
import BasicTable from '../../../Components/AdminComponents/Table/Table'
import styled from 'styled-components';
import TableComponent from '../../../Components/AdminComponents/TableComponent';

function UserManagement() {

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
// const {users,loading} = useSelector((state) => ({...state.user}))
// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(getUsers());
// },[]);
// console.log(users);
// // console.log(user); 
// console.log('helooooooooo');
// if(loading) {
//   return <h2>Loading ....</h2>
// }


// const [userDetails, setuserDetails] = useState([]);

// useEffect(() => {
//   const getDetails = async () => {
//     try{
//       const response = await getUsers()
//       console.log(response.data);
//     } catch(error) {
//       console.log(error);
//     }
//   }
// })
  return (

    <>
    <App>
    <AppGlass>
      <Sidebar/>
      {/* <div>
        {users.map((item, index) => <h2>Users</h2>)}
      </div> */}
      <TableComponent/>
      </AppGlass>
      </App>
    </>
  )
}

export default UserManagement