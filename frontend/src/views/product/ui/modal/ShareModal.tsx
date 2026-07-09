import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import Icon from "@/shared/icon";
import { Button } from "@/shared/ui/action";
import Modal from "@/shared/ui/modal";
import { useState } from "react";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal = ({ onClose }: ShareModalProps) => {
  useBodyScrollLock(true);

  const [isCopied, setIsCopied] = useState(false);
  const currentUrl = globalThis.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Не удалось скопировать ссылку:", error);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;

  return (
    <Modal onClose={onClose} className="bg-white max-w-120 rounded-sm">
      <div
        className="flex items-center justify-between px-8 py-6 border-b"
        style={{ borderColor: "rgba(5, 5, 5, 0.06)" }}
      >
        <h2 className="font-roboto_condensed leading-5.75 text-xl font-bold">
          ПОДЕЛИТЬСЯ С ВАШИМИ ДРУЗЬЯМИ
        </h2>
        <Button
          type="button"
          className="opacity-70 transition-opacity hover:opacity-100 text-slate-500"
          onClick={onClose}
        >
          <Icon icon="x" width={24} height={24} />
        </Button>
      </div>
      <div className="pt-6 px-8 pb-8 grid grid-cols-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 flex flex-col items-center gap-2"
        >
          <div className="w-20 h-20 rounded-full flex justify-center items-center bg-slate-150">
            <img
              className="pA"
              src="https://cdn-img.thepoizon.ru/node-common/0899a7b7-14ad-8dbc-cb5f-873a0f86ea51-176-176.png?x-oss-process=image/format,webp"
              alt="WhatsApp"
              width={38}
              height={38}
            />
          </div>
          <span className="font-light text-base leading-4.75 text-slate-500 text-center">
            WhatsApp
          </span>
        </a>
        <Button
          className="mx-4 flex flex-col items-center gap-2 whitespace-normal"
          onClick={handleCopyLink}
        >
          <div className="w-20 h-20 rounded-full flex justify-center items-center bg-slate-150">
            <img
              className="pA"
              src="https://cdn-img.thepoizon.ru/node-common/3fc730e8-f19e-52d2-de30-42b0af488a47-176-176.png?x-oss-process=image/format,webp"
              alt="CopyLink"
              width={38}
              height={38}
            />
          </div>
          <span className="font-light text-base leading-4.75 text-slate-500 text-center">
            Скопировать ссылку
          </span>
        </Button>
      </div>
      {isCopied && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 bg-black/80 text-white px-4 py-2 rounded-md text-sm shadow-lg pointer-events-none">
          Скопировано
        </div>
      )}
    </Modal>
  );
};

export default ShareModal;
