import './App.scss'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components";
import {HomePage, LoginPage, SignupPage, ArticlePreferencesPage} from "./pages";

function App() {
    return (<Routes>
        <Route path={'/'} element={<ProtectedRoute to={'/login'} children={<HomePage/>}/>}/>
        <Route path={'/signup'} element={<SignupPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route
            path={'/article-preferences'}
            element={<ProtectedRoute
                to={'/login'}
                children={<ArticlePreferencesPage/>}
            />}
        />
    </Routes>)
}

export default App
