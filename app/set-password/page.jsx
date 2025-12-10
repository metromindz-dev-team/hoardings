// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import axios from "axios";

// export default function SetPasswordPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const role = searchParams.get("role");
//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Password strength check
//   const validatePassword = (pass) => {
//     return {
//       length: pass.length >= 8,
//       upper: /[A-Z]/.test(pass),
//       lower: /[a-z]/.test(pass),
//       number: /[0-9]/.test(pass),
//       special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
//     };
//   };

//   const passwordCheck = validatePassword(password);
//   const isStrong =
//     passwordCheck.length &&
//     passwordCheck.upper &&
//     passwordCheck.lower &&
//     passwordCheck.number &&
//     passwordCheck.special;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!isStrong) return setError("Please create a strong password.");
//     if (password !== confirm) return setError("Passwords do not match!");

//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/set-password`, {
//         token,
//         password,
//       });

//       setMessage("Password updated successfully! Redirecting...");
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//     } catch (error) {
//       setError(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//       <div className="w-full max-w-md bg-white shadow p-6 rounded-lg">
//         <h2 className="text-2xl font-semibold mb-4 text-center">
//           Create Your Password
//         </h2>

//         <p className="text-gray-600 mb-6 text-center">
//           Choose a strong password to secure your account.
//         </p>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
//         )}

//         {/* Success Message */}
//         {message && (
//           <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <label className="block mb-1 text-gray-700">New Password</label>
//           <input
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter new password"
//             className="border w-full px-3 py-2 rounded mb-3"
//           />

//           {/* Password Rules */}
//           <div className="mb-4 text-sm space-y-1">
//             <p
//               className={
//                 passwordCheck.length ? "text-success" : "text-danger"
//               }
//             >
//               • At least 8 characters
//             </p>

//             <p
//               className={
//                 passwordCheck.upper ? "text-success" : "text-danger"
//               }
//             >
//               • At least one uppercase letter (A-Z)
//             </p>

//             <p
//               className={
//                 passwordCheck.lower ? "text-success" : "text-danger"
//               }
//             >
//               • At least one lowercase letter (a-z)
//             </p>

//             <p
//               className={
//                 passwordCheck.number ? "text-success" : "text-danger"
//               }
//             >
//               • At least one number (0-9)
//             </p>

//             <p
//               className={
//                 passwordCheck.special ? "text-success" : "text-danger"
//               }
//             >
//               • At least one special character (!@#$%^&*)
//             </p>
//           </div>

//           <label className="block mb-1 text-gray-700">Confirm Password</label>
//           <input
//             type="password"
//             onChange={(e) => setConfirm(e.target.value)}
//             placeholder="Re-enter password"
//             className="border w-full px-3 py-2 rounded mb-4"
//           />

//           <button
//             disabled={!isStrong || !password || !confirm}
//             className={`w-full py-2 rounded text-white ${
//               isStrong && password === confirm
//                 ? "bg-primary"
//                 : "bg-secondary cursor-not-allowed"
//             }`}
//           >
//             Create Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import SetPasswordPage from "@/components/common/SetPasswordPage";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordPage />
    </Suspense>
  );
}
