import Image from "next/image";
import React from "react";

interface PostCardProps {
    postid: string;
}

const PostCard = (props : PostCardProps) => {

    return (
        <div className="flex w-[300px] h-[200px] bg-white">
            <Image
                src={props.postid}
                alt="image"
                className="object-cover"
                sizes="20vw"
                style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                }}
                width={1000}
                height={1000}
            />
        </div>
    );
}

export default PostCard;