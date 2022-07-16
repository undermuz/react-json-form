import { Box, Button, Heading, Paragraph, Text, List } from "grommet"
import { StatusGood } from "grommet-icons"

import React, { MouseEventHandler } from "react"

import { IPrice2, IPrice2ValuePrices, IPrice2ValuePricesItem } from "."
import DEF_VALUE from "./defaults"

const exampleButtonClick = () => {
    alert("click")
}

interface IPriceItemProps {
    data: IPrice2ValuePrices
    button_text: string
    onButtonClick?: MouseEventHandler<HTMLAnchorElement> &
        MouseEventHandler<HTMLButtonElement>
}

const PriceItem: React.FC<IPriceItemProps> = ({
    data,
    button_text,
    onButtonClick = exampleButtonClick,
}) => {
    const { title, price, list, is_active } = data

    const color = !is_active ? "light-1" : "accent-2"

    return (
        <Box
            pad="medium"
            basis="full"
            justify="between"
            direction="row"
            align="center"
            alignContent="center"
            hoverIndicator={{
                background: {
                    color: "accent-1",
                },
            }}
            background={{
                color,
                opacity: "strong",
            }}
            round="small"
        >
            <Box basis="1/4">
                <Heading
                    level={3}
                    size="small"
                    margin={{ top: "none", bottom: "small" }}
                >
                    {title}
                </Heading>

                <Text size="xlarge" weight="bolder">
                    {price} ₽
                </Text>
            </Box>
            <Box basis="2/4" align="center" alignContent="center">
                <List
                    data={list}
                    basis="1/2"
                    border={false}
                    pad={{ vertical: "xxsmall" }}
                    style={{ columns: 2 }}
                >
                    {(listItem: IPrice2ValuePricesItem) => {
                        return (
                            <Box direction="row">
                                <StatusGood size="medium" color="brand" />
                                <Text
                                    size="small"
                                    margin={{ left: "small" }}
                                    key={listItem.id}
                                >
                                    {listItem.title}
                                </Text>
                            </Box>
                        )
                    }}
                </List>
            </Box>

            <Button
                size="medium"
                primary={is_active}
                onClick={onButtonClick}
                label={button_text}
            />

            {/* <Text>{item.price}</Text>
    {item.list.map((i) => {
        return <Text>{i.title}</Text>
    })} */}
        </Box>
    )
}

const Price2: React.FC<IPrice2> = (props) => {
    const {
        id = 0,
        value = DEF_VALUE,
        onButtonClick = exampleButtonClick,
    } = props

    const {
        title = DEF_VALUE.title,
        subtitle = DEF_VALUE.subtitle,
        button_text = DEF_VALUE.button_text,
        prices = DEF_VALUE.prices,
    } = value

    return (
        <Box background={{ color: "light-3" }} align="center">
            <Box width={"xxlarge"}>
                <Box
                    width={"100%"}
                    pad="medium"
                    direction="column"
                    align="center"
                >
                    <Box>
                        <Heading level={2}>{title}</Heading>
                    </Box>

                    <Box>
                        <Paragraph>{subtitle}</Paragraph>
                    </Box>
                </Box>

                {prices.length > 0 && (
                    <Box
                        direction="column"
                        pad="small"
                        background="light-3"
                        gap="medium"
                        basis="full"
                    >
                        {prices.map((item, index) => (
                            <PriceItem
                                key={item.id}
                                data={item}
                                button_text={button_text}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Price2
