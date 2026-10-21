import React from "react";

type Props = {};

const Showtoast = (props: Props) => {
  const [toast, setToast] = React.useState("");
  function showToast(message: string, duration = 2600) {
    setToast(message);
    window.setTimeout(() => setToast(""), duration);
  }
  return (
    <div>
      {toast && (
        <div className="fixed right-5.5 bottom-5.5 z-40 flex items-center gap-2.25 rounded border border-[#dce7da] bg-white px-4 py-3 text-[11px] text-[#495c4a] shadow-lg">
          <span className="grid size-4.25 place-items-center rounded-full bg-[#e9f2e8] text-[10px] text-[#4e8059]">
            ✓
          </span>
          {toast}
        </div>
      )}
    </div>
  );
};

export default Showtoast;
