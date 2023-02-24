import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { guideSearch } from '../../../axios/services/UserServices';
import { getGuides } from '../../../axios/services/UserServices'

import "./cover.css"

function Cover() {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate()

  const [details, setDetails] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const data = await getGuides()
    setDetails(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await guideSearch(search);
    navigate(`/guideSearch/${search}`)
  }

  const fetchSuggestions = async (value) => {
    const response = await guideSearch(value);
    const locations = [...new Set(response?.map((guide) => guide.location))];
    setSuggestions(locations);
  }

  const onInputChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      await fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <section className='home'>
      <div className="secContainer container">

        <div className="homeText">
          <h1 className="title">
            Plan Your Trip With Us
          </h1>
          <p className="subTitle">
            Travel to your favourite city with our helpful travel guides !!!
          </p>
        </div>
        <div className="homeCard grid">
          <form onSubmit={handleSubmit}>
            <div className="locationDiv">
              <label htmlFor="Where next ?">Enter location</label>
              <input type="text" placeholder=' Where next ?' className='search' required value={search} onChange={onInputChange} />
              <ul className="suggestions">
                {suggestions.map((location, index) => (
                  <li key={index} onClick={() => setSearch(location)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      background: "var(--whiteColor)",
                      borderBottom: "1px solid var(--greyBg)",
                      borderTop: "1px solid var(--greyBg)"
                    }}>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" className='btn'>Browse</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Cover
