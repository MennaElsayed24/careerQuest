import { useState } from "react";
import { useCareerSearch } from "../hooks/useCareerSearch";

export default function ApiTestPage() {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError } =
    useCareerSearch(query);

  return (
    <div style={{ padding: "40px" }}>
      <h1>CareerQuest API Test</h1>

      <input
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search a career..."
      />

      {isLoading && <p>Loading...</p>}

      {isError && (
        <p>
          Failed to load careers from ESCO.
        </p>
      )}

      <ul>
        {data?.map((career) => (
          <li key={career.id}>
            <strong>{career.title}</strong>
            <p>{career.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}