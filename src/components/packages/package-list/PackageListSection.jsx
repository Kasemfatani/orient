"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const types = [
  { id: 1, name: "Economy" },
  { id: 2, name: "Luxury" },
];

const packages = [
  {
    id: 1,
    image: "/gallery/1.png",
    title: "Umrah Program – Economic Package – 10 Days",
    places: ["Makkah", "Al Madinah"],
    days: 11,
    nights: { Makkah: 4, "Al Madinah": 7 },
    type_id: 1,
    price: 2195,
    href: "/package-detail?id=1",
  },
  {
    id: 2,
    image: "/gallery/2.png",
    title: "Umrah Program – Luxury Package – 12 Days",
    places: ["Makkah", "Al Madinah"],
    days: 12,
    nights: { Makkah: 5, "Al Madinah": 7 },
    type_id: 2,
    price: 3499,
    href: "/package-detail?id=2",
  },
  {
    id: 3,
    image: "/gallery/3.png",
    title: "Umrah Program – Economic Package – 7 Days",
    places: ["Makkah", "Al Madinah"],
    days: 7,
    nights: { Makkah: 3, "Al Madinah": 4 },
    type_id: 1,
    price: 1599,
    href: "/package-detail?id=3",
  },
  {
    id: 4,
    image: "/gallery/4.png",
    title: "Umrah Program – Luxury Package – 8 Days",
    places: ["Makkah", "Al Madinah"],
    days: 8,
    nights: { Makkah: 4, "Al Madinah": 4 },
    type_id: 2,
    price: 2899,
    href: "/package-detail?id=4",
  },
];

export default function PackageListSection() {
  const [selectedTypes, setSelectedTypes] = useState(types.map(t => t.id));

  const handleTypeChange = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const filteredPackages = packages.filter((pkg) =>
    selectedTypes.includes(pkg.type_id)
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filter Sidebar */}
      <aside className="md:w-64 w-full">
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <h2 className="font-bold text-lg mb-4">Types</h2>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeChange(type.id)}
                  className="accent-[#ea9623] w-4 h-4"
                />
                <span className="text-base">{type.name}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
      {/* Packages Grid */}
      <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </section>
    </div>
  );
}

function PackageCard({ pkg }) {
  const typeName = types.find((t) => t.id === pkg.type_id)?.name || "";
  return (
    <Card className="overflow-hidden rounded-2xl shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#ea9623]">{typeName}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{pkg.title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {pkg.places.map((place) => (
            <span key={place} className="inline-flex items-center gap-1 text-sm text-gray-700">
              <svg width="16" height="16" fill="#ea9623" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              {place}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <svg width="16" height="16" fill="#ea9623" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13zm0-15H5V5h14v1z"/></svg>
            {pkg.days} Days
          </span>
          {Object.entries(pkg.nights).map(([place, nights]) => (
            <span key={place} className="flex items-center gap-1">
              <svg width="16" height="16" fill="#ea9623" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              {place}:{nights} Nights
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="block text-xs text-gray-400">Start From</span>
            <span className="font-bold text-lg text-gray-900">{pkg.price} SAR</span>
            <span className="block text-xs text-gray-400">Per Person</span>
          </div>
          <Link href={pkg.href}>
            <Button
              className="bg-[#ea9623] hover:bg-[#d1841e] text-white font-bold px-6 py-2 rounded-lg text-base"
              style={{ boxShadow: "0 2px 8px 0 #ea962344" }}
            >
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}