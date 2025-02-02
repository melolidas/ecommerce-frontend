import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import ButtonLink from "./ButtonLink";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;

const Desc = styled.p`
    color: #aaa;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Featured({ product }) {
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink
                                    href={"/products/" + product._id}
                                    outline={1}
                                    white={1}
                                    size="l"
                                >
                                    Read more
                                </ButtonLink>
                                <Button white size="l">
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://halid-next-ecommerce.s3.amazonaws.com/1738258717987.png" />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}
