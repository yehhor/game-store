import {useEffect, useState} from "react";
import {validate} from "../../utilities/PasswordValidator";
//todo add module declaration for lib
type Validate = (i: string) => [{ message: string }]

type Props = {
    password: string,
    confirm: string
}

const UsePwValidation = ({password, confirm}: Props) => {
    const [pwMatch, setPwMatch] = useState<boolean>(false)
    const [pwErrors, setPwError] = useState<string[]>([])

    useEffect(() => {
        setPwMatch(password === confirm)
        const messages = {} as {[key: string]: boolean}
        const errors = [...validate(password), ...validate(confirm)]
        errors.forEach(error => {
            messages[error.message] = true;
        })
        setPwError(Object.keys(messages))

    }, [password, confirm])


    return {pwErrors, pwMatch}
};

export default UsePwValidation;