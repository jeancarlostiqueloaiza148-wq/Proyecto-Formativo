"use client";

import FormCreationHealth from "@/components/health/formCreationHealth";
import TableHealth from "@/components/health/tableHealth";

function HealthPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableHealth actions={<FormCreationHealth />} />
      </div>
    </div>
  );
}

export default HealthPage;