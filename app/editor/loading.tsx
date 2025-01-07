"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";

const loading = () => {
  return <div className="container mx-auto p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4 ">
      <div className="min-h-[87vh] ">
        <Skeleton className="p-6 min-h-[87vh] bg-secondary dark:bg-card"></Skeleton>
      </div>
    </div>

    <Skeleton className="bg-secondary dark:bg-card w-full p-4 rounded-lg shadow-lg  "></Skeleton>
  </div>
</div>
};

export default loading;
