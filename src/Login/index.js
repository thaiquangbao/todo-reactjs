
import './login.scss'
import { useState, useEffect } from 'react'
import {Navigate, useNavigate } from 'react-router-dom';

function Login({reload,setReload}) {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect (() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    },[])

    const handleSignIn = () => {
        const username = document.querySelector('.txtusername')
        const password = document.querySelector('.txtpassword')
                fetch(`http://localhost:3000/users/account/?username=${username.value}&password=${password.value}`)
                .then(res => res.json())
                .then(data => {
                    if (data!= null) {
                         localStorage.setItem('user',JSON.stringify({
                            _id: data._id,
                            accessControl:true
                        }))
                    }
                    else{
                        localStorage.setItem('user',JSON.stringify({
                           message :'Không tìm thấy id',
                           accessControl:false
                        }))
                    } 
                    setReload(!reload)
                    setTimeout(() => {
                        navigate('/home')
                    }, 300);
                })
        
    }

    return ( 
        <div className='col-lg-12 login'>
            <h2>Login</h2><br></br>
            <form method="POST" action="http://localhost:3000/users/insert"className='col-lg-4'>
                <div class="form-outline mb-4">
                    <label class="form-label username" for="form2Example1">Username</label>
                    <input  name='userName' type="text" id="form2Example1" class="form-control txtusername" />
                </div>

                <div class="form-outline mb-4">
                    <label class="form-label password" for="form2Example2">Password</label>
                    <input  name='passWord' type="password" id="form2Example2" class="form-control txtpassword" />
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"  id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                    </div>

                    <div class="col">
                    <a href="#!">Forgot password?</a>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block mb-4">Sign up</button>
                <button type="button" onClick={() => handleSignIn()} class="btn btn-primary btn-block mb-4">Sign in</button>
            
            </form>
        </div>
     );
}

export default Login;