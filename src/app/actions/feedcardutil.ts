import { useState, ChangeEvent } from "react";

export const feedcardutil = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [val, setVal] = useState("");
    const [typed, setTyped] = useState(false);
    const [fullval, setfullVal] = useState("");
    const [fulltyped, setfullTyped] = useState(false);

    const hasTyped = (e: ChangeEvent<HTMLInputElement>) => {
        const typedValue = e.target.value;
        setTyped(typedValue.length > 0);
        setVal(typedValue);
    }

    const hasTypedFull = (e: ChangeEvent<HTMLInputElement>) => {
        const typedValue = e.target.value;
        setfullTyped(typedValue.length > 0);
        setfullVal(typedValue);
    }

    const handleDialogOpenChange = () => {
        if (dialogOpen) {
            setfullVal("");
            setfullTyped(false);
        }
        setDialogOpen((prev) => !prev);
    }

    return { dialogOpen, val, typed, fullval, fulltyped, 
            setDialogOpen, setVal, setfullVal,
             hasTyped, hasTypedFull, handleDialogOpenChange }
}