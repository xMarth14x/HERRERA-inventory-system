import { Coffee, Heart, Home, Shirt, Sparkles, Tag, type LucideIcon } from "lucide-react";

interface CategoryVisual {
  icon: LucideIcon;
  className: string;
}

const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  Fragrances: { icon: Sparkles, className: "bg-red-50 text-[#ed1b2f]" },
  Drinkware: { icon: Coffee, className: "bg-blue-50 text-[#0a43b8]" },
  Textiles: { icon: Shirt, className: "bg-teal-50 text-teal-700" },
  "Home Goods": { icon: Home, className: "bg-amber-50 text-amber-700" },
  Wellness: { icon: Heart, className: "bg-emerald-50 text-emerald-700" },
};

const DEFAULT_VISUAL: CategoryVisual = { icon: Tag, className: "bg-gray-100 text-gray-600" };

export function categoryVisual(name: string): CategoryVisual {
  return CATEGORY_VISUALS[name] ?? DEFAULT_VISUAL;
}
