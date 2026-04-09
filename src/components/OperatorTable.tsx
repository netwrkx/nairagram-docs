import type { OperatorWallet } from "@/lib/types";

export default function OperatorTable({
  operators,
}: {
  operators: OperatorWallet[];
}) {
  if (!operators || operators.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Operator Name</th>
            <th>Operator Code (wallet)</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((op) => (
            <tr key={op.documentId}>
              <td>{op.country}</td>
              <td>{op.operator_name}</td>
              <td className="td-code">{op.operator_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
