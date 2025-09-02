import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_APPLICATIONS } from "./graphql/queries";
import {
  CREATE_APPLICATION,
  UPDATE_STATUS,
  DELETE_APPLICATION,
} from "./graphql/mutations";

function App() {
  const { data, refetch } = useQuery(GET_APPLICATIONS);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [createApp] = useMutation(CREATE_APPLICATION, {
    onCompleted: () => {
      refetch();
      setCompany("");
      setRole("");
    },
  });

  const [updateStatus] = useMutation(UPDATE_STATUS, {
    onCompleted: () => refetch(),
  });

  const [deleteApp] = useMutation(DELETE_APPLICATION, {
    onCompleted: () => refetch(),
  });

  const handleAdd = () => {
    if (!company || !role) return;
    createApp({ variables: { input: { company, role } } });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Job Tracker</h1>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul style={{ listStyle: "disc", paddingLeft: 24 }}>
        {data?.applications?.map((a: any) => (
          <li key={a.id} style={{ marginBottom: 8 }}>
            {a.company} — {a.role} [{a.currentStatus}]
            <span style={{ marginLeft: 12, display: "inline-flex", gap: 8 }}>
              <button
                onClick={() =>
                  updateStatus({ variables: { id: a.id, status: "APPLIED" } })
                }
              >
                Mark Applied
              </button>
              <button
                onClick={() =>
                  updateStatus({ variables: { id: a.id, status: "REJECTED" } })
                }
              >
                Mark Rejected
              </button>
              <button onClick={() => deleteApp({ variables: { id: a.id } })}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;