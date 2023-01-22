import React, { useEffect, useState } from 'react'
import { getUserInfo, blockUser, unblockUser } from '../../../axios/services/AdminServices'
import DataTable from 'react-data-table-component';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn } from 'mdb-react-ui-kit';


function UserManagement() {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('admin');
    fetchData();
    async function fetchData() {
      const data = await getUserInfo(token);
      setDetails(data);
    }
  }, []);

  async function unBlock(id) {
    const token = localStorage.getItem('admin');
    const data = await unblockUser(token, id);
    console.log("unblock data",data);
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
    const token = localStorage.getItem('admin');
    const data = await blockUser(token, id);
    console.log("block data",data);
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
    <div >
    <h1 style={{ marginLeft: "300px"}}>User Management</h1>
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