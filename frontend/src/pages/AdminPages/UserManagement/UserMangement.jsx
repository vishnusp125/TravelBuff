import React, { useEffect, useState } from 'react'
import { getUserInfo, blockUser, unblockUser } from '../../../axios/services/AdminServices'
import DataTable from 'react-data-table-component';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn } from 'mdb-react-ui-kit';


function UserManagement() {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const jwtToken = JSON.parse(localStorage.getItem('admin')).token
  async function fetchData() {
    const data = await getUserInfo(jwtToken); 
    setDetails(data);
  }

  async function unBlock(id) {
    const data = await unblockUser(jwtToken, id)
    if (data.userDetails) {
        const newDetails = details.map(user => {
            if(user._id === id) {
                return {...user, isBlocked: false}
            }
            return user;
        });
        setDetails(newDetails);
    }
  }

  async function block(id) {
    const data = await blockUser(jwtToken, id);
    if (data.userDetails) {
        const newDetails = details.map(user => {
            if(user._id === id) {
                return {...user, isBlocked: true}
            }
            return user;
        });
        setDetails(newDetails);
    }
  }

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
      width: "60px"

    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Block/Unblock',
      selector: (row) => {
        return (
          <div>
            {row.isBlocked ? (
              <MDBBtn key={row._id} style={{background:"green"}}
                onClick={() => unBlock(row._id)}
              >
                Un Block
              </MDBBtn>
            ) : (
              <MDBBtn key={row._id} style={{background:"red"}}   onClick={() => block(row._id)}>
                Block
              </MDBBtn>
            )}
          </div>
        );
      },
    }
  ]

  return (
    <div>
    <h1 style={{color:"black"}} className='text-center m-5'>User Management</h1>
      <DataTable
        columns={columns}
        data={details}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        // selectableRows
        // selectableRowsHighlight
        highlightOnHover
        pagination 
      />
    </div>
  )
}


export default UserManagement