import React from 'react'
import './UserLogin.css'

function Login() {
  return (
//     <div>
//   <form class="form-signin">
//   <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
//   <label for="inputEmail" class="sr-only">Email address</label>
//   <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
//   <label for="inputPassword" class="sr-only">Password</label>
//   <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
//   <div class="checkbox mb-3">
//     <label>
//       <input type="checkbox" value="remember-me" /> Remember me
//     </label>
//   </div>
//   <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
//   <p class="mt-5 mb-0 text-muted">&copy; Travel Buff 2023</p>
// </form>
// </div>

<div className="main">

     <div className="sub-main">
       <div>
         <div className="imgs">
           <div className="container-image">
             <img src="" alt="" className="profile"/>

           </div>


         </div>
         <div>
           <h1>Login Page</h1>
           <div>
             <img src="" alt="email" className="email"/>
             <input type="text" placeholder="user name" className="name"/>
           </div>
           <div className="second-input">
             <img src="" alt="" className="email"/>
             <input type="password" placeholder="user name" className="name"/>
           </div>
          <div className="login-button">
          <button type='submit'>Login</button>
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

export default Login

