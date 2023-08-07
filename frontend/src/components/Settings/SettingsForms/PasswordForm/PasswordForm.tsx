import {FormEvent, useCallback, useState} from "react";
import {updatePassword} from "../../../../api/authServices.ts";

export const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentPassword.length === 0) {
            setError('Current password is required');
            return;
        } else if (password.length === 0) {
            setError('Password is required');
            return;
        } else if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        } else if (!/[a-zA-Z]+/.test(password)) {
            setError('Password must contain at least one letter');
            return;
        } else if (!/[0-9]+/.test(password)) {
            setError('Password must contain at least one number');
            return;
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        } else {
            setError('');
            updatePassword(currentPassword, password).then(() => {
                setCurrentPassword('');
                setPassword('');
                setRepeatPassword('');
            }).catch((err) => {
                if (err.response.status === 400) {
                    setError(err.response.data.detail);
                    return;
                }
                setError('Something went wrong');
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [currentPassword, password, repeatPassword]);


        return (<form
            className={'settings-form'}
            onSubmit={handleSubmit}
        >
            <h3>Update Password</h3>
            <div className={'group-input group-form'}>
                <input
                    type={'password'}
                    placeholder={'Current Password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className={'group-input group-form'}>
                <input
                    type={'password'}
                    placeholder={'Password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={'group-input group-form'}>
                <input
                    type={'password'}
                    placeholder={'Repeat Password'}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>
            <span className={'error'} style={{display: error ? 'block' : 'none'}}>{error}</span>
            <div className={'group-input group-form'}>
                <button type={'submit'}>{loading ? 'loading..' : 'Submit'}</button>
            </div>
        </form>);
    };