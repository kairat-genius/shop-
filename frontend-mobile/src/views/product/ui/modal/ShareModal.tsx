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

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    currentUrl,
  )}`;

  return (
    <Modal
      onClose={onClose}
      className="bg-white rounded-t-[2.133vw]"
      overlayClassName="justify-end items-end"
    >
      <div className="flex items-center justify-between py-[4.267vw] px-[3.733vw] border-b border-slate-100 h-[14.4vw]">
        <h2 className="font-roboto_condensed leading-[5.6vw] text-[4.8vw] font-bold">
          Поделитесь с друзьями
        </h2>
        <Button className="text-slate-500" onClick={onClose}>
          <Icon icon="x" className="w-[4.267vw] h-[4.267vw]" />
        </Button>
      </div>
      <div className="flex items-center max-w-fit gap-[6.4vw] mt-[5.867vw] px-[3.733vw] pb-[3.2vw]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-[2.133vw] w-[12.267vw]"
        >
          <img
            className="w-[11.733vw] h-[11.733vw] aspect-square"
            src="https://cdn-img.thepoizon.ru/node-common/c656a248-8276-ad0a-d9b1-6e0b77175354-88-88.png?x-oss-process=image/format,webp"
            alt=""
          />

          <span className="font-light text-[2.667vw] leading-[100%] text-slate-500 text-center min-h-[3.733vw]">
            Telegram
          </span>
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-[2.133vw] w-[12.267vw]"
        >
          <img
            className="w-[11.733vw] h-[11.733vw] aspect-square"
            src="https://cdn-img.thepoizon.ru/node-common/0899a7b7-14ad-8dbc-cb5f-873a0f86ea51-176-176.png?x-oss-process=image/format,webp"
            alt="WhatsApp"
          />

          <span className="font-light text-[2.667vw] leading-[100%] text-slate-500 text-center min-h-[3.733vw]">
            WhatsApp
          </span>
        </a>
        <Button
          className="flex-col gap-[2.133vw] w-[12.267vw] whitespace-normal"
          onClick={handleCopyLink}
        >
          <img
            className="w-[11.733vw] h-[11.733vw] aspect-square"
            src="https://cdn-img.thepoizon.ru/node-common/b8ab310a-b545-748d-5010-da405401f956-132-132.png?x-oss-process=image/format,webp"
            alt="CopyLink"
            width={38}
            height={38}
          />

          <span className="font-light text-[2.667vw] leading-[100%] text-slate-500 text-center min-h-[3.733vw]">
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
