import DashDock from "@/components/dashboard/dashboard-dock";
import TopSection from "@/components/dashboard/top-section";

const DashboardPage = () => {
  return (
    <div className="flex relative flex-col">
      <TopSection />
      <DashDock className="z-50 fixed bottom-4 left-0 right-0" />
    </div>
  );
}

export default DashboardPage;
