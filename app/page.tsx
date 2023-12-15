import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/query";

import { getIsAdmin, getProperties } from "@/app/actions";
import { columns } from "@/app/columns";
import DataTable from "@/app/data-table";

export default async function Home() {
  const isAdmin = await getIsAdmin();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="container p-2">
      <HydrationBoundary state={dehydratedState}>
        <DataTable columns={columns} isAdmin={isAdmin} />
      </HydrationBoundary>
    </main>
  );
}
