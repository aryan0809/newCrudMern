import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Read() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    async function getData() {
        try {
            const response = await fetch("http://localhost:3000/user");
            const result = await response.json();
            console.log("Fetched Data:", result); // Debug log
            if (response.ok) {
                setData(result);
            } else {
                console.error(result.error);
                setError(result.error);
                toast.error(result.error);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error fetching data");
            toast.error("Error fetching data");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();
            console.log("Delete Response:", result); // Debug log
            if (!response.ok) {
                console.log(result.error);
                toast.error(result.error);
            } else {
                toast.success(result.name + " " + "Deleted Successfully");
                getData(); // Refresh the data
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            toast.error("Error deleting user");
        }
    }

    const navigate = useNavigate();

    return (
        <div>
            <ToastContainer />
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((user) => (
                    <div key={user._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.profilePic} alt="User" />
                                </div>
                            </div>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.age}</p>
                            <div className="flex gap-2">
                                <div className="card-actions">
                                    <button className="btn btn-primary" onClick={() => navigate(`/update/${user._id}`)}>Edit</button>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-primary" onClick={() => handleDelete(user._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Read;
