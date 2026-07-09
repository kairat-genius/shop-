import { Button } from "@/shared/ui/action";

const EmailSubscription = () => {
  return (
    <form className="flex my-[4.8vw]">
      <div className="h-[10.667vw] border border-black rounded-[1.067vw] flex items-center w-full">
        <input
          className="text-[3.2vw] px-3 caret-black"
          placeholder="Ваш адрес электронной почты"
          autoComplete="off"
        />
      </div>
      <Button
        type="submit"
        className="text-[3.733vw] ml-[2.133vw] h-[10.667vw] min-w-[25.6vw] border border-black rounded-[1.067vw] font-roboto_condensed font-bold"
      >
        Подписаться
      </Button>
    </form>
  );
};

export default EmailSubscription;
