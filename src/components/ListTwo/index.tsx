import { Card } from "../../components/Card"
import { InputSearch } from "../../components/InputSearch"
import { FormEvent, useEffect, useState } from "react"
import {Flex, Button, Stack} from "@chakra-ui/react"
import { api } from "../../service/api"
import { CustomAlert } from "../CustomAlert"
import { CustomSpinner } from "../CustomSpinner"

 type HomeProps = {
  fact: string,
  length: number,
}

export const ListTwo = () => {
  const [lenghtFact, setLenghFact] = useState<number>(0);
  const [factQuantity, setFactQuantity] = useState<number>(0);

  const [isFetching, setIsFecthing] = useState<boolean>(false)
  const [notFoundFacts, setNotFoundFacts] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([])  
  const [show, setShow] = useState(false)

  useEffect(() => {
    api.get(`facts?page=${currentPage}`)
    .then((response) => setAllData((prev): any => [...prev, ...response.data.data]))
  }, [currentPage])
  
  
 useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if(entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentPage) => currentPage + 1)
      }
    })

    intersectionObserver.observe(document.querySelector('.sentinel')!)

    return () => intersectionObserver.disconnect()
  }, [])

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault()
    
    try {
      setIsFecthing(true)
      const response = await api.get(`facts?&limit=332`)

      const newArr = response.data.data

      const filteredArr = newArr.filter((item:[string, number]) => item.length === lenghtFact)
      
      filteredArr.length === 0 ? setNotFoundFacts(true) : setNotFoundFacts(false)

      setData(filteredArr)
      setShow(true)
    }catch(err) {
      console.log(err)
    }finally {
      setIsFecthing(false)
      
    }
  }

  const _renderCard = () => {
    if(!show) {
      return allData.map((item: HomeProps, index: number) => (
          <Card 
            key={item.fact}
            fact={item.fact} 
            length={item.length}
            index={index + 1 }
          />
      )) 
    } else {
      return data.map((item: HomeProps, index: number) => (
        <Card 
          key={item.fact}
          fact={item.fact} 
          length={item.length}
          index={index + 1 }
        />
      )) 
    }
  }

  return (
    <>
     <Flex as="form" onSubmit={handleSubmit} >
      <Stack justify="center" w="100%" >
      <Flex w="100%">

        <InputSearch 
          onChange={(event: FormEvent<HTMLInputElement>) => setLenghFact(Number(event.currentTarget.value))}
          placeholder="Tamanho do fato"
          value={lenghtFact || '' }
          mr="3"
        />

        <InputSearch 
          onChange={(event: FormEvent<HTMLInputElement>) => setFactQuantity(Number(event.currentTarget.value))}
          placeholder="Quantidade de fatos"
          value={factQuantity || '' }
        />

      </Flex>

        <Button 
          border='none' 
          color="#fff" 
          bgGradient='linear(to-l, #7928CA, #FF0080)' 
          size="lg"
          h={10}
          w="960"
          cursor="pointer"
          fontFamily="Poppins"
          letterSpacing="widest"
          type="submit">Buscar</Button>
      </Stack>
      </Flex>

      {isFetching ? (
        <CustomSpinner />
      ) : (
        <Flex flexDirection="column" >
         { _renderCard()}
        </Flex>
      )}
       {notFoundFacts && <CustomAlert /> } 
      <li style={{listStyle: "none"}} className="sentinel"></li>
    </>
  )
}