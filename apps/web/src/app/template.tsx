import Image from "next/image";
import neodyLogo from "@/assets/neody.png";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 flex flex-col">
      <main className="flex-1">{children}</main>
      <footer className="border-t border-base-300 py-6 bg-base-100">
        <div className="container mx-auto px-4 flex justify-center">
          <Image
            src={neodyLogo}
            alt="Neody"
            width={120}
            height={40}
            className=""
          />
        </div>
      </footer>
    </div>
  );
}
