import * as React from "react";

import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";
export interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

function Wrapper({ children, variant = "regular" }: WrapperProps) {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
}

export default Wrapper;
