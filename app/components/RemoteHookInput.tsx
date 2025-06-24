"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "./utils/routes"; // Adjust path based on your setup

// Define the expected shape of an option
interface Option {
  value: string;
  label: string;
}

// Define the props interface for the Combobox component
interface RemoteComboboxProps {
  placeholder?: string;
  apiUrl: string; // Required for fetching options
  onChange?: (value: string) => void; // Emits selected value
  value?: string;
  className?: string;
  searchPlaceholder?: string; // Placeholder for search input
}

const RemoteCombobox: React.FC<RemoteComboboxProps> = ({
  placeholder = "Select an option...",
  apiUrl,
  onChange = () => {},
  value = "",
  className = "",
  searchPlaceholder = "Search options...",
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch options from apiUrl when it changes
  useEffect(() => {
    if (apiUrl) {
      setLoading(true);
      api
        .get(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch options");
          }
          return response.json();
        })
        .then((data) => {
          // Assuming data is { options: [{ value: string, label: string }] }
          // Adjust based on your API response structure
          const fetchedOptions = Array.isArray(data.options)
            ? data.options.map((item: any) => ({
                value: item.value || item.id || item.name, // Fallbacks for common field names
                label: item.label || item.name || item.value, // Fallbacks for display
              }))
            : [];
          setOptions(fetchedOptions);
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
          setOptions([]); // Clear options on error
        })
        .finally(() => setLoading(false));
    }
  }, [apiUrl]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          disabled={loading}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>
              {loading ? "Loading..." : "No options found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onChange(newValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(RemoteCombobox);