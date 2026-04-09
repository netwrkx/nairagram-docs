import type { ApiEndpoint } from "@/lib/types";
import AlertBox from "./AlertBox";
import ResponseCodesTable from "./ResponseCodesTable";
import ParamsTable from "./ParamsTable";
import CodeBlock from "./CodeBlock";
import HeadingIcon from "./HeadingIcon";

export default function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  const method = endpoint.http_method.toLowerCase();

  return (
    <div className="endpoint-card" id={endpoint.slug}>
      <h3 className="endpoint-title">
        <HeadingIcon />
        {endpoint.name}
        <a href={`#${endpoint.slug}`} className="anchor-hash">
          #
        </a>
      </h3>

      {endpoint.description && (
        <div className="endpoint-description">
          {endpoint.description.split("\n").map((line, i) =>
            line.trim() ? <p key={i}>{line}</p> : null
          )}
        </div>
      )}

      {endpoint.alerts &&
        endpoint.alerts.length > 0 &&
        endpoint.alerts.map((alert) => (
          <AlertBox key={alert.id} alert={alert} />
        ))}

      <p className="sub-heading">Syntax</p>
      <div className="syntax-badge">
        <span className={`method-tag ${method}`}>{endpoint.http_method}</span>
        <span className="syntax-url">{endpoint.url}</span>
      </div>

      {endpoint.response_codes && endpoint.response_codes.length > 0 && (
        <ResponseCodesTable codes={endpoint.response_codes} />
      )}

      {endpoint.input_parameters && endpoint.input_parameters.length > 0 && (
        <ParamsTable params={endpoint.input_parameters} />
      )}

      {endpoint.code_samples &&
        endpoint.code_samples.length > 0 &&
        endpoint.code_samples.map((sample) => (
          <CodeBlock key={sample.id} sample={sample} />
        ))}
    </div>
  );
}
