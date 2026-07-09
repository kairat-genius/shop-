import { Button } from "@/shared/ui/action";

const EmailSubscription = () => {
  return (
    <form className="h-12 flex items-center">
      <input
        placeholder="Ваш адрес электронной почты"
        className="text-sm border border-slate-950 px-2.5 bg-white leading-normal h-full truncate min-w-0  flex-1"
        type="text"
      />
      <Button
        type="submit"
        className="px-3.75 bg-slate-950 border border-slate-950 text-white min-w-40 h-full text-xl font-bold font-roboto_condensed"
      >
        Подписаться
      </Button>
    </form>
  );
};

export default EmailSubscription;
