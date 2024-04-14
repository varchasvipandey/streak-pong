"use client";

import dynamic from "next/dynamic";
import { EntryDialog } from "./_components";

const PingPongModule = dynamic(() => import("@/modules/ping-pong/ping-pong"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* <EntryDialog /> */}

      <PingPongModule />
    </>
  );
}
