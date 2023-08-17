
import { Container, Input, Text } from '@chakra-ui/react'
import { IconComp } from '@components'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
  const [list, setList] = useState<IData[]>([])
  const router = useRouter()

  useEffect(() => {
    const listData = Array.isArray(data) ? data : [data]
    setList(listData)
  }, [data])


  return (
    <Container pt={8} border="1px" borderTop={"none"} borderBottom={0} minHeight={'100vh'}  pb={8}>
      <Container>
        <Text fontSize='2xl' fontWeight={800}>
          Doa - Doa
        </Text>
        <Text fontSize='2xl' fontWeight={800}>
          Dalam islam
        </Text>
      </Container>
      <Container px={5} pt={5}>
        <Input
          placeholder={"Cari doa...."}
          border={"none"}
          borderBottom={"1px solid rgba(53, 56, 62, 0.5)"}
          borderRadius={0}
          _focusVisible={{
            boxShadow: 'none'
          }}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push({
                pathname: router.pathname,
                query: {
                  q: search
                }
              })
            }
          }}
        />
      </Container>
      <Container mt={5}>
        {!Array(data)?.length ?
          <>
            <Text size="2xl">
              Terjadi kesalahan silahkan coba lagi
            </Text>
          </>
          :
          <>
            {list.map((val: any) => (
              <>
                {val.msg ?
                  <Text>
                    {val.msg}
                  </Text>
                  :

                  <Container
                    key={val.id}
                    onClick={() => router.push(`/detail/${val.id}`)}
                    cursor={"pointer"}
                    mb={3}
                    borderRadius={22}
                    p={15}
                    mx={"auto"}
                    background={"rgba(53, 56, 62, 0.05)"}
                    display={'flex'} alignItems={'center'}
                    _hover={{
                      boxShadow: "0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                    _active={{
                      boxShadow: "0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}>
                    <IconComp boxSize={3} />
                    <Text fontSize={16} fontWeight={800} ml={3}>
                      {val.doa}
                    </Text>
                  </Container>
                }
              </>
            ))}
          </>
        }
      </Container>
    </Container>
  )
}

export const getServerSideProps = async ({
  req,
  query
}: GetServerSidePropsContext<any>): Promise<GetServerSidePropsResult<any>> => {
  const { q } = query;
  try {
    const url = `https://doa-doa-api-ahmadramadhan.fly.dev/api${q ? `/doa/${q}` : ''}`
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
        data: []
      }
    };
  }
};
export default Home