import LottieAnimation from "../animation";
import useMediaQuery from "../../react_hooks/useMediaQuary"


import Link from "next/link";

export default function Body() {

    const matches = useMediaQuery(600);

    return (<>
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">지금 이 주식 사도 될까?

                        {matches ? <br></br> : ""}
                        <br className="hidden lg:inline-block" />Band Chart for beginner!
                    </h1>
                    <p className="mb-8 leading-relaxed">괜찮은 주식인 것 같은데, 현재 주식의 가치가 적절한지 궁금하신 적이 있을 것입니다. 주식의 이해도가 높은 분들은 per, pbr band를 손쉽게 사용합니다. 그러나 우리 같은 주린이들은 per이 무엇인기 pbr이 무엇인지 조차 모릅니다. band chart를 그리기는 더욱 어렵죠. 그런 분들을 위해 준비했습니다. 이제는 per, pbr band를 band for beginner에서 확인하세요.</p>
                    <div className="flex justify-center">
                        <Link href="/bandchart/005930">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Band chart </button>
                        </Link>
                        <Link href="/whatispbrper">

                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">What is per? pbr?</button>
                        </Link>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    {matches ? "" : <LottieAnimation></LottieAnimation>}

                </div>
            </div>
        </section>
    </>)
}