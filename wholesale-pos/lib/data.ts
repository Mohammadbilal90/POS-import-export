export type Role = "admin" | "cashier";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  sku: string;
  unit: string;
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  icon: string;
  accent: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  balance: number;
  since: string;
};

export type Supplier = {
  id: string;
  name: string;
  phone: string;
  address: string;
  payable: number;
  since: string;
};

export type LedgerEntry = {
  id: string;
  date: string;
  type: "sale" | "payment" | "purchase" | "adjustment";
  description: string;
  debit: number;
  credit: number;
  balance: number;
};

export type Transaction = {
  id: string;
  time: string;
  customer: string;
  items: number;
  amount: number;
  method: "Cash" | "Credit" | "Partial";
  status: "Completed" | "Pending";
};

export const categories: Category[] = [
  { id: "all", name: "All Products", color: "#0f766e" },
  { id: "sauces", name: "Sauces & Condiments", color: "#dc2626" },
  { id: "dairy", name: "Dairy & Sweets", color: "#ca8a04" },
  { id: "staples", name: "Staples", color: "#2563eb" },
  { id: "oils", name: "Oils & Fats", color: "#7c3aed" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Ketchup",
    categoryId: "sauces",
    sku: "SAU-001",
    unit: "bottle",
    cost: 180,
    price: 220,
    stock: 145,
    minStock: 40,
    icon: "🍅",
    accent: "#fee2e2",
  },
  {
    id: "p2",
    name: "Mayonnaise",
    categoryId: "sauces",
    sku: "SAU-002",
    unit: "jar",
    cost: 320,
    price: 390,
    stock: 28,
    minStock: 35,
    icon: "🫙",
    accent: "#fef9c3",
  },
  {
    id: "p3",
    name: "Khoya",
    categoryId: "dairy",
    sku: "DAI-001",
    unit: "kg",
    cost: 850,
    price: 980,
    stock: 42,
    minStock: 20,
    icon: "🧀",
    accent: "#ffedd5",
  },
  {
    id: "p4",
    name: "Rabri",
    categoryId: "dairy",
    sku: "DAI-002",
    unit: "kg",
    cost: 720,
    price: 850,
    stock: 18,
    minStock: 25,
    icon: "🥛",
    accent: "#fce7f3",
  },
  {
    id: "p5",
    name: "Chili Sauce",
    categoryId: "sauces",
    sku: "SAU-003",
    unit: "bottle",
    cost: 150,
    price: 190,
    stock: 96,
    minStock: 30,
    icon: "🌶️",
    accent: "#fee2e2",
  },
  {
    id: "p6",
    name: "Cooking Oil 5L",
    categoryId: "oils",
    sku: "OIL-001",
    unit: "can",
    cost: 2100,
    price: 2450,
    stock: 64,
    minStock: 20,
    icon: "🫒",
    accent: "#ede9fe",
  },
  {
    id: "p7",
    name: "Sugar",
    categoryId: "staples",
    sku: "STP-001",
    unit: "kg",
    cost: 140,
    price: 165,
    stock: 210,
    minStock: 50,
    icon: "🧂",
    accent: "#e0f2fe",
  },
  {
    id: "p8",
    name: "Wheat Flour",
    categoryId: "staples",
    sku: "STP-002",
    unit: "kg",
    cost: 95,
    price: 120,
    stock: 12,
    minStock: 40,
    icon: "🌾",
    accent: "#fef3c7",
  },
  {
    id: "p9",
    name: "Ghee Desi",
    categoryId: "oils",
    sku: "OIL-002",
    unit: "kg",
    cost: 1350,
    price: 1550,
    stock: 33,
    minStock: 15,
    icon: "🧈",
    accent: "#fef9c3",
  },
  {
    id: "p10",
    name: "Tomato Paste",
    categoryId: "sauces",
    sku: "SAU-004",
    unit: "tin",
    cost: 210,
    price: 260,
    stock: 78,
    minStock: 25,
    icon: "🥫",
    accent: "#fecaca",
  },
  {
    id: "p11",
    name: "Barfi Mix",
    categoryId: "dairy",
    sku: "DAI-003",
    unit: "kg",
    cost: 480,
    price: 560,
    stock: 22,
    minStock: 15,
    icon: "🍬",
    accent: "#fbcfe8",
  },
  {
    id: "p12",
    name: "Basmati Rice",
    categoryId: "staples",
    sku: "STP-003",
    unit: "kg",
    cost: 280,
    price: 340,
    stock: 156,
    minStock: 40,
    icon: "🍚",
    accent: "#dbeafe",
  },
];

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Ahmed Traders",
    phone: "0300-1234567",
    address: "Hall Road, Lahore",
    balance: 48500,
    since: "Jan 2024",
  },
  {
    id: "c2",
    name: "City Mart",
    phone: "0321-9876543",
    address: "Gulberg III, Lahore",
    balance: 72000,
    since: "Mar 2024",
  },
  {
    id: "c3",
    name: "Fresh Corner",
    phone: "0333-5551212",
    address: "Model Town, Lahore",
    balance: 18500,
    since: "Jun 2024",
  },
  {
    id: "c4",
    name: "Al-Noor Store",
    phone: "0345-7788990",
    address: "Faisal Town, Lahore",
    balance: 41000,
    since: "Feb 2025",
  },
];

export const suppliers: Supplier[] = [
  {
    id: "s1",
    name: "Pak Foods Distributors",
    phone: "042-35789012",
    address: "Industrial Area, Lahore",
    payable: 42000,
    since: "2023",
  },
  {
    id: "s2",
    name: "Dairy Fresh Supplies",
    phone: "042-35112233",
    address: "Kot Lakhpat, Lahore",
    payable: 28500,
    since: "2024",
  },
  {
    id: "s3",
    name: "Golden Oil Mills",
    phone: "042-35998877",
    address: "Sheikhupura Road",
    payable: 24500,
    since: "2024",
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: "INV-1042",
    time: "2:45 PM",
    customer: "Ahmed Traders",
    items: 8,
    amount: 12450,
    method: "Cash",
    status: "Completed",
  },
  {
    id: "INV-1041",
    time: "2:18 PM",
    customer: "Walk-in",
    items: 3,
    amount: 3280,
    method: "Cash",
    status: "Completed",
  },
  {
    id: "INV-1040",
    time: "1:52 PM",
    customer: "City Mart",
    items: 14,
    amount: 28600,
    method: "Credit",
    status: "Completed",
  },
  {
    id: "INV-1039",
    time: "1:20 PM",
    customer: "Fresh Corner",
    items: 5,
    amount: 8750,
    method: "Partial",
    status: "Completed",
  },
  {
    id: "INV-1038",
    time: "12:45 PM",
    customer: "Walk-in",
    items: 2,
    amount: 1960,
    method: "Cash",
    status: "Completed",
  },
  {
    id: "INV-1037",
    time: "11:30 AM",
    customer: "Al-Noor Store",
    items: 11,
    amount: 19340,
    method: "Credit",
    status: "Completed",
  },
];

export const customerLedger: LedgerEntry[] = [
  {
    id: "cl1",
    date: "28 Aug 2026",
    type: "sale",
    description: "Credit sale INV-1040",
    debit: 28600,
    credit: 0,
    balance: 72000,
  },
  {
    id: "cl2",
    date: "26 Aug 2026",
    type: "payment",
    description: "Cash received",
    debit: 0,
    credit: 15000,
    balance: 43400,
  },
  {
    id: "cl3",
    date: "22 Aug 2026",
    type: "sale",
    description: "Credit sale INV-0998",
    debit: 18400,
    credit: 0,
    balance: 58400,
  },
  {
    id: "cl4",
    date: "18 Aug 2026",
    type: "payment",
    description: "Bank transfer",
    debit: 0,
    credit: 20000,
    balance: 40000,
  },
  {
    id: "cl5",
    date: "12 Aug 2026",
    type: "sale",
    description: "Partial sale INV-0951",
    debit: 22000,
    credit: 8000,
    balance: 60000,
  },
];

export const supplierLedger: LedgerEntry[] = [
  {
    id: "sl1",
    date: "27 Aug 2026",
    type: "purchase",
    description: "Purchase PO-221 — Ketchup, Mayo",
    debit: 0,
    credit: 18500,
    balance: 42000,
  },
  {
    id: "sl2",
    date: "24 Aug 2026",
    type: "payment",
    description: "Cash payment",
    debit: 12000,
    credit: 0,
    balance: 23500,
  },
  {
    id: "sl3",
    date: "19 Aug 2026",
    type: "purchase",
    description: "Purchase PO-210 — Oils",
    debit: 0,
    credit: 25500,
    balance: 35500,
  },
  {
    id: "sl4",
    date: "10 Aug 2026",
    type: "payment",
    description: "Cheque #4521",
    debit: 10000,
    credit: 0,
    balance: 10000,
  },
];

export const salesChartData = [
  { day: "Mon", sales: 92000, purchases: 45000 },
  { day: "Tue", sales: 108000, purchases: 62000 },
  { day: "Wed", sales: 86000, purchases: 38000 },
  { day: "Thu", sales: 132000, purchases: 71000 },
  { day: "Fri", sales: 118000, purchases: 55000 },
  { day: "Sat", sales: 145000, purchases: 80000 },
  { day: "Sun", sales: 125000, purchases: 85000 },
];

export const cashVsCreditData = [
  { name: "Cash", value: 68, amount: 85000 },
  { name: "Credit", value: 22, amount: 27500 },
  { name: "Partial", value: 10, amount: 12500 },
];

export const productSalesData = [
  { name: "Ketchup", sales: 42000 },
  { name: "Mayonnaise", sales: 28500 },
  { name: "Khoya", sales: 31200 },
  { name: "Rabri", sales: 19800 },
  { name: "Cooking Oil", sales: 35600 },
  { name: "Sugar", sales: 14200 },
];

export const cashSummary = {
  opening: 20000,
  cashSales: 80000,
  customerPayments: 10000,
  supplierPayments: 15000,
  expenses: 5000,
  expectedClosing: 90000,
  actualCash: 89500,
  difference: -500,
};

export const kpiData = {
  todaySales: 125000,
  purchases: 85000,
  cashPosition: 95000,
  receivables: 180000,
  payables: 95000,
};

export const purchasesList = [
  {
    id: "PO-221",
    date: "27 Aug 2026",
    supplier: "Pak Foods Distributors",
    items: 6,
    total: 18500,
    payment: "Partial",
    status: "Received",
  },
  {
    id: "PO-220",
    date: "25 Aug 2026",
    supplier: "Dairy Fresh Supplies",
    items: 4,
    total: 24600,
    payment: "Credit",
    status: "Received",
  },
  {
    id: "PO-219",
    date: "22 Aug 2026",
    supplier: "Golden Oil Mills",
    items: 3,
    total: 31200,
    payment: "Cash",
    status: "Received",
  },
  {
    id: "PO-218",
    date: "19 Aug 2026",
    supplier: "Pak Foods Distributors",
    items: 8,
    total: 15800,
    payment: "Cash",
    status: "Received",
  },
];

export const expensesList = [
  { id: "e1", label: "Shop rent (partial)", amount: 2500, time: "9:00 AM" },
  { id: "e2", label: "Utility bill", amount: 1800, time: "11:15 AM" },
  { id: "e3", label: "Staff tea / misc", amount: 700, time: "3:40 PM" },
];
