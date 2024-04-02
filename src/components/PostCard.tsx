import React from "react";

const PostCard = ({postid} : {postid: string}) => {
    return (
        <div>
            <h1>{postid}  Post Card</h1>
        </div>
    );
}

export default PostCard;