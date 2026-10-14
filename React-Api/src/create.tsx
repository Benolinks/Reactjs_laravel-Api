import { useState, type FormEvent } from "react";
import "./index.css";
import api from "./services/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
 const [errors, setErrors] = useState<Record<string, string[]>>({});

  

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
   

    try {
      const response = await api.post("/create", {
        firstname,
        lastname,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.data.verified === true) {
        navigate("/index");
      } else {
        setErrors({ error: [response.data.message || "Failed to create user"] });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseErrors = error.response?.data?.errors;
        if (responseErrors && typeof responseErrors === "object") {
          setErrors(responseErrors);
        } else {
          setErrors({
            error: [
              error.response?.data?.message ||
                error.message ||
                "Failed to create user",
            ],
          });
        }
      } else {
        setErrors({ error: ["Failed to create user"] });
      }
    }
  };

  return (
    <div className="flex flex-col w-[60%] m-auto border-gray-300 border p-10 mt-10">
      <h1
        className="text-3xl 
        font-bold underline text-amber-300 my-10"
      >
        Create Page
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col my-4">

         {

          
            Object.values(errors).flat().map((error, index) => {
              return (
                <div
                  key={index}
                  className="bg-orange-700 text-white p-2 mb-4 rounded-md"
                >
                 <p className="text-white" > {error}</p> 
                </div>
              );
            })
      }

      
      
          


        {/* name */}
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter your firstname"
          className="border border-gray-300 
        rounded-md p-2 w-[70%] mb-5"
        />
        {/* name */}
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) =>setLastname(e.target.value)}
          placeholder="Enter your lastname"
          className="border border-gray-300 
        rounded-md p-2 w-[70%] mb-5"
        />
        {/* name */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-gray-300 
        rounded-md p-2 w-[70%] mb-5"
        />
        {/* name */}
        <label htmlFor="password">Password</label>
        <input
          type="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border border-gray-300 
        rounded-md p-2 w-[70%] mb-5"
        />
        {/* name */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="Password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="border border-gray-300 
        rounded-md p-2 w-[70%] mb-5"
        />

        <button
          id="submit"
          type="submit"
          className="bg-amber-300 text-white p-2 rounded-md w-[30%]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
