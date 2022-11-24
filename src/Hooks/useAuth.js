import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
