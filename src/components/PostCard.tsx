import Image from "next/image";
import React from "react";

interface PostCardProps {
    postid: string;
}

const PostCard = (props : PostCardProps) => {
    return (
        <div>
            <Image
                src={props.postid}
                alt="image"
                sizes="20vw"
                style={{
                    width: "100%",
                    height: "auto",
                }}
                width={1000}
                height={1000}
            />
        </div>
    );
}

export default PostCard;