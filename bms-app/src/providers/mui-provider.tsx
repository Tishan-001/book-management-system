"use client";

import React, { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@/config/theme";

interface Props {
  children: ReactNode;
}

const MUIProvider: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIProvider;
