import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Login({ setIsLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!emailRef.current.value || !passwordRef.current.value) {
      alert("Fields are missing");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_CONNECTION_STRING}/authentication/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);
    if (data.success) {
      navigate("/chatroom", { state: data });
    } else {
      alert("something went wrong");
    }
  }

  return (
    <>
      <div className="w-full px-5 flex flex-col items-center justify-center">
        <h1 className="text-center font-semibold text-2xl">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] p-5 bg-gray-50 flex flex-col gap-3"
        >
          <div>
            <label
              className=" px-3 font-semibold text-gray-600 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="text"
              placeholder="Enter Email"
              className="outline-none w-full border rounded-full py-2 px-3"
            />
          </div>
          <div>
            <label
              className=" px-3 font-semibold text-gray-600 "
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="Enter password"
              className="outline-none w-full border rounded-full py-2 px-3"
            />
          </div>
          <button className="w-full bg-blue-500 py-2 rounded-full text-white font-semibold">
            Login
          </button>
          <p className="text-center">
            Not having account?
            <span
              className="underline text-blue-500 px-1 cursor-pointer"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
