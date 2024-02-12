import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

const Post = () => {
  const data = useContext(AppContext);

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row my-3">
          {data.posts?.map((d) => (
            <div key={d._id} className="col-lg-4 col-md-6 my-3">
              <div className="card text-center bg-primary">
                <div className="img">
                  <img
                    src={d.imgUrl}
                    className="card-img-top"
                    alt="post"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-body text-light">
                  <h4 className="card-title">{d.title}</h4>
                  <p className="card-text">{d.description}</p>
                  <button
                    onClick={async () => {
                      const res = await data.deletePost(d._id);
                      console.log("deleted ", res);
                      toast.success(res.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                      });
                      data.setReload(!data.reload);
                    }}
                    className="btn btn-success mx-2"
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning mx-1">Edit</button>
                  <div
                    onClick={async () => {
                      const res = await data.likePost(d._id);
                      toast.success(res.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                      });
                      data.setReload(!data.reload);
                    }}
                    className="btn btn-danger mx-2"
                  >
                    <FaHeart /> {d.likes.length}
                  </div>
                  <div className="btn btn-info text-white">
                    <FaComments />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Post;
