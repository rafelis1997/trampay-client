import Image from "next/image";
import { ReactNode } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className={`flex min-h-screen flex-col gap-8 ${inter.className}`}>
      <div className="flex w-full justify-center bg-slate-200 drop-shadow py-3">
        <div className="flex w-full md:max-w-3xl">
          <Image
            src="https://trampay.com/wp-content/uploads/2021/12/trampay-vertical.png"
            width={240}
            height={76}
            alt="Trampay logo"
            className="object-contain h-11"
          />
        </div>
      </div>
      {children}
    </main>
  );
}
