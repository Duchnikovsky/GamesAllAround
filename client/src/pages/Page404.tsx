import { FileX } from "lucide-react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <FileX strokeWidth={0.75} size={80}/>
      <div className='text-4xl'>Page not found</div>
      <div className='text-xl'>Go to <Link to='/' className="font-bold hover:text-sky-800">home page</Link></div>
    </div>
  )
}
