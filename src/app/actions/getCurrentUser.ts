import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

export const getCurrentUser = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [ userData, setUserData] = useState({ 
        id : "",
        clerkId : "",
        firstName: "", 
        lastName: "",
        userName: "",
        email: "",
        followedByIds: [],
        followingIds: [],
        profileImage: ""
    });
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getUserData = async () => {
            if (isLoaded) {
                const response = await fetch(`/api/user/${user?.id}`);
                const data = await response.json();
                setUserData(prevUserData => ({
                    ...prevUserData,
                    ...data
                }));
                setLoading(false);
            }
        };

        getUserData();
    }, [isLoaded, user?.id]);

    return { isLoaded, loading, userData };
}