"use client";

import { useSidebar } from "@/store/use-sidebar";

function Toggle() {

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  console.log('collapsed=', collapsed)

  const label = collapsed ? "Expand" : "Collapse";

  return <>{!collapsed && (
    <div className="p-3 pl-6 mb-2 flex items-center w-full">
        <p>For you</p>
    </div>
  )}
  </>;
}

export default Toggle;
