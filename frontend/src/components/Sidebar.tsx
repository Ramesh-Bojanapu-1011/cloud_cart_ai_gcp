import { IconName } from "@/utils/interfaces";
import Link from "next/link";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const activeNav =
    router.pathname === "/"
      ? "Overview"
      : router.pathname.split("/")[1].charAt(0).toUpperCase() +
        router.pathname.split("/")[1].slice(1).replace("_", " ");

  const navItems: {
    label: string;
    icon: IconName;
    count?: string;
    link?: string;
    special?: boolean;
  }[] = [
    { label: "Overview", icon: "grid", link: "/" },
    { label: "Products", icon: "box", count: "24", link: "/products" },
    { label: "Orders", icon: "bag", count: "12", link: "/orders" },
    { label: "Analytics", icon: "chart", link: "/analytics" },
    {
      label: "Ai insights",
      icon: "spark",
      special: true,
      link: "/ai_insights",
    },
  ];
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-61.5 flex-col border-r border-[#eeefe9] bg-white px-4 pt-6.5 pb-3.5 max-[1180px]:w-54.5 max-[860px]:w-16.5 max-[860px]:items-center max-[860px]:px-2 max-[860px]:py-5 max-[620px]:w-13.5 max-[620px]:px-1">
      <a
        className="mb-7.75 ml-1.25 flex w-max items-center gap-2.5 text-[#252b25] no-underline max-[860px]:m-0 max-[860px]:mb-7.25"
        href="#overview"
        aria-label="CloudCart AI home"
      >
        <span className="flex size-6.25 items-end gap-0.5 overflow-hidden rounded-[8px_8px_8px_3px] bg-[#35634a] p-1">
          <i className="h-2.25 w-1 skew-[-18deg] rounded bg-white opacity-70" />
          <i className="h-3.5 w-1 skew-[-18deg] rounded bg-white opacity-85" />
          <i className="h-4.25 w-1 skew-[-18deg] rounded bg-white" />
        </span>
        <span className="font-[Manrope,sans-serif] text-lg font-extrabold max-[860px]:hidden">
          cloudcart
          <span className="ml-0.5 text-[11px] font-bold text-[#c87951]">
            ai
          </span>
        </span>
      </a>
      <button
        className="mb-7.75 flex min-h-14.5 items-center gap-2.5 rounded-md border border-[#eceee8] p-2.25 text-left max-[860px]:mb-5.5 max-[860px]:size-11 max-[860px]:min-h-0 max-[860px]:justify-center max-[860px]:border-0 max-[860px]:p-1"
        aria-label="Switch store"
      >
        <span className="grid size-8.5 shrink-0 place-items-center rounded bg-[#f3e5d8] font-[Manrope,sans-serif] text-[17px] font-extrabold text-[#a4603f]">
          S
        </span>
        <span className="grid min-w-0 flex-1 gap-0.75 text-left max-[860px]:hidden">
          <strong className="truncate text-[11px]">Sunday Supply</strong>
          <span className="text-[10px] text-[#858b82]">Starter plan</span>
        </span>
        <span className="text-[#777e76]">
          <Icon name="chevron" size={15} />
        </span>
      </button>
      <div className="mb-2 ml-2.25 text-[9px] font-bold tracking-[1px] text-[#a0a49c] max-[860px]:hidden">
        WORKSPACE
      </div>
      <nav
        className="grid gap-0.75 max-[860px]:w-full"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            title={item.label}
            href={`${item.link}`}
            className={`relative flex min-h-9.75 w-full items-center gap-2.75 rounded px-2.5 text-left text-[#70766e] transition hover:bg-[#f7f8f4] hover:text-[#252b25] max-[860px]:mx-auto max-[860px]:size-12 max-[860px]:min-h-11 max-[860px]:justify-center max-[860px]:p-0 ${activeNav === item.label ? "bg-[#eef3ed] font-semibold text-[#315a43] before:absolute before:top-2.25 before:bottom-2.25 before:left-0 before:w-0.5 before:rounded before:bg-[#52775d]" : ""}`}
          >
            <Icon name={item.icon} />
            <span className="flex-1 text-xs max-[860px]:hidden">
              {item.label}
            </span>
            {item.special && (
              <span className="rounded-sm bg-[#f7e9df] px-1 py-0.5 text-[8px] font-bold text-[#b36b47] max-[860px]:absolute max-[860px]:-top-0.5 max-[860px]:-right-0.5 max-[860px]:px-0.5 max-[860px]:text-[6px]">
                NEW
              </span>
            )}
            {item.count && (
              <span className="min-w-5.5 rounded bg-[#f2f3ef] px-1.25 py-0.75 text-center text-[10px] text-[#8b9188] max-[860px]:hidden">
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto w-full">
        <div className="relative mb-5.25 overflow-hidden rounded-md border border-[#eee7dc] bg-[#faf8f1] p-3 max-[860px]:hidden">
          <span className="mb-2.75 grid size-6.5 place-items-center rounded bg-[#f2e7d2] text-[#a56f3c]">
            <Icon name="spark" size={16} />
          </span>
          <strong className="block max-w-37.5 text-[11px]">
            Your weekly brief is ready
          </strong>
          <p className="my-1.5 mb-3 text-[10px] leading-[1.55] text-[#858479]">
            3 trends worth a closer look this week.
          </p>
          <Link
            href="/aI_insights"
            className="text-[10px] font-bold text-[#56705a]"
          >
            Explore insights ↗
          </Link>
        </div>
        <Link
          href="/settings"
          title="Settings"
          className={`flex min-h-9.75 w-full items-center gap-2.75 rounded px-2.5 text-left text-[#70766e] hover:bg-[#f7f8f4] max-[860px]:mx-auto max-[860px]:size-12 max-[860px]:min-h-11 max-[860px]:justify-center max-[860px]:p-0 ${activeNav === "Settings" ? "bg-[#eef3ed] text-[#315a43]" : ""}`}
        >
          <Icon name="settings" />
          <span className="text-xs max-[860px]:hidden">Settings</span>
        </Link>
        <div className="mt-3 flex items-center gap-2.25 border-t border-[#eeefe9] px-1 pt-3.25 max-[860px]:mx-auto max-[860px]:w-12 max-[860px]:justify-center">
          <span className="grid size-7.75 shrink-0 place-items-center rounded-full border border-[#e4d2c3] bg-[#f3e9df] text-[9px] font-bold text-[#785d4a]">
            AM
          </span>
          <span className="grid min-w-0 flex-1 gap-0.75 max-[860px]:hidden">
            <strong className="truncate text-[11px]">Alex Morgan</strong>
            <span className="text-[10px] text-[#858b82]">Store owner</span>
          </span>
          <span className="text-[#858b82]">
            <Icon name="more" size={18} />
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
