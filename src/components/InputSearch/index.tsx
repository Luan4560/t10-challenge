import { Input } from '@chakra-ui/react'

export const InputSearch = ({...rest}) => {
  return (
    <Input maxLength={3} color="gray.100"{...rest}/>
  )
}