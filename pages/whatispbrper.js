import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Body from '../components/home/body'
import useMediaQuery from '../react_hooks/useMediaQuary'

export default function Home() {
    const matches = useMediaQuery(600);
    return (
        <Layout>

            <Head>
                <title>Band for beginner</title>
                <meta name="description" content="Band for beginner" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-start">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">What is per?
                        </h1>
                        <p className="mb-8 leading-relaxed">주가와 주당순이익을 비교하는 시장가치비율. 국내에서는 보통 PER로 표시하지만, 서구권에서는 P/E로 주로 표시한다. 영문명은 Price-to-Earnings Ratio 또는 Price Earning Ratio. 약칭은 PER. 일각에서 퍼라 읽기도 한다.[1]

                            PER은 주가를 주당순이익으로 나눈 것으로, 주가가 주당 순이익의 배율이 얼마인가를 나타내는 지표이다. 그렇기에 PER가 낮을 경우 해당 회사가 거둔 이익에 비해 주가가 낮고 그에 따라 기업의 가치에 비해 주가가 저평가되어 있다는 의미로 볼 수 있다. 반대로 PER가 높으면 거둔 이익에 비해 주가가 고평가되었음을 의미한다.

                            PER은 주가/주당순이익이지만 더 간단하게 시가총액/당기순이익으로 나눠서 구할 수 있다. 실무적으로는 시가총액/당기순이익을 많이 활용한다. 이 경우 보통주, 우선주 등 종류주식에 대한 부분을 무시할 수 있기 때문(분자의 보통주 우선주 시가총액 합치면 됨)이다.

                            특히 미국처럼 우선주가 없고 대신 A주, B주같은 차등의결권 주식이 많은 나라에서는 주식 수가 들어가는 주가/주당순이익 지표로 계산할 경우 문제가 심각해진다. A주에 들어가는 순이익과 B주에 들어가는 순이익 비율을 결정하는 것은 회사 측의 자의적인 결정이기 때문이다. 그래서 차등의결권 주식을 가진 회사는 PER을 전체 시가총액/당기순이익으로 구한다.</p>

                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">What is pbr?
                        </h1>
                        <p className="mb-8 leading-relaxed">주가순자산비율은 주가를 1주당 순자산(장부가격에 의한 주주 소유분)으로 나눈 것으로 주가가 1주당 순자산의 몇 배로 매매되고 있는가를 표시하며 PER과 같이 주가의 상대적 수준을 나타낸다.

                            주식시장에서의 주가는 그 회사의 종합적인 평가이므로 주주 소유분을 초과한 부분은 모두 그 회사의 잠재적인 프리미엄이 되기 때문에 경영의 종합력이 뛰어나면 뛰어날수록 배율이 높아진다고 할 수 있다.

                            일반적으로 이 지표는 PER과 함께 사용되는데, 이는 주가순자산배율이 그 회사를 저량(stock)면에서 보고 있는데 반하여 주가수익률은 유량(flow)면에서 보고 있으므로 두 가지 지표가 서로 보완관계에 있다.

                            다만 이 주가 순자산배율에도 주주소유분이 장부가격에 의해 계산되고 있어 반드시 정확하다고 할 수 없고 또 그 계산기준이 전기의 결산기가 된다는 등의 난점이 있다.</p>

                    </div>
                </div>
            </section>


        </Layout>
    )
}
