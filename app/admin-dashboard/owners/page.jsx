// import Owners from "@/components/admin-dashboard/owners";
// import React from "react";

// export const metadata = {
//   title: "",
//   description: "",
// };
// export default function page() {
//   return (
//     <>
//       <Owners />
//     </>
//   );
// }


import { redirect } from "next/navigation";

export default function OwnersIndex() {
  redirect("/admin-dashboard/owners/pending");
}

