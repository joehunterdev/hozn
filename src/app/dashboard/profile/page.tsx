import DashboardProfile from "@/components/dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Dashboard Profile HOZN - Real Estate React Next js",
};

// Force dynamic rendering - don't try to statically generate this page
export const dynamic = 'force-dynamic';

const index = () => {
   return (
      <Wrapper>
         <DashboardProfile />
      </Wrapper>
   )
}

export default index