import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
const USER_KEY = "bv_user";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const signIn = ({ name, email }) => {
    setUser({ name: name.trim(), email: email.trim(), signedInAt: Date.now() });
  };

  const signOut = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, signIn, signOut, isSignedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
