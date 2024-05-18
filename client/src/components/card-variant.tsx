import { CardVariantProps } from "@/types";

export const CardVariant = ({ variant }: CardVariantProps) => (
  <div className="text-gray-600 tracking-wide font-medium text-xs uppercase mt-8 mx-5">
    {variant}
  </div>
);
