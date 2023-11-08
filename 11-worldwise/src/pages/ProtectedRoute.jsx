import { useNavigate } from "react-router-dom";
import { AuthContext_Using } from "../contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = AuthContext_Using();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return children;
}

export default ProtectedRoute;
