export default function StatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-4 px-8 flex items-center justify-center gap-4">
      {children}
    </div>
  );
}
