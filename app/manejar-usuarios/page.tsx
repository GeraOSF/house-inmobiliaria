import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserList from "./user-list";

export default async function Page() {
  const { sessionClaims } = auth();
  const isAdmin = sessionClaims?.isAdmin;
  if (!isAdmin) redirect("/");

  const users = await clerkClient.users.getUserList();

  return (
    <main className="container flex flex-col items-center p-2">
      <h3 className="text-xl font-bold">Manejar usuarios</h3>
      <p className="text-muted-foreground">
        Aquí se puede manejar los permisos de los usuarios.
      </p>
      <section className="w-full pt-6">
        <UserList users={JSON.parse(JSON.stringify(users))} />
      </section>
    </main>
  );
}
