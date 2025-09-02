import { useQuery, useMutation } from "@apollo/client";
import { GET_APPLICATIONS } from "./graphql/queries";
import { CREATE_APPLICATION } from "./graphql/mutations";
import { useState } from "react";

export default function App() {
  const { data, refetch } = useQuery(GET_APPLICATIONS);
  const [createApp] = useMutation(CREATE_APPLICATION, { onCompleted: () => refetch() });
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  return (
    <div style={{ padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
      <h1>Job Tracker</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company" />
        <input value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Role" />
        <button onClick={() => {
          if (!company || !role) return;
          createApp({ variables: { input: { company, role } }});
          setCompany(""); setRole("");
        }}>
          Add
        </button>
      </div>

      <ul>
        {data?.applications?.map((a:any) =>
          <li key={a.id}>{a.company} — {a.role} [{a.currentStatus}]</li>
        )}
      </ul>
    </div>
  );
}