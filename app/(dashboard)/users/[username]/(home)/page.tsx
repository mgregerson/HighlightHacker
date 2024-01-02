import { currentUser } from "@clerk/nextjs";

import { getUserByUserName } from "@/lib/user-service";

import AddHighlightForm from "../_components/addHighlightForm";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUserName(params.username);

  if (!user || user.externalUserId !== externalUser?.id) {
    throw new Error("Unauthorized");
  }

  return ( 
    <div className="h-full">
      <p>User: {user.username}</p>
      <p>Id: {user.id}</p>
      <AddHighlightForm />
    </div>
  );
}
 
export default CreatorPage;