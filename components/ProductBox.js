import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
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
    display: block;

    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const Price = styled.div`
    font-size: 1rem;
    font-weight: 400;
    text-align: right;
`;

export default function ProductBox({ _id, title, description, price, images }) {
    const url = "/product/" + _id;
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>${price}</Price>
                    <Button block primary outline>
                        Add to cart
                    </Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
