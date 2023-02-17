import React, { useEffect, useState } from 'react'
import { blockGuide, getGuidesInfo, unblockGuide } from '../../../axios/services/AdminServices'
import DataTable from 'react-data-table-component';
import { MDBBtn } from 'mdb-react-ui-kit';

function GuideMangement() {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const token = JSON?.parse(localStorage.getItem('admin')).token;
    fetchData();
    async function fetchData() {
      const data = await getGuidesInfo(token);
      setDetails(data);
    }
  }, []);


  async function unBlock(id) {
    const token = localStorage.getItem('admin');
    const data = await unblockGuide(token, id);

    if (data.guideDetails) {
      const newDetails = details.map(guide => {
        if (guide._id === id) {
          return { ...guide, isBlocked: false }
        }
        return guide;
      });
      setDetails(newDetails);
    }
  }

  async function block(id) {
    const token = localStorage.getItem('admin');
    const data = await blockGuide(token, id);
    if (data.guideDetails) {
      const newDetails = details.map(guide => {
        if (guide._id === id) {
          return { ...guide, isBlocked: true }
        }
        return guide;
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
      name: 'Location',
      selector: (row) => row.location,
    },
    {
      name: 'Status',
      selector: (row) => {
        return (
          <div>
            <p style={{ color: "green" }}>Verified</p>
          </div>
        )
      }
    },
    {
      name: 'Block/Unblock',
      selector: (row) => {
        return (
          <div>
            {row.isBlocked ? (
              <MDBBtn key={row._id} style={{ background: "green" }}
                onClick={() => unBlock(row._id)}
              >
                Un Block
              </MDBBtn>
            ) : (
              <MDBBtn key={row._id} style={{ background: "red" }} onClick={() => block(row._id)}>
                Block
              </MDBBtn>
            )}
          </div>
        );
      },
    },
  ]

  return (
    <div>
      <h1 style={{ color: "black" }} className='text-center m-5'>Guides Management</h1>
      <DataTable
        columns={columns}
        data={details}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        pagination
      />
    </div>
  )
}

export default GuideMangement