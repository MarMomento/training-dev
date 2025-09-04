import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./global.css";

export const metadata: Metadata = {
  title: "Training",
  description: "training record",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
