"use client";

import { MUIProvider } from "@/providers";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <MUIProvider>{children}</MUIProvider>
    </ApolloProvider>
  );
}
