import './App.scss'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components";
import {HomePage, LoginPage, SignupPage} from "./pages";

function App() {
    return (<Routes>
        <Route path={'/'} element={<ProtectedRoute to={'/login'} children={<HomePage/>}/>}/>
        <Route path={'/signup'} element={<SignupPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
    </Routes>)
}

export default App
