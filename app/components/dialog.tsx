import type { ReactNode } from "react";

interface DialogProps {
    children: ReactNode;
    isOpen: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

export default function Dialog ({ children, isOpen = false, onClick }: DialogProps) {
    if (!isOpen) return null;

    return (
        <div className="flex fixed top-0 right-0 bottom-0 left-0 bg-black/80 z-50" onClick={onClick}><div className="m-auto">{children}</div></div>
    );
}
