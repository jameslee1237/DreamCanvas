import React, { ReactNode } from "react";

export default function Layout(props: {
    dialog: ReactNode;
    children: ReactNode;
  }) {
    return (
      <>
        {props.children}
        {props.dialog}
      </>
    );
  }