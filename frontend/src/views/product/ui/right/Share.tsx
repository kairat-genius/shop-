"use client";
import { Button } from "@/shared/ui/action";
import dynamic from "next/dynamic";
import { useState } from "react";

const ShareModal = dynamic(() => import("../modal/ShareModal"), { ssr: false });

const Share = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsShareModalOpen(true)}>
        <img
          src={"/static-media/detail/share.png"}
          alt="share"
          className="w-[1rem] h-[1rem]"
        />
      </Button>
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)}/>
      )}
    </>
  );
};

export default Share;
