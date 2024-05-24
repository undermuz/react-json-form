import type { FC, PropsWithChildren, ReactNode } from "react"

import { Box, ChakraProvider, HStack } from "@chakra-ui/react"

type BaseStoryLayoutProps = PropsWithChildren & {
    left?: ReactNode
}

const BaseStoryLayout: FC<BaseStoryLayoutProps> = ({ left, children }) => {
    return (
        <ChakraProvider>
            <HStack alignItems={"flex-start"}>
                <Box w="40%" p={"md"}>
                    {left}
                </Box>

                <Box w="60%">{children}</Box>
            </HStack>
        </ChakraProvider>
    )
}

export default BaseStoryLayout
