import { Circle, Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Circle size={40} color="gray" strokeWidth={1}/>
      <Loader2 size={40} color="black" className="absolute animate-spin"/>
    </div>
  )
}
