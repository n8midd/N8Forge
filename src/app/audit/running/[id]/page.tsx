import { AuditShell } from "@/components/audit/AuditShell";
import { AuditRunningClient } from "@/components/audit/AuditRunningClient";

type Props = { params: Promise<{ id: string }> };

export default async function AuditRunningPage({ params }: Props) {
  const { id } = await params;
  return (
    <AuditShell>
      <AuditRunningClient id={id} />
    </AuditShell>
  );
}
