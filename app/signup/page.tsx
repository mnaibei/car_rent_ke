"use client";

import { signUp } from "../actions/auth-actions";
import { useActionState } from "react"; // Use this hook for form feedback

export default function SignupPage() {
  // This helps you see errors if the signup fails
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex flex-col gap-4 p-8 max-w-md mx-auto">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border p-2"
      />

      <select name="role" className="border p-2">
        <option value="RENTER">I want to rent a car</option>
        <option value="OWNER">I want to list my car</option>
      </select>

      {state?.error && <p className="text-red-500">{state.error}</p>}

      <button type="submit" className="bg-blue-600 text-white p-2">
        Sign Up
      </button>
    </form>
  );
}
