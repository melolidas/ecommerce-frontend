import styled from "styled-components";
import Button, { ButtonStyle } from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import FlyingButton from "./FlyingButton";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import axios from "axios";

export const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
    img {
        max-width: 100%;
        max-height: 80px;
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    @media screen and (min-width: 768px) {
        display: flex;
        gap: 5px;
    }
    flex-direction: column;
`;

const Price = styled.div`
    font-size: 1rem;
    font-weight: 400;
    text-align: right;
    @media screen and (min-width: 768px) {
        font-size: 1.2rem;
        font-weight: 600;
        text-align: left;
    }
`;
const WishlistButton = styled.button`
    border: 0;
    width: 40px !important;
    height: 40px;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    cursor: pointer;
    ${(props) =>
        props.wished
            ? `
    color:red;
  `
            : `
    color:black;
  `}
    svg {
        width: 16px;
    }
`;

export default function ProductBox({
    _id,
    title,
    price,
    images,
    wished = false,
    onRemoveFromWishlist = () => {},
}) {
    const url = "/product/" + _id;

    const [isWished, setIsWished] = useState(wished);
    function addToWishlist(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const nextValue = !isWished;
        if (nextValue === false && onRemoveFromWishlist) {
            onRemoveFromWishlist(_id);
        }
        axios
            .post("/api/wishlist", {
                product: _id,
            })
            .then(() => {});
        setIsWished(nextValue);
    }

    function truncateTitle(title, maxLength = 23) {
        return title.length > maxLength
            ? title.substring(0, maxLength) + "..."
            : title;
    }
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <WishlistButton wished={isWished} onClick={addToWishlist}>
                        {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
                    </WishlistButton>
                    <img src={images?.[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{truncateTitle(title)}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <FlyingButton _id={_id} src={images?.[0]}>
                        Add to cart
                    </FlyingButton>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
