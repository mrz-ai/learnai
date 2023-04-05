import "./globals.css";
export const metadata = {
  title: "Learn With AI",
  description: "Simple AI Learning App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
