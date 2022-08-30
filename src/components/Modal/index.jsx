import React from "react";

function Modal({ isOpen = false, children }) {
    if (!isOpen) {
        return null;
    }

    return <div>{children}</div>;
}

export default Modal;
