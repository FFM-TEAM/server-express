import * as React from "react";

import { Box, Button, Flex, Link } from "@chakra-ui/react";

import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

function Navbar() {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button variant="link">LOGOUT</Button>
      </Flex>
    );
  }
  return (
    <Flex background="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
}

export default Navbar;
