import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../../common/button";
import { Title } from "../../common/text";

export default function SignOut() {
  const { data: session } = useSession();
  const { name, image, email } = session!.user!;

  return (
    <div className="flex-auto flex flex-col p-4 justify-center items-center gap-4">
      {image != null && (
        <Image
          className="rounded-full"
          src={image}
          alt="Profile image"
          height={200}
          width={200}
        />
      )}
      {name != null && <Title>{name}</Title>}

      {email != null && <p className="text-xl">{email}</p>}

      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
