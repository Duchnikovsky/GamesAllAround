import { useContext, useRef } from "react";
import { RiUpload2Line } from "react-icons/ri";
import { cn } from "../../../../utils/tailwindMerge";
import { ValuesContext } from "./AddProduct";

export default function AddProductImage() {
  const { image, setImage } = useContext(ValuesContext);
  const inputRef = useRef<any>();

  function handleImageClick() {
    inputRef.current.click();
  }

  function handleImageChange(e: React.FormEvent) {
    const input = e.target as HTMLInputElement;
    const file = input.files![0];
    setImage(file);
  }

  return (
    <div
      className={cn(
        "relative w-full h-[25.25rem] rounded-lg border border-zinc-200/40 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      )}
      onClick={handleImageClick}
    >
      {image ? (
        <img
          alt="image"
          src={URL.createObjectURL(image)}
          className="object-cover absolute w-full h-full top-0 left-0 bottom-0 right-0 box-border rounded"
          style={{}}
        />
      ) : (
        <>
          <RiUpload2Line size={32} />
          <div>Upload image from your device</div>
          <div className="text-xs text-zinc-400">
            Acceptable file types are PNG, JPG and JPEG
          </div>
        </>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        accept=".png, .jpg, .jpeg"
      />
    </div>
  );
}
