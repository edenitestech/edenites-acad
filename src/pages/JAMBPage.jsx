// src/pages/JAMBPage.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JAMBContainer = styled.div`
  display: flex;
  min-height: 100vh;
  margin-top: 4rem;
  background: #f8fafc;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2b5876;
  color: white;
  padding: 1.5rem 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;


const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 0.5rem;
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: ${props => props.$active ? '#4CAF50' : 'rgba(255, 255, 255, 0.8)'}; 
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: ${props => props.$active ? '600' : 'normal'};
  background: ${props => props.$active ? 'rgba(76, 175, 80, 0.1)' : 'transparent'}; 
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2b5876;
  font-size: 2rem;
  margin: 0;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #48bb99;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  color: #2b5876;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;

const CardDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

const CardButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  
  &:hover {
    background: #3d8b40;
  }
`;

const ExamSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ExamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ExamTitle = styled.h2`
  margin: 0;
  color: #2b5876;
`;

const ExamControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const ExamButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  background: ${props => props.primary ? '#4CAF50' : '#e2f5ea'};
  color: ${props => props.primary ? 'white' : '#4CAF50'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? '#3d8b40' : '#d0ebda'};
  }
`;

const QuestionItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 3px solid ${props => props.answered ? '#4CAF50' : '#e5e7eb'};
  background: ${props => props.active ? '#f9f9f9' : 'transparent'};
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  text-align: left;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: ${props => {
    if (props.showAnswer) {
      if (props.correct) return '#4CAF50';
      if (props.selected && !props.correct) return '#f44336';
    }
    return props.selected ? '#e2f5ea' : 'white';
  }};
  color: ${props => {
    if (props.showAnswer && (props.correct || (props.selected && !props.correct))) return 'white';
    return '#1f2937';
  }};
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => !props.showAnswer && '#4CAF50'};
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ScoreText = styled.h2`
  color: #2b5876;
  margin-bottom: 1rem;
`;

const TimeText = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
`;

// Skeleton components
const SkeletonCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
`;

const SkeletonQuestion = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
`;


const JAMBPage = () => {
  // Sidebar navigation state
  const [activeTab, setActiveTab] = useState('practice-questions');
  
  // All JAMB subjects - memoized to prevent re-renders
  const subjects = useMemo(() => [
    { name: 'English Language', topics: 30, duration: '45 hours' },
    { name: 'Mathematics', topics: 25, duration: '40 hours' },
    { name: 'Biology', topics: 32, duration: '55 hours' },
    { name: 'Chemistry', topics: 26, duration: '48 hours' },
    { name: 'Physics', topics: 28, duration: '50 hours' },
    { name: 'Literature in English', topics: 18, duration: '33 hours' },
    { name: 'Government', topics: 23, duration: '35 hours' },
    { name: 'Economics', topics: 22, duration: '38 hours' },
    { name: 'Geography', topics: 16, duration: '34 hours' },
    { name: 'Christian Religious Studies (CRS)', topics: 33, duration: '52 hours' },
    { name: 'Islamic Religious Studies (IRS)', topics: 33, duration: '52 hours' },
    { name: 'Agricultural Science', topics: 24, duration: '42 hours' },
    { name: 'Commerce', topics: 41, duration: '32 hours' },
    { name: 'Principles of Accounts', topics: 20, duration: '36 hours' },
    { name: 'History', topics: 19, duration: '34 hours' },
    { name: 'Fine Arts', topics: 15, duration: '30 hours' },
    { name: 'French', topics: 17, duration: '30 hours' },
    { name: 'Arabic', topics: 20, duration: '30 hours' },
    { name: 'Igbo', topics: 18, duration: '28 hours' },
    { name: 'Yoruba', topics: 18, duration: '28 hours' },
    { name: 'Hausa', topics: 18, duration: '28 hours' },
    { name: 'Music', topics: 14, duration: '25 hours' },
    { name: 'Home Economics', topics: 20, duration: '18 hours' },
    { name: 'Further Mathematics', topics: 20, duration: '26 hours' },
    { name: 'Computer Science', topics: 22, duration: '33 hours' },
    { name: 'Data Processing', topics: 22, duration: '24 hours' }
  ], []);


  // Practice questions data - memoized to prevent re-renders
  const allPracticeQuestions = useMemo(() => [  
    // Further Mathematics
    {
      question: "If z = 3 + 4i, what is the modulus of z?",
      options: ["5", "7", "12", "25"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "The derivative of ln(x) is?",
      options: ["1/x", "x", "e^x", "0"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "What is the integral of e^x dx?",
      options: ["e^x + C", "ln(x) + C", "x^2/2 + C", "1/x + C"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "If A is a 2×2 matrix with determinant 4, what is det(3A)?",
      options: ["12", "24", "36", "48"],
      correctAnswer: 2,
      subject: "Further Mathematics"
    },
    {
      question: "The solution to dy/dx = y is?",
      options: ["y = Ce^x", "y = Cx", "y = Cx^2", "y = C/x"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "What is the value of i^3 where i = √-1?",
      options: ["1", "-1", "i", "-i"],
      correctAnswer: 3,
      subject: "Further Mathematics"
    },
    {
      question: "The partial fraction decomposition of 1/(x^2 - 1) is?",
      options: ["1/(x-1) - 1/(x+1)", "1/(x+1) - 1/(x-1)", "1/(x-1) + 1/(x+1)", "1/(x-1)^2"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "If a = 2i + 3j and b = 5i - j, what is a·b?",
      options: ["7", "10", "13", "17"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "The general solution to d²y/dx² + y = 0 is?",
      options: ["y = Ae^x + Be^-x", "y = A sin x + B cos x", "y = Ax + B", "y = A ln x + B"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "What is the Laplace transform of f(t) = t?",
      options: ["1/s", "1/s^2", "s", "s^2"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "The inverse of the matrix [[2,3],[1,2]] is?",
      options: ["[[2,-3],[-1,2]]", "[[-2,3],[1,-2]]", "[[2,3],[1,2]]", "[[1,0],[0,1]]"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "The polar form of the complex number 1 + i is?",
      options: ["√2(cos π/4 + i sin π/4)", "2(cos π/4 + i sin π/4)", "√2(cos π/2 + i sin π/2)", "2(cos π/2 + i sin π/2)"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "What is the value of ∫(0 to π/2) sin x dx?",
      options: ["0", "1", "π/2", "π"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "The solution set of |2x - 3| < 5 is?",
      options: ["x < 4", "x > -1", "-1 < x < 4", "x < -1 or x > 4"],
      correctAnswer: 2,
      subject: "Further Mathematics"
    },
    {
      question: "If z = 2(cos 60° + i sin 60°), what is z^3?",
      options: ["8i", "8", "-8i", "-8"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "The derivative of sin(2x) is?",
      options: ["2 cos(2x)", "cos(2x)", "-2 cos(2x)", "-cos(2x)"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    {
      question: "What is the rank of the matrix [[1,2],[2,4]]?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "The solution to the differential equation dy/dx = x/y is?",
      options: ["y = Ce^x", "y^2 = x^2 + C", "y = Cx", "y = C/x"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "The value of lim(x→0) (sin x)/x is?",
      options: ["0", "1", "∞", "Undefined"],
      correctAnswer: 1,
      subject: "Further Mathematics"
    },
    {
      question: "If A and B are mutually exclusive events, P(A∪B) = ?",
      options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) - P(B)", "P(A)/P(B)"],
      correctAnswer: 0,
      subject: "Further Mathematics"
    },
    
    // Economics questions
    {
      question: "Demand curve usually slopes?",
      options: ["Upward", "Downward", "Vertically", "Horizontally"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The basic economic problem is?",
      options: ["Inflation", "Scarcity", "Poverty", "Unemployment"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The basic economic problem is?",
      options: ["Unemployment", "Scarcity", "Inflation", "Poverty"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "Which of these is NOT a factor of production?",
      options: ["Land", "Labor", "Money", "Entrepreneurship"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "The law of demand states that?",
      options: ["Price and demand are directly proportional", "Price and demand are inversely proportional", "Demand is independent of price", "Price determines supply"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "GDP stands for?",
      options: ["Gross Domestic Product", "General Demand Price", "Government Development Plan", "Gross Development Percentage"],
      correctAnswer: 0,
      subject: "Economics"
    },
    {
      question: "Which of these is a characteristic of perfect competition?",
      options: ["Many buyers and sellers", "Product differentiation", "Barriers to entry", "Price controls"],
      correctAnswer: 0,
      subject: "Economics"
    },
    {
      question: "The Central Bank's function does NOT include?",
      options: ["Issuing currency", "Banker to government", "Accepting deposits from public", "Controlling money supply"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "Inflation caused by excess demand is called?",
      options: ["Cost-push inflation", "Demand-pull inflation", "Structural inflation", "Imported inflation"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The opportunity cost of a decision is?",
      options: ["The monetary cost", "The next best alternative foregone", "The total time spent", "The implicit cost"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "Which organization is known as the 'lender of last resort'?",
      options: ["Commercial banks", "Stock exchange", "Central bank", "World Bank"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "A progressive tax system means?",
      options: ["Tax rate decreases as income increases", "Tax rate increases as income increases", "Same tax rate for all income levels", "No taxes on low incomes"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The economic system where resources are allocated by both government and market forces is?",
      options: ["Capitalism", "Socialism", "Mixed economy", "Traditional economy"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "Which of these is NOT a function of money?",
      options: ["Medium of exchange", "Store of value", "Standard for deferred payment", "Determiner of taste"],
      correctAnswer: 3,
      subject: "Economics"
    },
    {
      question: "The reward for entrepreneurship is?",
      options: ["Interest", "Rent", "Profit", "Wages"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "A country's balance of payments includes?",
      options: ["Only visible trade", "Only invisible trade", "Both visible and invisible trade", "Only capital transactions"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "The Malthusian theory relates population growth to?",
      options: ["Food supply", "Industrial output", "Technological advancement", "Education levels"],
      correctAnswer: 0,
      subject: "Economics"
    },
    {
      question: "Which of these is a direct tax?",
      options: ["Value Added Tax", "Excise duty", "Company income tax", "Sales tax"],
      correctAnswer: 2,
      subject: "Economics"
    },
    {
      question: "The price elasticity of demand for necessities is usually?",
      options: ["Elastic", "Inelastic", "Unitary elastic", "Perfectly elastic"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The Bretton Woods institutions are?",
      options: ["IMF and World Bank", "UN and WHO", "EU and AU", "OPEC and ECOWAS"],
      correctAnswer: 0,
      subject: "Economics"
    },
    {
      question: "Division of labor leads to?",
      options: ["Increased productivity", "Higher costs", "Lower quality", "Worker dissatisfaction"],
      correctAnswer: 0,
      subject: "Economics"
    },
    {
      question: "The Phillips curve shows the relationship between?",
      options: ["Inflation and unemployment", "Income and consumption", "Price and demand", "Savings and investment"],
      correctAnswer: 0,
      subject: "Economics"
    },

    // Geography questions
    {
      question: "What is the capital of Nigeria?",
      options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "Which river is the longest in Africa?",
      options: ["Niger", "Zambezi", "Nile", "Congo"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The Tropic of Cancer is located at?",
      options: ["23.5° North", "23.5° South", "0°", "66.5° North"],
      correctAnswer: 0,
      subject: "Geography"
    },
    {
      question: "The process of soil formation is called?",
      options: ["Erosion", "Weathering", "Pedogenesis", "Sedimentation"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "Which of these is NOT a greenhouse gas?",
      options: ["Carbon dioxide", "Methane", "Oxygen", "Water vapor"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The Tropic of Cancer is located at?",
      options: ["23.5°N", "23.5°S", "66.5°N", "0°"],
      correctAnswer: 0,
      subject: "Geography"
    },
    {
      question: "Which of these countries does NOT share a border with Nigeria?",
      options: ["Niger", "Cameroon", "Ghana", "Chad"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The instrument used to measure atmospheric pressure is?",
      options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "The type of rainfall common in equatorial regions is?",
      options: ["Convectional", "Orographic", "Cyclonic", "Frontal"],
      correctAnswer: 0,
      subject: "Geography"
    },
    {
      question: "The highest mountain in Africa is?",
      options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Cameroon", "Atlas Mountains"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "The process by which water changes from liquid to vapor is called?",
      options: ["Condensation", "Evaporation", "Precipitation", "Transpiration"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "Which of these rocks is sedimentary?",
      options: ["Granite", "Basalt", "Limestone", "Marble"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The capital of Burkina Faso is?",
      options: ["Bamako", "Ouagadougou", "Niamey", "Lomé"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "The largest desert in the world is?",
      options: ["Sahara", "Arabian", "Gobi", "Kalahari"],
      correctAnswer: 0,
      subject: "Geography"
    },
    {
      question: "The movement of Earth around the Sun is called?",
      options: ["Rotation", "Revolution", "Orbitation", "Circulation"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "Which of these is NOT a feature of river erosion?",
      options: ["V-shaped valley", "Waterfall", "Delta", "Oxbow lake"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The instrument used to measure wind speed is?",
      options: ["Barometer", "Hygrometer", "Anemometer", "Thermometer"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The largest ocean in the world is?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The process by which rocks are broken down in situ is called?",
      options: ["Erosion", "Weathering", "Deposition", "Transportation"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "Which of these countries is landlocked?",
      options: ["Nigeria", "Ghana", "Niger", "Cameroon"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "The layer of atmosphere closest to Earth is?",
      options: ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "The capital of South Africa is?",
      options: ["Johannesburg", "Cape Town", "Pretoria", "Durban"],
      correctAnswer: 2,
      subject: "Geography"
    },
    
    // CRK questions
    {
      question: "Which book in the Bible tells the story of Moses leading Israelites out of Egypt?",
      options: ["Genesis", "Exodus", "Leviticus", "Numbers"],
      correctAnswer: 1,
      subject: "CRK"
    },
    
    {
      question: "What miracle did Jesus perform at the wedding in Cana?",
      options: ["Healing a leper", "Raising Lazarus", "Turning water into wine", "Feeding 5,000"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Who was the first king of Israel?",
      options: ["David", "Solomon", "Saul", "Samuel"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "How many books are in the New Testament?",
      options: ["27", "39", "66", "12"],
      correctAnswer: 0,
      subject: "CRK"
    },
    {
      question: "Who betrayed Jesus?",
      options: ["Peter", "Judas Iscariot", "Thomas", "John"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "The first miracle of Jesus was?",
      options: ["Healing the blind", "Raising Lazarus", "Turning water to wine", "Walking on water"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Who wrote most of the New Testament epistles?",
      options: ["Peter", "John", "Paul", "James"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "The first martyr in the early church was?",
      options: ["Stephen", "Paul", "Peter", "John"],
      correctAnswer: 0,
      subject: "CRK"
    },
    {
      question: "Who interpreted Pharaoh's dreams in Egypt?",
      options: ["Moses", "Joseph", "Daniel", "Aaron"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "The shortest verse in the Bible is?",
      options: ["John 3:16", "Genesis 1:1", "Jesus wept", "The Lord is my shepherd"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Who built the ark?",
      options: ["Abraham", "Moses", "Noah", "David"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "The Ten Commandments were given on?",
      options: ["Mount Sinai", "Mount Zion", "Mount Carmel", "Mount of Olives"],
      correctAnswer: 0,
      subject: "CRK"
    },
    {
      question: "Who was thrown into the lions' den?",
      options: ["Joseph", "Daniel", "David", "Samuel"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "Jesus was crucified at?",
      options: ["Bethlehem", "Nazareth", "Jerusalem", "Galilee"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "The mother of Jesus was?",
      options: ["Elizabeth", "Mary Magdalene", "Mary", "Ruth"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Who baptized Jesus?",
      options: ["Peter", "John the Baptist", "Paul", "Andrew"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "The fruit of the Spirit does NOT include?",
      options: ["Love", "Joy", "Wealth", "Peace"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Who was the father of John the Baptist?",
      options: ["Zechariah", "Simeon", "Joseph", "Jacob"],
      correctAnswer: 0,
      subject: "CRK"
    },
    {
      question: "The book of Acts was written by?",
      options: ["Paul", "Luke", "John", "Peter"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "Jesus fed 5,000 people with?",
      options: ["Five loaves and two fish", "Seven loaves and three fish", "Three loaves and five fish", "Twelve baskets of food"],
      correctAnswer: 0,
      subject: "CRK"
    },
    {
      question: "Who was the disciple Jesus loved?",
      options: ["Peter", "John", "James", "Andrew"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "The last book of the Bible is?",
      options: ["Jude", "Revelation", "Malachi", "Acts"],
      correctAnswer: 1,
      subject: "CRK"
    },

    // Islamic Religious Studies
    {
      question: "How many pillars of Islam are there?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      subject: "IRS"
    },
    {
      question: "The first Khalifah after Prophet Muhammad (SAW) was?",
      options: ["Umar ibn Khattab", "Ali ibn Abi Talib", "Abu Bakr", "Uthman ibn Affan"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "Which Surah is called the 'Heart of the Quran'?",
      options: ["Al-Fatihah", "Al-Baqarah", "Yasin", "Al-Ikhlas"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "The angel who delivers revelation is?",
      options: ["Mikail", "Israfil", "Jibril", "Izrail"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "The first wife of Prophet Muhammad (SAW) was?",
      options: ["Aisha", "Khadijah", "Hafsah", "Sawdah"],
      correctAnswer: 1,
      subject: "IRS"
    },
    {
      question: "Which of these is NOT among the rightly guided Caliphs?",
      options: ["Abu Bakr", "Umar", "Ali", "Muawiyah"],
      correctAnswer: 3,
      subject: "IRS"
    },
    {
      question: "The migration of Prophet Muhammad (SAW) from Mecca to Medina is called?",
      options: ["Hajj", "Hijrah", "Jihad", "Umrah"],
      correctAnswer: 1,
      subject: "IRS"
    },
    {
      question: "The first revealed verse of the Quran begins with?",
      options: ["Bismillah", "Iqra", "Alhamdulillah", "La ilaha"],
      correctAnswer: 1,
      subject: "IRS"
    },
    {
      question: "Which of these is NOT a name of the Quran?",
      options: ["Al-Huda", "Al-Furqan", "Al-Kitab", "Al-Hadith"],
      correctAnswer: 3,
      subject: "IRS"
    },
    {
      question: "The prayer performed during eclipse is called?",
      options: ["Tahajjud", "Salatul Istisqa", "Salatul Khusuf", "Salatul Janazah"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "The Islamic month of fasting is?",
      options: ["Muharram", "Rajab", "Ramadan", "Shawwal"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "Which of these is NOT among the articles of faith?",
      options: ["Belief in Allah", "Belief in Angels", "Belief in Books", "Belief in Imams"],
      correctAnswer: 3,
      subject: "IRS"
    },
    {
      question: "The Battle of Badr occurred in which year after Hijrah?",
      options: ["1st", "2nd", "3rd", "4th"],
      correctAnswer: 1,
      subject: "IRS"
    },
    {
      question: "The first martyr in Islam was?",
      options: ["Sumayyah", "Bilal", "Hamzah", "Ali"],
      correctAnswer: 0,
      subject: "IRS"
    },
    {
      question: "The longest Surah in the Quran is?",
      options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah"],
      correctAnswer: 0,
      subject: "IRS"
    },
    {
      question: "The Islamic system of inheritance is called?",
      options: ["Zakat", "Sadaqah", "Mirath", "Waqf"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "Which of these is NOT a type of Tawheed?",
      options: ["Tawheed Rububiyyah", "Tawheed Uluhiyyah", "Tawheed Asma was-Sifat", "Tawheed Ibadah"],
      correctAnswer: 3,
      subject: "IRS"
    },
    {
      question: "The first Mu'azzin in Islam was?",
      options: ["Abu Bakr", "Umar", "Bilal", "Ali"],
      correctAnswer: 2,
      subject: "IRS"
    },
    {
      question: "The Day of Judgment is also known as?",
      options: ["Yaumul Qiyamah", "Yaumul Jumu'ah", "Yaumul Arafah", "Yaumul Mubahalah"],
      correctAnswer: 0,
      subject: "IRS"
    },
    {
      question: "Which of these is NOT among the revealed books?",
      options: ["Tawrah", "Injil", "Zabur", "Hadith"],
      correctAnswer: 3,
      subject: "IRS"
    },
    
    // Physics questions
    {
      question: "What is the SI unit of electric current?",
      options: ["Volt (V)", "Ampere (A)", "Ohm (Ω)", "Watt (W)"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["10 m/s²", "9.8 m/s²", "9.0 m/s²", "8.5 m/s²"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which law states that the angle of incidence equals the angle of reflection?",
      options: ["Snell's Law", "Boyle's Law", "Law of Reflection", "Ohm's Law"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "6.7 m/s²", "10.2 m/s²", "8.5 m/s²"],
      correctAnswer: 0,
      subject: "Physics"
    },
    {
      question: "What is the SI unit of force?",
      options: ["Pascal", "Newton", "Joule", "Watt"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which of these electromagnetic waves has the shortest wavelength?",
      options: ["Radio waves", "Microwaves", "X-rays", "Gamma rays"],
      correctAnswer: 3,
      subject: "Physics"
    },
    {
      question: "The unit of electrical resistance is?",
      options: ["Ampere", "Ohm", "Volt", "Watt"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "A convex lens always produces?",
      options: ["Real image", "Virtual image", "Magnified image", "Depends on object position"],
      correctAnswer: 3,
      subject: "Physics"
    },
    {
      question: "The principle of floatation was discovered by?",
      options: ["Isaac Newton", "Archimedes", "Galileo Galilei", "Albert Einstein"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which of these is a vector quantity?",
      options: ["Speed", "Distance", "Work", "Momentum"],
      correctAnswer: 3,
      subject: "Physics"
    },
    {
      question: "The color of light that undergoes the least deviation in a prism is?",
      options: ["Red", "Green", "Blue", "Violet"],
      correctAnswer: 0,
      subject: "Physics"
    },
    {
      question: "The process by which liquid changes to gas below boiling point is called?",
      options: ["Sublimation", "Evaporation", "Condensation", "Diffusion"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which law states that pressure is inversely proportional to volume at constant temperature?",
      options: ["Charles' Law", "Boyle's Law", "Gay-Lussac's Law", "Ohm's Law"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "The instrument used to measure atmospheric pressure is called?",
      options: ["Hydrometer", "Barometer", "Hygrometer", "Thermometer"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "The SI unit of frequency is?",
      options: ["Hertz", "Decibel", "Newton", "Pascal"],
      correctAnswer: 0,
      subject: "Physics"
    },
    {
      question: "Which of these is NOT a vector quantity?",
      options: ["Velocity", "Force", "Speed", "Displacement"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      question: "The process by which liquid changes to gas at all temperatures is called:",
      options: ["Boiling", "Evaporation", "Sublimation", "Condensation"],
      correctAnswer: 1,
      subject: "Physics"
    },

    // Biology questions
    {
      question: "Which of these is NOT a function of the kidney?",
      options: ["Excretion", "Osmoregulation", "Photosynthesis", "Homeostasis"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "Which organelle is called the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "The basic unit of life is:",
      options: ["Atom", "Cell", "Tissue", "Molecule"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which blood group is the universal donor?",
      options: ["A", "B", "AB", "O"],
      correctAnswer: 3,
      subject: "Biology"
    },
    {
      question: "The largest organ in the human body is the?",
      options: ["Liver", "Skin", "Heart", "Lung"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Photosynthesis occurs in which part of the plant cell?",
      options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which blood cells help in clotting of blood?",
      options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "Which of these is NOT a function of the liver?",
      options: ["Production of bile", "Storage of glycogen", "Production of insulin", "Detoxification"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "The structural and functional unit of the kidney is?",
      options: ["Neuron", "Nephron", "Alveolus", "Hepatocyte"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which of these is a micronutrient in plants?",
      options: ["Nitrogen", "Phosphorus", "Zinc", "Potassium"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "The part of the brain responsible for balance is?",
      options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which blood vessels carry blood away from the heart?",
      options: ["Veins", "Arteries", "Capillaries", "Venules"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "The process by which plants lose water vapor is called?",
      options: ["Transpiration", "Photosynthesis", "Respiration", "Translocation"],
      correctAnswer: 0,
      subject: "Biology"
    },
    {
      question: "Which of these is NOT a characteristic of mammals?",
      options: ["Have hair", "Warm-blooded", "Lay eggs", "Produce milk"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "The male reproductive part of a flower is called?",
      options: ["Pistil", "Stamen", "Sepal", "Petal"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which enzyme breaks down starch in the mouth?",
      options: ["Pepsin", "Amylase", "Lipase", "Trypsin"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "The process of cell division that produces gametes is called?",
      options: ["Mitosis", "Meiosis", "Binary fission", "Budding"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "The study of insects is called:",
      options: ["Ornithology", "Entomology", "Ichthyology", "Botany"],
      correctAnswer: 1,
      subject: "Biology"
    },
    
    // Mathematics questions
    {
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.12", "3.14", "3.16", "3.18"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "Solve for x: 2x - 5 = 11",
      options: ["3", "8", "6", "7"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "What is the derivative of x³?",
      options: [ "3x²", "2x³", "3x", "x²"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "Find the value of (2³ × 2²).",
      options: ["2⁵", "2⁶", "2⁷", "2⁴"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "Simplify: (5x² - 2x + 1) - (2x² + x - 3)",
      options: ["3x² - 3x + 4", "7x² - x + 2", "3x² + 3x - 2", "3x² - x - 2"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "Solve for x: 2x + 5 = 15",
      options: ["5", "7", "10", "15"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "What is the area of a circle with radius 7cm? (π = 22/7)",
      options: ["44 cm²", "154 cm²", "308 cm²", "616 cm²"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "The sum of angles in a triangle is:",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "If y = x² + 3x + 2, what is dy/dx?",
      options: ["2x + 3", "x + 3", "2x + 2", "x² + 3"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "If log₁₀2 = 0.3010, what is log₁₀5?",
      options: ["0.3010", "0.6990", "1.3010", "0.5000"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "The derivative of sin(x) is?",
      options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "What is the probability of getting a prime number when a die is rolled?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      correctAnswer: 2,
      subject: "Mathematics"
    },
    {
      question: "The solution to 2x - 3 = 7 is?",
      options: ["x = 2", "x = 5", "x = 10", "x = 4"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "If a triangle has angles 30°, 60°, and 90°, the ratio of its sides is?",
      options: ["1:1:√2", "1:√3:2", "1:2:3", "3:4:5"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "The value of 5! is?",
      options: ["20", "60", "120", "720"],
      correctAnswer: 2,
      subject: "Mathematics"
    },
    {
      question: "The sum of the interior angles of a pentagon is?",
      options: ["360°", "540°", "720°", "900°"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "If x² + 4x + 4 = 0, then x equals?",
      options: ["2", "-2", "4", "-4"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "The area of a circle with diameter 14cm is? (π = 22/7)",
      options: ["44cm²", "88cm²", "154cm²", "616cm²"],
      correctAnswer: 2,
      subject: "Mathematics"
    },
    {
      question: "The common difference in the arithmetic sequence 3, 7, 11, 15,... is?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      subject: "Mathematics"
    },
    // English/Literature questions
    {
      question: "Which of these is a figure of speech that compares two unlike things using 'like' or 'as'?",
      options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "In Literature, what is a 'protagonist'?",
      options: ["The villain", "The side character", "The main character", "The narrator"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "Who is the author of 'Things Fall Apart'?",
      options: ["Wole Soyinka", "Chinua Achebe", "Chimamanda Adichie", "Ben Okri"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Who wrote 'The Lion and the Jewel'?",
      options: ["Chinua Achebe", "Wole Soyinka", "Buchi Emecheta", "Flora Nwapa"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Which poetic device compares two things using 'like' or 'as'?",
      options: ["Metaphor", "Personification", "Simile", "Hyperbole"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "The arrangement of events in a story is called:",
      options: ["Plot", "Setting", "Theme", "Conflict"],
      correctAnswer: 0,
      subject: "Literature"
    },
    {
      question: "Which of these is NOT a type of pronoun?",
      options: ["Personal", "Possessive", "Reflexive", "Adverbial"],
      correctAnswer: 3,
      subject: "English"
    },
    {
      question: "What tense is the verb in the sentence: 'He has finished his work'?",
      options: ["Simple past", "Present perfect", "Past perfect", "Present continuous"],
      correctAnswer: 1,
      subject: "English"
    }, 
    {
      question: "The word 'quickly' is an example of:",
      options: ["Adjective", "Adverb", "Noun", "Verb"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      question: "Which of these is an example of onomatopoeia?",
      options: ["The wind howled", "As brave as a lion", "The buzzing bee", "Her smile was a mile wide"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "The repetition of consonant sounds at the beginning of words is called?",
      options: ["Assonance", "Alliteration", "Consonance", "Onomatopoeia"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Which novel begins with 'It was the best of times, it was the worst of times'?",
      options: ["Pride and Prejudice", "A Tale of Two Cities", "Great Expectations", "Oliver Twist"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "The term for a play on words is?",
      options: ["Pun", "Oxymoron", "Euphemism", "Malapropism"],
      correctAnswer: 0,
      subject: "Literature"
    },
    {
      question: "Which of these is NOT a type of poetry?",
      options: ["Sonnet", "Limerick", "Haiku", "Novella"],
      correctAnswer: 3,
      subject: "Literature"
    },
    {
      question: "The narrator who knows everything about all characters is called?",
      options: ["First person", "Second person", "Third person limited", "Third person omniscient"],
      correctAnswer: 3,
      subject: "Literature"
    },
    {
      question: "Which literary device is used in 'The stars danced playfully in the moonlit sky'?",
      options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "The main character in a story is called the?",
      options: ["Antagonist", "Protagonist", "Deuteragonist", "Tritagonist"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Which of these is a tragic flaw in a protagonist?",
      options: ["Hubris", "Nemesis", "Catharsis", "Denouement"],
      correctAnswer: 0,
      subject: "Literature"
    },
    {
      question: "The emotional release experienced by the audience of a tragedy is called?",
      options: ["Hamartia", "Catharsis", "Peripeteia", "Anagnorisis"],
      correctAnswer: 1,
      subject: "Literature"
    },
    // Government questions
    {
      question: "The legislative arm of government is responsible for:",
      options: ["Implementing laws", "Making laws", "Interpreting laws", "Enforcing laws"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "Who was the first President of Nigeria?",
      options: ["Nnamdi Azikiwe", "Tafawa Balewa", "Obafemi Awolowo", "Yakubu Gowon"],
      correctAnswer: 0,
      subject: "Government"
    },
    {
      question: "Nigeria gained independence in which year?",
      options: ["1957", "1960", "1963", "1970"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "The concept of separation of powers was propounded by:",
      options: ["Karl Marx", "Montesquieu", "John Locke", "Thomas Hobbes"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "Which organ of government interprets laws?",
      options: ["Executive", "Legislature", "Judiciary", "Electoral Commission"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "Which of these is NOT a feature of democracy?",
      options: ["Periodic elections", "Rule of law", "One-party system", "Fundamental human rights"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "The first military coup in Nigeria occurred in?",
      options: ["1960", "1966", "1975", "1983"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "The current Nigerian constitution was adopted in?",
      options: ["1960", "1979", "1999", "2010"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "Which organ of government is responsible for implementing policies?",
      options: ["Legislature", "Judiciary", "Executive", "Electoral Commission"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "The concept of rule of law was popularized by?",
      options: ["John Locke", "Thomas Hobbes", "A.V. Dicey", "Karl Marx"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "The upper legislative chamber in Nigeria is called?",
      options: ["House of Representatives", "Senate", "National Assembly", "House of Lords"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "The first executive president of Nigeria was?",
      options: ["Nnamdi Azikiwe", "Tafawa Balewa", "Shehu Shagari", "Olusegun Obasanjo"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "The Economic Community of West African States (ECOWAS) was founded in?",
      options: ["1960", "1975", "1985", "2000"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "Which of these is NOT a source of constitution?",
      options: ["Conventions", "Judicial precedents", "Public opinion", "Military decrees"],
      correctAnswer: 3,
      subject: "Government"
    },
    {
      question: "The principle of checks and balances is meant to?",
      options: ["Concentrate power", "Prevent abuse of power", "Speed up governance", "Reduce government expenditure"],
      correctAnswer: 1,
      subject: "Government"
    },
    // Chemistry Questions
    {
      question: "Which of these is a characteristic of transition metals?",
      options: ["Formation of colored compounds", "Low melting points", "Poor electrical conductivity", "Formation of acidic oxides"],
      correctAnswer: 0,
      subject: "Chemistry"
    },
    {
      question: "An atom of an element contains 17 protons. What is the element?",
      options: ["Sodium", "Chlorine", "Potassium", "Calcium"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Neon", "Hydrogen"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "Which of the following is not a property of metals?",
      options: ["High melting point", "Malleability", "Low density", "Good conductivity"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "The process of converting alkenes to alkanes is called?",
      options: ["Cracking", "Hydrogenation", "Polymerization", "Esterification"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which indicator turns yellow in acidic solutions?",
      options: ["Phenolphthalein", "Methyl orange", "Litmus paper", "Universal indicator"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The IUPAC name for CH₃CH₂OH is:",
      options: ["Methanal", "Ethanol", "Methanol", "Ethanal"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these elements has the highest electron affinity?",
      options: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The shape of a water molecule is:",
      options: ["Linear", "Tetrahedral", "Bent", "Trigonal planar"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "Which gas is produced when calcium carbonate reacts with hydrochloric acid?",
      options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Chlorine"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "The oxidation state of sulfur in H₂SO₄ is:",
      options: ["+2", "+4", "+6", "+8"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "Which of these is NOT a method of water purification?",
      options: ["Filtration", "Chlorination", "Hydrolysis", "Distillation"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "The Haber process is used to produce:",
      options: ["Sulfuric acid", "Ammonia", "Nitric acid", "Hydrochloric acid"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these is a property of bases?",
      options: ["Turn litmus red", "Taste sour", "Feel soapy", "React with metals to produce H₂"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "The chemical formula for rust is:",
      options: ["FeO", "Fe₂O₃", "Fe₃O₄", "Fe(OH)₃"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these is an example of a polysaccharide?",
      options: ["Glucose", "Sucrose", "Starch", "Fructose"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "The process of heat transfer in liquids is primarily by:",
      options: ["Conduction", "Convection", "Radiation", "Diffusion"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these metals reacts violently with cold water?",
      options: ["Iron", "Copper", "Sodium", "Zinc"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "What is the atomic number of Oxygen?",
      options: ["6", "8", "16", "10"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which gas is responsible for the brown color of smog?",
      options: ["Carbon monoxide", "Nitrogen dioxide", "Sulfur dioxide", "Methane"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The pH of a neutral solution is:",
      options: ["0", "7", "14", "10"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these elements is a halogen?",
      options: ["Sodium", "Chlorine", "Calcium", "Aluminum"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The process of converting sugar to alcohol is called:",
      options: ["Fermentation", "Distillation", "Oxidation", "Polymerization"],
      correctAnswer: 0,
      subject: "Chemistry"
    },

    // Commerce Questions
    {
      question: "The medium through which goods move from producer to consumer is called?",
      options: ["Transportation", "Communication", "Channel of distribution", "Warehousing"],
      correctAnswer: 2,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a function of money?",
      options: ["Medium of exchange", "Store of value", "Standard for deferred payment", "Determiner of taste"],
      correctAnswer: 3,
      subject: "Commerce"
    },
    {
      question: "The person who assumes risk in business is called?",
      options: ["Manager", "Entrepreneur", "Accountant", "Director"],
      correctAnswer: 1,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a type of insurance?",
      options: ["Life", "Marine", "Fire", "Savings"],
      correctAnswer: 3,
      subject: "Commerce"
    },
    {
      question: "The document that serves as evidence of payment is?",
      options: ["Invoice", "Receipt", "Debit note", "Credit note"],
      correctAnswer: 1,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a type of bank?",
      options: ["Commercial", "Merchant", "Development", "Retail"],
      correctAnswer: 3,
      subject: "Commerce"
    },
    {
      question: "The document used in international trade is?",
      options: ["Bill of exchange", "Bill of lading", "Invoice", "Receipt"],
      correctAnswer: 1,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a function of commerce?",
      options: ["Bridging the gap between producer and consumer", "Making goods available when needed", "Manufacturing of goods", "Warehousing of goods"],
      correctAnswer: 2,
      subject: "Commerce"
    },
    {
      question: "The buying and selling of goods in large quantities is called?",
      options: ["Retailing", "Wholesaling", "Shopping", "Marketing"],
      correctAnswer: 1,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT an aid to trade?",
      options: ["Banking", "Insurance", "Transport", "Production"],
      correctAnswer: 3,
      subject: "Commerce"
    },
    {
      question: "The document used to order goods from a supplier is?",
      options: ["Invoice", "Purchase order", "Receipt", "Debit note"],
      correctAnswer: 1,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a type of occupation?",
      options: ["Industrial", "Commercial", "Service", "Agricultural"],
      correctAnswer: 3,
      subject: "Commerce"
    },
    {
      question: "The process of buying, selling and distribution of goods is called?",
      options: ["Production", "Commerce", "Trade", "Marketing"],
      correctAnswer: 2,
      subject: "Commerce"
    },
    {
      question: "Which of these is NOT a feature of a partnership?",
      options: ["Limited liability", "Profit sharing", "Agreement", "Joint ownership"],
      correctAnswer: 0,
      subject: "Commerce"
    },
    {
      question: "The document that represents ownership of a company is?",
      options: ["Debenture", "Share certificate", "Bill of exchange", "Invoice"],
      correctAnswer: 1,
      subject: "Commerce"
    },

    // Computer Science
    {
      question: "Which of these is NOT a programming language?",
      options: ["Python", "Java", "HTML", "Microsoft"],
      correctAnswer: 3,
      subject: "Computer Science"
    },
    {
      question: "The brain of the computer is called?",
      options: ["RAM", "ROM", "CPU", "GPU"],
      correctAnswer: 2,
      subject: "Computer Science"
    },
    {
      question: "Which generation of computers used transistors?",
      options: ["First", "Second", "Third", "Fourth"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "The binary equivalent of decimal 10 is?",
      options: ["1010", "1001", "1100", "1111"],
      correctAnswer: 0,
      subject: "Computer Science"
    },
    {
      question: "Which of these is an example of application software?",
      options: ["Windows", "Linux", "Microsoft Word", "Android"],
      correctAnswer: 2,
      subject: "Computer Science"
    },
    {
      question: "The temporary storage area in CPU is called?",
      options: ["Hard disk", "Cache", "USB", "CD-ROM"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is NOT a network topology?",
      options: ["Star", "Bus", "Ring", "Square"],
      correctAnswer: 3,
      subject: "Computer Science"
    },
    {
      question: "The protocol used for web pages is?",
      options: ["FTP", "HTTP", "SMTP", "TCP"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is a database management system?",
      options: ["Excel", "MySQL", "Word", "PowerPoint"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "The process of finding and fixing errors in programs is called?",
      options: ["Compiling", "Debugging", "Executing", "Interpreting"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is NOT a type of computer memory?",
      options: ["RAM", "ROM", "CPU", "Cache"],
      correctAnswer: 2,
      subject: "Computer Science"
    },
    {
      question: "The inventor of the World Wide Web is?",
      options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is an example of an operating system?",
      options: ["Google Chrome", "Microsoft Excel", "Windows 10", "Adobe Photoshop"],
      correctAnswer: 2,
      subject: "Computer Science"
    },
    {
      question: "The number system with base 16 is called?",
      options: ["Binary", "Decimal", "Octal", "Hexadecimal"],
      correctAnswer: 3,
      subject: "Computer Science"
    },
    {
      question: "Which of these is NOT a computer input device?",
      options: ["Keyboard", "Mouse", "Printer", "Scanner"],
      correctAnswer: 2,
      subject: "Computer Science"
    },
    {
      question: "The process of converting high-level language to machine language is called?",
      options: ["Debugging", "Compiling", "Executing", "Interpreting"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is a volatile memory?",
      options: ["ROM", "RAM", "Hard disk", "Flash drive"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "The smallest unit of data in computer is?",
      options: ["Byte", "Bit", "Nibble", "Kilobyte"],
      correctAnswer: 1,
      subject: "Computer Science"
    },
    {
      question: "Which of these is NOT a type of computer virus?",
      options: ["Trojan", "Worm", "Spyware", "Mouse"],
      correctAnswer: 3,
      subject: "Computer Science"
    },
    {
      question: "The full meaning of URL is?",
      options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Resource Link", "Universal Resource Locator"],
      correctAnswer: 0,
      subject: "Computer Science"
    },

    // Data Processing
    {
      question: "The first stage of data processing is?",
      options: ["Input", "Output", "Processing", "Storage"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is NOT a data type?",
      options: ["Integer", "String", "Boolean", "Loop"],
      correctAnswer: 3,
      subject: "Data Processing"
    },
    {
      question: "The arrangement of data in a particular order is called?",
      options: ["Searching", "Sorting", "Merging", "Filtering"],
      correctAnswer: 1,
      subject: "Data Processing"
    },
    {
      question: "Which of these is an example of analog data?",
      options: ["Digital clock", "Thermometer", "Computer", "Smartphone"],
      correctAnswer: 1,
      subject: "Data Processing"
    },
    {
      question: "The process of checking data for accuracy is called?",
      options: ["Verification", "Validation", "Compilation", "Interpretation"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is NOT a method of data collection?",
      options: ["Interview", "Questionnaire", "Observation", "Programming"],
      correctAnswer: 3,
      subject: "Data Processing"
    },
    {
      question: "The rectangular area in Excel where data is entered is called?",
      options: ["Cell", "Row", "Column", "Sheet"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is a database model?",
      options: ["Hierarchical", "Vertical", "Circular", "Parallel"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "The process of extracting useful information from data is called?",
      options: ["Data mining", "Data processing", "Data collection", "Data verification"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is NOT a stage in data processing cycle?",
      options: ["Collection", "Input", "Manufacturing", "Output"],
      correctAnswer: 2,
      subject: "Data Processing"
    },
    {
      question: "The type of data that represents categories is called?",
      options: ["Numerical", "Categorical", "Ordinal", "Interval"],
      correctAnswer: 1,
      subject: "Data Processing"
    },
    {
      question: "Which of these is an example of DBMS software?",
      options: ["MS Word", "MS Excel", "MS Access", "MS PowerPoint"],
      correctAnswer: 2,
      subject: "Data Processing"
    },
    {
      question: "The process of removing errors from data is called?",
      options: ["Data cleaning", "Data sorting", "Data merging", "Data collection"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is NOT a data processing method?",
      options: ["Manual", "Mechanical", "Electronic", "Abstract"],
      correctAnswer: 3,
      subject: "Data Processing"
    },
    {
      question: "The process of converting raw data into meaningful information is called?",
      options: ["Data collection", "Data processing", "Data analysis", "Data presentation"],
      correctAnswer: 1,
      subject: "Data Processing"
    },
    {
      question: "Which of these is a data storage device?",
      options: ["Keyboard", "Monitor", "Hard disk", "Mouse"],
      correctAnswer: 2,
      subject: "Data Processing"
    },
    {
      question: "The type of data that can be counted is called?",
      options: ["Qualitative", "Quantitative", "Primary", "Secondary"],
      correctAnswer: 1,
      subject: "Data Processing"
    },
    {
      question: "Which of these is NOT a data presentation tool?",
      options: ["Charts", "Graphs", "Tables", "Algorithms"],
      correctAnswer: 3,
      subject: "Data Processing"
    },
    {
      question: "The process of organizing data into tables is called?",
      options: ["Tabulation", "Classification", "Verification", "Validation"],
      correctAnswer: 0,
      subject: "Data Processing"
    },
    {
      question: "Which of these is a characteristic of good information?",
      options: ["Accuracy", "Complexity", "Subjectivity", "Ambiguity"],
      correctAnswer: 0,
      subject: "Data Processing"
    },

    // Accounting Questions
    {
      question: "The left side of an account is called?",
      options: ["Credit", "Debit", "Balance", "Journal"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "Which of these is NOT a book of original entry?",
      options: ["Cash book", "Ledger", "Sales day book", "Purchase day book"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "The accounting equation is?",
      options: ["Assets = Liabilities + Capital", "Assets + Liabilities = Capital", "Assets + Capital = Liabilities", "Liabilities = Assets + Capital"],
      correctAnswer: 0,
      subject: "Accounting"
    },
    {
      question: "Which of these is a current asset?",
      options: ["Land", "Building", "Stock", "Motor vehicle"],
      correctAnswer: 2,
      subject: "Accounting"
    },
    {
      question: "The excess of current assets over current liabilities is called?",
      options: ["Working capital", "Fixed capital", "Authorized capital", "Issued capital"],
      correctAnswer: 0,
      subject: "Accounting"
    },
    {
      question: "Which of these is NOT a source document?",
      options: ["Invoice", "Receipt", "Ledger", "Cheque"],
      correctAnswer: 2,
      subject: "Accounting"
    },
    {
      question: "The process of recording transactions in the ledger is called?",
      options: ["Posting", "Journalizing", "Balancing", "Trial balance"],
      correctAnswer: 0,
      subject: "Accounting"
    },
    {
      question: "Which of these accounts has a credit balance?",
      options: ["Purchases", "Sales", "Cash", "Bank"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "The principle that states revenue should be recognized when earned is?",
      options: ["Matching", "Accrual", "Consistency", "Materiality"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "Which of these is NOT a type of error?",
      options: ["Error of omission", "Error of commission", "Error of principle", "Error of addition"],
      correctAnswer: 3,
      subject: "Accounting"
    },
    {
      question: "The book where all accounts are kept is called?",
      options: ["Journal", "Ledger", "Cash book", "Trial balance"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "Which of these is NOT a method of depreciation?",
      options: ["Straight line", "Reducing balance", "Revaluation", "Accrual"],
      correctAnswer: 3,
      subject: "Accounting"
    },
    {
      question: "Goodwill is an example of?",
      options: ["Current asset", "Fixed asset", "Intangible asset", "Liability"],
      correctAnswer: 2,
      subject: "Accounting"
    },
    {
      question: "The financial statement that shows financial position is?",
      options: ["Income statement", "Balance sheet", "Cash flow statement", "Trial balance"],
      correctAnswer: 1,
      subject: "Accounting"
    },
    {
      question: "Which of these is NOT a type of reserve?",
      options: ["General reserve", "Capital reserve", "Revenue reserve", "Fixed reserve"],
      correctAnswer: 3,
      subject: "Accounting"
    },

    // Agricultural Science
    {
      question: "Which of these is NOT a type of soil?",
      options: ["Sandy", "Clay", "Loamy", "Granite"],
      correctAnswer: 3,
      subject: "Agricultural Science"
    },
    {
      question: "The science of crop production is called?",
      options: ["Agronomy", "Horticulture", "Silviculture", "Apiculture"],
      correctAnswer: 0,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a leguminous crop?",
      options: ["Maize", "Cowpea", "Millet", "Sorghum"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "The process of removing unwanted plants from a farm is called?",
      options: ["Pruning", "Weeding", "Thinning", "Grafting"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is NOT a method of irrigation?",
      options: ["Drip", "Sprinkler", "Flooding", "Composting"],
      correctAnswer: 3,
      subject: "Agricultural Science"
    },
    {
      question: "The rearing of fish is called?",
      options: ["Apiculture", "Pisciculture", "Sericulture", "Aquaculture"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "NPK fertilizer contains?",
      options: ["Nitrogen, Phosphorus, Potassium", "Nitrogen, Potassium, Calcium", "Nickel, Phosphorus, Krypton", "Sodium, Phosphorus, Krypton"],
      correctAnswer: 0,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a storage pest?",
      options: ["Grasshopper", "Weevil", "Aphid", "Whitefly"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "The practice of growing different crops in sequence is called?",
      options: ["Monocropping", "Crop rotation", "Mixed cropping", "Intercropping"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is NOT a poultry bird?",
      options: ["Chicken", "Turkey", "Duck", "Rabbit"],
      correctAnswer: 3,
      subject: "Agricultural Science"
    },
    {
      question: "The process of transferring pollen from anther to stigma is called?",
      options: ["Germination", "Pollination", "Fertilization", "Transpiration"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a micronutrient for plants?",
      options: ["Nitrogen", "Phosphorus", "Zinc", "Potassium"],
      correctAnswer: 2,
      subject: "Agricultural Science"
    },
    {
      question: "The science of bee keeping is called?",
      options: ["Sericulture", "Apiculture", "Pisciculture", "Horticulture"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a fungal disease in plants?",
      options: ["Mosaic", "Rust", "Leaf curl", "Blight"],
      correctAnswer: 3,
      subject: "Agricultural Science"
    },
    {
      question: "The most important factor in seed germination is?",
      options: ["Light", "Water", "Wind", "Temperature"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is NOT a method of pest control?",
      options: ["Chemical", "Biological", "Cultural", "Composting"],
      correctAnswer: 3,
      subject: "Agricultural Science"
    },
    {
      question: "The part of the plant that absorbs water is?",
      options: ["Leaf", "Stem", "Root", "Flower"],
      correctAnswer: 2,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a perennial crop?",
      options: ["Maize", "Cassava", "Rice", "Yam"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },
    {
      question: "The process of converting organic matter into manure is called?",
      options: ["Composting", "Mulching", "Irrigation", "Harvesting"],
      correctAnswer: 0,
      subject: "Agricultural Science"
    },
    {
      question: "Which of these is a breed of cattle?",
      options: ["Leghorn", "White Fulani", "Yankasa", "Marshall"],
      correctAnswer: 1,
      subject: "Agricultural Science"
    },

    // French Questions
    {
      question: "How do you say 'Good morning' in French?",
      options: ["Bonjour", "Bonsoir", "Bonne nuit", "Salut"],
      correctAnswer: 0,
      subject: "French"
    },
    {
      question: "What is the French word for 'book'?",
      options: ["Stylo", "Livre", "Cahier", "Table"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "Which of these means 'Thank you' in French?",
      options: ["Pardon", "Merci", "S'il vous plaît", "Excusez-moi"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "How do you say 'I am 15 years old' in French?",
      options: ["J'ai quinze ans", "Je suis quinze ans", "J'ai cinq ans", "Je suis cinq ans"],
      correctAnswer: 0,
      subject: "French"
    },
    {
      question: "What is 'water' in French?",
      options: ["Lait", "Eau", "Vin", "Jus"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "Which of these is the correct translation for 'My name is Paul'?",
      options: ["Je m'appelle Paul", "Je suis Paul", "Mon nom est Paul", "J'ai Paul"],
      correctAnswer: 0,
      subject: "French"
    },
    {
      question: "What is the French word for 'school'?",
      options: ["École", "Maison", "Église", "Marché"],
      correctAnswer: 0,
      subject: "French"
    },
    {
      question: "How do you say 'See you tomorrow' in French?",
      options: ["Au revoir", "À demain", "À bientôt", "Bonne journée"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "Which of these means 'How are you?' in French?",
      options: ["Qui êtes-vous?", "Comment allez-vous?", "Quel âge avez-vous?", "Où habitez-vous?"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "What is the French word for 'red'?",
      options: ["Bleu", "Vert", "Rouge", "Jaune"],
      correctAnswer: 2,
      subject: "French"
    },
    {
      question: "How do you say 'I don't understand' in French?",
      options: ["Je ne sais pas", "Je ne comprends pas", "Je ne parle pas", "Je ne vois pas"],
      correctAnswer: 1,
      subject: "French"
    },
    {
      question: "Which of these is the French word for 'father'?",
      options: ["Mère", "Frère", "Père", "Soeur"],
      correctAnswer: 2,
      subject: "French"
    },
    {
      question: "What is 'Monday' in French?",
      options: ["Mardi", "Mercredi", "Lundi", "Jeudi"],
      correctAnswer: 2,
      subject: "French"
    },
    {
      question: "How do you say 'I love you' in French?",
      options: ["Je t'aime", "Je te déteste", "Je te vois", "Je te connais"],
      correctAnswer: 0,
      subject: "French"
    },
    {
      question: "Which of these means 'Where is the toilet?' in French?",
      options: ["Qui est là?", "Où est la toilette?", "Comment ça va?", "Quel heure est-il?"],
      correctAnswer: 1,
      subject: "French"
    },
  ], []);

   // Exam state
  const [examState, setExamState] = useState({
    questions: [],
    answers: {},
    submitted: false,
    score: 0,
    timeUsed: 0,
    examType: 'practice' // 'practice' or 'real'
  });

  // Loading state
  const [loading, setLoading] = useState(true);

  // Initialize exam - fixed with proper dependencies
  const startNewExam = useCallback((type = 'practice') => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const shuffled = [...allPracticeQuestions].sort(() => 0.5 - Math.random());
      setExamState({
        questions: type === 'real' ? shuffled.slice(0, 60) : shuffled.slice(0, 10),
        answers: {},
        submitted: false,
        score: 0,
        timeUsed: 0,
        examType: type
      });
      setLoading(false);
    }, 800);
  }, [allPracticeQuestions]);

  // Handle answer selection
  const handleSelectAnswer = (questionIndex, optionIndex) => {
    if (!examState.submitted) {
      setExamState(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionIndex]: optionIndex
        }
      }));
    }
  };

  // Submit exam
  const handleSubmitExam = () => {
    let score = 0;
    Object.keys(examState.answers).forEach(index => {
      const questionIndex = parseInt(index, 10);
      if (examState.answers[questionIndex] === examState.questions[questionIndex].correctAnswer) {
        score++;
      }
    });

    setExamState(prev => ({
      ...prev,
      submitted: true,
      score
    }));
  };

  // Effect to load practice questions by default - fixed with proper dependencies
  useEffect(() => {
    startNewExam('practice');
  }, [startNewExam]);

  return (
    <JAMBContainer>
      <Sidebar>
        <SidebarTitle>JAMB Navigation</SidebarTitle>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarLink 
              to='/exams/jamb' 
              $active={activeTab === 'practice-questions'} 
              onClick={() => {
                setActiveTab('practice-questions');
                startNewExam('practice');
              }}
            >
              Practice Questions
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink 
              to="#" 
              active={activeTab === 'real-exam'} 
              onClick={() => {
                setActiveTab('real-exam');
                startNewExam('real');
              }}
            >
              Take CBT Exam
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink to="#" active={activeTab === 'register-course'}>
              Register Course
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink to="#" active={activeTab === 'active-course'}>
              Active Course
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink to="#" active={activeTab === 'chat-room'}>
              Chat Room
            </SidebarLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarLink to="#" active={activeTab === 'profile'}>
              Profile
            </SidebarLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent>
        <Header>
          <Title>
            {loading ? (
              <Skeleton width={300} height={40} />
            ) : (
              <>
                {activeTab === 'practice-questions' && 'JAMB Practice Questions'}
                {activeTab === 'real-exam' && 'JAMB CBT Exam'}
                {activeTab === 'register-course' && 'Register Course'}
                {activeTab === 'active-course' && 'Active Course'}
                {activeTab === 'chat-room' && 'Chat Room'}
                {activeTab === 'profile' && 'My Profile'}
              </>
            )}
          </Title>
          <UserProfile>
            {loading ? (
              <>
                <Skeleton width={100} height={24} />
                <Skeleton circle width={40} height={40} />
              </>
            ) : (
              <>
                <UserName>John Smith</UserName>
                <UserAvatar>JS</UserAvatar>
              </>
            )}
          </UserProfile>
        </Header>

        {loading ? (
          // Skeleton loading states
          <div>
            {activeTab === 'practice-questions' && (
              <>
                <CardGrid>
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i}>
                      <Skeleton height={24} width="80%" />
                      <Skeleton height={16} width="60%" style={{ marginTop: '10px' }} />
                      <Skeleton height={36} width="100%" style={{ marginTop: '15px' }} />
                    </SkeletonCard>
                  ))}
                </CardGrid>

                <ExamSection>
                  <ExamHeader>
                    <Skeleton width={250} height={30} />
                    <Skeleton width={150} height={36} />
                  </ExamHeader>
                  
                  {[...Array(3)].map((_, i) => (
                    <SkeletonQuestion key={i}>
                      <Skeleton width="90%" height={20} style={{ marginBottom: '15px' }} />
                      {[...Array(8)].map((_, j) => (
                        <Skeleton 
                          key={j} 
                          width="100%" 
                          height={40} 
                          style={{ marginBottom: '10px' }} 
                        />
                      ))}
                    </SkeletonQuestion>
                  ))}
                  
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Skeleton width={150} height={40} />
                  </div>
                </ExamSection>
              </>
            )}
            
            {activeTab === 'real-exam' && (
              <ExamSection>
                <ExamHeader>
                  <Skeleton width={250} height={30} />
                  <Skeleton width={150} height={36} />
                </ExamHeader>
                
                <Skeleton width="70%" height={20} style={{ marginBottom: '20px' }} />
                
                {[...Array(10)].map((_, i) => (
                  <SkeletonQuestion key={i}>
                    <Skeleton width="90%" height={20} style={{ marginBottom: '15px' }} />
                    {[...Array(8)].map((_, j) => (
                      <Skeleton 
                        key={j} 
                        width="100%" 
                        height={40} 
                        style={{ marginBottom: '10px' }} 
                      />
                    ))}
                  </SkeletonQuestion>
                ))}
                
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Skeleton width={150} height={40} />
                </div>
              </ExamSection>
            )}
            
            {(activeTab !== 'practice-questions' && activeTab !== 'real-exam') && (
              <ExamSection>
                <Skeleton height={40} width={300} style={{ marginBottom: '20px' }} />
                <Skeleton height={200} />
              </ExamSection>
            )}
          </div>
        ) : (
          // Actual content when not loading
          <>
            {activeTab === 'practice-questions' && !examState.submitted && (
              <>
                <CardGrid>
                  {subjects.slice(0, 8).map((subject, index) => (
                    <Card key={index}>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.topics} topics · {subject.duration}
                      </CardDescription>
                      <CardButton onClick={() => {
                        // Filter questions by subject
                        const subjectQuestions = allPracticeQuestions.filter(
                          q => q.subject === subject.name.split(' ')[0]
                        );
                        setExamState(prev => ({
                          ...prev,
                          questions: subjectQuestions.slice(0, 10),
                          answers: {},
                          submitted: false,
                          score: 0,
                          timeUsed: 0
                        }));
                      }}>
                        Start Practice
                      </CardButton>
                    </Card>
                  ))}
                </CardGrid>

                <ExamSection>
                  <ExamHeader>
                    <ExamTitle>Mixed Practice Questions</ExamTitle>
                    <ExamControls>
                      <ExamButton onClick={() => startNewExam('practice')}>
                        New Practice
                      </ExamButton>
                    </ExamControls>
                  </ExamHeader>

                  {examState.questions.map((q, qIndex) => (
                    <QuestionItem key={qIndex} answered={examState.answers[qIndex] !== undefined}>
                      <h3>{qIndex + 1}. {q.question}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        Subject: {q.subject}
                      </p>

                      {q.options.map((option, oIndex) => (
                        <OptionButton
                          key={oIndex}
                          onClick={() => handleSelectAnswer(qIndex, oIndex)}
                          selected={examState.answers[qIndex] === oIndex}
                          showAnswer={false}
                        >
                          {String.fromCharCode(65 + oIndex)}. {option}
                        </OptionButton>
                      ))}
                    </QuestionItem>
                  ))}

                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <ExamButton primary onClick={handleSubmitExam}>
                      Submit Answers
                    </ExamButton>
                  </div>
                </ExamSection>
              </>
            )}

            {activeTab === 'real-exam' && !examState.submitted && (
              <ExamSection>
                <ExamHeader>
                  <ExamTitle>JAMB CBT Exam Simulation</ExamTitle>
                  <ExamControls>
                    <ExamButton onClick={() => startNewExam('real')}>
                      Restart Exam
                    </ExamButton>
                  </ExamControls>
                </ExamHeader>

                <p style={{ marginBottom: '1.5rem' }}>
                  This is a simulation of the real JAMB CBT exam with 60 questions. 
                  You have {examState.examType === 'real' ? '120' : '30'} minutes to complete it.
                </p>

                {examState.questions.map((q, qIndex) => (
                  <QuestionItem key={qIndex} answered={examState.answers[qIndex] !== undefined}>
                    <h3>{qIndex + 1}. {q.question}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                      Subject: {q.subject}
                    </p>

                    {q.options.map((option, oIndex) => (
                      <OptionButton
                        key={oIndex}
                        onClick={() => handleSelectAnswer(qIndex, oIndex)}
                        selected={examState.answers[qIndex] === oIndex}
                        showAnswer={false}
                      >
                        {String.fromCharCode(65 + oIndex)}. {option}
                      </OptionButton>
                    ))}
                  </QuestionItem>
                ))}

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <ExamButton primary onClick={handleSubmitExam}>
                    Submit Exam
                  </ExamButton>
                </div>
              </ExamSection>
            )}

            {(activeTab === 'practice-questions' || activeTab === 'real-exam') && examState.submitted && (
              <ExamSection>
                <ResultsContainer>
                  <ScoreText>
                    Your Score: {examState.score} / {examState.questions.length} (
                    {Math.round((examState.score / examState.questions.length) * 100)}%)
                  </ScoreText>
                  <TimeText>
                    Time Taken: {Math.floor(examState.timeUsed / 60)}m {examState.timeUsed % 60}s
                  </TimeText>
                  
                  {examState.questions.map((q, qIndex) => (
                    <QuestionItem key={qIndex} answered={examState.answers[qIndex] !== undefined}>
                      <h3>{qIndex + 1}. {q.question}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        Subject: {q.subject}
                      </p>

                      {q.options.map((option, oIndex) => (
                        <OptionButton
                          key={oIndex}
                          selected={examState.answers[qIndex] === oIndex}
                          correct={oIndex === q.correctAnswer}
                          showAnswer={true}
                          disabled
                        >
                          {String.fromCharCode(65 + oIndex)}. {option}
                          {oIndex === q.correctAnswer && (
                            <span style={{ marginLeft: '0.5rem' }}>✓ Correct</span>
                          )}
                          {examState.answers[qIndex] === oIndex && oIndex !== q.correctAnswer && (
                            <span style={{ marginLeft: '0.5rem' }}>✗ Your Answer</span>
                          )}
                        </OptionButton>
                      ))}
                    </QuestionItem>
                  ))}

                  <ExamButton 
                    primary 
                    onClick={() => startNewExam(examState.examType)}
                    style={{ marginTop: '2rem' }}
                  >
                    Try Again
                  </ExamButton>
                </ResultsContainer>
              </ExamSection>
            )}

            {activeTab === 'register-course' && (
              <ExamSection>
                <h2>Course Registration</h2>
                <p>This section will allow you to register for courses.</p>
                {/* Add course registration form here */}
              </ExamSection>
            )}

            {activeTab === 'active-course' && (
              <ExamSection>
                <h2>Active Courses</h2>
                <p>View your currently enrolled courses.</p>
                {/* Add active courses list here */}
              </ExamSection>
            )}

            {activeTab === 'chat-room' && (
              <ExamSection>
                <h2>Chat Room</h2>
                <p>Discuss with other students preparing for JAMB.</p>
                {/* Add chat interface here */}
              </ExamSection>
            )}

            {activeTab === 'profile' && (
              <ExamSection>
                <h2>My Profile</h2>
                <p>View and edit your profile information.</p>
                {/* Add profile form here */}
              </ExamSection>
            )}
          </>
        )}
      </MainContent>
    </JAMBContainer>
  );
};

export default JAMBPage;

