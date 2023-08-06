import './Settings.css'
import {useState} from "react";
import {PersonalInfoForm} from "./SettingsForms/PersonalInfoForm/PersonalInfoForm.tsx";
import {PasswordForm} from "./SettingsForms/PasswordForm/PasswordForm.tsx";
import {ArticlePrefsForm} from "./SettingsForms/ArticlePrefsForm/ArticlePrefsForm.tsx";

enum SettingsPrefs {
    PersonalInfo = 'personal-info', Password = 'password', ArticlePreference = 'article-preference'
}

export const Settings = () => {
    const [selectedSettings, setSelectedSettings] = useState<SettingsPrefs>(SettingsPrefs.PersonalInfo);
    return (<div className={'settings'}>
        <div className={'selector selector-width'}>
                <span
                    className={selectedSettings === SettingsPrefs.PersonalInfo ? 'selected' : ''}
                    onClick={() => setSelectedSettings(SettingsPrefs.PersonalInfo)}
                >
                    Personal Info
                </span>
            <span
                className={selectedSettings === SettingsPrefs.Password ? 'selected' : ''}
                onClick={() => setSelectedSettings(SettingsPrefs.Password)}
            >
                    Password
                </span>
            <span
                className={selectedSettings === SettingsPrefs.ArticlePreference ? 'selected' : ''}
                onClick={() => setSelectedSettings(SettingsPrefs.ArticlePreference)}
            >
                    Preferences
                </span>
        </div>
        <div className={'settings-content settings-width'}>
            {selectedSettings === SettingsPrefs.PersonalInfo ?
                <PersonalInfoForm/> : selectedSettings === SettingsPrefs.Password ? <PasswordForm/> :
                    <ArticlePrefsForm/>}
        </div>
    </div>);
};