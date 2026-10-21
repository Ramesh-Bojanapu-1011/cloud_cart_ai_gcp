import Head from "next/head";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Product = {
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  status: "In stock" | "Low stock" | "Out of stock";
};
const initialProducts: Product[] = [
  {
    name: "Everyday Tote",
    category: "Accessories",
    price: 38,
    stock: 8,
    sold: 124,
    image: "photo-1590874103328-eac38a683ce7",
    status: "Low stock",
  },
  {
    name: "Stoneware Set",
    category: "Home & living",
    price: 64,
    stock: 42,
    sold: 98,
    image: "photo-1610701596007-11502861dcfa",
    status: "In stock",
  },
  {
    name: "Cloud Knit",
    category: "Apparel",
    price: 82,
    stock: 5,
    sold: 86,
    image: "photo-1576566588028-4147f3842f27",
    status: "Low stock",
  },
  {
    name: "Ridge Bottle",
    category: "Accessories",
    price: 28,
    stock: 0,
    sold: 73,
    image: "photo-1602143407151-7111542de6e8",
    status: "Out of stock",
  },
];
const chartSets = {
  "7 days": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [38, 53, 45, 67, 56, 78, 69],
    total: "$18,420",
  },
  "30 days": {
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    values: [34, 52, 43, 69, 55, 78, 88],
    total: "$84,254",
  },
  "12 months": {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"],
    values: [28, 42, 39, 61, 56, 73, 91],
    total: "$942,680",
  },
};
type Period = keyof typeof chartSets;
type IconName =
  | "grid"
  | "box"
  | "bag"
  | "chart"
  | "spark"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "more"
  | "chevron"
  | "close";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
        <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.8-.6a8 8 0 0 1-1.6.9l-.4 1.9h-2.8l-.4-1.9a8 8 0 0 1-1.6-.9l-1.8.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.2 1.4-2.4 1.8.6a8 8 0 0 1 1.6-.9l.4-1.9h2.8l.4 1.9a8 8 0 0 1 1.6.9l1.8-.6 1.4 2.4-1.4 1.2a7 7 0 0 1-.1 1.8Z"
          transform="translate(-1 -1) scale(1.08)"
        />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function RevenueChart({
  labels,
  values,
}: {
  labels: string[];
  values: number[];
}) {
  const data = labels.map((label, index) => ({
    label,
    revenue: values[index] * 60,
  }));
  return (
    <div className="h-full w-full" role="img" aria-label="Revenue trend chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#eff0ec" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9da29a", fontSize: 8 }}
            tickMargin={9}
            interval={0}
          />
          <YAxis
            domain={[0, 6000]}
            ticks={[0, 2000, 4000, 6000]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a2a79f", fontSize: 8 }}
            tickMargin={5}
            tickFormatter={(value: number) =>
              value === 0 ? "$0" : `$${value / 1000}k`
            }
            width={34}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e9ebe5",
              borderRadius: 4,
              fontSize: 10,
            }}
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Sales",
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#35634a"
            strokeWidth={2.5}
            fill="url(#sales-fill)"
            activeDot={{
              r: 4,
              fill: "#35634a",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            dot={{ r: 3, fill: "#fff", stroke: "#35634a", strokeWidth: 2 }}
          >
            <defs>
              <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#80a88c" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#80a88c" stopOpacity={0} />
              </linearGradient>
            </defs>
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ForecastChart() {
  const data = [
    { week: "This week", demand: 42 },
    { week: "Next week", demand: 55 },
    { week: "In 3 weeks", demand: 68 },
    { week: "In 4 weeks", demand: 82 },
  ];
  return (
    <div
      className="h-full w-full"
      role="img"
      aria-label="Predicted demand for the next four weeks"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 2, left: 2, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#eff0ec" />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#a0a49c", fontSize: 7 }}
            tickMargin={6}
            padding={{ left: 26, right: 20 }}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              border: "1px solid #e9ebe5",
              borderRadius: 4,
              fontSize: 9,
            }}
            formatter={(value) => [`${value}%`, "Expected demand"]}
          />
          <Area
            type="monotone"
            dataKey="demand"
            stroke="#c87a4d"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            fill="url(#forecast-fill)"
            dot={false}
            activeDot={{ r: 3, fill: "#c87a4d" }}
          >
            <defs>
              <linearGradient id="forecast-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c87a4d" stopOpacity={0.14} />
                <stop offset="100%" stopColor="#c87a4d" stopOpacity={0} />
              </linearGradient>
            </defs>
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const primaryButton =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded border px-3 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71927b]";
const iconButton =
  "relative grid size-[30px] shrink-0 place-items-center rounded text-[#737a72] hover:bg-[#f0f2ed] focus-visible:outline-2 focus-visible:outline-[#71927b]";

export default function Home() {
  const [period, setPeriod] = useState<Period>("30 days");
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("All products");
  const [activeNav, setActiveNav] = useState("Overview");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState("");
  const chart = chartSets[period];
  const orderCount = 1284;
  const previousSalesPoint = chart.values[chart.values.length - 2];
  const latestSalesPoint = chart.values[chart.values.length - 1];
  const salesChange =
    ((latestSalesPoint - previousSalesPoint) / previousSalesPoint) * 100;
  const averageOrderValue =
    Number(chart.total.replace(/[$,]/g, "")) / orderCount;
  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  );
  const productsNeedingRestock = products.filter(
    (product) => product.status !== "In stock",
  ).length;
  const inStockProducts = products.length - productsNeedingRestock;
  const inventoryHealth = products.length
    ? (inStockProducts / products.length) * 100
    : 0;
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesQuery = `${product.name} ${product.category}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter =
          stockFilter === "All products" || product.status === stockFilter;
        return matchesQuery && matchesFilter;
      }),
    [products, query, stockFilter],
  );

  function showToast(message: string, duration = 2600) {
    setToast(message);
    window.setTimeout(() => setToast(""), duration);
  }
  function addProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    const category = String(formData.get("category")).trim();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    if (!name || !category || price < 0 || stock < 0) return;
    setProducts((current) => [
      {
        name,
        category,
        price,
        stock,
        sold: 0,
        image: "photo-1542291026-7eec264c27ff",
        status:
          stock === 0 ? "Out of stock" : stock < 10 ? "Low stock" : "In stock",
      },
      ...current,
    ]);
    setIsAddOpen(false);
    showToast(`${name} added to inventory`, 2800);
  }
  function chooseNav(label: string) {
    setActiveNav(label);
    if (label !== "Overview") showToast(`${label} view is coming soon`, 2400);
  }

  const navItems: {
    label: string;
    icon: IconName;
    count?: string;
    special?: boolean;
  }[] = [
    { label: "Overview", icon: "grid" },
    { label: "Products", icon: "box", count: "24" },
    { label: "Orders", icon: "bag", count: "12" },
    { label: "Analytics", icon: "chart" },
    { label: "AI insights", icon: "spark", special: true },
  ];

  return (
    <>
      <Head>
        <title>CloudCart AI | Merchant overview</title>
        <meta
          name="description"
          content="CloudCart AI merchant sales, inventory, and demand overview."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-[#f8f9f5] text-[#252b25] caret-transparent">
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
              <button
                key={item.label}
                title={item.label}
                className={`relative flex min-h-9.75 w-full items-center gap-2.75 rounded px-2.5 text-left text-[#70766e] transition hover:bg-[#f7f8f4] hover:text-[#252b25] max-[860px]:mx-auto max-[860px]:size-12 max-[860px]:min-h-11 max-[860px]:justify-center max-[860px]:p-0 ${activeNav === item.label ? "bg-[#eef3ed] font-semibold text-[#315a43] before:absolute before:top-2.25 before:bottom-2.25 before:left-0 before:w-0.5 before:rounded before:bg-[#52775d]" : ""}`}
                onClick={() => chooseNav(item.label)}
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
              </button>
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
              <button
                className="text-[10px] font-bold text-[#56705a]"
                onClick={() => chooseNav("AI insights")}
              >
                Explore insights ↗
              </button>
            </div>
            <button
              title="Settings"
              className={`flex min-h-9.75 w-full items-center gap-2.75 rounded px-2.5 text-left text-[#70766e] hover:bg-[#f7f8f4] max-[860px]:mx-auto max-[860px]:size-12 max-[860px]:min-h-11 max-[860px]:justify-center max-[860px]:p-0 ${activeNav === "Settings" ? "bg-[#eef3ed] text-[#315a43]" : ""}`}
              onClick={() => chooseNav("Settings")}
            >
              <Icon name="settings" />
              <span className="text-xs max-[860px]:hidden">Settings</span>
            </button>
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
        <main
          id="overview"
          className="ml-61.5 min-h-screen max-[1180px]:ml-54.5 max-[860px]:ml-16.5 max-[620px]:ml-13.5"
        >
          <header className="relative flex h-15.5 items-center justify-between border-b border-[#eceee8] bg-white/80 px-9.75 max-[1180px]:px-6.25 max-[620px]:h-13.5 max-[620px]:px-3.25">
            <div className="text-[11px] text-[#858b82] max-[620px]:text-[10px]">
              Workspace{" "}
              <span className="mx-2 text-[#c2c5bd] max-[620px]:mx-1.25">/</span>
              <strong className="font-semibold text-[#464d45]">
                {activeNav}
              </strong>
            </div>
            <div className="flex items-center gap-4.75 max-[620px]:gap-2.5">
              <div className="flex items-center gap-1.75 text-[10px] text-[#777e76] max-[620px]:gap-1.25 max-[620px]:text-[9px]">
                <span className="size-1.5 rounded-full bg-[#64a677] shadow-[0_0_0_3px_#eaf3ea]" />
                Store is live
              </div>
              <button
                className={iconButton}
                aria-label="Notifications"
                onClick={() => setShowNotifications((value) => !value)}
              >
                <Icon name="bell" />
                <i className="absolute top-1.25 right-1.5 size-1.25 rounded-full border border-white bg-[#cf7950]" />
              </button>
              <span className="grid size-7.75 place-items-center rounded-full border border-[#e4d2c3] bg-[#f3e9df] text-[9px] font-bold text-[#785d4a] max-[620px]:size-6.75">
                AM
              </span>
            </div>
            {showNotifications && (
              <div className="absolute top-13.5 right-16.25 z-20 w-68 rounded-md border border-[#e9eae4] bg-white p-3.75 shadow-xl max-[620px]:right-9.25 max-[620px]:w-[min(272px,calc(100vw-85px))]">
                <strong className="text-xs">Notifications</strong>
                <p className="my-3.25 flex items-center gap-2 text-[11px] text-[#686f67]">
                  <i className="size-1.75 rounded-full bg-[#d38a4d]" />
                  Cloud Knit is running low on stock.
                </p>
                <p className="my-3.25 flex items-center gap-2 text-[11px] text-[#686f67]">
                  <i className="size-1.75 rounded-full bg-[#66a077]" />
                  Your weekly sales report is ready.
                </p>
                <button
                  className="text-[10px] font-semibold text-[#35634a]"
                  onClick={() => setShowNotifications(false)}
                >
                  Dismiss
                </button>
              </div>
            )}
          </header>
          <div className="mx-auto max-w-337.5 px-9.75 pt-7.25 pb-5 max-[1180px]:px-6.25 max-[620px]:px-3.25 max-[620px]:pt-5.75 max-[620px]:pb-4">
            <section className="mb-5.75 flex items-end justify-between gap-3 max-[620px]:items-start">
              <div>
                <div className="text-[9px] font-bold tracking-[1.05px] text-[#92978e] max-[620px]:text-[8px]">
                  MONDAY, OCTOBER 19, 2026{" "}
                  <span className="ml-1 text-[11px] text-[#c97b51]">✳</span>
                </div>
                <h1 className="my-2 font-[Manrope,sans-serif] text-[26px] leading-[1.2] font-bold max-[620px]:text-[21px]">
                  Good morning, Alex<span className="text-[#c97b51]">.</span>
                </h1>
                <p className="m-0 text-xs text-[#838980] max-[620px]:max-w-55 max-[620px]:text-[10px] max-[620px]:leading-relaxed">
                  Here&apos;s what&apos;s happening with your store today.
                </p>
              </div>
              <button
                className={`${primaryButton} border-[#315e45] bg-[#35634a] text-white hover:bg-[#294f39] max-[620px]:min-h-8 max-[620px]:gap-1 max-[620px]:px-2 max-[620px]:text-[9px]`}
                onClick={() => setIsAddOpen(true)}
              >
                <Icon name="plus" size={17} />
                Add product
              </button>
            </section>
            <section
              className="mb-3.75 grid grid-cols-4 gap-3.25 max-[1180px]:grid-cols-2 max-[620px]:mb-2.5 max-[620px]:gap-2"
              aria-label="Store performance"
            >
              <Metric
                title="Gross sales"
                icon="chart"
                tint="green"
                value={chart.total}
              >
                <span
                  className={`${salesChange >= 0 ? "text-[#568160] " : "text-[#bd7954] "} flex`}
                >
                  <Icon name="arrow" size={12} />
                  {salesChange > 0 ? "+" : ""}
                  {salesChange.toFixed(1)}%
                </span>
                <span>vs. prior data point</span>
                <svg
                  className="ml-auto h-5 w-14"
                  viewBox="0 0 88 28"
                  aria-hidden="true"
                >
                  <path
                    d="M1 22 13 18 25 20 37 10 49 15 61 8 73 12 87 3"
                    fill="none"
                    stroke="#6e9a78"
                    strokeWidth="2"
                  />
                </svg>
              </Metric>
              <Metric
                title="Orders"
                icon="bag"
                tint="peach"
                value={orderCount.toLocaleString()}
              >
                <span>in selected period</span>
                <MiniBars />
              </Metric>
              <Metric
                title="Average order value"
                icon="bag"
                tint="blue"
                value={averageOrderValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              >
                <span>in selected period</span>
                <MiniBars blue />
              </Metric>
              <Metric
                title="Products in stock"
                icon="box"
                tint="lilac"
                value={totalStock.toLocaleString()}
              >
                <span className="text-[#bd7954]">
                  ● {productsNeedingRestock} need restocking
                </span>
                <span>across {products.length} products</span>
                <div className="absolute right-3.25 bottom-4 left-3.25 h-0.75 overflow-hidden rounded-full bg-[#f0f0ec]">
                  <span
                    className="block h-full rounded-full bg-[#9ab29a]"
                    style={{ width: `${inventoryHealth}%` }}
                  />
                </div>
              </Metric>
            </section>
            <section className="mb-3.75 grid grid-cols-[minmax(0,1.65fr)_minmax(290px,1fr)] gap-3.5 max-[860px]:grid-cols-[minmax(0,1.35fr)_minmax(270px,1fr)] max-[860px]:gap-2.5 max-[620px]:mb-2.5 max-[620px]:grid-cols-1">
              <article className="min-w-0 rounded-md border border-[#e9ebe5] bg-white p-4.25 max-[860px]:px-3.25">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Kicker>PERFORMANCE</Kicker>
                    <h2 className="mt-1 font-[Manrope,sans-serif] text-sm font-bold">
                      Sales over time
                    </h2>
                  </div>
                  <SelectWrap>
                    <select
                      aria-label="Sales chart period"
                      className="h-7.25 appearance-none rounded border border-[#e8eae4] bg-white py-0 pr-6 pl-2.25 text-[10px] text-[#596057]"
                      value={period}
                      onChange={(event) =>
                        setPeriod(event.target.value as Period)
                      }
                    >
                      <option>7 days</option>
                      <option>30 days</option>
                      <option>12 months</option>
                    </select>
                  </SelectWrap>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <strong className="font-[Manrope,sans-serif] text-xl">
                    {chart.total}
                  </strong>
                  <span className="text-[10px] text-[#568160]">
                    ↗ {salesChange > 0 ? "+" : ""}
                    {salesChange.toFixed(1)}%
                  </span>
                  <span className="text-[9px] text-[#9a9f97]">
                    change vs. prior data point
                  </span>
                </div>
                <div className="mt-2 h-36.25 min-[1500px]:h-41 max-[620px]:h-35.5">
                  <RevenueChart labels={chart.labels} values={chart.values} />
                </div>
              </article>
              <article className="min-w-0 rounded-md border border-[#e9ebe5] bg-white px-4.25 pt-4.25 pb-3.25 max-[860px]:px-3 max-[620px]:grid max-[620px]:grid-cols-2 max-[620px]:gap-x-3">
                <div className="flex items-start justify-between gap-3 max-[620px]:col-span-2">
                  <div>
                    <Kicker>POWERED BY CLOUDCART AI</Kicker>
                    <h2 className="mt-1 font-[Manrope,sans-serif] text-sm font-bold">
                      Demand forecast
                    </h2>
                  </div>
                  <button
                    className={iconButton}
                    aria-label="More forecast options"
                  >
                    <Icon name="more" />
                  </button>
                </div>
                <div className="mt-4.25 flex items-center gap-2 max-[860px]:gap-1.5 max-[620px]:col-span-2">
                  <Image
                    className="size-8 shrink-0 rounded object-cover"
                    src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&auto=format&fit=crop&q=80"
                    alt="Cloud Knit"
                    width={100}
                    height={100}
                  />
                  <div className="grid min-w-0 flex-1 gap-0.75">
                    <strong className="text-[10px]">Cloud Knit</strong>
                    <span className="text-[8px] text-[#93988f]">
                      Apparel · SKU CK-008
                    </span>
                  </div>
                  <span className="whitespace-nowrap rounded-sm bg-[#f8eee2] px-1.5 py-1 text-[8px] font-semibold text-[#b7794d] max-[860px]:px-1 max-[860px]:text-[7px]">
                    Restock soon
                  </span>
                </div>
                <div className="mt-3.25 flex items-center gap-2.25 max-[620px]:mt-2.5 max-[620px]:self-end">
                  <strong className="font-[Manrope,sans-serif] text-[23px] text-[#c87a4d]">
                    +34%
                  </strong>
                  <span className="text-[9px] leading-relaxed text-[#8c9189]">
                    expected demand
                    <br />
                    over the next 4 weeks
                  </span>
                </div>
                <div className="mt-1 h-18.5 max-[620px]:col-span-2 max-[620px]:mt-1 max-[620px]:h-21">
                  <ForecastChart />
                </div>
                <div className="mt-2.75 flex items-start gap-1.75 rounded border border-[#eee9de] bg-[#fbfaf6] px-2.25 py-2 max-[620px]:col-span-2">
                  <span className="text-xs text-[#c78351]">✳</span>
                  <p className="m-0 text-[9px] leading-relaxed text-[#77796f]">
                    Based on this trend, consider ordering{" "}
                    <strong className="text-[#51574c]">18 more units</strong> by
                    Oct 26.
                  </p>
                </div>
              </article>
            </section>
            <section className="overflow-hidden rounded-md border border-[#e9ebe5] bg-white px-4.25 pt-4.25 max-[620px]:px-2.75 max-[620px]:pt-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Kicker>YOUR CATALOG</Kicker>
                  <h2 className="mt-1 flex items-center gap-2 font-[Manrope,sans-serif] text-sm font-bold max-[620px]:gap-1 max-[620px]:text-xs">
                    Inventory at a glance{" "}
                    <span className="grid h-4.5 min-w-4.75 place-items-center rounded bg-[#f0f2ed] px-1 text-[9px] font-semibold text-[#858b82]">
                      {products.length}
                    </span>
                  </h2>
                </div>
                <button
                  className="whitespace-nowrap text-[10px] font-semibold text-[#52735a] max-[620px]:text-[9px]"
                  onClick={() => chooseNav("Products")}
                >
                  View all products ↗
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 max-[620px]:gap-1.5">
                <label className="flex h-7.75 min-w-0 flex-1 items-center gap-1.75 rounded border border-[#e8eae4] px-2 text-[#92978f] max-[620px]:gap-1 max-[620px]:px-1.5">
                  <Icon name="search" size={16} />
                  <input
                    className="w-full min-w-0 bg-transparent text-[10px] text-[#252b25] outline-none placeholder:text-[#a5aaa2] max-[620px]:text-[9px]"
                    aria-label="Search products"
                    placeholder="Search products..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <kbd className="rounded  text-nowrap border border-[#eceee9] px-1 py-0.5 text-[8px] text-[#a0a49d] max-[620px]:hidden">
                    ⌘ K
                  </kbd>
                </label>
                <SelectWrap>
                  <select
                    aria-label="Filter inventory by stock status"
                    className="h-7.75 min-w-26.5 appearance-none rounded border border-[#e8eae4] bg-white py-0 pr-6 pl-2.25 text-[10px] text-[#596057] max-[620px]:max-w-25 max-[620px]:min-w-0 max-[620px]:pl-1.5 max-[620px]:text-[9px]"
                    value={stockFilter}
                    onChange={(event) => setStockFilter(event.target.value)}
                  >
                    <option>All products</option>
                    <option>In stock</option>
                    <option>Low stock</option>
                    <option>Out of stock</option>
                  </select>
                </SelectWrap>
                <button
                  className={`${iconButton} ml-auto border border-[#e8eae4]`}
                  aria-label="More inventory options"
                >
                  <Icon name="more" />
                </button>
              </div>
              <div className="mt-2.5 overflow-x-auto">
                <table className="w-full min-w-142.5 border-collapse whitespace-nowrap text-left">
                  <thead className="bg-[#f9faf7] text-[8px] font-bold tracking-[0.65px] text-[#999e96]">
                    <tr>
                      {[
                        "PRODUCT",
                        "PRICE",
                        "IN STOCK",
                        "UNITS SOLD",
                        "STATUS",
                        "",
                      ].map((label) => (
                        <th
                          className="h-7.75 px-2.5 first:pl-2.5 last:w-8.5 last:pr-1"
                          key={label || "actions"}
                          aria-label={label || "Actions"}
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        className="border-t border-[#eff0ec] text-[10px] text-[#626960]"
                        key={product.name}
                      >
                        <td className="h-14 px-2.5">
                          <div className="flex min-w-47 items-center gap-2.25">
                            <div
                              className="size-8.75 shrink-0 rounded border border-[#f0f0ec] bg-[#f3f3ee] bg-cover bg-center"
                              style={{
                                backgroundImage: `url(https://images.unsplash.com/${product.image}?w=120&auto=format&fit=crop&q=80)`,
                              }}
                            />
                            <div className="grid gap-1">
                              <strong className="text-[10px] font-semibold text-[#343b34]">
                                {product.name}
                              </strong>
                              <span className="text-[9px] text-[#999e96]">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="h-14 px-2.5">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="h-14 px-2.5">
                          <span
                            className={
                              product.stock < 10
                                ? "font-semibold text-[#bd7954]"
                                : "font-semibold text-[#4a554a]"
                            }
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="h-14 px-2.5">{product.sold}</td>
                        <td className="h-14 px-2.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-sm px-1.75 py-1 text-[8px] font-semibold ${product.status === "In stock" ? "bg-[#edf4ed] text-[#53805c]" : product.status === "Low stock" ? "bg-[#f9f1e7] text-[#b57b4c]" : "bg-[#f6ebea] text-[#b46e65]"}`}
                          >
                            <i className="size-1.25 rounded-full bg-current" />
                            {product.status}
                          </span>
                        </td>
                        <td className="h-14 px-1">
                          <button
                            className={iconButton}
                            aria-label={`More actions for ${product.name}`}
                          >
                            <Icon name="more" size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div className="p-7.5 text-center text-[11px] text-[#898f86]">
                    No products match your search.
                  </div>
                )}
              </div>
              <div className="flex min-h-10.5 items-center justify-between border-t border-[#eff0ec] text-[9px] text-[#949990]">
                <span>
                  Showing{" "}
                  <strong className="text-[#626960]">
                    {filteredProducts.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-[#626960]">{products.length}</strong>{" "}
                  products
                </span>
                <div className="flex gap-1">
                  <button
                    className="grid size-5.75 place-items-center rounded border border-[#e8eae4] bg-white text-[13px] text-[#a0a49c] opacity-45"
                    aria-label="Previous page"
                    disabled
                  >
                    &#8249;
                  </button>
                  <button className="grid size-5.75 place-items-center rounded border border-[#dbe5da] bg-[#edf3ec] text-[13px] text-[#426b4d]">
                    1
                  </button>
                  <button
                    className="grid size-5.75 place-items-center rounded border border-[#e8eae4] bg-white text-[13px] text-[#a0a49c] opacity-45"
                    aria-label="Next page"
                    disabled
                  >
                    &#8250;
                  </button>
                </div>
              </div>
            </section>
            <footer className="flex justify-between gap-2.5 px-px pt-4 text-[9px] text-[#a0a49c] max-[620px]:flex-wrap max-[620px]:text-[8px]">
              <span>&copy; {new Date().getFullYear()} CloudCart AI</span>
              <span className="inline-flex items-center gap-1.75">
                <i className="size-1.25 rounded-full bg-[#64a677]" />
                All systems operational
              </span>
              <a
                className="text-[#858b82] no-underline hover:text-[#35634a]"
                href="#help"
              >
                Help center ↗
              </a>
            </footer>
          </div>
        </main>
      </div>
      {isAddOpen && (
        <div
          className="fixed inset-0 z-30 grid place-items-center bg-[#202820]/42 p-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsAddOpen(false);
          }}
        >
          <section
            className="w-full max-w-107.5 rounded-md border border-[#e8eae4] bg-white p-5.5 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <Kicker>YOUR CATALOG</Kicker>
                <h2
                  className="mt-1.5 font-[Manrope,sans-serif] text-lg font-bold"
                  id="modal-title"
                >
                  Add a product
                </h2>
              </div>
              <button
                className={iconButton}
                aria-label="Close dialog"
                onClick={() => setIsAddOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <form className="grid gap-3.5" onSubmit={addProduct}>
              <FormField
                label="Product name"
                name="name"
                placeholder="e.g. Weekend Backpack"
              />
              <FormField
                label="Category"
                name="category"
                placeholder="e.g. Accessories"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Price (USD)"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                <FormField
                  label="Stock quantity"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                />
              </div>
              <div className="mt-2 flex justify-end gap-2 border-t border-[#eff0ec] pt-3.5">
                <button
                  type="button"
                  className={`${primaryButton} border-[#e5e8e1] bg-white text-[#60675f] hover:bg-[#f7f8f4]`}
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${primaryButton} border-[#315e45] bg-[#35634a] text-white hover:bg-[#294f39]`}
                >
                  <Icon name="plus" size={16} />
                  Add product
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {toast && (
        <div className="fixed right-5.5 bottom-5.5 z-40 flex items-center gap-2.25 rounded border border-[#dce7da] bg-white px-4 py-3 text-[11px] text-[#495c4a] shadow-lg">
          <span className="grid size-4.25 place-items-center rounded-full bg-[#e9f2e8] text-[10px] text-[#4e8059]">
            ✓
          </span>
          {toast}
        </div>
      )}
    </>
  );
}

function Metric({
  title,
  icon,
  tint,
  value,
  children,
}: {
  title: string;
  icon: IconName;
  tint: "green" | "peach" | "blue" | "lilac";
  value: string;
  children: React.ReactNode;
}) {
  const colors = {
    green: "bg-[#edf3eb] text-[#50785a]",
    peach: "bg-[#f8eee6] text-[#bd7954]",
    blue: "bg-[#eaf0f2] text-[#597c86]",
    lilac: "bg-[#f0edf3] text-[#7c7089]",
  };
  return (
    <article className="relative min-h-33.75 min-w-0 overflow-hidden rounded-md border border-[#e9ebe5] bg-white p-3.5 max-[1180px]:min-h-32.5 max-[620px]:min-h-29.75 max-[620px]:px-2.5 max-[620px]:py-2.75">
      <div className="flex items-center justify-between text-[10px] text-[#777e75] max-[620px]:text-[9px]">
        <span>{title}</span>
        <span
          className={`grid size-6.75 place-items-center rounded ${colors[tint]} max-[620px]:size-5.75`}
        >
          <Icon name={icon} size={16} />
        </span>
      </div>
      <div className="mt-2.25 font-[Manrope,sans-serif] text-[23px] leading-[1.15] font-bold max-[620px]:mt-2 max-[620px]:text-[19px]">
        {value}
      </div>
      <div className="mt-2.25 flex items-center gap-1.5 whitespace-nowrap text-[9px] text-[#999e96] max-[620px]:mt-2 max-[620px]:flex-wrap max-[620px]:gap-1 max-[620px]:text-[8px]">
        {children}
      </div>
    </article>
  );
}
function MiniBars({ blue = false }: { blue?: boolean }) {
  return (
    <span className="absolute right-3.25 bottom-2.75 flex h-5 items-end gap-0.75 opacity-70 max-[620px]:right-2.5 max-[620px]:bottom-2.25">
      {[34, 62, 84, 34, 100, 62, 34, 84, 62, 34, 100, 84].map(
        (height, index) => (
          <i
            key={index}
            className={`w-1 rounded-sm ${blue ? "bg-[#9ab6b7]" : "bg-[#d8aa89]"}`}
            style={{ height: `${height}%` }}
          />
        ),
      )}
    </span>
  );
}
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[8px] font-bold tracking-[0.95px] text-[#92978e]">
      {children}
    </div>
  );
}
function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex shrink-0 items-center [&>select]:pr-7">
      {children}
      <span className="pointer-events-none absolute right-2 text-[#858b82]">
        <Icon name="chevron" size={14} />
      </span>
    </div>
  );
}
function FormField({
  label,
  name,
  ...inputProps
}: {
  label: string;
  name: string;
  type?: string;
  min?: string;
  step?: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-1.5 text-[10px] font-semibold text-[#5a6259]">
      {label}
      <input
        {...inputProps}
        name={name}
        required
        className="h-9.25 w-full rounded border border-[#e5e8e1] px-2.5 text-[11px] text-[#252b25] placeholder:text-[#adb1aa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71927b]"
      />
    </label>
  );
}
