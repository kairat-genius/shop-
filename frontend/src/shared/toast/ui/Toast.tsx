import { memo } from "react";
import "./toast.css";
import Image from "next/image";
import type { ToastMessage } from "../model/type";
import { getImageUrl } from "@/shared/utils/getImageUrl";


const Toast = memo(({ message, type = "success" }: ToastMessage) => {
  return (
    <div id="toastBox">
      <div className={`toast ${type}`}>
        <Image src={getImageUrl(`/static-media/toast/${type}.webp`)} alt={type} height={24} width={24} />
        {message}
      </div>
    </div>
  );
});
Toast.displayName = "Toast";

export default Toast;
