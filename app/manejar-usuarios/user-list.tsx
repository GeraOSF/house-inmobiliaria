"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getUsers, updateUserPermissions } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/spinner";

export default function UserList() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: updatePermissions } = useMutation({
    mutationKey: ["updatePermissions"],
    mutationFn: ({
      userId,
      canAddProperties,
    }: {
      userId: string;
      canAddProperties: boolean;
    }) => updateUserPermissions({ userId, canAddProperties }),
  });

  return (
    <ul className="flex flex-col gap-2">
      {users
        ?.filter((u) => !u.publicMetadata?.isAdmin)
        .map((user) => (
          <li key={user.id}>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  {user.firstName && user.lastName && (
                    <AvatarFallback>
                      {user.firstName[0]} {user.lastName[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {user.emailAddresses[0].emailAddress}
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2 pl-8">
                  <Label htmlFor={`agregar-${user.id}`}>Agregar</Label>
                  <Checkbox
                    id={`agregar-${user.id}`}
                    className="size-6 rounded-full"
                    defaultChecked={!!user.publicMetadata.canAddProperties}
                    onCheckedChange={(e) =>
                      updatePermissions({
                        userId: user.id,
                        canAddProperties: !!e,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      {isLoadingUsers && <Spinner />}
    </ul>
  );
}
