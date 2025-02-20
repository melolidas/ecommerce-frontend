import { primary } from "@/lib/colors";
import { ButtonStyle } from "./Button";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.button`
    ${ButtonStyle}
    ${(props) =>
        props.main
            ? `
        background-color: ${primary};
        color: white;
        `
            : `
        background-color:transparent;
        border: 1px solid ${primary};
        color: ${primary};
    `}
    ${(props) =>
        props.white &&
        `
        background-color:white;
        border: 1px solid white;
        color: black;
    `}
    cursor: pointer;
    transition: 0.2s;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    &:hover {
        opacity: 0.8;
    }
`;

export default function FlyingButton({ white, main, _id, children }) {
    const { addProduct } = useContext(CartContext);

    return (
        <FlyingButtonWrapper
            white={white}
            main={main}
            onClick={() => addProduct(_id)}
        >
            {children || "Добавить в корзину"}
        </FlyingButtonWrapper>
    );
}
