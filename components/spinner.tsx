import { CircleDashedIcon, HomeIcon } from "lucide-react";

export default function Spinner() {
  return (
    <div className="relative flex h-20 w-full items-center justify-center">
      <CircleDashedIcon className="absolute h-12 w-12 animate-spin" />
      <HomeIcon className="absolute" />
    </div>
  );
}
