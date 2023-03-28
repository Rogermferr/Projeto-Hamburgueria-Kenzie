import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';

interface iUserContext {
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  loginUser: (data: iLoginUser) => Promise<void>;
  registerUser: (data: iRegisterUser) => Promise<void>;
  logoutUser: () => void;
  token: string | null;
}
interface iUserProviderProps {
  children: React.ReactNode;
}

interface iUser {
  id: number;
  name: string;
  email: string;
}

interface iLoggedUser {
  accessToken: string;
  user: iUser;
}

export interface iRegisterUser {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}

export interface iLoginUser {
  email: string;
  password: string;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserProviderProps) => {
  const [user, setUser] = useState<iUser | null>(null);

  const token = localStorage.getItem('@KENZIEBURGUERV2:USERTOKEN');
  const id = localStorage.getItem('@KENZIEBURGUERV2:USERID');

  const navigate = useNavigate();

  const registerUser = async (data: iRegisterUser) => {
    try {
      await api.post<iLoggedUser>('/users', data);
      toast.success('usuário cadastrado');
      navigate('/');
    } catch (error) {
      toast.error('Email já existe');
    }
  };

  const loginUser = async (data: iLoginUser) => {
    try {
      const response = await api.post<iLoggedUser>('/login', data);
      const userObj = response.data.user;
      const userToken = response.data.accessToken;
      setUser(userObj);
      localStorage.setItem('@KENZIEBURGUERV2:USERTOKEN', userToken);
      localStorage.setItem(
        '@KENZIEBURGUERV2:USERID',
        JSON.stringify(userObj.id)
      );
      navigate('/shop');
    } catch (error) {
      toast.error('Email ou senha inválidos');
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('@KENZIEBURGUERV2:USERTOKEN');
    localStorage.removeItem('@KENZIEBURGUERV2:CART');

    toast.success('Logout feito');
    navigate('/');
  };

  useEffect(() => {
    const autoLogin = async (userId: string) => {
      if (token) {
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          navigate('/shop');
        } catch (error) {
          localStorage.removeItem('@KENZIEBURGUERV2:USERTOKEN');
          navigate('/');
        }
      }
    };
    if (id) {
      autoLogin(id);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loginUser, registerUser, logoutUser, token }}
    >
      {children}
    </UserContext.Provider>
  );
};
