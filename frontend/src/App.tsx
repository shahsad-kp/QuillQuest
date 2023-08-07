import './App.scss'
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components";
import {
    HomePage,
    LoginPage,
    SignupPage,
    ArticlePreferencesPage,
    NewArticlePage,
    SettingsPage,
    ProfilePage
} from "./pages";

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
        <Route
            path={'/new'}
            element={<ProtectedRoute
                to={'/login'}
                children={<NewArticlePage/>}
            />}
        />
        <Route
            path={'/settings'}
            element={<ProtectedRoute
                to={'/login'}
                children={<SettingsPage/>}
            />}
        />
        <Route
            path={'/articles/:id/edit/'}
            element={<ProtectedRoute
                to={'/login'}
                children={<NewArticlePage/>}
            />}
        />
        <Route
            path={'/profile/'}
            element={<ProtectedRoute
                to={'/login'}
                children={<ProfilePage/>}
            />}
        />
    </Routes>)
}

export default App
