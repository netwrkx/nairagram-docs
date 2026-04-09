import type { TestDataEntry } from "@/lib/types";

export function TestBankTable({ data }: { data: TestDataEntry[] }) {
  const bankData = data.filter((d) => d.type === "bank_account");
  if (bankData.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Country</th>
            <th>Bank Code</th>
          </tr>
        </thead>
        <tbody>
          {bankData.map((td) => (
            <tr key={td.documentId}>
              <td>{td.bank_or_operator}</td>
              <td>{td.account_or_phone}</td>
              <td>{td.country}</td>
              <td className="td-code">{td.bank_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TestWalletTable({ data }: { data: TestDataEntry[] }) {
  const walletData = data.filter((d) => d.type === "mobile_wallet");
  if (walletData.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Carrier</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {walletData.map((td) => (
            <tr key={td.documentId}>
              <td className="td-code">{td.account_or_phone}</td>
              <td>{td.bank_or_operator}</td>
              <td>{td.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
