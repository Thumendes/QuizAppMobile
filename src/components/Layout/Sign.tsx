import React from "react";
import { KeyboardAvoidingView, Box, Heading, Text, Button } from "native-base";
import useDimensions from "../../hooks/useDimensions";
import { Feather } from "@expo/vector-icons";

export type SignInLayoutProps = {
  title?: string;
  sub?: string;
  onSubmit: (...props: any[]) => any;
};

const SignInLayout: React.FC<SignInLayoutProps> = ({
  title,
  sub,
  children,
  onSubmit,
}) => {
  const [height, width] = useDimensions();

  return (
    <KeyboardAvoidingView behavior="position">
      <Box
        alignItems="center"
        flexDir="column"
        justifyContent="space-between"
        h="100%"
      >
        <Box w={width * 0.8} h={height * 0.9} justifyContent="center">
          <Box py={8}>
            {title && (
              <Heading fontSize={40} fontWeight="bold">
                {title}
              </Heading>
            )}
            {sub && (
              <Text mt={2} fontSize={18}>
                {sub}
              </Text>
            )}
          </Box>

          {children}
        </Box>

        <Box bg="#dddddd" h={height * 0.1} w="100%">
          <Button
            onPress={onSubmit}
            position="absolute"
            right={8}
            top={-24}
            py={4}
            px={8}
          >
            <Feather color="#fff" name="arrow-right" size={24} />
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default SignInLayout;
