import { getCurrentUser } from "@/services/AuthServices";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";

interface IUserContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    handleSetUser: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleSetUser = async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);
    }

    useEffect(() => {
        handleSetUser();
    }, [isLoading]);

    return <UserContext.Provider value={{ user, setUser, setIsLoading, isLoading, handleSetUser }}>
        {children}
    </UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export default UserProvider;

