"use client";

import FormCreationWeight from "@/components/weight/formCreationWeight";
import TableWeight from "@/components/weight/tableWeight";

function WeightPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableWeight actions={<FormCreationWeight />} />
      </div>
    </div>
  );
}

export default WeightPage;