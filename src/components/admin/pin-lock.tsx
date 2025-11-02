"use client"

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

interface PinLockProps {
  isOpen: boolean;
  onUnlock: () => void;
}

const CORRECT_PIN = "1234";

export function PinLock({ isOpen, onUnlock }: PinLockProps) {
  const [pin, setPin] = useState("");
  const { toast } = useToast();

  const handlePinChange = (value: string) => {
    if (pin.length < 4) {
      setPin(pin + value);
    }
  };
  
  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleUnlock = () => {
    if (pin === CORRECT_PIN) {
      onUnlock();
      toast({ title: "Success", description: "PIN accepted. Welcome back." });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Incorrect PIN. Please try again.",
      });
      setPin("");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader className="items-center text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
             <Lock className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Session Locked</DialogTitle>
          <DialogDescription>
            Enter your 4-digit PIN to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center my-4">
          <Input 
            type="password"
            value={pin}
            readOnly
            className="w-48 text-center text-2xl tracking-[1.5em]"
            maxLength={4}
            placeholder="----"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <Button key={i+1} variant="outline" size="lg" className="text-xl" onClick={() => handlePinChange(String(i + 1))}>
              {i + 1}
            </Button>
          ))}
           <Button variant="outline" size="lg" className="text-xl" onClick={handleBackspace}>
            &larr;
          </Button>
          <Button variant="outline" size="lg" className="text-xl" onClick={() => handlePinChange("0")}>
            0
          </Button>
          <Button size="lg" className="text-xl" onClick={handleUnlock}>
            Unlock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
