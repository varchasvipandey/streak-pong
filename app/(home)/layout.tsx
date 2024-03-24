"use client";

import { SocketClientContextProvider } from "@/context/socket-client-context";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({ children }: { children: JSX.Element }) {
  return (
    <SocketClientContextProvider>
      <>
        <main>{children}</main>
        <Toaster duration={2000} />
      </>
    </SocketClientContextProvider>
  );
}
