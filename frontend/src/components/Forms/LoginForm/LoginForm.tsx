import '../Form.css';
import {useCallback, useState, MouseEvent} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {login} from "../../../api/authServices.ts";
import {AxiosError} from "axios";

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
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

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
            const email = /[^0-9]+/.test(values.emailOrPhone) ? values.emailOrPhone : undefined;
            const phone = /[^0-9]+/.test(values.emailOrPhone) ? undefined : values.emailOrPhone;
            setLoading(true)
            login(values.password, email, phone).then(() => {
                if (location.state?.from) {
                    navigate(location.state.from, {replace: true});
                }
                else{
                    navigate('/', {replace: true})
                }

            }).catch((err) => {
                const error = err as AxiosError;
                if (error.response?.status === 401) {
                    setError('Invalid credentials');
                }
                else {
                    setError('Something went wrong');
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [navigate, values.emailOrPhone, values.password]);

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
                disabled={loading}
            >{loading? 'Logging in ..' : 'Login'}</button>
        </form>
        <hr style={{width: '100%', height: "1px", margin: '0'}}/>
        <p>
            Don't have an account? <Link to={'/signup'} replace={true}>Sign up</Link>
        </p>
    </div>);
};