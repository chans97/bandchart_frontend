/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}


module.exports = nextConfig

const withTM = require("next-transpile-modules")([
  "@amcharts/amcharts4"
]); // 트랜스파일을 원하는 모듈을 전달합니다.

module.exports = withTM();