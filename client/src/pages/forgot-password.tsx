import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";

function ForgotPassword({}) {
  const [complete, setComplete] = useState<boolean>(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (email) => {
          await forgotPassword(email);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account withj that email exists, we sent you can email{" "}
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);
