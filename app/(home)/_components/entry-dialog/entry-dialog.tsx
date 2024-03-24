"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSocketClient } from "@/hooks/use-socket-client";
import { SendEvents } from "@/lib/socket-events";
import { useEffect, useState } from "react";

export const EntryDialog = () => {
  const { socket } = useSocketClient();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleNameUpdate = (formData: FormData) => {
    const playerName = formData.get("playerName")?.toString();

    if (playerName) {
      if (playerName.length > 12 || playerName.length < 3) return setError("Player name must be 3 to 12 characters long");

      if (!/^[a-zA-Z0-9]+$/.test(playerName)) return setError("Player name must be alphanumeric");
    }

    socket?.emit(SendEvents.JoinQueue, playerName);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>
            <p>Welcome to Streak Pong!</p>
          </DialogTitle>
          <DialogDescription>
            Pick your player name, hop into the queue, and challenge others online. Win to climb the global ladder!
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" action={handleNameUpdate}>
          <div>
            <Input
              placeholder="Enter your player name"
              name="playerName"
              autoFocus
              onPaste={(e) => e.preventDefault()}
              onFocus={() => setError("")}
            />
            {error ? <p className="text-xs text-red-600 mt-2">{error}</p> : null}
          </div>
          <Button>Let's Go!</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
