import '../Form.css';
import {useCallback, useState, MouseEvent} from "react";
import {Link} from "react-router-dom";

type ValuesType = {
    emailOrPhone: string,
    password: string,
}

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [values, setValues] = useState<ValuesType>({
        emailOrPhone: '',
        password: '',
    });

    const handleSubmit = useCallback((e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!/.+/.test(values.emailOrPhone)) {
            setError('Email or phone is required');
            return;
        }
        else if (/[^0-9]+/.test(values.emailOrPhone) && !/^.+@.+\..+$/.test(values.emailOrPhone)) {
            setError('Email is invalid');
            return;
        }
        else if (!/[^0-9]+/.test(values.emailOrPhone) && !/^[0-9]{10}$/.test(values.emailOrPhone)) {
            setError('Phone number is invalid');
            return;
        }
        else if (!/.+/.test(values.password)) {
            setError('Password is required');
            return;
        }
        else {
            setError(null);
            alert('Login successful')
        }
    }, [values]);

    return (<div className={'auth-form'}>
        <h1>Log In</h1>
        <span>Welcome back 👋🏻</span>
        <form>
            <input
                placeholder={'Email or Phone number'} type={'text'}
                value={values.emailOrPhone}
                onChange={(e) => setValues(values => ({...values, emailOrPhone: e.target.value}))}
            />
            <input
                placeholder={'Password'}
                type={'password'}
                value={values.password}
                onChange={(e) => setValues(values => ({...values, password: e.target.value}))}
            />
            <span className={'error'} style={{display: error ? 'block' : 'none'}}>{error}</span>
            <button
                type={'submit'}
                onClick={handleSubmit}

            >Login</button>
        </form>
        <hr style={{width: '100%', height: "1px", margin: '0'}}/>
        <p>
            Don't have an account? <Link to={'/signup'}>Sign up</Link>
        </p>
    </div>);
};