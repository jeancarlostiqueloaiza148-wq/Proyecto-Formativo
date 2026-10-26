"use client";

import FormCreationResponsibles from "@/components/responsibles/formCreationResponsibles";
import TableResponsibles from "@/components/responsibles/tableResponsibles";

function ResponsiblePage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableResponsibles
          actions={<FormCreationResponsibles />}
        />
      </div>
    </div>
  );
}

export default ResponsiblePage;