"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  getVendorData,
  deleteProduct,
  createProduct,
  updateProduct,
  updateCustomRequestStatus,
  deleteOrderItem,
  deleteCustomRequest,
} from "@/app/actions/data";
import { useEffect, useState, useRef } from "react";
import AuthModal from "@/components/AuthModal";

// ─── Shared Utilities ────────────────────────────────────────────────────────
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "CONTACTED":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "DELIVERED":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductFormModal({
  vendorId,
  product,
  onClose,
  onSaved,
}: {
  vendorId: string;
  product?: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: product?.title ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    stock: product?.stock ?? 1,
    category: product?.category ?? "",
    length: product?.length ?? "",
    width: product?.width ?? "",
    height: product?.height ?? "",
    images: product?.images ?? [],
  });
  const [newImage, setNewImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) {
      setError("Title, price, and category are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        vendorId,
        title: form.title,
        description: form.description,
        price: form.price,
        stock: form.stock,
        category: form.category,
        length: form.length,
        width: form.width,
        height: form.height,
        images: form.images,
      };

      if (product?.id) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Extract Cloudinary folder path from a console URL like:
  // https://console.cloudinary.com/app/c-.../assets/media_library/folders/FOLDER_ID
  const extractCloudinaryFolder = (input: string): string | null => {
    try {
      const url = new URL(input);
      if (url.hostname === "console.cloudinary.com") {
        // The last path segment is the folder id used by the API
        const parts = url.pathname.split("/");
        const foldersIdx = parts.indexOf("folders");
        if (foldersIdx !== -1 && parts[foldersIdx + 1]) {
          return parts.slice(foldersIdx + 1).join("/");
        }
      }
    } catch {
      // not a URL
    }
    return null;
  };

  const fetchFromFolder = async () => {
    if (!newImage.trim()) return;
    const folderId = extractCloudinaryFolder(newImage.trim());
    if (!folderId) return false; // not a folder URL
    setFetching(true);
    setError("");
    try {
      const res = await fetch(
        `/api/cloudinary-folder?folder=${encodeURIComponent(folderId)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch folder images");
      const data = await res.json();
      const urls: string[] = data.urls ?? [];
      const unique = urls.filter((url) => !form.images.includes(url));
      setForm((f) => ({ ...f, images: [...f.images, ...unique] }));
      setNewImage("");
      return true;
    } catch (err: any) {
      setError(err.message ?? "Could not load folder images");
      return false;
    } finally {
      setFetching(false);
    }
  };

  const addImage = async () => {
    if (!newImage.trim()) return;
    // Try folder URL first
    const handled = await fetchFromFolder();
    if (handled) return;
    // Otherwise treat as one or more plain URLs
    const incoming = newImage
      .split(/[\n,\s]+/)
      .map((u) => u.trim())
      .filter((u) => u.startsWith("http"));
    const unique = incoming.filter((u) => !form.images.includes(u));
    if (unique.length > 0) {
      setForm((f) => ({ ...f, images: [...f.images, ...unique] }));
    }
    setNewImage("");
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_: string, i: number) => i !== idx),
    }));
  };

  const categories = [
    "Living room",
    "Dressing room",
    "Master bedroom",
    "Kids room",
    "Dinning room with buffet and 6 chairs",
    "Dinning room with buffet and 8 chairs",
    "Sofas",
    "Sofas tables",
    "Side tabels",
    "Doors",
    "Cladding",
    "Kitchen",
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf9f4] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-outline-variant/20 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-outline-variant/15 bg-[#1c1b1b] text-[#fcf9f4]">
          <h2 className="font-headline text-lg md:text-xl uppercase tracking-tight font-bold">
            {product ? "Edit Listing" : "New Listing"}
          </h2>
          <button
            onClick={onClose}
            className="opacity-40 hover:opacity-100 transition-opacity p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-10 flex flex-col gap-8"
        >
          {/* Multiple Image Support */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-4 block">
              Visual Assets (Cloudinary Links)
            </label>
            <div className="flex flex-col gap-3 mb-6">
              <textarea
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder={
                  "Paste a Cloudinary folder URL to import all images at once,\nor paste one / multiple direct image links (one per line)."
                }
                rows={3}
                className="w-full border border-black/10 rounded-md p-3 bg-transparent text-sm focus:border-black transition-all outline-none resize-none"
              />
              <button
                type="button"
                onClick={addImage}
                disabled={fetching}
                className="self-end bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#a1824a] transition-all rounded-lg disabled:opacity-50"
              >
                {fetching ? "Loading…" : "Capture Assets"}
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {form.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-32 aspect-square shrink-0 bg-surface-variant rounded-xl overflow-hidden border border-black/5 group shadow-sm"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              {form.images.length === 0 && (
                <div className="w-full py-16 border-2 border-dashed border-black/5 rounded-2xl flex flex-col items-center justify-center gap-3 bg-surface-variant/30 text-black/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    No cinematic frames linked
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
              Product Name *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="e.g. Walnut Dining Chair"
              className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm font-medium focus:border-primary focus:outline-none transition-all placeholder:opacity-30"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Describe the materials, craftsmanship, dimensions…"
              rows={3}
              className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm focus:border-primary focus:outline-none transition-all resize-none placeholder:opacity-30"
            />
          </div>

          {/* Dimensions, Quantity, Price, Category */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Price (USD) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                placeholder="0.00"
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm font-medium focus:border-primary focus:outline-none transition-all placeholder:opacity-30"
              />
            </div>
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Quantity / Stock
              </label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm font-medium focus:border-primary focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm focus:border-primary focus:outline-none transition-all"
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Length (cm)
              </label>
              <input
                type="number"
                value={form.length}
                onChange={(e) =>
                  setForm((f) => ({ ...f, length: e.target.value }))
                }
                placeholder="0"
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm focus:border-primary focus:outline-none transition-all placeholder:opacity-30"
              />
            </div>
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Width (cm)
              </label>
              <input
                type="number"
                value={form.width}
                onChange={(e) =>
                  setForm((f) => ({ ...f, width: e.target.value }))
                }
                placeholder="0"
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm focus:border-primary focus:outline-none transition-all placeholder:opacity-30"
              />
            </div>
            <div>
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">
                Height (cm)
              </label>
              <input
                type="number"
                value={form.height}
                onChange={(e) =>
                  setForm((f) => ({ ...f, height: e.target.value }))
                }
                placeholder="0"
                className="w-full border-b border-outline-variant/40 py-3 bg-transparent text-sm focus:border-primary focus:outline-none transition-all placeholder:opacity-30"
              />
            </div>
          </div>

          {error && (
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-red-500">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-outline-variant/15">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-outline-variant/30 text-[0.7rem] font-bold uppercase tracking-widest hover:border-primary transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-4 bg-primary text-on-primary text-[0.7rem] font-bold uppercase tracking-widest hover:bg-secondary transition-all disabled:opacity-40"
            >
              {saving
                ? "Saving…"
                : product
                  ? "Update Listing"
                  : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Request Detail Modal ───────────────────────────────────────────────────
function RequestDetailModal({
  request,
  onClose,
  onRefresh,
}: {
  request: any;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    const res = await updateCustomRequestStatus(request.id, newStatus);
    if (res.success) {
      onRefresh();
      onClose();
    }
    setLoading(false);
  };

  const handleCancelRequest = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this request? It will be marked as Cancelled but remain in your history.",
      )
    )
      return;
    setLoading(true);
    const res = await updateCustomRequestStatus(request.id, "CANCELLED");
    if (res.success) {
      onRefresh();
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fcf9f4] w-full max-w-2xl border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/15 bg-[#1c1b1b] text-[#fcf9f4]">
          <h2 className="font-headline text-lg uppercase tracking-widest font-bold">
            Custom Order Details
          </h2>
          <button
            onClick={onClose}
            className="opacity-40 hover:opacity-100 transition-opacity p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-1">
                Category
              </p>
              <h3 className="font-headline text-2xl text-primary font-bold uppercase leading-tight">
                {request.category}
              </h3>
            </div>
            <span
              className={`px-3 py-1 text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(request.status)}`}
            >
              {request.status.replace("_", " ")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-3">
                  Customer Profile
                </p>
                <div className="space-y-2">
                  <p className="font-headline text-xl text-primary font-bold uppercase">
                    {request.customer.name}
                  </p>
                  <p className="text-sm font-medium text-primary/60">
                    {request.customer.email}
                  </p>
                  <p className="text-sm font-bold text-primary tracking-widest">
                    {request.customer.phone || "PHONE NOT PROVIDED"}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/10">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-3">
                  Dimensions & Details
                </p>
                <div className="space-y-2 font-label text-sm font-bold">
                  <p>L: {request.length}cm</p>
                  <p>W: {request.width}cm</p>
                  <p>H: {request.height}cm</p>
                  <p className="text-[#a1824a]">
                    MATERIAL: {request.material || "STANDARD"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-3">
                  Message from Client
                </p>
                <p className="text-xs font-medium leading-relaxed uppercase tracking-tight italic bg-primary/5 p-4 border border-primary/10">
                  "{request.message || "No additional details provided."}"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 lg:grid-cols-3 gap-3">
            {request.status === "PENDING" && (
              <button
                disabled={loading}
                onClick={() => handleStatusChange("IN_PROGRESS")}
                className="bg-[#1c1b1b] text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50"
              >
                Accept & Start
              </button>
            )}
            {request.status === "IN_PROGRESS" && (
              <button
                disabled={loading}
                onClick={() => handleStatusChange("CONTACTED")}
                className="bg-[#1c1b1b] text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50"
              >
                Mark Contacted
              </button>
            )}
            {request.status === "CONTACTED" && (
              <button
                disabled={loading}
                onClick={() => handleStatusChange("DELIVERED")}
                className="bg-[#1c1b1b] text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50"
              >
                Mark Delivered
              </button>
            )}
            {request.status === "DELIVERED" && (
              <button
                disabled={loading}
                onClick={() => handleStatusChange("COMPLETED")}
                className="bg-[#a1824a] text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase transition-all disabled:opacity-50"
              >
                Finalize Transaction
              </button>
            )}
            {request.status !== "CANCELLED" &&
              request.status !== "COMPLETED" && (
                <button
                  disabled={loading}
                  onClick={handleCancelRequest}
                  className="px-8 py-4 border border-red-200 text-red-500 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-red-50 transition-all text-center"
                >
                  Cancel Request
                </button>
              )}
            <button
              onClick={onClose}
              className="px-8 py-4 border border-outline-variant/30 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/5 transition-all text-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────
function OrderDetailModal({
  item,
  onClose,
  onRefresh,
}: {
  item: any;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    const res = await (
      await import("@/app/actions/data")
    ).updateOrderStatus(item.orderId, newStatus);
    if (res.success) {
      onRefresh();
      onClose();
    }
    setUpdating(false);
  };

  const handleDeleteOrder = async () => {
    if (
      !confirm(
        "DANGER: This will permanently remove this item from the order record. If it is the last item, the order will be expunged. Continue?",
      )
    )
      return;
    setUpdating(true);
    const res = await (
      await import("@/app/actions/data")
    ).deleteOrderItem(item.id);
    if (res.success) {
      onRefresh();
      onClose();
    }
    setUpdating(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fcf9f4] w-full max-w-2xl border border-outline-variant/20 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/15 bg-[#1c1b1b] text-[#fcf9f4]">
          <h2 className="font-headline text-lg uppercase tracking-widest font-bold">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="opacity-40 hover:opacity-100 transition-opacity p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-10 space-y-10">
          <div className="flex gap-8 border-b border-outline-variant/10 pb-8">
            <div className="w-32 h-32 bg-[#fcf9f4] shrink-0 border border-outline-variant/10 rounded-xl overflow-hidden">
              <img
                src={
                  item.product?.images?.[0] ||
                  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=300"
                }
                alt={item.product?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-1">
                    Product Details
                  </p>
                  <h3 className="font-headline text-2xl text-primary font-bold uppercase leading-tight">
                    {item.product?.title}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(item.order.status)}`}
                >
                  {item.order.status}
                </span>
              </div>
              <div className="flex gap-8 mt-4">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-1">
                    Quantity
                  </p>
                  <p className="font-label text-sm font-bold">
                    0{item.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-1">
                    Unit Value
                  </p>
                  <p className="font-label text-sm font-bold">
                    EGP {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-3">
                  Customer Details
                </p>
                <div className="space-y-2">
                  <p className="font-headline text-xl text-primary font-bold uppercase">
                    {item.order.customer.name}
                  </p>
                  <p className="text-sm font-medium text-primary/60">
                    {item.order.customer.email}
                  </p>
                  <p className="text-sm font-bold text-primary tracking-widest">
                    {item.order.customer.phone || "PHONE NOT PROVIDED"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-primary/40 mb-3">
                  Shipping Address
                </p>
                <p className="text-xs font-medium leading-relaxed uppercase tracking-tight italic bg-primary/5 p-4 border border-primary/10">
                  {item.order.customer.address ||
                    "Address Pending Verification"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {item.order.status === "PENDING" && (
              <button
                disabled={updating}
                onClick={() => handleStatusChange("PAID")}
                className="bg-[#1c1b1b] text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50"
              >
                Confirm Payment
              </button>
            )}
            {(item.order.status === "PAID" ||
              item.order.status === "PENDING") && (
              <button
                disabled={updating}
                onClick={() => handleStatusChange("SHIPPED")}
                className="border border-black text-black py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/5 transition-all disabled:opacity-50"
              >
                Mark Shipped
              </button>
            )}
            {item.order.status === "SHIPPED" && (
              <button
                disabled={updating}
                onClick={() => handleStatusChange("DELIVERED")}
                className="bg-primary text-white py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/80 transition-all disabled:opacity-50 md:col-span-1"
              >
                Confirm Delivery
              </button>
            )}
            {item.order.status !== "CANCELLED" &&
              item.order.status !== "DELIVERED" && (
                <button
                  disabled={updating}
                  onClick={() => handleStatusChange("CANCELLED")}
                  className="border border-red-200 text-red-600 py-4 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-red-50 transition-all disabled:opacity-50"
                >
                  Cancel Order
                </button>
              )}
            <button
              onClick={onClose}
              className="px-8 py-4 border border-outline-variant/30 font-label text-[9px] font-bold tracking-widest uppercase hover:bg-black/5 transition-all md:col-span-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Vendor Dashboard ───────────────────────────────────────────────────
export default function VendorDashboard() {
  const { user, loading: authLoading, openModal, logout } = useAuth();
  const [vendorData, setVendorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "catalog" | "inbox" | "custom-orders" | "orders"
  >("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const loadData = async () => {
    if (user?.id) {
      const data = await getVendorData(user.id);
      setVendorData(data);
    }
    setLoading(false); // always resolve loading, even when not logged in
  };

  useEffect(() => {
    loadData();
  }, [user, authLoading]);

  const openCreate = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(true);
  };
  const openEdit = (prod: any) => {
    setSelectedProduct(prod);
    setIsEditModalOpen(true);
  };

  const openRequest = (req: any) => {
    setSelectedRequest(req);
    setIsDetailModalOpen(true);
  };
  const openOrder = (ord: any) => {
    setSelectedOrder(ord);
    setIsOrderDetailModalOpen(true);
  };
  const handleSaved = () => {
    setIsEditModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadData();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not logged in — show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-[#1c1b1b] text-[#fcf9f4] flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-8 opacity-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1 className="font-headline text-3xl uppercase tracking-tight font-bold mb-4">
          Artisan Terminal
        </h1>
        <p className="text-[0.7rem] font-bold tracking-widest uppercase text-white/40 mb-10">
          Sign in with your vendor account to access your dashboard
        </p>
        <button
          onClick={() => openModal("login")}
          className="px-12 py-5 bg-[#fcf9f4] text-[#1c1b1b] text-[0.75rem] font-bold uppercase tracking-widest hover:bg-secondary transition-all"
        >
          Sign In
        </button>
        <Link
          href="/"
          className="mt-6 text-[0.65rem] font-bold uppercase tracking-widest opacity-30 hover:opacity-60 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    );
  }

  // Logged in but not a vendor
  if (user.role !== "VENDOR") {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center uppercase tracking-widest font-bold">
        <p className="mb-8 opacity-60">
          This area is restricted to authorized artisans only.
        </p>
        <Link href="/" className="px-8 py-4 bg-primary text-on-primary">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface font-body antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col">
      {/* Order Detail Modal */}
      {isOrderDetailModalOpen && (
        <OrderDetailModal
          item={selectedOrder}
          onClose={() => setIsOrderDetailModalOpen(false)}
          onRefresh={loadData}
        />
      )}

      {/* Product Form Modal */}
      {isEditModalOpen && (
        <ProductFormModal
          vendorId={user.id}
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-[60] bg-white/90 backdrop-blur-xl border-b border-black/5 px-4 md:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-white overflow-hidden w-9 h-9 rounded-xl flex items-center justify-center border border-black/5 shadow-sm">
              <img
                alt="Furniture Studio Logo"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=100&auto=format&fit=crop"
              />
            </div>
            <span className="font-headline text-xl tracking-tight font-bold text-black uppercase hidden sm:block">
              FURNITURE
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-4 md:px-0 bg-surface-variant/50 md:bg-transparent rounded-full p-1 md:p-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-4 py-2 rounded-full whitespace-nowrap ${activeTab === "overview" ? "bg-black text-white shadow-lg" : "text-black/40 hover:text-black"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-4 py-2 rounded-full whitespace-nowrap ${activeTab === "catalog" ? "bg-black text-white shadow-lg" : "text-black/40 hover:text-black"}`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-4 py-2 rounded-full whitespace-nowrap ${activeTab === "orders" ? "bg-black text-white shadow-lg" : "text-black/40 hover:text-black"}`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("custom-orders")}
            className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-4 py-2 rounded-full whitespace-nowrap ${activeTab === "custom-orders" ? "bg-black text-white shadow-lg" : "text-black/40 hover:text-black"}`}
          >
            Custom Orders
          </button>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              await loadData();
            }}
            className="w-10 h-10 flex items-center justify-center border border-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm"
            title="Refresh Data"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
          </button>
          <button
            onClick={logout}
            className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto p-4 md:p-0">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-outline-variant/15 p-6 gap-8 bg-surface-container-low/50">
          <div className="flex flex-col gap-2">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2">
              Vendor Tools
            </p>
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 py-2 transition-colors ${activeTab === "overview" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span className="text-[0.75rem] font-bold tracking-widest uppercase">
                Overview
              </span>
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex items-center gap-3 py-2 transition-colors ${activeTab === "catalog" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              <span className="text-[0.75rem] font-bold tracking-widest uppercase">
                My Catalog
              </span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 py-2 transition-colors ${activeTab === "orders" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="text-[0.75rem] font-bold tracking-widest uppercase">
                Orders{" "}
                <span className="ml-1 opacity-40">
                  {vendorData?.orders?.length || 0}
                </span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("custom-orders")}
              className={`flex items-center gap-3 py-2 transition-colors ${activeTab === "custom-orders" ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span className="text-[0.75rem] font-bold tracking-widest uppercase">
                Custom Orders{" "}
                <span className="ml-1 opacity-40">
                  {vendorData?.customRequests?.length || 0}
                </span>
              </span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-12 overflow-x-hidden">
          {activeTab === "overview" && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  {
                    label: "Revenue",
                    value: `EGP ${new Intl.NumberFormat().format(vendorData?.orders?.reduce((acc: number, cur: any) => acc + (cur.total || 0), 0) || 0)}`,
                    color: "bg-black text-white shadow-xl shadow-black/10",
                  },
                  {
                    label: "Orders",
                    value: vendorData?.orders?.length || 0,
                    color: "bg-surface-variant",
                  },
                  {
                    label: "Custom Orders",
                    value: vendorData?.customRequests?.length || 0,
                    color: "bg-white border border-black/5 premium-shadow",
                  },
                  {
                    label: "Inventory",
                    value: vendorData?.products?.length || 0,
                    color: "bg-surface-variant",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-8 flex flex-col justify-between min-h-[140px] rounded-2xl transition-all hover:scale-[1.02] ${stat.color}`}
                  >
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
                      {stat.label}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-headline italic font-bold tracking-tighter truncate">
                      {stat.value}
                    </h2>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="font-headline text-4xl md:text-5xl text-primary tracking-tight mb-2 uppercase">
                    Artisan Terminal
                  </h2>
                  <p className="text-on-surface-variant text-lg">
                    Welcome back,{" "}
                    {vendorData?.user?.name || vendorData?.user?.companyName}.
                    Manage your curated pieces.
                  </p>
                </div>
                <button
                  onClick={openCreate}
                  className="bg-primary text-on-primary px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all self-start md:self-end"
                >
                  + New Listing
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-surface-container-low p-8 border border-outline-variant/15">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Stock Value
                  </p>
                  <p className="font-headline text-3xl text-primary mb-2 uppercase">
                    EGP{" "}
                    {vendorData?.products
                      ?.reduce(
                        (sum: number, p: any) => sum + p.price * p.stock,
                        0,
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div className="bg-surface-container-low p-8 border border-outline-variant/15">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Catalog Pieces
                  </p>
                  <p className="font-headline text-3xl text-primary mb-2 uppercase">
                    {vendorData?.products?.length || 0}
                  </p>
                </div>
                <div className="bg-surface-container-low p-8 border border-outline-variant/15">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Product Orders
                  </p>
                  <p className="font-headline text-3xl text-primary mb-2 uppercase">
                    {vendorData?.orders?.length || 0}
                  </p>
                </div>
                <div className="bg-surface-container-low p-8 border border-outline-variant/15">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Custom Orders
                  </p>
                  <p className="font-headline text-3xl text-primary mb-2 uppercase">
                    {vendorData?.customRequests?.length || 0}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <h3 className="font-headline text-2xl text-primary uppercase mb-8 border-b border-outline-variant/20 pb-4">
                    Recent Negotiations
                  </h3>
                  <div className="flex flex-col gap-4">
                    {vendorData?.negotiations?.slice(0, 3).map((neg: any) => (
                      <div
                        key={neg.id}
                        className="bg-surface-container-lowest p-6 border border-outline-variant/15 flex flex-col sm:flex-row gap-6 items-start hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
                      >
                        <div className="w-24 h-24 bg-surface-variant shrink-0 relative overflow-hidden">
                          <img
                            alt={neg.product.title}
                            className="w-full h-full object-cover transition-all"
                            src={
                              (neg.product.images && neg.product.images[0]) ||
                              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=300"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-headline text-lg text-primary truncate uppercase tracking-tight font-bold">
                              {neg.product.title}
                            </h4>
                            <span className="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest ml-4">
                              {new Date(neg.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-on-surface-variant mb-3 line-clamp-2 leading-relaxed italic">
                            "{neg.message}"
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[0.6rem] font-bold uppercase tracking-widest text-primary border border-primary/20 px-2 py-1">
                              {neg.status}
                            </span>
                            <span className="text-[0.6rem] font-bold text-on-surface-variant uppercase tracking-widest">
                              Client: {neg.customer.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!vendorData?.negotiations ||
                      vendorData.negotiations.length === 0) && (
                      <p className="py-12 text-center text-outline uppercase tracking-widest font-bold opacity-30">
                        No active conversations yet.
                      </p>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-[#1c1b1b] p-8 border border-white/5 text-white">
                    <h3 className="font-headline text-xl text-white mb-6 uppercase italic">
                      Artisan Profile
                    </h3>
                    <div className="space-y-4">
                      <div className="border-b border-white/10 pb-4">
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                          Company
                        </p>
                        <p className="text-sm font-bold uppercase">
                          {vendorData?.user?.companyName || user.name || "—"}
                        </p>
                      </div>
                      <div className="border-b border-white/10 pb-4">
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                          Location
                        </p>
                        <p className="text-sm font-bold uppercase">
                          {vendorData?.user?.city || "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">
                          Status
                        </p>
                        <p className="text-sm font-bold uppercase text-secondary">
                          {vendorData?.user?.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CATALOG ── */}
          {activeTab === "catalog" && (
            <div>
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-headline text-4xl text-primary tracking-tight uppercase">
                  Product Catalog
                </h2>
                <button
                  onClick={openCreate}
                  className="bg-primary text-on-primary px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all"
                >
                  + Create Listing
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vendorData?.products?.map((prod: any) => (
                  <div
                    key={prod.id}
                    className="group border border-outline-variant/10 bg-surface-container-low transition-all"
                  >
                    <div className="aspect-square relative overflow-hidden bg-surface-variant">
                      <img
                        alt={prod.title}
                        className="w-full h-full object-cover transition-all duration-700"
                        src={
                          (prod.images && prod.images[0]) ||
                          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=500"
                        }
                      />
                      <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest">
                        {prod.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline text-lg text-primary uppercase tracking-tight font-bold">
                          {prod.title}
                        </h3>
                        <span className="font-bold text-primary">
                          EGP {prod.price}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mb-6 uppercase italic">
                        Stock: {prod.stock}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEdit(prod)}
                          className="flex-1 py-3 border border-outline-variant/30 text-[0.65rem] font-bold uppercase tracking-widest hover:border-primary transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="flex-1 py-3 border border-outline-variant/30 text-[0.65rem] font-bold uppercase tracking-widest text-red-500 hover:border-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!vendorData?.products ||
                  vendorData.products.length === 0) && (
                  <div className="col-span-full py-24 text-center border-2 border-dashed border-outline-variant/20">
                    <p className="text-outline uppercase tracking-widest font-bold font-headline italic text-lg opacity-40 mb-6">
                      Your catalog is empty.
                    </p>
                    <button
                      onClick={openCreate}
                      className="px-8 py-4 bg-primary text-on-primary text-[0.7rem] font-bold uppercase tracking-widest hover:bg-secondary transition-all"
                    >
                      Create Your First Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div>
              <h2 className="font-headline text-4xl text-primary tracking-tight uppercase mb-12">
                Product Orders
              </h2>
              <div className="space-y-6">
                {vendorData?.orders?.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-surface-container-low p-8 border border-outline-variant/15 flex flex-col md:flex-row justify-between gap-8 items-center group hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-6 items-center flex-1">
                      <div className="w-24 h-24 bg-surface-variant shrink-0 border border-outline-variant/10">
                        <img
                          src={
                            item.product?.images?.[0] ||
                            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=300"
                          }
                          alt={item.product?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-[0.65rem] font-bold text-outline tracking-tight uppercase">
                            Order #{item.orderId.slice(-6)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-100 text-yellow-800 px-2 py-0.5 border border-yellow-200">
                            {item.order.status.replace("_", " ")}
                          </span>
                          {item.order.status === "CANCELLED" && (
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (
                                  confirm(
                                    "Permanently delete this cancelled record?",
                                  )
                                ) {
                                  await deleteOrderItem(item.id);
                                  loadData();
                                }
                              }}
                              className="text-red-400 hover:text-red-700 transition-colors p-1"
                              title="Delete Permanently"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <h3 className="font-headline text-2xl text-primary font-bold uppercase leading-none mb-2">
                          {item.product?.title}
                        </h3>
                        <div className="flex gap-6">
                          <div>
                            <p className="text-[0.55rem] font-bold uppercase opacity-40 mb-1">
                              Quantity
                            </p>
                            <p className="text-xs font-bold">{item.quantity}</p>
                          </div>
                          <div>
                            <p className="text-[0.55rem] font-bold uppercase opacity-40 mb-1">
                              Total Price
                            </p>
                            <p className="text-xs font-bold text-primary">
                              EGP{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-64 space-y-4 border-t md:border-t-0 md:border-l border-outline-variant/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
                      <div>
                        <p className="text-[0.55rem] font-bold uppercase opacity-40 mb-2">
                          Customer Details
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-bold uppercase">
                            {item.order.customer.name}
                          </p>
                          <p className="text-[10px] font-medium opacity-60">
                            {item.order.customer.email}
                          </p>
                          <p className="text-[10px] font-bold tracking-tighter uppercase line-clamp-1">
                            {item.order.customer.address || "Address Pending"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-4">
                        <button
                          onClick={() => openOrder(item)}
                          className="w-full bg-black text-white py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-primary transition-all font-bold"
                        >
                          View Details & Update
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!vendorData?.orders || vendorData.orders.length === 0) && (
                  <div className="py-24 text-center border-2 border-dashed border-outline-variant/20">
                    <p className="text-outline uppercase tracking-widest font-bold font-headline italic text-lg opacity-40">
                      No listed product orders yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CUSTOM ORDERS ── */}
          {activeTab === "custom-orders" && (
            <div>
              <h2 className="font-headline text-4xl text-primary tracking-tight uppercase mb-12">
                Custom Orders
              </h2>
              <div className="space-y-6">
                {vendorData?.customRequests?.map((req: any) => (
                  <div
                    key={req.id}
                    className="bg-surface-container-low p-8 border border-outline-variant/15 flex flex-col md:flex-row justify-between gap-8 items-start group hover:border-primary/30 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-secondary text-on-secondary px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]">
                          {req.category}
                        </span>
                        <span className="text-[0.6rem] font-bold text-outline tracking-widest uppercase italic">
                          Received{" "}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                        {req.status === "CANCELLED" && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  "Permanently delete this cancelled request?",
                                )
                              ) {
                                await deleteCustomRequest(req.id);
                                loadData();
                              }
                            }}
                            className="text-red-400 hover:text-red-700 transition-colors p-1"
                            title="Delete Permanently"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        )}
                        {req.status !== "PENDING" &&
                          req.status !== "CANCELLED" && (
                            <span
                              className={`px-2 py-0.5 text-[8px] font-bold border uppercase tracking-widest ${getStatusColor(req.status)}`}
                            >
                              {req.status.replace("_", " ")}
                            </span>
                          )}
                      </div>
                      <p className="text-xl font-headline text-primary font-bold uppercase mb-4 leading-tight">
                        {req.material || "Standard"} Custom {req.category}
                      </p>
                      <p className="text-sm text-on-surface-variant italic mb-6 leading-relaxed">
                        "{req.message || "No description provided."}"
                      </p>
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-outline mb-1">
                            Dimensions
                          </p>
                          <p className="text-xs font-bold">
                            {req.length}×{req.width}×{req.height} cm
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-outline mb-1">
                            Material
                          </p>
                          <p className="text-xs font-bold uppercase">
                            {req.material || "Standard"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-outline mb-1">
                            Customer
                          </p>
                          <p className="text-xs font-bold">
                            {req.customer.name}
                          </p>
                          <p className="text-[0.6rem] opacity-60">
                            {req.customer.email}
                          </p>
                          {req.customer.phone && (
                            <p className="text-[0.6rem] opacity-60">
                              {req.customer.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
                      <button
                        onClick={() => openRequest(req)}
                        className="bg-primary text-on-primary px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-all font-bold"
                      >
                        VIEW DETAILS & START
                      </button>
                    </div>
                  </div>
                ))}
                {(!vendorData?.customRequests ||
                  vendorData.customRequests.length === 0) && (
                  <p className="py-24 text-center text-outline uppercase tracking-widest font-bold font-headline italic opacity-30">
                    No client requests yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {isDetailModalOpen && (
            <RequestDetailModal
              request={selectedRequest}
              onClose={() => setIsDetailModalOpen(false)}
              onRefresh={loadData}
            />
          )}

          {isOrderDetailModalOpen && (
            <OrderDetailModal
              item={selectedOrder}
              onClose={() => setIsOrderDetailModalOpen(false)}
              onRefresh={loadData}
            />
          )}

          {isEditModalOpen && (
            <ProductFormModal
              product={selectedProduct}
              vendorId={user.id}
              onClose={() => setIsEditModalOpen(false)}
              onSaved={handleSaved}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1c1c19] text-[#fcf9f4] w-full py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5">
        <div className="flex flex-col items-start gap-2">
          <span className="font-headline text-[#fcf9f4] italic text-2xl tracking-tighter font-bold uppercase">
            FURNITURE STUDIO
          </span>
          <p className="font-body text-[0.7rem] tracking-widest uppercase text-[#c4c7c7] font-bold">
            © 2025 FURNITURE STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
        <p className="font-label text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase">
          Based in Damietta, Shipping Globally.
        </p>
      </footer>
    </div>
  );
}
