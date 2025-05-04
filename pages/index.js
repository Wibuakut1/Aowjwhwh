
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    nickname: "",
    type: "Personal",
    gender: "Male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(await res.text());
    setForm({ email: "", name: "", nickname: "", type: "Personal", gender: "Male" });
  };

  return (
    <div className="bg-[#0f0f1b] min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-[#1a1a2e] rounded-xl shadow-2xl p-6 w-full max-w-sm border border-pink-500">
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Registration</h2>
        <hr className="mb-4" />

        <div className="flex justify-between mb-4">
          {["Personal", "Company"].map((t) => (
            <label key={t} className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value={t}
                checked={form.type === t}
                onChange={handleChange}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-[#0f0f1b] border border-pink-500 text-pink-300 placeholder-pink-500 rounded px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-[#0f0f1b] border border-pink-500 text-pink-300 placeholder-pink-500 rounded px-3 py-2 mb-3 outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChange}
          className="w-full bg-[#0f0f1b] border border-pink-500 text-pink-300 placeholder-pink-500 rounded px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <div className="flex justify-between mb-4">
          {["Male", "Female"].map((g) => (
            <label key={g} className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={form.gender === g}
                onChange={handleChange}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>

        <p className="text-xs text-pink-200 mb-4">
          By clicking Register, you agree on our{" "}
          <a href="#" className="text-pink-400 underline hover:text-pink-300 transition">
            terms and condition
          </a>.
        </p>

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-500 transition shadow-lg shadow-pink-500/20"
        >
          Register
        </button>
      </div>
    </div>
  );
}
