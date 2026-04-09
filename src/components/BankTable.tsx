import type { BankEntry } from "@/lib/types";

export default function BankTable({ banks }: { banks: BankEntry[] }) {
  if (!banks || banks.length === 0) return null;

  const grouped: Record<string, BankEntry[]> = {};
  banks.forEach((bank) => {
    if (!grouped[bank.country_name]) {
      grouped[bank.country_name] = [];
    }
    grouped[bank.country_name].push(bank);
  });

  return (
    <>
      {Object.entries(grouped).map(([country, entries]) => (
        <div key={country} className="country-group">
          <h4 className="country-title">{country}</h4>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>Bank Code</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((bank) => (
                  <tr key={bank.documentId}>
                    <td>{bank.bank_name}</td>
                    <td className="td-code">{bank.bank_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
