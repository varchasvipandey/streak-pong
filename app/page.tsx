"use client";

import { useSocketClient } from "@/hooks/use-socket-client";

export default function Home() {
  const socket = useSocketClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => console.log(socket?.id)}>Get socket info</button>
    </main>
  );
}
