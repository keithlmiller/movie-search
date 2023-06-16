import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";
import { saveMovie, removeMovie } from "../../api/saveMovies";

function Movie({ movie, baseUrl, imageSize, isSaved }) {
  const {
    title,
    release_date: year,
    overview: description,
    vote_average,
    vote_count: reviewCount,
    poster_path: imgSrc,
  } = movie;

  const dispatch = useDispatch();
  const handleSaveClick = () => {
    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(saveMovie(movie));
    }
  };

  const reviewAvg = Math.round(vote_average) / 2;
  let releaseDate = new Date(year).getFullYear();

  return (
    <div className="movie">
      <Card maxW="sm">
        <CardBody>
          {baseUrl && imageSize && imgSrc ? (
            <Flex justify="center">
              <Image
                src={`${baseUrl}${imageSize}${imgSrc}`}
                alt={title}
                borderRadius="lg"
              />
            </Flex>
          ) : null}

          <Stack align="flex-start" mt={5} spacing={3}>
            <Heading size="md">{title}</Heading>
            {/* <Text>{description}</Text> */}

            {!isNaN(releaseDate) && (
              <Text fontSize="lg">
                Released: {new Date(year).getFullYear()}
              </Text>
            )}
            <Flex justify="space-between" width="100%" mb={5}>
              <Text>{reviewAvg}/5 stars </Text>
              <Text>{reviewCount} reviews</Text>
            </Flex>
          </Stack>

          <Divider />
          <CardFooter justify="flex-end" px={0} pb={0}>
            <Button
              colorScheme="teal"
              variant={isSaved ? "outline" : "solid"}
              onClick={handleSaveClick}
            >
              {isSaved ? "Saved" : "Save"}
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
}

export default Movie;
