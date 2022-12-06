import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({children}){
  const [ data,setData ] = useState({});

  async function signIn({email, password}){
    try{
      const response = await api.post("/sessions", { email, password });

      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ user, token})

    } catch (error){
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.")
      }
    }
  }
    
  function signOut(){
    const token = localStorage.removeItem("@rocketnotes:token");
    const user = localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({ user, avatarFile }){
    try{
      if (avatarFile){
        const fileUploadForm = new FormData();
        fileUploadForm.append('avatar', avatarFile);

        const response = await api.patch('/users/avatar', fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put('/users',user);
      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      setData({ user, token: data.token });

      alert('Perfil atualizado.');

    } catch(error){
      if(error.response){
        alert(error.response.data.message);
      } else {
        alert('Não foi possível atualziar o perfil.')
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if(token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      })
    }
  }, []);

  return(
    <AuthContext.Provider value={{ 
      signIn, 
      user: data.user,
      signOut,
      updateProfile
      }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context;
}

export {AuthProvider, useAuth }