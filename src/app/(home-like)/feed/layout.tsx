import React, { ReactNode } from "react";

export default function FeedLayout({ 
  children, 
} : { 
  children: ReactNode
}) {
    return (
      <>
        {children}
      </>
    );
  }