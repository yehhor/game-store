import React, {useState} from "react";
import './register.scss'
import usePwValidation from "./usePwValidation";
import {UsersService} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../index";

type FormData = {
    login: string,
    password: string,
    confirm: string
}


export const Registration = () => {
    const [{login, password, confirm}, setFormData] = useState<FormData>({login: '', password: '', confirm: ''})
    const [loading, setLoading] = useState(false)
    const [isLoginValid, setIsLoginValid] = useState<boolean>(false)
    const {pwErrors, pwMatch} = usePwValidation({password, confirm})
    const navigate = useNavigate();

    const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        if(name ==='login'){
            UsersService.isUserNameAvailable(value).then(isValid =>{
                setIsLoginValid(isValid)
            })
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    //todo existing usernames validates on front end only
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const user = await UsersService.register(login, password)
        navigate(`${BASE_URL}/login`)
    }


    const errorMsgsDom = pwErrors.map(m => (
        <div key={m}>{m}</div>
    ))

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <input onChange={onChange} autoFocus
                           className={isLoginValid ? 'error' : ''}
                           placeholder='Login' type="text" name='login' value={login}/>
                    {
                        !isLoginValid &&  <div className="error">
                            This login is already taken.
                        </div>
                    }
                </div>
                <div>
                    <input onChange={onChange} type="password" placeholder='Password'
                           name='password' value={password}/>
                </div>
                <div>
                    <input onChange={onChange} type="password" placeholder='Confirm password'
                           name='confirm' value={confirm}/>
                </div>
                {(password || confirm) && <div className="errors-container">
                    {!!pwErrors.length && <div className='error-msg'>{errorMsgsDom}</div>}
                    {!pwMatch && <div className='error-msg'>Passwords does not match</div>}
                </div>}
                <button type='submit' disabled={!login || !pwMatch || !!pwErrors.length || !isLoginValid}>Register</button>
            </form>
        </div>
    )
}