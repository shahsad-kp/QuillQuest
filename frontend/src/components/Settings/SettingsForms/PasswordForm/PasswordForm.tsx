import {useState} from "react";

export const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    return (<form className={'settings-form'}>
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
                    type={'text'}
                    placeholder={'Repeat Password'}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>
            <div className={'group-input group-form'}>
                <button type={'submit'}>Submit</button>
            </div>
        </form>);
};