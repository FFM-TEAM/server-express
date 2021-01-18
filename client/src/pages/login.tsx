import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../components/InputField";
import React from "react";
import Wrapper from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

function Login() {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              로그인
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(Login);
