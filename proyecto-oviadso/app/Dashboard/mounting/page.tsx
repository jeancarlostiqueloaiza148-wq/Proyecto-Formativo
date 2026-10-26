"use client";

import FormCreationMounting from "@/components/mounting/formCreationMounting";
import TableMounting from "@/components/mounting/tableMounting";

function MountingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableMounting actions={<FormCreationMounting />} />
      </div>
    </div>
  );
}

export default MountingPage;