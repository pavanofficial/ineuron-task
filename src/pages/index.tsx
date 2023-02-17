import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export interface dataType {
  id: number;
  name: string;
  tag: string;
  color: string;
  criteria: {
    type: string;
    text: string;
    variable: any;
  }[]
}

interface Props {
  stockData: dataType[]
}

export default function Home({ stockData } : Props) {
  const scanData: dataType[] = stockData
  return (
    <>
      <Head>
        <title>Pavan Vemula - iNeuron</title>
        <meta name="description" content="Assessment project for iNeuron" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center p-6 bg-gray-100 min-h-[100vh]'>
        <div data-testid='cardBox' className='max-w-sm rounded-md overflow-hidden shadow-lg bg-white justify-self-center min-w-[34vw]'>
          <ul data-testid='listing' role='list' className='divide-y divide-gray-200'>
            {scanData?.map((scanItem) => (
              <li key={scanItem.id}>
                <a className="block hover:bg-gray-50" href={"/details/"+scanItem.id.toString()}>
                  <div className="flex items-center px-4 py-4">
                    <div className="min-w-0 flex-1 flex items-center justify-between">
                        <div className="flex">
                          <p className="truncate font-medium text-indigo-600">{scanItem.name}</p>
                        </div>
                    </div>
                    <div className="ml-16 flex flex-shrink-0">
                      <p className={(scanItem.color == 'green' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " inline-flex rounded-full px-2 text-xs font-semibold leading-5"}>{scanItem.tag}</p>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonware.com/api/v1/json/402b9d6d-9862-4c19-b336-c456999258d6')
  const data = await res.json()
  const stockData = data.data

  return {
    props: {
      stockData,
    },
  }
}
