import { notFound } from "next/navigation";
import { getUserByUserName } from "@/lib/user-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUserName(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>User: {user?.username}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}

export default UserPage;
