import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Update() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`http://localhost:3000/user/${id}`);
                const result = await response.json();
                if (response.ok) {
                    setName(result.name);
                    setEmail(result.email);
                    setAge(result.age);
                    setProfilePic(result.profilePic);
                } else {
                    toast.error(result.error);
                }
            } catch (error) {
                toast.error("Error fetching user data");
            }
        }

        fetchUser();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        const updateUser = { name, email, age, profilePic };
        try {
            const response = await fetch(`http://localhost:3000/user/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updateUser),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(`${result.name} Updated Successfully`);
                navigate('/');
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Error updating user");
        }
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Edit User</h1>
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

export default Update;
