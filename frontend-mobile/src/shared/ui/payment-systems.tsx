import { cn } from "@/shared/utils/clsx";
import { getImageUrl } from "../utils/getImageUrl";

interface PaymentSystemsProps {
  className?: string;
}

const PaymentsData = [
  "belkart-internet-parol-logo-gray.png",
  "belkart-logo-gray.png",
  "erip-logo-gray.png",
  "mastercard-idcheck-logo-gray.png",
  "mastercard-logo-gray.png",
  "mtbank-logo-gray.png",
  "sber-bank-logo-gray.png",
  "visa-logo-gray.png",
  "visa-secure-logo-gray.png",
  "webpay-logo-gray.png",
];

const PaymentSystems = ({ className }: PaymentSystemsProps) => {
  return (
    <div
      className={cn(
        "flex gap-3.75 lg:gap-5 justify-between lg:w-full xl:w-fit flex-col lg:flex-row",
        className,
      )}
    >
      <div className="flex gap-2.5 items-center justify-center">
        {PaymentsData.slice(0, 5).map((item) => (
          <img
            key={item}
            src={getImageUrl(`/static-media/payments/${item}`)}
            alt=""
            height={16}
            className="h-4 shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      <div className="flex gap-2.5 items-center justify-center">
        {PaymentsData.slice(5, 10).map((item) => (
          <img
            key={item}
            src={getImageUrl(`/static-media/payments/${item}`)}
            alt=""
            height={16}
            className="h-4 shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentSystems;
