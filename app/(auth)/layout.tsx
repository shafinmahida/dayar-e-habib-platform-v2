export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F2EBDB] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
