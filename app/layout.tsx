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
    <html className="h-full overflow-hidden">
      <body>
        <div className="flex flex-col gap-8 w-full h-screen justify-stretch items-stretch pt-8 px-4 md:px-48 bg-gray-100 ">
          <div className="flex flex-col items-center justify-center px-4 py-2">
            <h2 className="text-4xl">Learn AI</h2>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
