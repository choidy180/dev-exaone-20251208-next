import { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import "flatpickr/dist/flatpickr.min.css";
import GlobalLoader from "@/components/global-loader";

const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/Pretendard-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/fonts/Pretendard-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Pretendard-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Pretendard-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Pretendard-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/Pretendard-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LG EXAONE", // 브라우저 탭에 뜨는 이름
  description: "LG EXAONE",
  openGraph: {
    title: "LG EXAONE", // 카톡에 뜰 굵은 제목
    description: "LG EXAONE 서비스에 대한 설명입니다.", // 제목 밑에 작게 뜨는 설명
    images: [
      {
        url: "/exaone.png", // public 폴더 안에 있는 이미지 경로
        width: 1200,
        height: 630,
        alt: "LG EXAONE",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <GlobalLoader/>
      </body>
    </html>
  );
}
