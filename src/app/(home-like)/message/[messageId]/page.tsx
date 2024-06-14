"use client";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

interface Params {
  messageId: string;
}

export default function MessagePage({ params }: { params: Params }) {
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [val, setVal] = useState("");
  const userId = params.messageId;
  const id = getCurrentUser().userData.id;
  const [messages, setMessages] = useState<string[]>([]);
  const [authorIds, setAuthorIds] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [convoId, setConvoId] = useState("");
  const [loading, setLoading] = useState(true);

  const getConvo = async (userId: string) => {
    if (userId === "1") {
      return;
    }
    try {
      const res = await fetch(`/api/conversation?curr_id=${id}`);
      const data = await res.json();
      const currConvo = data.conversations.find((conv: any) => {
        return conv.participants.some((part: any) => part.userId === userId);
      });
      if (currConvo) {
        const myConvos = data.conversations.filter((conv: any) => {
          return conv.participants.some((part: any) => part.userId === id);
        });
        const currConvo = myConvos.find((conv: any) => {
          return conv.participants.some((part: any) => part.userId === userId);
        });
        setMessages(currConvo.messages.map((msg: any) => msg.content));
        setAuthorIds(currConvo.messages.map((msg: any) => msg.authorId));
        setTimes(
          currConvo.messages.map((msg: any) => {
            const utc = msg.createdAt;
            const local = new Date(utc).toLocaleString("en-us", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            });
            return local;
          })
        );
        setConvoId(currConvo.id);
      } else {
        const convData = {
          currentUser: id,
          otherUser: userId,
        };
        const _res = await fetch("/api/conversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(convData),
        });
        if (!_res.ok) {
          throw new Error("Failed to send message");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const handleSubmit = async () => {
    if (userId === "1") {
      setVal("");
      return;
    } else {
      setVal("");
      try {
        const convoData = {
          content: val,
          conversationId: convoId,
          authorId: id,
        };
        const res = await fetch("/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(convoData),
        });
        if (!res.ok) {
          throw new Error("Failed to send message");
        }
        const data = await res.json();
        const local = new Date(data.message.createdAt).toLocaleString("en-us", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        });
        const newMessages = [...messages, data.message.content];
        const newAuthors = [...authorIds, data.message.authorId];
        const newTimes = [...times, local];
        setMessages(newMessages);
        setAuthorIds(newAuthors);
        setTimes(newTimes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      if (userId === "1") {
        return;
      }
      try {
        const res = await fetch(`/api/user?authorId=${userId}`);
        const data = await res.json();
        setProfileImage(data.user.profileImage);
        setUserName(data.user.userName);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      checkUser();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && id) {
      getConvo(userId);
      setTimeout(() => {
        setLoading(false);
      
      }, 1000)
    }
  }, [userId, id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#3c023e] flex-col w-[57vw]">
        <div className="flex mt-[5vh] justify-center items-center">
          <Skeleton className="w-[50vw] h-[80vh] rounded-xl" />
        </div>
      </div>
    );
  }

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
          messages.length !== 0 ? (
            <div className="flex flex-col w-full mb-4 space-y-4">
              {messages.map((msg, idx) =>
                authorIds[idx] === id ? (
                  <div
                    key={msg}
                    className="flex bg-green-300 py-2 px-4 max-w-[40vw] rounded-r-md self-start"
                  >
                    <h1>{msg}</h1>
                    <h2 className="text-[10px] ml-2 self-end w-[6vw]">{times[idx]}</h2>
                  </div>
                ) : (
                  <div
                    key={msg}
                    className="flex bg-slate-500 py-2 px-4 max-w-[40vw] rounded-l-md self-end"
                  >
                    <h2 className="text-[10px] mr-2 self-end w-[6vw]">{times[idx]}</h2>
                    <h1>{msg}</h1>
                  </div>
                )
              )}
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
        <Input
          placeholder="Type your message here"
          value={val}
          onChange={handleChange}
          className="w-4/5 ml-10"
        />
        <Button className="ml-8" onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
}
