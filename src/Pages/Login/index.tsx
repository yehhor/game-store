import React, {ReactElement, useEffect, useState} from "react";
import {validate, ValidationMessage} from "../../utilities/PasswordValidator";
import './login.scss'

type FormData = {
    login: string,
    password: string,
    confirm: string
}

export const Index = () => {
    const [{login, password, confirm}, setFormData] = useState<FormData>({login: '', password: '', confirm: ''})
    const [errorMessage, setErrorMessage] = useState<ValidationMessage[]>([])
    const [pwMatch, setPwMatch] = useState<boolean>(false)
    const onChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        if ((name === 'password') || (name === 'confirm')) {
            setErrorMessage(validate(value))
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    useEffect(() => {
        setPwMatch(password === confirm)
    }, [password, confirm])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const errorMsgsDom = errorMessage.map(m => (
        <div key={m.message}>{m.message}</div>
    ))


    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={onChange} autoFocus placeholder='Login' type="text" name='login' value={login}/>
                </div>
                <div>
                    <input onChange={onChange} type="password" placeholder='Password'
                           name='password' value={password}/>
                </div>
                <div>
                    <input onChange={onChange} type="password" placeholder='Confirm password'
                           name='confirm' value={confirm}/>
                </div>
                <div className="errors-container">

                    {!!errorMessage.length && <div className='error-msg'>{errorMsgsDom}</div>}
                    {!pwMatch && <div className='error-msg'>Passwords does not match</div>}
                </div>
                <button type='submit' disabled={!login || !pwMatch || !!errorMessage.length}>Submit</button>
            </form>
        </div>
    )
}