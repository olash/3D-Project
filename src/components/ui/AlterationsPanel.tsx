"use client";

import { useState } from "react";

export default function AlterationsPanel() {
  const [description, setDescription] = useState("");

  return (
    <div className="border border-border rounded-xl p-6 bg-card text-card-foreground mt-4">
      <h3 className="text-xl font-semibold mb-4">Custom Alterations</h3>
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="form-checkbox text-accent rounded border-border bg-background" />
            <span>Add aerodynamic winglets</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="form-checkbox text-accent rounded border-border bg-background" />
            <span>Widen intake vents</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Additional Details</label>
          <textarea 
            className="w-full bg-background border border-border rounded-md p-2 text-sm focus:ring-accent focus:border-accent"
            rows={3}
            placeholder="Describe any other modifications..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Reference Image (Optional)</label>
          <input 
            type="file" 
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
