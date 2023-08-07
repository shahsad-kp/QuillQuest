import {useSelector} from "react-redux";
import {FormEvent, useCallback, useState} from "react";
import {updateUser} from "../../../../api/authServices.ts";

export const PersonalInfoForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const user = useSelector(state => state?.auth.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateFirstName = firstName.length > 0 ? firstName : null;
        const validateLastName = lastName.length > 0 ? lastName : null;
        const validateEmail = email.length > 0 ? email : null;
        const validatePhone = phone.length > 0 ? phone : null;
        if (validateEmail && !/^.+@.+\..+$/.test(validateEmail)) {
            setError('Email is invalid');
            return;
        }
        else if (validatePhone && !/^[0-9]{10}$/.test(validatePhone)) {
            setError('Phone number is invalid');
            return;
        }
        else {
            setError('');
        }

        setLoading(true)
        updateUser(validateFirstName, validateLastName, validateEmail, validatePhone).then(() => {
            console.log('Successfully updated user');
        }).finally(() => setLoading(false))
    }, [firstName, lastName, email, phone])

    return (<form
            className={'settings-form'}
            onSubmit={handleSubmit}
        >
            <h3>Personal Information</h3>
            <div className={'group-input group-form'}>
                <input
                    type={'text'}
                    placeholder={'First Name'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type={'text'}
                    placeholder={'Last Name'}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className={'group-input group-form'}>
                <input
                    type={'email'}
                    placeholder={'Email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={'text'}
                    placeholder={'Phone'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <span className={'error'} style={{display: error ? 'block' : 'none'}}>{error}</span>

            <div className={'group-input group-form'}>
                <button
                    type={'submit'}
                    disabled={loading}
                >{loading ? 'Loading...' : 'Submit'}</button>
            </div>
        </form>);
};