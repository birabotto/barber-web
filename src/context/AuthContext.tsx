import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";

import { api } from "@/services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  singIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: (credentials: SignUpProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
  subscriptions: SubscriptionsProps | null;
}

interface SubscriptionsProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(null, "@barber.token", { path: "/" });
    Router.push("/login");
  } catch (error) {
    console.log(error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function singIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token, subscriptions, address } = response.data;
      setCookie(undefined, "@baber.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        address,
        subscriptions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@barber.token", { path: "/" });
      setUser(null);
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, singIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
