import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { saveMovie, removeMovie } from "../../api/saveMovies";

function Movie({ movie, baseUrl, imageSize, isSaved }) {
  const {
    original_title: title,
    release_date: year,
    overview: description,
    vote_average,
    vote_count: reviewCount,
    poster_path: imgSrc,
  } = movie;

  const reviewAvg = Math.round(vote_average) / 2;

  const dispatch = useDispatch();
  const handleSaveClick = () => {
    if (isSaved) {
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(saveMovie(movie));
    }
  };

  return (
    <div className="movie">
      <Card maxW="sm">
        <CardBody>
          {baseUrl && imageSize && imgSrc ? (
            <Image
              src={`${baseUrl}${imageSize}${imgSrc}`}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
          ) : null}

          <Stack align="flex-start" mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            {/* <Text>{description}</Text> */}
            <Text color="blue.600" fontSize="xl">
              {year}
            </Text>
            <Text color="blue.600" fontSize="xl">
              <span className="stars">{reviewAvg}/5 stars </span>
              <span className="reviewCount">{reviewCount} reviews</span>
            </Text>
          </Stack>

          <Divider />
          <CardFooter>
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
