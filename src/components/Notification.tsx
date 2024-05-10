import React from "react";

interface Props {
    notification: string;
}

const Notification = (
    props : Props
) => {
    return (
        <div className="flex w-full">
            <h1 className="text-[14px]">{props.notification}</h1>
        </div>
    )
}

export default Notification;