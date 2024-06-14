import React, { ReactNode } from "react";

export default function FeedLayout({ 
  children, 
  dialog,
} : { 
  children: ReactNode
  dialog: ReactNode 
}) {
    return (
      <>
        {children}
        {dialog}
      </>
    );
  }