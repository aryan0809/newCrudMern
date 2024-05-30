import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AvatarGenerator } from 'random-avatar-generator';

function Create() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(""); // Initialize with an empty string
    const navigate = useNavigate(); // Use the useNavigate hook to get the navigation function

    async function handleSubmit(e) {
        e.preventDefault();
        const generator = new AvatarGenerator();
 
       // Simply get a random avatar
        const profilePic = generator.generateRandomAvatar();
        const addUser = { name, email, age, profilePic };

        const response = await fetch("http://localhost:3000/user", {
            method: 'POST',
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            toast.error(result.error); // Show error message when email is already registered
        } else {
            console.log(result);
            navigate('/');
            toast.success(result.name + " " + "Added Successfully");
        }
    }

    return (
        <div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Create Now!</h1>
                        <p className="py-6"></p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="example@email"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="input input-bordered"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    className="input input-bordered"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
