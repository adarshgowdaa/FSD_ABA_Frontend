import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";
import logo from "./img/image.jpg";
import {
  ChakraProvider,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  Text,
  Button,
  InputRightElement,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <div className="main">
        <div className="card" >
          <ChakraProvider>
            <Card maxW="sm" style={{ margin: "auto" }}>
              <CardBody>
                <Image
                  src={logo}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />

                <Divider />
                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="yellow"
                    style={{ margin: "auto" }}
                    onClick={() => onUploadClick()}
                  >
                    Upload
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </CardFooter>
                <Stack mt="6" spacing="3">
                  <Heading size="md">Link is being generated...</Heading>
                  <Text>
                    Wait for the upload to be completed and your link will be
                    generated below.
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardBody>
                <div href={result} target="_blank">
                  {result && (
                    <InputGroup size="md">
                      <Input pr="5.5rem" type="text" value={result} />
                      <InputRightElement
                        width="4.5rem"
                        style={{ marginTop: "1.2rem", marginRight: "0.3rem" }}
                      >
                        <Button
                          h="1.75rem"
                          size="md"
                          onClick={copyHandler}
                          colorScheme="yellow"
                        >
                          Copy
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  )}
                </div>
              </CardBody>
            </Card>
          </ChakraProvider>
        </div>
      </div>
    </>
  );
}

export default App;
