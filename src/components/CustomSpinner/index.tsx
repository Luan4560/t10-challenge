import { Flex, Spinner } from "@chakra-ui/react"

export const CustomSpinner = () => {
  return (
    <Flex w="100%" h="100vh" align="center" justify="center"> 
      <Spinner thickness='4px'speed='0.65s' color='pink.500' size='xl'/>
  </Flex>
  )
}