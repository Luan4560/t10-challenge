import { useState } from "react"
import { Flex, Container, Text} from "@chakra-ui/react"

import { ListTwo } from "../../components/ListTwo"
import { ListOne } from "../../components/ListOne"

export const Home = () => {
  const [page, setPage] = useState<number>(0)

  return (
    <Container maxW="md" >
      <Flex  align="center" justify="center"  mb="3" >
        <Flex 
          bg="pink.500" 
          w="50%"
          justify="center" 
          align="center"
          borderRadius="4" 
          cursor="pointer"
          h="10"
          mr="3"
          bgGradient='linear(to-l, #7928CA, #FF0080)' 
          onClick={()=> setPage(0)}
        >
          <Text fontWeight="bold">List One</Text>
        </Flex>

        <Flex 
           bg="pink.500" 
           w="50%"
           justify="center" 
           align="center"
           borderRadius="4" 
           cursor="pointer"
           h="10"
           bgGradient='linear(to-l, #7928CA, #FF0080)' 
           onClick={()=> setPage(1)}
        >
          <Text fontWeight="bold">List Two</Text>
        </Flex>

      </Flex>
      {page === 0 ? (
        <ListOne /> 
      ) : (
        <ListTwo />
      )}
    </Container>
  )
}