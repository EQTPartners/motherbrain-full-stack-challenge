import React, { useState, useEffect } from "react";

export default function OrgTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const url = new URL("http://localhost:8080/orgs");
    url.searchParams.set("limit", 20);
    url.searchParams.set("offset", 0);

    fetch(url)
      .then((response) => response.json())
      .then(({ results: { hits } }) => {
        setOrgs(hits);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <table cellSpacing={8}>
      <thead>
        <tr>
          <th align="left">Name</th>
          <th align="left">Description</th>
        </tr>
      </thead>

      <tbody>
        {orgs.map((org) => (
          <tr key={org.uuid}>
            <td style={{ verticalAlign: "top" }}>{org.company_name}</td>
            <td style={{ verticalAlign: "top" }}>{org.short_description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
