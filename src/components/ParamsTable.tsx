import type { ApiParameter } from "@/lib/types";

export default function ParamsTable({ params }: { params: ApiParameter[] }) {
  if (!params || params.length === 0) return null;

  return (
    <>
      <p className="sub-heading">Input Parameters</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value Format</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.id}>
                <td className="td-code">{p.field}</td>
                <td>
                  <code>{p.value_format}</code>
                </td>
                <td>
                  <span
                    className={`td-required ${p.required_status === "Required" ? "required" : "optional"}`}
                  >
                    {p.required_status}
                  </span>
                </td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
