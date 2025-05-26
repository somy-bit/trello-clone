import Board from "@/components/Board";
import Header from "@/components/Header";


export default function Home() {
  return (
    <main className="overflow-y-scroll h-screen w-screen  text-gray-700">
      <Header />
      <Board />
    </main>
  )
}
