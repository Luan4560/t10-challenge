import { ChangeEvent, useState } from "react"

import { Card } from "../../components/Card"
import { InputSearch } from "../../components/InputSearch"
import { useFetch } from "../../hooks/useFetch"
import { Flex, Button} from "@chakra-ui/react"
import { CustomAlert } from "../CustomAlert"
import { CustomSpinner } from "../CustomSpinner"

 type HomeProps = {
  fact: string,
  length: number,
}

export const ListOne = () => {
  const [search, setSearch] = useState<number>(0);
  const [newFilterd, setNewFiltered] = useState<HomeProps []>([])
  const [factNotFound, setFactNotFound] = useState(false)
  const { data: facts,isFetching} = useFetch<any>('facts?max_length=328&limit=328')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(Number(event.target.value));
  } 
  
  const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const filteredLenght = facts.data.filter((item: HomeProps) => item.length === search)
    
    if(filteredLenght) {
      setNewFiltered( filteredLenght)
      setFactNotFound(false)
    } else {
      setFactNotFound(true)
    }
  }

  return (
    <>
     <Flex as="form" onSubmit={handleSubmit} align="center" justify="space-evenly">
        <InputSearch 
          onChange={handleSearchChange}
          placeholder="Tamanho do"
          value={search || '' }
        />

        <Button 
          border='none' 
          color="#fff" 
          bgGradient='linear(to-l, #7928CA, #FF0080)' 
          size="lg"
          h={45}
          ml="3"
          cursor="pointer"
        type="submit">Buscar</Button>
      </Flex>

      {isFetching ? (
        <Flex w="100%" h="100vh" align="center" justify="center"> 
          <CustomSpinner/>
        </Flex>
        ) : (
          newFilterd.map((item: HomeProps, index: number) => (
          <Card 
            key={item.fact}
            fact={item.fact} 
            length={item.length}
            index={index + 1 }
          />
        ))
      )}

      {factNotFound && <CustomAlert />} 
    </>
  )
}