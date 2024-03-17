import { useNavigate } from "react-router-dom";
import { AuthContextValue, useAuth } from "../stores/AuthProvider";
import AccessDeniedPage from "../pages/AccessDeniedPage";

function WithAuth(OriginalComponent: any) {
    function NewComponent() {
        const { userData } = useAuth() as AuthContextValue;

        if (!userData) {
            return <AccessDeniedPage />
        }
        return <OriginalComponent />;
    }
    return NewComponent;
}

export default WithAuth;
