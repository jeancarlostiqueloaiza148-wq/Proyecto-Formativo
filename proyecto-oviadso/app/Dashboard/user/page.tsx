"use client";

import FormCreationUser from "@/components/users/formCreationUser";
import TableUser from "@/components/users/tableUser";

function UserPage() {
  return (
    <div className="flex flex-col w-full min-h-screen px-2 pb-2 pt-0 -mt-4 gap-2">
      <div className="w-full">
        <TableUser actions={<FormCreationUser />} />
      </div>
    </div>
  );
}

export default UserPage;