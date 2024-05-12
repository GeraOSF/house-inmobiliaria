import Spinner from "@/components/spinner";

export default function DatasheetLoading() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Generando ficha técnica</h1>
      <Spinner />
    </main>
  );
}
