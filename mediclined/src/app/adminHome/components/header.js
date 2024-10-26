import Image from "next/image";

export default function Head(){
    return (
        <div className="flex flex-col">
            <div className="flex flex-row m-4 items-center w-[228px] justify-between">
                <div>
                    <Image
                        src="/mediclined_logo-modified.png"
                        alt="hello"
                        width={50}
                        height={50}
                        className="mx-auto"
                    />
                </div>
                <div className="font-bold text-[32px]">
                    Mediclined
                </div>
            </div>
        </div>
    );
}