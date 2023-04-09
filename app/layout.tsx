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
      <body className="h-screen">
        <div className="flex flex-col gap-8 w-full justify-stretch items-stretch pt-12 px-4 md:px-48 h-screen bg-gray-100">
          <div className="flex flex-col items-center justify-center px-4 py-2">
            <h2 className="text-xl">یادگیری با ChatGpt</h2>
            <small className="mt-3 text-blue-500">
              موضوع یا سوالت رو از ChatGpt بپرس
            </small>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
