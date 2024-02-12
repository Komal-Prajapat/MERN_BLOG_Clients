import React, { useEffect, useState } from "react";
import { AppContext } from "./App_Context";
import axios from "axios";

const App_State = (props) => {
  const [data, setdata] = useState(10);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const url = "http://localhost:9090/api";

  useEffect(() => {
    const fetchBlog = async () => {
      const api = await axios.get(`${url}/getpost`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.posts);
      setPosts(api.data.posts);
    };

    fetchBlog();
    getUsers();
    const jwtToken = window.localStorage.getItem("token");

    // console.log("superman token = ", jwtToken);
    setToken(jwtToken);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token, reload]);

  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/login`,
        {
          email,
          password,
        },
        { 
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(api.data);

      // setting token to localstorage
      window.localStorage.setItem("token", api.data.token);
      setToken(api.data.token);
      return api.data;
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const register = async (name, email, password) => {
    try {
      const api = await axios.post(
        `${url}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(api.data);
      return api.data;
    } catch (error) {
      if (error.response) {
        console.log("Response data:", error.response.data);
        return error.response.data;
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("token");
    setToken("");
    isAuthenticated(false);
  };

  const addPost = async (title, description, imgUrl) => {
    const api = await axios.post(
      `${url}/addpost`,
      {
        title,
        description,
        imgUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log(api);

    return api.data;
  };

  const deletePost = async (id) => {
    const api = await axios.delete(`${url}/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log(api);
    return api.data;
  };

  const likePost = async (id) => {
    const api = await axios.post(
      `${url}/post/like/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log(api);
    return api.data;
  };

  const getUsers = async () => {
    // this function is called in useEffect, please scroll above
    const api = await axios.get(
      `${url}/users`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("users", api.data.user);
    setUsers(api.data.user);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setdata,
        url,
        login,
        register,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        logOut,
        posts,
        setPosts,
        addPost,
        deletePost,
        reload,
        setReload,
        likePost,
        users,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default App_State;
