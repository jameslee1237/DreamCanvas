"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface Params {
  messageId: string;
}

export default function MessagePage({ params }: { params: Params }) {
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [val, setVal] = useState("");
  const [convos, setConvos] = useState<string[]>([]);
  const userId = params.messageId;

  const getConvo = async (userId: string) => {
    if (userId === "1") {
      return
    }
    try {
        const temp = "temp";
        setConvos([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }

  const handleSubmit = async () => {
    if (userId === "1") {
      setVal("");
      return 
    }
    else{

    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`/api/user?authorId=${userId}`);
        const data = await res.json();
        setProfileImage(data.user.profileImage);
        setUserName(data.user.userName);
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [userId]);

  return (
    <div className="flex flex-col relative w-[57vw] overflow-hidden">
      <div className="flex items-center w-full h-[10vh] bg-white">
        <Avatar className="ml-4">
          <AvatarImage src={profileImage}></AvatarImage>
        </Avatar>
        <div className="flex ml-4">
          <h1>{userName}</h1>
        </div>
      </div>
      <div className="flex flex-col-reverse space-y-3 space-y-reverse w-full h-[75vh] bg-blue-100">
        {userId !== "1" ? (
          convos.length !== 0 ? (
            <div>
              {convos.map((msg, index) => (
                <div key={index} className="flex justify-center items-center text-center">
                  {msg}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-cneter text-center mb-10">
            Send a message to start a conversation
          </div>
          )
        ) : (
          <div className="flex w-full h-full justify-center items-center text-center">
            Select a user to start a conversation
          </div>
        )}
      </div>
      <div className="flex w-full h-[15vh] items-center bg-gray-400">
        <Input placeholder="Type your message here" value={val} onChange={handleChange} className="w-4/5 ml-10" />
        <Button className="ml-8" onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
}
