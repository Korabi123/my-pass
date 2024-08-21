import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader size="30px" className="animate-spin text-muted-foreground" />
    </div>
  );
}

export default LoadingPage;
