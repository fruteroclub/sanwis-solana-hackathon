import { PropsWithChildren } from "react";

export default function SiteHeading({ children }: PropsWithChildren<{}>) {
  return <h1 
    className="text-6xl my-8 font-extrabold self-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-900">
      Menú
    </h1>
}
