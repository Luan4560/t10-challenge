import { Flex, Text } from "@chakra-ui/react"

type CardProps = {
  fact: string,
  length: number
  index: number
}

export const Card = ({fact, index}:CardProps) => {
  return (
    <Flex 
      width="100%" 
      bg="gray.500" 
      align="justify"
      padding="4" 
      borderRadius="5"
      letterSpacing={0.4}
      mt="3"
      maxW="md" 
      w="93%"
    >
      <Text as="span"fontWeight="bold" mr="2">{index}.</Text>
      <Text as="span">{fact} </Text> 
    </Flex>
  )
}