
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { Container, Text } from '@chakra-ui/react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './styles.module.css'

type IData = {
    id: string,
    doa: string,
    ayat: string,
    latin: string,
    artinya: string
  }

type IProps = {
  data: IData[]
}

const Home: React.FC<IProps> = ({ data }) => {
  const [search, setSearch] = useState<string>('')
  const [detail, setDetail] = useState<IData[]>([])
  const router = useRouter()

  useEffect(() => {
    setDetail(data)
  }, [data])


  return (
    <Container pt={8} border="1px" borderTop={"none"} borderBottom={0} minHeight={'100vh'}  pb={8}>
      <Container>
        <Text fontSize='2xl' fontWeight={800}>
          {detail[0]?.doa}
        </Text>
      </Container>
      <Container display={'flex'} alignItems={"center"} gap={1} mt={2} cursor={'pointer'}>
        <ArrowLeftIcon boxSize={2} onClick={router.back} />
        <Text fontSize={"sm"} fontWeight={800}>
          kembali
        </Text>
      </Container>
      <Container mt={10}>
          <Text className={style.arab} textAlign={'right'} fontSize="2xl">{detail[0]?.ayat}</Text>
          <Text>{detail[0]?.latin}</Text>
          <Text mt={5}>Artinya:</Text>
          <Text>{`"${detail[0]?.artinya}"`}</Text>
      </Container>
    </Container>
  )
}

export const getServerSideProps = async ({
  req,
  query
}: GetServerSidePropsContext<any>): Promise<GetServerSidePropsResult<any>> => {
  const { id } = query;
  try {
    const url = `https://doa-doa-api-ahmadramadhan.fly.dev/api/${id}`
    const res = await fetch(url, {
      mode: 'no-cors'
    })
    const data = await res.json()
    return {
      props: {
        data: data
      }
    }
  } catch (error) {
    return {
      props: {
        data: undefined
      }
    };
  }
};
export default Home