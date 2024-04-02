import Image from "next/image";
import React from "react";

const PostCard = ({postid} : {postid: string}) => {
    return (
        <div>
            <Image
                src={postid}
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