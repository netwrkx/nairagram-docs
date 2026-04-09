import type { ResponseCode } from "@/lib/types";

function statusClass(code: string): string {
  const num = parseInt(code, 10);
  if (num >= 200 && num < 300) return "s2xx";
  if (num >= 400 && num < 500) return "s4xx";
  if (num >= 500) return "s5xx";
  return "s4xx";
}

export default function ResponseCodesTable({
  codes,
  showContent = false,
}: {
  codes: ResponseCode[];
  showContent?: boolean;
}) {
  if (!codes || codes.length === 0) return null;

  return (
    <>
      <p className="sub-heading">Response Codes</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              {showContent && <th>Content</th>}
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((rc) => (
              <tr key={rc.id}>
                <td>
                  <span className={`status-code ${statusClass(rc.code)}`}>
                    {rc.code}
                  </span>
                </td>
                <td>{rc.title}</td>
                {showContent && <td>{rc.content}</td>}
                <td>{rc.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
