import { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </section>
    </>
  );
}
