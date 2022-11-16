import Head from 'next/head'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);




export default function Bandchart() {
    const [datalist, setdatalist] = useState(null);
    const [stockName, setstockName] = useState(null);
    const [perCheck, setPerCheck] = useState(true);
    const [pbrCheck, setPbrCheck] = useState(true);
    const [customper, setcustomper] = useState("");
    const [custompbr, setcustompbr] = useState("");

    const [highper, sethighper] = useState(null);
    const [lowper, setlowper] = useState(null);
    const [highpbr, sethighpbr] = useState(null);
    const [lowpbr, setlowpbr] = useState(null);



    const [targetPerhigh, settargetPerhigh] = useState(null);
    const [targetPerlow, settargetPerlow] = useState(null);
    const [targetPercustom, settargetPercustom] = useState(null);

    const [targetPbrhigh, settargetPbrhigh] = useState(null);
    const [targetPbrlow, settargetPbrlow] = useState(null);
    const [targetPbrcustom, settargetPbrcustom] = useState(null);

    const [period, setPeriodCheck] = useState(2);
    const [periodvalue, setPeriodvalueCheck] = useState(2);
    const router = useRouter();
    const queries = router.query;
    const ticker = queries.id
    const [inputcode, setInputcode] = useState("");

    const nowDate = new Date()

    const onInputcode = (event) => {
        const {
            currentTarget: { value },
        } = event;
        setInputcode(value);
    };

    const oncustomper = (event) => {
        const {
            currentTarget: { value },
        } = event;
        setcustomper(value);
    };
    const oncustompbr = (event) => {
        const {
            currentTarget: { value },
        } = event;
        setcustompbr(value);
    };


    const onperiodcode = (event) => {
        const {
            currentTarget: { value },
        } = event;
        if (value > 10) {
            setPeriodvalueCheck(10);
        }
        setPeriodvalueCheck(value);
    };

    const setYear = (event) => {
        setPeriodCheck(periodvalue)
    };

    const router_go = useRouter();
    let oneday = new Date();
    var today = new Date(oneday.setDate(oneday.getDate() - 1));
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let dateString = year + month + day;


    useEffect(() => {
        if (!router.isReady) return;
        let twoyearsago = (year) - period;
        let beforedateString = twoyearsago + month + day;
        let apiurl = "http://127.0.0.1:8000/price/" + queries.id + "/" + beforedateString + "/" + dateString;

        fetch(apiurl)
            .then(results => results.json())
            .then(data => {
                setdatalist(data.result);
                setstockName(data.name)
                sethighpbr(data.highpbr)
                sethighper(data.highper)
                setlowpbr(data.lowpbr)
                setlowper(data.lowper)
                setPbrCheck(prev => !prev)
                setPerCheck(prev => !prev)
            })
    }, [router.isReady, period])


    useEffect(() => {
        let chart = am4core.create("perChart", am4charts.XYChart);
        // Add data
        chart.data = datalist;
        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.renderer.grid.template.location = 0;
        //dateAxis.renderer.minGridDistance = 30;
        dateAxis.groupData = true;
        dateAxis.groupCount = 100;

        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = "price";
        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "earning";
        valueAxis2.renderer.opposite = true;
        valueAxis2.renderer.grid.template.disabled = true;
        // Create series
        let series3 = chart.series.push(new am4charts.CandlestickSeries());
        series3.dataFields.dateX = "date";
        series3.dataFields.openValueY = "open";
        series3.dataFields.valueY = "close";
        series3.dataFields.lowValueY = "low";
        series3.dataFields.highValueY = "high";
        series3.yAxis = valueAxis1;
        series3.name = "Market price";
        series3.strokeWidth = 2;
        series3.tensionX = 0.7;
        series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        // let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
        // bullet3.circle.radius = 3;
        // bullet3.circle.strokeWidth = 2;
        // bullet3.circle.fill = am4core.color("#fff");
        // Add cursor

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "perlow";
        series2.dataFields.dateX = "date";
        series2.name = "low per";
        series2.strokeWidth = 2;
        series2.tensionX = 0.7;
        series2.yAxis = valueAxis1;
        series2.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        let series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "perhigh";
        series1.dataFields.dateX = "date";
        series1.name = "high per";
        series1.strokeWidth = 2;
        series1.tensionX = 0.7;
        series1.yAxis = valueAxis1;
        series1.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "earning";
        series.dataFields.dateX = "date";
        series.name = "earning";
        series.strokeWidth = 2;
        series.tensionX = 0.7;
        series.yAxis = valueAxis2;
        series.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        series.stroke = chart.colors.getIndex(3).lighten(0.5);
        series.strokeDasharray = "3,3";

        let customline = chart.series.push(new am4charts.LineSeries());
        customline.dataFields.valueY = "percustom";
        customline.dataFields.dateX = "date";
        customline.name = "custom per";
        customline.strokeWidth = 7;
        customline.tensionX = 0.7;
        customline.yAxis = valueAxis1;
        customline.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        customline.stroke = chart.colors.getIndex(66);
        customline.strokeDasharray = "7,3";

        chart.cursor = new am4charts.XYCursor();
        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";
        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series3);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        // Add scrollbar
        chart.scrollbarY = new am4charts.XYChartScrollbar();
        chart.scrollbarY.series.push(series1);
        chart.scrollbarY.parent = chart.rightAxesContainer;

        return () => {
            chart.dispose();
        }
    }, [perCheck])

    useEffect(() => {
        let chart = am4core.create("pbrChart", am4charts.XYChart);
        // Add data
        chart.data = datalist;
        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.renderer.grid.template.location = 0;
        //dateAxis.renderer.minGridDistance = 30;
        dateAxis.groupData = true;
        dateAxis.groupCount = 100;

        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = "price";
        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "equity";
        valueAxis2.renderer.opposite = true;
        valueAxis2.renderer.grid.template.disabled = true;
        // Create series
        let series3 = chart.series.push(new am4charts.CandlestickSeries());
        series3.dataFields.dateX = "date";
        series3.dataFields.openValueY = "open";
        series3.dataFields.valueY = "close";
        series3.dataFields.lowValueY = "low";
        series3.dataFields.highValueY = "high";
        series3.yAxis = valueAxis1;
        series3.name = "Market price";
        series3.strokeWidth = 2;
        series3.tensionX = 0.7;
        series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        // let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
        // bullet3.circle.radius = 3;
        // bullet3.circle.strokeWidth = 2;
        // bullet3.circle.fill = am4core.color("#fff");


        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "pbrlow";
        series2.dataFields.dateX = "date";
        series2.name = "low pbr";
        series2.strokeWidth = 2;
        series2.tensionX = 0.7;
        series2.yAxis = valueAxis1;
        series2.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        let series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueY = "pbrhigh";
        series1.dataFields.dateX = "date";
        series1.name = "high pbr";
        series1.strokeWidth = 2;
        series1.tensionX = 0.7;
        series1.yAxis = valueAxis1;
        series1.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";


        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "equity";
        series.dataFields.dateX = "date";
        series.name = "equity";
        series.strokeWidth = 2;
        series.tensionX = 0.7;
        series.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        series.yAxis = valueAxis2; series.stroke = chart.colors.getIndex(3).lighten(0.5);
        series.strokeDasharray = "3,3";


        let customline = chart.series.push(new am4charts.LineSeries());
        customline.dataFields.valueY = "pbrcustom";
        customline.dataFields.dateX = "date";
        customline.name = "custom pbr";
        customline.strokeWidth = 7;
        customline.tensionX = 0.7;
        customline.yAxis = valueAxis1;
        customline.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        customline.stroke = chart.colors.getIndex(66);
        customline.strokeDasharray = "7,3";

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";
        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series3);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        chart.scrollbarY = new am4charts.XYChartScrollbar();
        chart.scrollbarY.series.push(series1);
        chart.scrollbarY.parent = chart.rightAxesContainer;
        return () => {
            chart.dispose();
        }
    }, [pbrCheck])

    const onSubmit = (event) => {

        // event.preventDefault();
        router_go.push(`/bandchart/` + inputcode)

    };

    const createCustomPerLine = () => {

        setPerCheck(prev => !prev);
        setdatalist(
            datalist.map(data => {
                let newData = {}
                newData["date"] = data["date"];
                newData["open"] = data["open"];
                newData["high"] = data["high"];
                newData["low"] = data["low"];
                newData["close"] = data["close"];
                newData["earning"] = data["earning"];
                newData["equity"] = data["equity"];
                newData["perhigh"] = data["perhigh"];
                newData["perlow"] = data["perlow"];
                newData["pbrhigh"] = data["pbrhigh"];
                newData["pbrlow"] = data["pbrlow"];
                newData["pbrcustom"] = data["pbrcustom"]
                newData["percustom"] = (data["earning"] * customper);
                return newData
            }
            ))

    }

    const createCustomPbrLine = () => {
        setPbrCheck(prev => !prev);
        setdatalist(
            datalist.map(data => {
                let newData = {}
                newData["date"] = data["date"];
                newData["open"] = data["open"];
                newData["high"] = data["high"];
                newData["low"] = data["low"];
                newData["close"] = data["close"];
                newData["earning"] = data["earning"];
                newData["equity"] = data["equity"];
                newData["perhigh"] = data["perhigh"];
                newData["perlow"] = data["perlow"];
                newData["pbrhigh"] = data["pbrhigh"];
                newData["pbrlow"] = data["pbrlow"];
                newData["percustom"] = data["percustom"]
                newData["pbrcustom"] = (data["equity"] * custompbr);
                return newData
            }
            ))
    }

    useEffect(() => {
        if (datalist) {
            settargetPerhigh(Math.round(datalist[datalist.length - 1].perhigh - datalist[datalist.length - 1].close))
            settargetPerlow(Math.round(datalist[datalist.length - 1].perlow - datalist[datalist.length - 1].close))

            settargetPercustom(Math.round(datalist[datalist.length - 1].percustom - datalist[datalist.length - 1].close))

            settargetPbrhigh(Math.round(datalist[datalist.length - 1].pbrhigh - datalist[datalist.length - 1].close))
            settargetPbrlow(Math.round(datalist[datalist.length - 1].pbrlow - datalist[datalist.length - 1].close))

            settargetPbrcustom(Math.round(datalist[datalist.length - 1].pbrcustom - datalist[datalist.length - 1].close))
        }
    }, [datalist])


    return (
        <Layout>

            <Head>
                <title>Band for beginner</title>
                <meta name="description" content="Band for beginner" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section class="text-gray-600 body-font">
                <div class="container px-5 pt-5 mx-auto">
                    <div class="flex flex-wrap justify-center items-center">
                        <div class="w-full sm:w-2/3 px-4 ">
                            <form onSubmit={onSubmit}>
                                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
                                <div class="relative">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input onChange={onInputcode} value={inputcode} type="search" id="search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="주가 Ticker를 입력해주세요. ex) 005930" required>
                                    </input>

                                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
            <div className='flex justify-center w-full'>
                <h2 class="title-font text-3xl font-medium text-gray-900 mt-6 mb-3">{stockName}</h2> <h2 class="title-font text-l font-medium text-gray-900 mt-6 mb-3 ml-3">{ticker}</h2>
            </div>
            <section class="text-gray-600 body-font">
                <div class="container px-5 pb-24 pt-10 mx-auto">
                    <div class="flex flex-wrap -mx-4 -mb-10 text-center">
                        <div class="sm:w-1/2 mb-10 px-4">
                            <div class="rounded-lg">
                                <div id="perChart" style={{ width: "100%", height: "500px" }} />
                            </div>

                            <p class="leading-relaxed text-base"> 지난 {period}년간 최고 per은 <span className='text-red-500'>
                                {highper}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 최고 per에 도달 시에 <span className='text-red-500'>
                                {targetPerhigh}
                            </span>
                                원 이익입니다. </p>
                            <br></br>
                            <p class="leading-relaxed text-base"> 지난 {period}년간 최저 per은 <span className='text-blue-500'>
                                {lowper}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 최저 per에 도달 시에 <span className='text-blue-500'>
                                {targetPerlow}
                            </span>
                                원 손해입니다. </p>
                            <br></br>

                            <p class="leading-relaxed text-base"> 고객님의 예상 per은 <span className='text-green-500'>
                                {customper}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 예상 per에 도달 시에 <span className='text-green-500'>
                                {targetPercustom || 0}
                            </span>
                                원 이익 / 손해 입니다. </p>
                            <br></br>
                            <p class="leading-relaxed text-xs"> *기본 기간은 2년 입니다. 최대 10년까지 확인가능합니다.</p>
                            <p class="leading-relaxed text-xs"> *후행 per 기준입니다.</p>
                            <div className='flex justify-center items-center my-3'>
                                period :
                                <input onChange={onperiodcode} value={periodvalue} type="search" id="search" className="block p-4 mx-5 w-3/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="기간을 입력해주세요. ex) 5" required>
                                </input>
                                <button onClick={setYear} type="submit" class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                expected per :
                                <input onChange={oncustomper} value={customper} type="search" id="search" className="block p-4 mx-5 w-3/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="예상 per을 입력해주세요. ex) 14.3" required>
                                </input>
                                <button onClick={createCustomPerLine} type="submit" class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set</button>
                            </div>
                        </div>
                        <div class="sm:w-1/2 mb-10 px-4">
                            <div class="rounded-lg">
                                <div id="pbrChart" style={{ width: "100%", height: "500px" }} />
                            </div>

                            <p class="leading-relaxed text-base"> 지난 {period}년간 최고 pbr은 <span className='text-red-500'>
                                {highpbr}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 최고 pbr에 도달 시에 <span className='text-red-500'>
                                {targetPbrhigh}
                            </span>
                                원 이익입니다. </p>
                            <br></br>
                            <p class="leading-relaxed text-base"> 지난 {period}년간 최저 pbr은 <span className='text-blue-500'>
                                {lowpbr}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 최저 pbr에 도달 시에 <span className='text-blue-500'>
                                {targetPbrlow}
                            </span>
                                원 손해입니다. </p>
                            <br></br>

                            <p class="leading-relaxed text-base"> 고객님의 예상 pbr은 <span className='text-green-500'>
                                {custompbr}
                            </span>
                                입니다.</p>
                            <p class="leading-relaxed text-base"> 현재 주가에서 예상 pbr에 도달 시에 <span className='text-green-500'>
                                {targetPbrcustom || 0}
                            </span>
                                원 이익 / 손해 입니다. </p>
                            <br></br>
                            <p class="leading-relaxed text-xs"> *기본 기간은 2년 입니다. 최대 10년까지 확인가능합니다.</p>
                            <p class="leading-relaxed text-xs"> *후행 pbr 기준입니다.</p>



                            <div className='flex justify-center items-center my-3'>
                                period :
                                <input onChange={onperiodcode} value={periodvalue} type="search" id="search" className="block p-4 mx-5 w-3/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="기간을 입력해주세요. ex) 5" required>
                                </input>
                                <button onClick={setYear} type="submit" class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                expected pbr :
                                <input onChange={oncustompbr} value={custompbr} type="search" id="search" className="block p-4 mx-5 w-3/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="예상 pbr을 입력해주세요. ex) 1.5" required>
                                </input>
                                <button onClick={createCustomPbrLine} type="submit" class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set</button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>


        </Layout >
    )
}