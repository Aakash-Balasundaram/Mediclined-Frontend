import Image from "next/image";

export default function Head(){
    return (
        <div className="flex flex-col">
            <div className="flex flex-row m-4 items-center w-[296px] justify-between">
                <div>
                    <Image
                        src="/mediclined_logo-modified.png"
                        alt="hello"
                        width={60}
                        height={60}
                        className="mx-auto"
                    />
                </div>
                <div className="font-bold text-[42px]">
                    Mediclined
                </div>
            </div>
        </div>
    );
}