"use client";

import FormCreationDelivery from "@/components/delivery/formCreationDelivery";
import TableDelivery from "@/components/delivery/tableDelivery";

function DeliveryPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableDelivery actions={<FormCreationDelivery />} />
      </div>
    </div>
  );
}

export default DeliveryPage;