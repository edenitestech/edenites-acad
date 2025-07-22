import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Flex, Heading, Text, Input, Button, 
  IconButton, Image, useBreakpointValue, 
  useDisclosure, InputGroup, InputRightElement,
  Skeleton, Fade
} from '@chakra-ui/react';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Sample course data for search suggestions
const coursesData = [
  { id: 1, title: "JAMB CBT Exam Prep", category: "CBT Exams" },
  { id: 2, title: "Leather Crafting Fundamentals", category: "Leather Crafting" },
  { id: 3, title: "Python Programming", category: "IT & Software" },
  { id: 4, title: "Fashion Design Masterclass", category: "Fashion Design" },
  { id: 5, title: "WAEC Physics Prep", category: "CBT Exams" },
  { id: 6, title: "Advanced Leather Stitching", category: "Leather Crafting" },
  { id: 7, title: "Web Development Bootcamp", category: "IT & Software" },
  { id: 8, title: "Pattern Making Essentials", category: "Fashion Design" },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Updated image URLs with more relevant images
  const images = [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // CBT Exams
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // IT & Software
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fashion Design
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",    // Leather Crafting
    "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    
  ];

  const captions = [
    "Master /CBT-Exams",
    "Develop /Tech-Skills",
    "Explore /Fashion-Design",
    "Learn /Leather-Crafting",
    "Grow /Your-Potential",
    "Maximize /Your-Opportunities",
    "Choose /Your-Career",
    "Nurture /the Talent in you"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add a ref for the search container
  const searchContainerRef = useRef(null);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const results = coursesData.filter(course => 
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        onOpen();
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
      onClose();
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle search item selection
  const handleSelectSearchItem = (course) => {
    navigate(`/courses/${course.id}`);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      minH={{ base: "auto", md: "85vh" }}
      bg="white"
      color="gray.800"
      px={{ base: 4, md: 8, lg: 16 }}
      pt={{ base: "24", md: "28" }} // Increased top padding
      pb={{ base: 12, md: 16 }} // Adjusted bottom padding
      position="relative"
    >
      {/* Content Section */}
      <Flex
        direction="column"
        maxW={{ base: "100%", md: "50%" }}
        zIndex={2}
        align={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading
          as="h1"
          size={{ base: "xl", md: "2xl", lg: "3xl" }} // Reduced sizes
          fontWeight="extrabold"
          lineHeight={{ base: "1.3", md: "1.2" }}
          mb={{ base: 4, md: 6 }}
        >
          Master Practical Skills <Box as="span" color="blue.600">For Real-World Success</Box>
        </Heading>
        
        <Text
          fontSize={{ base: "md", md: "lg" }} // Reduced sizes
          mb={8}
          maxW="600px"
          color="gray.600"
        >
          Transform your career with hands-on courses in IT, fashion, leather crafting, and exam prep.
        </Text>

        {/* Search Box */}
        <Flex 
          position="relative" 
          mb={8} 
          w="100%" 
          maxW="500px"
          flexDirection="column"
        >
          <InputGroup>
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What do you want to learn today?"
              size="lg"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              color="gray.800"
              _placeholder={{ color: "gray.500" }}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
              pr="60px"
              py={6}
              borderRadius="full"
              onFocus={onOpen}
              onBlur={() => setTimeout(() => onClose(), 200)}
            />
            <InputRightElement height="100%" width="4.5rem">
              <IconButton
                aria-label="Search courses"
                icon={<FaSearch />}
                h="90%"
                w="90%"
                colorScheme="blue"
                borderRadius="full"
                onClick={handleSearchSubmit}
              />
            </InputRightElement>
          </InputGroup>
          
          {/* Search suggestions dropdown */}
          {isOpen && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              width="100%"
              mt={2}
              bg="white"
              borderRadius="md"
              boxShadow="xl"
              zIndex="10"
              border="1px solid"
              borderColor="gray.200"
              maxHeight="300px"
              overflowY="auto"
            >
              {isLoading ? (
                <Box p={4}>
                  <Skeleton height="20px" mb={2} />
                  <Skeleton height="15px" width="80%" />
                </Box>
              ) : searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <Box
                    key={course.id} 
                    onClick={() => handleSelectSearchItem(course)}
                    px={4}
                    py={3}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                  >
                    <Text fontWeight="bold">{course.title}</Text>
                    <Text fontSize="sm" color="gray.500">{course.category}</Text>
                  </Box>
                ))
              ) : searchQuery.length > 2 ? (
                <Text px={4} py={3} color="gray.500">No courses found. Try another search term.</Text>
              ) : null}
            </Box>
          )}
        </Flex>

        {/* CTA Button */}
        <Button
          as={Link} to="/signup" 
          colorScheme="blue" 
          size="lg" 
          px={10} 
          py={6} 
          borderRadius="full" 
          fontWeight="bold"
          rightIcon={<FaArrowRight />}
          _hover={{ transform: "translateY(-3px)", boxShadow: "lg" }}
          transition="all 0.2s"
          alignSelf={{ base: "center", md: "center" }}
        >
          Join For Free
        </Button>
      </Flex>

      {/* Image Slideshow - Simplified rectangular container */}
      <Box
        position="relative"
        w={{ base: "100%", md: "45%" }}
        h={{ base: "280px", md: "380px", lg: "480px" }} // Slightly reduced height
        mt={{ base: 8, md: 0 }}
        borderRadius="xl"
        overflow="hidden"
        boxShadow="xl"
      >
        <Fade key={currentImage} in={true} transition={{ enter: { duration: 0.5 } }}>
          <Image
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Fade>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          p={6}
          textAlign="center"
        >
          <Heading size="lg" color="white">
            {captions[currentImage]}
          </Heading>
        </Box>
        
        {/* Navigation Dots */}
        <Flex
          position="absolute"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          zIndex={2}
          gap={2}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              as="button"
              w="12px"
              h="12px"
              borderRadius="full"
              bg={currentImage === index ? "blue.500" : "whiteAlpha.700"}
              onClick={() => setCurrentImage(index)}
              _hover={{ bg: "blue.400" }}
              transition="background 0.3s"
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Hero;