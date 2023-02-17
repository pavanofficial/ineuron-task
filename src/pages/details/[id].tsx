import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Detail({ data }) {
  const router = useRouter()
  const { id } = router?.query
  const scanData: any[] = data?.data
  let scanItem: any = scanData?.find(item => item.id.toString() === id)

  const variableTextProcessor = (text: string, variables: any, criteriaIndex: number) => {
    let textWords = text.split(' ')
    const processedText = textWords.map((word) => {
        if(variables[word] == undefined) {
            return word
        } else {
            if(variables[word].type == 'indicator') {
                return `<a href='/variable/${word}/${criteriaIndex}/${id}'>${variables[word].default_value}</a>`
            } else {
                return `<a href='/variable/${word}/${criteriaIndex}/${id}'>${variables[word].values[0]}</a>`
            }
        }
    })
    return processedText.join(' ')
  }
  return (
    <>
      <Head>
        <title>Pavan Vemula - iNeuron</title>
        <meta name="description" content="Assessment project for iNeuron" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center p-6 bg-gray-100 min-h-[100vh]'>
        <div>
            <button data-testid='backBtn' className="inline-flex gap-2 items-center my-3 text-black" onClick={() => router.push('/')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Go back
            </button>
            <div data-testid='contentBox' className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
                <h3 data-testid='title' className="text-2xl font-medium leading-6 text-gray-900">{scanItem?.name}</h3>
                <div data-testid='tag' className="mt-3 flex flex-shrink-0">
                    <p className={(scanItem?.color == 'green' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " inline-flex rounded-full px-2 text-xs font-semibold leading-5"}>{scanItem?.tag}</p>
                </div>
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
                <ul data-testid='criteriaListing' role="list" className="divide-y divide-gray-200">
                    {scanItem?.criteria?.map((criteriaItem, criteriaIndex) => (
                        criteriaItem.type == 'plain_text' ?
                        <li className="flex py-4">
                            <p className="font-medium text-gray-900">{criteriaItem.text}</p>
                        </li> : 
                        <li className="flex py-4">
                            <p className={`${styles.variable} text-gray-900 font-medium`}><span dangerouslySetInnerHTML={{ __html: variableTextProcessor(criteriaItem.text, criteriaItem.variable, criteriaIndex)}}></span></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6')
    const data = await res.json()

    const paths = data.data.map((dataItem) => ({
        params: { id: dataItem.id.toString() },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps() {
    const res = await fetch('https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6')
    const data = await res.json()
  
    return {
      props: {
        data,
      },
    }
  }
