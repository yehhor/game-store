import React, {useContext, useState} from 'react';
import {UsersService} from "../../services/UserService";
import {UserContext} from "../../components/UserContext";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../index";

const Login = () => {
    const [{login, password}, setFormData] = useState({login: '', password: ''});
    const [incorrentLogin, setIncorrentLogin] = useState(false)
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        UsersService.login(login, password)
            .then(userToken => {
                if (userToken) {
                    userCtx.setUserToken(userToken)
                    navigate(`${BASE_URL}/home`)
                    return null;
                }
                setIncorrentLogin(true)
                return null;
            })
    }

    return (
        <form onSubmit={handleSubmit} className='login-page'>
            <div>
                <input onChange={onChange} autoFocus
                       placeholder='Login' type="text" name='login' value={login}/>
            </div>
            <div>
                <input onChange={onChange} type="password" placeholder='Password'
                       name='password' value={password}/>
            </div>
            {incorrentLogin && <div>
                Incorrect password
            </div>}
            <button type='submit' disabled={!login && !password}>Login</button>
        </form>
    );
};

export default Login;