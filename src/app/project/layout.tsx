// meta data
export const metadata = {
  title: "Project Page",
  description: "Giz",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
