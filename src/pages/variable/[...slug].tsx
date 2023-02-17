import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Variable({ data }) {
  const router = useRouter()
  const slugData = (router.query.slug as string[]) || []
  const scanData: any[] = data?.data
  let scanItem: any = scanData?.find(item => item.id.toString() === slugData[2])
  let variableData: any = scanItem?.criteria[slugData[1]].variable[slugData[0]]

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
            <button data-testid='backBtn' className="inline-flex gap-2 items-center my-3 text-black" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Go back
            </button>
            <div data-testid='contentBox' className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-6 py-5 sm:px-6 w-4ull">
                <h3 data-testid='title' className="text-2xl font-medium leading-6 text-gray-900">Variable params</h3>
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
                {variableData?.type == 'indicator' ?
                <div>
                    <h3 className="text-lg font-medium leading-6 my-4 text-gray-900 uppercase">{variableData?.study_type}</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            {variableData?.parameter_name}
                        </label>
                        <div className="mt-1.5">
                            <input 
                                type="tel" 
                                name="param_value"
                                max={variableData?.max_value}
                                min={variableData?.min_value}
                                className="block w-full rounded-md border-[0.1px] border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black sm:text-sm px-2 py-3"
                                placeholder={`${variableData?.parameter_name} value`}
                                defaultValue={variableData?.default_value}
                            />
                        </div>
                    </div>
                </div> :
                <ul role="list" className="divide-y divide-gray-200">
                    {variableData?.values.sort((a, b) => {return a-b}).map((value) => (
                        <li className="flex py-4">
                            <p className="font-medium text-gray-900">{value}</p>
                        </li>
                    ))}
                </ul>
                }
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
        params: {
            slug: [ dataItem.id.toString() ],
        }
    }))

    return { paths, fallback: 'blocking' }
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
