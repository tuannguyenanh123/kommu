import MainContent from "@/components/main-content";
import { ColorPrefrencesProvider } from "@/providers/color-prefrences";
import { ThemeProvider } from "@/providers/theme-provider";
import React, { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPrefrencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPrefrencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
