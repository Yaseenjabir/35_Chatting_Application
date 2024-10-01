import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_CONNECTION_STRING}`);
export default function Chatroom() {
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  const msgRef = useRef();

  useEffect(() => {
    setUsername(location.state.user.name);

    socket.on("message", (msg) => {
      setMessages((prevMsgs) => {
        const messageExists = prevMsgs.some(
          (existingMsg) =>
            existingMsg.message === msg.message &&
            existingMsg.timeStamp === msg.timeStamp
        );

        if (!messageExists) {
          return [...prevMsgs, msg];
        }

        return prevMsgs;
      });
    });

    return () => {
      socket.off("message");
    };
  }, [location.state.user.name]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_CONNECTION_STRING}/`);
      const data = await res.json();
      data.result.map((item) => setMessages((prev) => [...prev, item]));
    };
    fetchData();
  }, []);

  const sendMessage = () => {
    if (!msgRef.current.value) {
      alert("please write your msg");
      return;
    }
    socket.emit("message", {
      message: msgRef.current.value,
      username,
      timeStamp: new Date(),
    });
    msgRef.current.value = "";
  };

  return (
    <>
      <section className="w-full h-screen bg-purple-400 pt-7 pb-1 text-white">
        <div className="px-2">
          <h1 className="text-xl font-bold mb-3">Chatting Room</h1>
        </div>
        <div className="border w-full rounded-xl h-[93%] relative pt-2 flex flex-col">
          <div className="mt-2 h-[90%] overflow-auto px-2 flex flex-col gap-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.username === username ? "items-end" : "items-start"
                }`}
              >
                <p className="text-sm font-bold px-2">{msg.username}</p>
                <h1
                  className={`${
                    msg.username === username
                      ? "bg-blue-400 text-white"
                      : "bg-gray-300 text-black"
                  } py-2 rounded-lg max-w-[50%] px-2 text-sm font-semibold`}
                >
                  {msg.message}
                </h1>
                <small>{new Date(msg.timeStamp).toLocaleTimeString()}</small>
              </div>
            ))}
          </div>

          <div className="absolute w-full bottom-0 flex items-center justify-center gap-2">
            <input
              ref={msgRef}
              type="text"
              placeholder="Enter message"
              className="w-[100%] outline-none text-black bg-white rounded-xl py-2 px-4"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 rounded-lg py-2 px-2"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
