import React, { ReactNode } from "react";

interface LayoutProps {
  dialog: ReactNode;
  children: ReactNode;
}

export default function Layout({children, dialog}: LayoutProps) {
    return (
      <>
        {children}
        {dialog}
      </>
    );
  }