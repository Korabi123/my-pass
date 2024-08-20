import DashDock from "@/components/dashboard-dock";
import TopSection from "@/components/top-section";

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-[100vw]">
      <TopSection />
      {children}
      <DashDock className="z-50 fixed bottom-4 left-0 right-0" />
    </div>
  );
}

export default MainAppLayout;
