import React, { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLayout;
