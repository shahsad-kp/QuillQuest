import './App.scss'
import {Route, Routes} from "react-router-dom";
import {SignupPage} from "./pages/AuthPages/SignupPage/SignupPage.tsx";
import {LoginPage} from "./pages/AuthPages/LoginPage/LoginPage.tsx";

function App() {
    return (<Routes>
            <Route path={'/'} element={<div></div>}/>
            <Route path={'/signup'} element={<SignupPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
        </Routes>)
}

export default App
