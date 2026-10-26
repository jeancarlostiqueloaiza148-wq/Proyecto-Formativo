"use client";

import FormCreationFeeding from "@/components/feeding/formCreationFeeding";
import TableFeeding from "@/components/feeding/tableFeeding";

function FeedingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableFeeding actions={<FormCreationFeeding />} />
      </div>
    </div>
  );
}

export default FeedingPage;