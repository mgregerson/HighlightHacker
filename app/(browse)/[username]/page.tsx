interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage({ params }: UserPageProps) {

    

  return <div>{params.username}</div>;
}

export default UserPage;
