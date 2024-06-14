import React, { ReactNode } from "react";

interface FeedLayoutProps {
  dialog: ReactNode;
  children: ReactNode;
}

export default function FeedLayout({children, dialog}: FeedLayoutProps) {
    return (
      <div>
        {children}
        {dialog}
      </div>
    );
  }