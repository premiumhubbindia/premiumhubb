"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import {
  Package,
  ShoppingCart,
  MessageSquare,
  IndianRupee,
  Trash2,
  Pencil,
  LogOut,
  Search,
} from "lucide-react";

export default function AdminPage() {

  const [loading, setLoading] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [validity, setValidity] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  const [stock, setStock] =
    useState(10);

  const [products, setProducts] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [messages, setMessages] =
    useState<any[]>([]);

  useEffect(() => {

    async function checkAdmin() {

      try {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (
          user?.email ===
          "premiumhubbindia@gmail.com"
        ) {

          setAllowed(true);

          await Promise.all([
            fetchProducts(),
            fetchOrders(),
            fetchMessages(),
          ]);

        } else {

          window.location.href =
            "/login";
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Admin Load Failed"
        );

      } finally {

        setLoading(false);
      }
    }

    checkAdmin();

  }, []);

  async function fetchProducts() {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (!error && data) {

      setProducts(data);

    } else {

      toast.error(
        "Failed To Fetch Products"
      );
    }
  }

  async function fetchOrders() {

    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (!error && data) {

      setOrders(data);
    }
  }

  async function fetchMessages() {

    const { data, error } =
      await supabase
        .from("support_messages")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (!error && data) {

      setMessages(data);
    }
  }

  async function uploadImage(
    e: any
  ) {

    const file =
      e.target.files[0];

    if (!file) return;

    const fileName =
      Date.now() +
      "-" +
      file.name;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (error) {

      toast.error(error.message);

      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setImage(publicUrl);

    toast.success(
      "Image Uploaded!"
    );
  }

  async function addProduct() {

if (
  !title ||
  !description ||
  !category ||
  !validity ||
  !price
) {

      toast.error(
        "Fill All Fields"
      );

      return;
    }

    if (editingId) {

      const { error } =
        await supabase
          .from("products")
          .update({
            title,
            description,
            category,
            validity,
            stock,
            image,
            price:
              Number(price),
          })
          .eq("id", editingId);

      if (error) {

        toast.error(error.message);

      } else {

        toast.success(
          "Product Updated!"
        );

        resetForm();

        fetchProducts();
      }

    } else {

      const { error } =
        await supabase
          .from("products")
          .insert([
            {
              title,
              description,
              category,
              validity,
              stock,
              image,
              price:
                Number(price),
            },
          ]);

      if (error) {

        toast.error(error.message);

      } else {

        toast.success(
          "Product Added!"
        );

        resetForm();

        fetchProducts();
      }
    }
  }

  async function deleteProduct(
    id: number
  ) {

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Product Deleted!"
      );

      fetchProducts();
    }
  }

  async function updateOrderStatus(
    id: number,
    status: string
  ) {

    const { error } =
      await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);

    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Order Updated!"
      );

      fetchOrders();
    }
  }

  async function deleteMessage(
    id: number
  ) {

    await supabase
      .from("support_messages")
      .delete()
      .eq("id", id);

    fetchMessages();

    toast.success(
      "Message Deleted"
    );
  }

  function editProduct(
    product: any
  ) {

    setEditingId(product.id);

    setTitle(product.title);

    setDescription(
      product.description
    );

    setCategory(
      product.category
    );

    setValidity(
      product.validity
    );

    setPrice(
      String(product.price)
    );

    setImage(product.image);

    setStock(product.stock);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {

    setEditingId(null);

    setTitle("");

    setDescription("");

    setCategory("");

    setValidity("");

    setPrice("");

    setImage("");

    setStock(10);
  }

  const totalRevenue =
    orders.reduce(
      (
        acc,
        order
      ) =>
        acc +
        Number(order.total),
      0
    );

  if (loading) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        <h1 className="text-5xl font-black text-yellow-400">

          Loading Admin...

        </h1>

      </div>

    );
  }

  if (!allowed) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        <h1 className="text-5xl font-black text-red-500">

          Access Denied

        </h1>

      </div>

    );
  }

  return (

    <div className="bg-black text-white min-h-screen p-6 md:p-10">

      {/* TOP */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">

        <div>

          <h1 className="text-5xl font-black text-yellow-400">

            Admin Dashboard ⚡

          </h1>

          <p className="text-zinc-400 mt-4">

            Manage products, orders and support messages.

          </p>

        </div>

        <button
          onClick={async () => {

            await supabase.auth.signOut();

            window.location.href =
              "/login";
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-2xl font-black flex items-center gap-3 h-fit"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

      {/* ANALYTICS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

          <Package className="text-yellow-400 mb-5" />

          <h2 className="text-zinc-400">

            Total Products

          </h2>

          <h1 className="text-5xl font-black text-yellow-400 mt-4">

            {products.length}

          </h1>

        </div>

        <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

          <ShoppingCart className="text-yellow-400 mb-5" />

          <h2 className="text-zinc-400">

            Total Orders

          </h2>

          <h1 className="text-5xl font-black text-yellow-400 mt-4">

            {orders.length}

          </h1>

        </div>

        <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

          <MessageSquare className="text-yellow-400 mb-5" />

          <h2 className="text-zinc-400">

            Support Messages

          </h2>

          <h1 className="text-5xl font-black text-yellow-400 mt-4">

            {messages.length}

          </h1>

        </div>

        <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

          <IndianRupee className="text-green-400 mb-5" />

          <h2 className="text-zinc-400">

            Revenue

          </h2>

          <h1 className="text-5xl font-black text-green-400 mt-4">

            ₹{totalRevenue}

          </h1>

        </div>

      </div>

      {/* PRODUCT FORM */}

      <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 max-w-4xl">

        <h2 className="text-3xl font-black mb-8">

          {editingId
            ? "Update Product"
            : "Add Product"}

        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="bg-zinc-800 rounded-2xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Validity"
            value={validity}
            onChange={(e) =>
              setValidity(
                e.target.value
              )
            }
            className="bg-zinc-800 rounded-2xl p-4 outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="bg-zinc-800 rounded-2xl p-4 outline-none"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                Number(
                  e.target.value
                )
              )
            }
            className="bg-zinc-800 rounded-2xl p-4 outline-none"
          />

        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mt-5 h-32 outline-none"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 rounded-2xl p-4 mt-5 outline-none"
        >

          <option value="">
            Select Category
          </option>

          <option value="OTT">
            OTT
          </option>

          <option value="Music">
            Music
          </option>

          <option value="AI Tools">
            AI Tools
          </option>

          <option value="Creativity">
            Creativity
          </option>

          <option value="Social Media">
            Social Media
          </option>

        </select>

        <input
          type="file"
          onChange={uploadImage}
          className="w-full bg-zinc-800 rounded-2xl p-4 mt-5 outline-none"
        />

        {image && (

          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-2xl mt-6"
          />

        )}

        <div className="flex gap-4 mt-8">

          <button
            onClick={addProduct}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-4 rounded-2xl font-black"
          >

            {editingId
              ? "Update Product"
              : "Add Product"}

          </button>

          {editingId && (

            <button
              onClick={resetForm}
              className="bg-red-600 hover:bg-red-700 px-8 rounded-2xl font-black"
            >

              Cancel

            </button>

          )}

        </div>

      </div>

      {/* PRODUCTS */}

      <div className="mt-24">

        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">

          <h2 className="text-4xl font-black">

            All Products

          </h2>

          <div className="relative max-w-md w-full">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-zinc-900 border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 outline-none"
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products
            .filter((product) =>
              product.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map(
              (product) => (

                <div
                  key={product.id}
                  className="bg-zinc-900 border border-yellow-500/20 rounded-3xl overflow-hidden"
                >

                  <img
                    src={
                      product.image
                    }
                    alt={
                      product.title
                    }
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-black">

                      {product.title}

                    </h2>

                    <p className="text-zinc-400 mt-4 line-clamp-3">

                      {
                        product.description
                      }

                    </p>

                    <div className="mt-5 space-y-3">

                      <p className="text-yellow-400 font-black text-3xl">

                        ₹
                        {
                          product.price
                        }

                      </p>

                      <p className="text-green-400 font-bold">

                        Stock:
                        {" "}
                        {
                          product.stock
                        }

                      </p>

                      {
                        product.stock <= 5 && (

                          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl font-bold text-sm">

                            Low Stock Warning

                          </div>

                        )
                      }

                    </div>

                    <div className="flex gap-4 mt-8">

                      <button
                        onClick={() =>
                          editProduct(
                            product
                          )
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-3"
                      >

                        <Pencil size={18} />

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-bold flex items-center justify-center gap-3"
                      >

                        <Trash2 size={18} />

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

        </div>

      </div>

      {/* ORDERS */}

      <div className="mt-24">

        <h2 className="text-4xl font-black mb-10">

          Orders

        </h2>

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-6"
            >

              <div className="flex flex-col lg:flex-row justify-between gap-8">

                <div>

                  <h3 className="text-yellow-400 font-bold text-2xl">

                    {order.user_email}

                  </h3>

                  <p className="text-zinc-300 mt-4 text-lg">

                    Total:
                    {" "}
                    ₹{order.total}

                  </p>

                  <p className="text-zinc-500 mt-3">

                    Payment ID:
                    {" "}
                    {
                      order.payment_id ||
                      "N/A"
                    }

                  </p>

                  <p className="mt-3">

                    Status:
                    {" "}

                    <span className="text-yellow-400 font-bold">

                      {order.status}

                    </span>

                  </p>

                </div>

                <div className="flex gap-3 h-fit">

                  <button
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        "Delivered"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl font-bold"
                  >

                    Delivered

                  </button>

                  <button
                    onClick={() =>
                      updateOrderStatus(
                        order.id,
                        "Cancelled"
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl font-bold"
                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* SUPPORT */}

{/* SUPPORT */}

<div className="mt-24">

  <h2 className="text-4xl font-black mb-10">

    Support Messages

  </h2>

  <div className="space-y-6">

    {messages.map((msg) => (

      <div
        key={msg.id}
        className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-6"
      >

        {/* CUSTOMER EMAIL */}

        <h3 className="text-yellow-400 font-bold text-2xl break-all">

          {msg.user_email}

        </h3>

        {/* CUSTOMER MESSAGE */}

        <div className="bg-zinc-800 rounded-2xl p-5 mt-5">

          <p className="text-zinc-300 leading-8">

            {msg.message}

          </p>

        </div>

        {/* REPLY TEXTAREA */}

        <textarea
          placeholder="Write reply to customer..."
          value={msg.reply || ""}
          onChange={(e) => {

            const updatedMessages =
              messages.map((m) =>

                m.id === msg.id
                  ? {
                      ...m,
                      reply:
                        e.target.value,
                    }
                  : m

              );

            setMessages(
              updatedMessages
            );
          }}
          className="w-full bg-zinc-800 border border-yellow-500/10 rounded-2xl p-5 mt-6 h-36 outline-none resize-none"
        />

        {/* ACTION BUTTONS */}

        <div className="flex flex-wrap gap-4 mt-6">

          {/* EMAIL REPLY */}

          <a
            href={`mailto:${msg.user_email}?subject=PremiumHubb Support Reply&body=${encodeURIComponent(
              msg.reply || ""
            )}`}
          >

            <button
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl font-black transition"
            >

              Reply By Email

            </button>

          </a>

          {/* WHATSAPP REPLY */}

          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Hello from PremiumHubb Support\n\n${msg.reply || ""}`
            )}`}
            target="_blank"
          >

            <button
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-2xl font-black transition"
            >

              Reply By WhatsApp

            </button>

          </a>

          {/* DELETE BUTTON */}

          <button
            onClick={() =>
              deleteMessage(
                msg.id
              )
            }
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-black transition"
          >

            Delete Message

          </button>

        </div>

      </div>

    ))}

  </div>

</div>
          

        </div>


  );
}