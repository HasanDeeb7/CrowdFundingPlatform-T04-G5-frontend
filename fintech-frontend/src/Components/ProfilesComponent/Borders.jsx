import React from 'react'

function Borders() {
  return (
    <div>
      <div className="borderContainer">

          <div className="singleBorder">
            <p>Number of Creators</p>
            <p>
              <span style={{ color: "var(--primary-gold-clr)" }}>95</span>{" "}
              Creators
            </p>
          </div>

          <div className="singleBorder">
            <p>Number of Donors</p>
            <p>
              <span style={{ color: "var(--primary-gold-clr)" }}>45</span>{" "}
              Donors
            </p>
          </div>

          <div className="singleBorder">
            <p>Number of Campaigns</p>
            <p>
              <span style={{ color: "var(--primary-gold-clr)" }}>123</span>{" "}
              Campaigns
            </p>
          </div>

          <div className="singleBorder">
            <p>Total amount</p>
            <p>
              <span style={{ color: "var(--primary-gold-clr)" }}>
                1,000,000
              </span>{" "}
              $
            </p>
          </div>
          
        </div>
    </div>
  )
}

export default Borders
