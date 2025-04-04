import Image from "next/image";

export const Spinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <Image
            src="/images/loading.gif"
            alt="Loading"
            width={120}
            height={120}
            priority
        />
    </div>
);
