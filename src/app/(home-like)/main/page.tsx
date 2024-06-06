"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  OutlinedInput,
  InputAdornment,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import FeedCard from "@/components/FeedCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover_Search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [extractData, setExtractData] = useState<
    | {
        image: string;
        id: string;
      }[]
    | null
  >(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [userids, setUserids] = useState<string[]>([]);
  const [profile, setProfile] = useState<string>("");
  const [usernames, setUsernames] = useState<string[]>([]);
  const router = useRouter();
  const handleAvatarClick = () => {
    router.push("/user-page");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (event.target.value.trim() !== "") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            fontcolor: "white",
            fontSize: "16px",
          },
        },
      },
    },
  });

  const { isLoaded, isSignedIn, user } = useUser();
  const id = getCurrentUser().userData.id;

  const getPost = async () => {
    try {
      const res = await fetch("/api/post");
      const data = await res.json();

      setExtractData(
        data.posts.map((post: any) => ({
          image: post.image,
          id: post.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchClick = (index: number) => () => {
    if (userids[index] === id) {
      router.push("/user-page");
    } else {
      router.push(`/user-page/${userids[index]}`);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch("/api/user?list=true");
      const data = await res.json();
      const ids = data.users.map((user: any) => user.id);
      const usernames = data.users.map((user: any) => user.userName);
      const images = data.users.map((user: any) => user.profileImage);
      setUserids(ids);
      setUsernames(usernames);
      setProfile(images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    getUsers();
  }, []);

  if (!isLoaded || !isSignedIn || extractData === null) {
    return (
      <div className="flex min-h-screen bg-[#3c023e] flex-col">
        <div className="flex flex-col mt-[5vh]">
          <Skeleton className="w-[70vw] h-[40vh] rounded-xl ml-20" />
          <Skeleton className="w-[70vw] h-[30vh] rounded-xl mt-20 ml-20 " />
        </div>
      </div>
    );
  }

  const randomItem = extractData[0];
  const randomItem1 = extractData[1];
  const randomItem2 = extractData[3];

  return (
    <div className="flex w-[80vw] text-white">
      <div className="flex flex-col w-[70%]">
        <div className="flex h-[10%] mt-8 mb-4 items-center justify-center">
          <Popover open={open}>
            <PopoverTrigger>
              <ThemeProvider theme={theme}>
                <OutlinedInput
                  placeholder="Search"
                  onChange={handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  size="small"
                />
              </ThemeProvider>
            </PopoverTrigger>
            <PopoverContent>
              <ScrollArea>
                <div className="flex flex-col">
                  {usernames
                    .filter((username) =>
                      username
                        .toLowerCase()
                        .includes(value.trim().toLowerCase())
                    )
                    .map((username) => (
                      <div key={username}>
                        <div
                          className="flex py-2 hover:bg-slate-400"
                          onClick={handleSearchClick(
                            usernames.indexOf(username)
                          )}
                        >
                          <Avatar className="ml-4">
                            <AvatarImage
                              src={profile[usernames.indexOf(username)]}
                            ></AvatarImage>
                          </Avatar>
                          <div className="flex ml-4 justify-center text-center items-center">
                            <h1>{username}</h1>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  {usernames.filter((username) =>
                    username.toLowerCase().includes(value.trim().toLowerCase())
                  ).length === 0 && (
                    <div className="flex py-2 justify-center items-center">
                      Result not found
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <div className="flex">
            <button className="bg-green-400 hover:bg-green-700 rounded-md px-2 py-1 ml-4">
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <FeedCard
            image={randomItem.image}
            postid={randomItem.id}
            curr_id={id}
          />
          <FeedCard
            image={randomItem1.image}
            postid={randomItem1.id}
            curr_id={id}
          />
          <FeedCard
            image={randomItem2.image}
            postid={randomItem2.id}
            curr_id={id}
          />
        </div>
      </div>
      <div className="flex w-[30vw]">
        <div className="flex flex-col">
          <div className="flex mt-10 ml-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={user.imageUrl}
                onClick={handleAvatarClick}
              ></AvatarImage>
              <AvatarFallback
                className="bg-green-200"
                onClick={handleAvatarClick}
              >
                JL
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="grid grid-cols-2">
                <h1 className="text-white ml-4 mr-2">{user.firstName}</h1>
                <h1>{user.lastName}</h1>
              </div>
              <div className="flex">
                <h1 className="text-slate-400 ml-4">{user.username}</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 ml-4">
            <Card>
              <CardHeader>
                <CardTitle>Suggested user</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-12 w-12 sm:flex">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h1 className="text-sm font-semibold leading-none">
                      Olivia Martin
                    </h1>
                    <h1 className="text-sm text-muted-foreground text-gray-600">
                      o_martin_0987
                    </h1>
                  </div>
                  <Button size="sm" className="ml-14">
                    follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
