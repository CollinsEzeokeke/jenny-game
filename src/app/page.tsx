import { RandomQuestion } from '@/components/randomQuestions';

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center h-screen w-screen">
      <RandomQuestion />
    </div>
  );
}