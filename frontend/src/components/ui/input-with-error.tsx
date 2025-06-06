"use client";

import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

type InputWithErrorProps = ComponentProps<typeof Input> & {
  error?: string;
};

export function InputWithError({ error, ...props }: InputWithErrorProps) {
  return (
    <div className="space-y-1">
      <Input {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}