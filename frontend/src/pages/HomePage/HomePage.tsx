import {ArticleList, Navbar} from "../../components";

export const HomePage = () => {
    return (<div className={'home-page'}>
        <Navbar/>
        <ArticleList/>
    </div>);
};