import React from "react";
import OrgTable from "./OrgTable";

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>Hello, dear future Motherbrain developer! 👋</h1>

      <p>
        This is a code test that is meant to test your creativity and problem
        solving skills.
      </p>

      <p>
        Don't panic! We won't judge you for hacky code, we simply want you to
        solve a problem for us in any way you want.
      </p>

      <p>
        This repository is a barebones setup with a Node backend and a React
        frontend. If you really want to, you can tear it all down and start from
        scratch, but this is meant to get you started immediately.
      </p>

      <h2>The Challenge</h2>

      <p>
        We have configured this repository with a connection to an ElasticSearch
        node, with two prepopulated indices:
      </p>

      <ul>
        <li>
          <code>org</code> – A collection of organizations. Accessed via{" "}
          <a href="http://localhost:8080/orgs">http://localhost:8080/orgs</a>.
        </li>
        <li>
          <code>funding</code> – A collection of{" "}
          <a href="https://techcrunch.com/2017/01/08/wtf-is-a-funding-round/">
            funding rounds
          </a>
          . Accessed via{" "}
          <a href="http://localhost:8080/fundings">
            http://localhost:8080/fundings
          </a>
          .
        </li>
      </ul>

      <p>
        The code for these endpoints can be found in{" "}
        <code>backend/src/index.js</code>.
      </p>

      <p>
        We want you to{" "}
        <strong>
          explore and create a chart or graph of any aspect of the data.
        </strong>{" "}
        Use any charting library you want or whip something up yourself if you
        prefer that. Points for creativity, both in aesthetics and in data
        analysis.
      </p>

      <p style={{ fontWeight: 700 }}>Good Luck!</p>

      <br />

      <h2>Example</h2>

      <p>
        Here is a simple table version of the data. How will <em>you</em> make
        it more fun?
      </p>

      <OrgTable />
    </div>
  );
}
