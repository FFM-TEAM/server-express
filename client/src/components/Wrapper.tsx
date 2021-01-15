import * as React from "react";

import { Box } from "@chakra-ui/react";

export interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <Box mt={8} mx="auto" maxW="800px" w="100%">
      {children}
    </Box>
  );
}

export default Wrapper;
