import { Flex, Button, Text, Card, CardBody, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getFrase } from "./services/norris_Api";

type FraseType = {
  fraseAnterior: string;
  fraseAtual: string;
  proximaFrase: string;
};

export const App = () => {
  const [frase, setFrase] = useState({} as FraseType);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const teste = async () => {
  //     const fraseApi = await getFrase();
  //     setFrase(fraseApi);
  //   };
  //   teste();
  // }, []);

  useEffect(() => {
    (async () => {
      nextFrase();
    })();
  }, []);

  console.log(frase);

  const nextFrase = async () => {
    if (frase.proximaFrase) {
      setFrase({
        proximaFrase: "",
        fraseAtual: frase.proximaFrase,
        fraseAnterior: frase.fraseAtual,
      });
      return;
    }
    setIsLoading(true);
    const fraseApi = await getFrase();
    setFrase({
      fraseAtual: fraseApi,
      proximaFrase: "",
      fraseAnterior: frase.fraseAtual,
    });
    setIsLoading(false);
  };

  const prevFrase = async () => {
    setFrase({
      fraseAtual: frase.fraseAnterior,
      proximaFrase: frase.fraseAtual,
      fraseAnterior: "",
    });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDir="column"
      gap={4}
      bgColor="#414245"
    >
      <Card bg="#d7d9de" maxW="80%">
        <CardBody>
          {isLoading ? <Spinner size="sm" /> : <Text>{frase.fraseAtual}</Text>}
        </CardBody>
      </Card>

      <Flex>
        <Button
          colorScheme="teal"
          size="sm"
          mr={2}
          onClick={prevFrase}
          isDisabled={!frase.fraseAnterior}
        >
          Prev
        </Button>
        <Button colorScheme="teal" size="sm" onClick={nextFrase}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
