import React from 'react'
import './UserRegister.css'

function UserRegister() {
  return (
    <div className="main">

     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src="" alt="" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Register Page</h1>
           <div>
             {/* <img src="" alt="email" className="email"/> */}
             <input type="text" placeholder="user name" className="name"/>
           </div>

           <div style={{padding: '10px'}}>
             {/* <img src="" alt="email" className="email"/> */}
             <input type="email" placeholder="email" className="name"/>
           </div>

           <div>
             {/* <img src="" alt="email" className="email"/> */}
             <input type="text" placeholder="Phone number" className="name"/>
           </div>

           <div className="second-input">
             {/* <img src="" alt="" className="email"/> */}
             <input type="password" placeholder="user name" className="name"/>
           </div>
          <div className="login-button">
          <button type='submit'>Sign Up</button>
          </div>
           
            <p className="link">
              <a href="#">Forgot password ?</a> Or<a href="#">Sign Up</a>
            </p>
           
 
         </div>
       </div>
       

     </div>

    </div>
  )
}

export default UserRegister