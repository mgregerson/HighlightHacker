import React from "react";
import Image from "next/image";

function UserThumbnail({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative bg-white rounded-full overflow-hidden w-[40px] h-[40px] shadow-md">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="user-thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

export default UserThumbnail;
