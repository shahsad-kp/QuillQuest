import '../Form.css';
import {useCallback, useState, MouseEvent, useMemo} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {register} from "../../../api/authServices.ts";
import {AxiosError} from "axios";
import {User} from "../../../types/User.ts";

enum SignUpState {
    personalInfo = 0, accountInfo = 1, password = 2
}

type ValuesType = {
    firstName: string, lastName: string, email: string, phone: string, dateOfBirth: Date, password: string, confirmPassword: string,
}

export const SignupForm = () => {
    const [signupState, setSignupState] = useState<SignUpState>(SignUpState.personalInfo);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const maxDate = useMemo(() => {
        const currentDate = new Date()
        return new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    }, []);

    const [values, setValues] = useState<ValuesType>({
        firstName: '', lastName: '', email: '', phone: '', dateOfBirth: maxDate, password: '', confirmPassword: '',
    });

    const handleSubmit = useCallback((e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (signupState === SignUpState.password) {
            if (!/.+/.test(values.password)) {
                setError('Password is required');
                return;
            } else if (!/[a-zA-Z]+/.test(values.password)) {
                setError('Password must contain at least one letter');
                return;
            } else if (!/[0-9]+/.test(values.password)) {
                setError('Password must contain at least one number');
                return;
            } else if (values.password.length < 8) {
                setError('Password must be at least 8 characters long');
                return;
            } else if (values.password !== values.confirmPassword) {
                setError('Passwords do not match');
                return;
            } else {
                setError(null);
                setLoading(true)
                const year = values.dateOfBirth.getFullYear();
                const month = String(values.dateOfBirth.getMonth() + 1).padStart(2, '0');
                const day = String(values.dateOfBirth.getDate()).padStart(2, '0');
                const dateOfBirth = `${year}-${month}-${day}`;
                const user: User = {
                    firstName: values.firstName, lastName: values.lastName, email: values.email, dateOfBirth, phone: values.phone
                }
                register(user).then(() => {
                    if (location.state?.from) {
                        navigate('/article-preferences', {replace: true, state:{from:location.state.from}},)
                    }
                    else{
                        navigate('/article-preferences', {replace: true},)
                    }
                }).catch((err) => {
                    const error = err as AxiosError;
                    if (error.response?.status === 400) {
                        const data: User = error.response.data as User
                        const firstKey = Object.keys(data)[0] as string
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const err = data[firstKey] as string
                        setError(err)
                    }
                    else{
                        setError('Something went wrong');
                    }
                }).finally(() => {
                    setLoading(false);
                })
            }
        }

        if (signupState === SignUpState.personalInfo) {
            if (!/.+/.test(values.firstName)) {
                setError('First name is required');
                return;
            } else if (!/.+/.test(values.lastName)) {
                setError('Last name is required');
                return;
            } else {
                setError(null);
                setSignupState(SignUpState.accountInfo);
            }
        } else if (signupState === SignUpState.accountInfo) {
            if (!/.+/.test(values.email)) {
                setError('Email is required');
                return;
            } else if (!/^.+@.+\..+$/.test(values.email)) {
                setError('Email is invalid');
                return;
            } else if (!/.+/.test(values.phone)) {
                setError('Phone is required');
                return;
            } else if (!/^\+?[0-9]+$/.test(values.phone)) {
                setError('Phone is invalid');
                return;
            } else if (values.phone.length < 10) {
                setError('Phone is invalid');
                return;
            } else if (values.phone.length > 13) {
                setError('Phone is invalid');
                return;
            } else if (!/.+/.test(values.dateOfBirth.toISOString().split('T')[0])) {
                setError('Date of Birth is required');
                return;
            } else if (values.dateOfBirth > maxDate) {
                setError('You must be at least 18 years old');
                return;
            } else {
                setError(null);
                setSignupState(SignUpState.password);
            }
        }
    }, [navigate, signupState, values, maxDate]);

    return (<div className={'auth-form'}>
        <h1>Sign up</h1>
        <span>It's quick and easy</span>
        <form>
            <input
                placeholder={'First name'}
                type={'text'}
                style={{
                    display: signupState === SignUpState.personalInfo ? 'block' : 'none'
                }}
                value={values.firstName}
                onChange={(e) => setValues(values => ({...values, firstName: e.target.value}))}
            />
            <input
                placeholder={'Last name'}
                type={'text'}
                style={{
                    display: signupState === SignUpState.personalInfo ? 'block' : 'none'
                }}
                value={values.lastName}
                onChange={(e) => setValues(values => ({...values, lastName: e.target.value}))}
            />
            <input
                placeholder={'Email'} type={'email'}
                style={{
                    display: signupState === SignUpState.accountInfo ? 'block' : 'none'
                }}
                value={values.email}
                onChange={(e) => setValues(values => ({...values, email: e.target.value}))}
            />
            <input
                placeholder={'Phone'}
                type={'text'}
                style={{
                    display: signupState === SignUpState.accountInfo ? 'block' : 'none'
                }}
                value={values.phone}
                onChange={(e) => setValues(values => ({...values, phone: e.target.value}))}
            />
            <input
                placeholder={'Date of Birth'}
                type={'date'}
                max={maxDate.toISOString().split('T')[0]}
                style={{
                    display: signupState === SignUpState.accountInfo ? 'block' : 'none'
                }}
                value={values.dateOfBirth.toISOString().split('T')[0]}
                onChange={(e) => setValues(values => ({...values, dateOfBirth: new Date(e.target.value)}))}
            />
            <input
                placeholder={'Password'}
                type={'password'}
                style={{
                    display: signupState === SignUpState.password ? 'block' : 'none'
                }}
                value={values.password}
                onChange={(e) => setValues(values => ({...values, password: e.target.value}))}
            />
            <input
                placeholder={'Confirm password'}
                type={'password'}
                style={{
                    display: signupState === SignUpState.password ? 'block' : 'none'
                }}
                value={values.confirmPassword}
                onChange={(e) => setValues(values => ({...values, confirmPassword: e.target.value}))}
            />
            <span className={'error'} style={{display: error ? 'block' : 'none'}}>{error}</span>
            <button
                type={'submit'}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Creating account...' : signupState === SignUpState.password ? 'Sign up' : 'Next'}
            </button>
        </form>
        <hr style={{width: '100%', height: "1px", margin: '0'}}/>
        <p>
            Already have an account? <Link to={'/login'} replace={true}>Log in</Link>
        </p>
    </div>);
};