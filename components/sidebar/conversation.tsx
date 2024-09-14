import Image from "next/image";

export default function Conversation() {
  return (
    <div className="">
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Pic"
              width={1}
              height={1}
              placeholder="empty"
              unoptimized={true}
            />
          </div>
        </div>
        <div>
          <div>Prateek</div>
        </div>
        <div>
          <div>😎</div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
