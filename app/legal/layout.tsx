export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
            <main className="w-full">{children}</main>
        </div>
    );
}
