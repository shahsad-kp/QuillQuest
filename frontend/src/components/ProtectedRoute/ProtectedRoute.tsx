import {Navigate, useLocation} from "react-router-dom";
import {FC, ReactNode} from "react";
import {useSelector} from "react-redux";
import {User} from "../../types/User.ts";

type Props = {
    to: string; replace?: boolean; children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({children, replace, to}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user: User = useSelector((state) => state?.auth.user);
    const location = useLocation();
    if (!user) {
        return <Navigate to={to} replace={replace} state={{from: location}}/>
    }
    return children
}