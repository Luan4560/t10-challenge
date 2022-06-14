import { Alert, AlertIcon, Text } from "@chakra-ui/react"

export const CustomAlert = () => {
  return (
    <>
      <Alert p="1" mt="2" w="50" borderRadius={4} status='error' variant="solid">
      <AlertIcon />
        <Text>Não foi encontrado um fato correspondente.</Text>
      </Alert>
    </>
  )
}