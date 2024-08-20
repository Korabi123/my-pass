import DashDock from "@/components/dashboard/dashboard-dock";
import TopSection from "@/components/dashboard/top-section";
import InfoSection from "./info-section";

const DashboardPage = () => {
  return (
    <>
      <TopSection />
      <InfoSection />
      <DashDock className="z-50 fixed bottom-4 left-0 right-0" />
    </>
  );
}

export default DashboardPage;
