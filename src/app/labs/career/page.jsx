'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Badge,
  Divider,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Icon,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  useToast
} from '@chakra-ui/react';
import { 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiBriefcase,
  FiArrowRight,
  FiCheck,
  FiMail,
  FiUser,
  FiFileText
} from 'react-icons/fi';
import ContentWrapper from 'src/app/_components/layout/ContentWrapper';
import ContactForm from 'src/app/_components/features/contactForm';

const HushhLabsCareers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const jobPositions = [
    {
      id: 1,
      title: "Principal AI Research Scientist – Advanced AI Models",
      department: "Research",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$220,000 – $500,000 USD",
      experience: "10+ years",
      description: "Lead cutting-edge research projects in AI/ML, from ideation to prototyping to publication, focusing on high-impact areas such as advanced deep learning architectures, unsupervised/self-supervised learning, or reinforcement learning breakthroughs.",
      aboutRole: "As a Principal AI Research Scientist, you will spearhead research into next-generation AI models (e.g. large-scale neural networks, multimodal systems, foundation models). You will set research directions and work alongside a world-class team to invent and implement new algorithms that expand our AI's capabilities. This role is both strategic and technical – you will mentor other scientists, shape our research roadmap, and still dive into coding/prototyping to turn ideas into reality. Your work will directly influence Hushh's mission to create transformative AI.",
      responsibilities: [
        "Lead cutting-edge research projects in AI/ML, from ideation to prototyping to publication, focusing on high-impact areas (such as advanced deep learning architectures, unsupervised/self-supervised learning, or reinforcement learning breakthroughs)",
        "Invent and optimize novel algorithms and model architectures to improve performance, efficiency, and capabilities of our Super Supreme Intelligence systems",
        "Collaborate closely with engineering teams to transition research innovations into production – you'll help bridge the gap between theory and practice, ensuring our most advanced models are deployable in real-world scenarios",
        "Mentor and guide a small team of researchers and engineers, fostering a culture of curiosity, rigorous experimentation, and exceptional quality of work",
        "Stay abreast of the latest scientific developments (papers, conferences, etc.) and forge external collaborations with academia or industry as needed to accelerate our research"
      ],
      qualifications: [
        "10+ years of research experience in AI/ML (or equivalent expertise), with a PhD in Computer Science, Machine Learning, or related field. You have a strong publication record in top-tier conferences or journals, demonstrating exceptional contributions to the field",
        "Recognized expertise in one or more areas of AI (e.g. deep learning, natural language processing, computer vision, reinforcement learning). You can discuss both theoretical underpinnings and practical implementations of advanced models",
        "Proven ability to lead research teams or projects. You excel at setting a vision, executing with urgency, and guiding others to achieve ambitious goals. Prior experience as a team lead, principal scientist, or similar is a plus",
        "Strong coding and prototyping skills in languages and frameworks used in AI research (Python, C++ and PyTorch/TensorFlow, JAX, etc.). You are hands-on and able to turn mathematical ideas into working code",
        "Excellent communication skills – able to articulate complex ideas clearly and mentor junior researchers. You thrive on collaboration and knowledge-sharing in a multidisciplinary, diverse team"
      ],
      techStack: "Python, C++ (for high-performance computing), Deep Learning frameworks (PyTorch, TensorFlow, JAX), distributed computing platforms (MPI, CUDA for GPU programming)",
      interviewProcess: "After you submit your application (with a CV and a brief statement of your most exceptional research work), our team will review your background. Qualified candidates will be invited to an initial video call to discuss your experience and research vision. The main interview loop will include: 1) a deep-dive presentation of your previous research (with Q&A to assess your technical depth), 2) a collaborative problem-solving session with our scientists (tackling a conceptual research challenge together), and 3) leadership and culture fit discussions with Hushh Lab's leadership team."
    },
    {
      id: 2,
      title: "AI Research Scientist – Deep Learning and Intelligence",
      department: "Research",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$180,000 – $350,000 USD",
      experience: "3+ years",
      description: "Conduct novel research and development on our core AI algorithms and models. This is a hands-on research role where you'll be implementing and experimenting daily.",
      aboutRole: "As an AI Research Scientist, you will conduct novel research and development on our core AI algorithms and models. This is a hands-on research role (not purely theoretical) – you'll be implementing and experimenting daily. You will work on projects like improving our deep learning models' reasoning abilities, scaling training to new heights, or enabling new modalities of intelligence. You'll collaborate with other research scientists and engineers to rapidly prototype ideas and publish findings, and ultimately integrate the best discoveries into our products.",
      responsibilities: [
        "Design and execute research experiments to advance the capabilities of our AI systems – for example, exploring improvements in model architectures, training techniques (optimization algorithms, novel loss functions), or data efficiency",
        "Develop prototypes and proof-of-concept implementations for new algorithms. You will write production-quality code to test your hypotheses on our cutting-edge computing infrastructure",
        "Analyze experimental results, iterate on ideas, and report insights to the team. You will help turn raw experiment data into actionable knowledge, whether that's through internal tech talks or external publications",
        "Work closely with our applied engineering team to transition successful research outputs into real-world applications. You'll ensure that new models can be deployed efficiently and reliably",
        "Stay up-to-date with the latest research in AI (reading papers, attending conferences) and contribute creative ideas to keep Hushh at the forefront of the field"
      ],
      qualifications: [
        "3+ years of experience in AI/ML research (academia or industry) with deep expertise in areas such as neural network design, machine learning algorithms, or cognitive architectures. A Master's or PhD in a relevant field is strongly preferred (or equivalent research experience)",
        "Solid foundation in mathematics and algorithms underpinning AI (linear algebra, probability, optimization). You can understand and innovate upon complex ML concepts",
        "Demonstrated ability to write efficient code for machine learning. You are proficient in Python and frameworks like PyTorch or TensorFlow, and you can quickly implement research ideas and debugging experiments",
        "Track record of exceptional work – e.g. high-quality research publications, top competition results, or significant contributions to an AI project. You thrive on creative problem-solving and aren't afraid to venture into uncharted territory",
        "Excellent communication skills. You can clearly explain technical concepts and experimental results to both experts and non-experts"
      ],
      techStack: "Python (with PyTorch/TensorFlow), experience with distributed training (GPU clusters, HPC schedulers), data science tools (NumPy, pandas), and version control (Git)",
      interviewProcess: "Following your application (including your CV and a short description of a research project you're most proud of), we will conduct a screening interview to learn about your background and research interests. The next steps include: a technical deep-dive interview where we discuss a challenging problem in AI and assess your approach, a coding exercise (implementing a simplified version of an algorithm or model), and a presentation of prior work."
    },
    {
      id: 3,
      title: "AI Alignment Research Scientist – AI Safety and Ethics",
      department: "Research",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$170,000 – $400,000 USD",
      experience: "PhD or equivalent",
      description: "Focus on cutting-edge AI safety research, helping ensure our Super Supreme Intelligence is robust, controllable, and aligned with human ethical principles.",
      aboutRole: "As an AI Alignment Research Scientist, you will focus on the cutting-edge of AI safety research, helping ensure our Super Supreme Intelligence is robust, controllable, and aligned with human ethical principles. You will study and mitigate issues like model bias, unintended behavior, interpretability, and decision-making transparency. This role involves both theoretical work and practical experimentation – you might be proving theoretical guarantees one day and designing novel safety evaluation frameworks or user feedback loops the next.",
      responsibilities: [
        "Conduct research on AI alignment and safety techniques, such as reinforcement learning from human feedback (RLHF), adversarial robustness, interpretability methods, and fail-safe mechanisms for advanced AI",
        "Develop evaluation metrics and stress tests to probe our AI models for biases, value misalignment, or unsafe behaviors",
        "Collaborate with our core AI research and engineering teams to embed safety into the model development pipeline",
        "Stay informed about AI ethics guidelines, regulations, and societal impacts",
        "Publish and present important research findings in the AI safety/alignment community"
      ],
      qualifications: [
        "PhD or equivalent research experience in a relevant field (Machine Learning, Computer Science, Statistics, or even cross-disciplinary areas like AI Ethics, Cognitive Science)",
        "Deep knowledge of AI safety challenges and methodologies",
        "Solid programming and prototyping ability (Python preferred)",
        "Analytical and creative mindset: You excel at thinking about edge cases and 'unknown unknowns'",
        "Strong communication skills and ethical reasoning"
      ],
      techStack: "Python, ML frameworks (PyTorch, TensorFlow), data analysis (NumPy/Pandas, Jupyter notebooks)",
      interviewProcess: "The interview process begins with a review of your research portfolio or publications in AI safety/alignment. Selected candidates will have an initial interview to discuss your experience and motivation in this field. Subsequent rounds will include: a research presentation, a technical discussion with our AI researchers, and a culture/values interview."
    },
    {
      id: 4,
      title: "Machine Learning Engineer – Applied AI Systems",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$160,000 – $300,000 USD",
      experience: "5+ years",
      description: "Design, implement, and optimize the pipelines that power our AI models in production. Build robust production-grade AI services and integrate our core AI intelligence into products.",
      aboutRole: "As a Machine Learning Engineer, you will design, implement, and optimize the pipelines that power our AI models in production. This is a highly impactful role: you'll be integrating our 'Super Supreme' intelligence into various products and ensuring it performs reliably for end-users. From developing training workflows for large datasets to deploying model inference services that handle millions of requests, you will be at the core of bringing AI research to life.",
      responsibilities: [
        "Build and maintain machine learning pipelines – including data preprocessing, model training, hyperparameter tuning, evaluation, and deployment",
        "Develop robust production-grade AI services",
        "Implement integration of our core AI intelligence into products",
        "Optimize performance at every step: profile model bottlenecks (CPU/GPU usage, memory) and collaborate on improvements",
        "Continuously improve our ML engineering practices"
      ],
      qualifications: [
        "5+ years of software engineering experience with at least 3 years focused on machine learning or AI systems in production",
        "Strong programming skills in Python (for ML) and ideally one of: C++/Java/Go for systems programming",
        "Hands-on experience with ML frameworks (TensorFlow, PyTorch, or similar) and building end-to-end ML pipelines",
        "Familiarity with distributed computing and cloud services",
        "Problem-solving mindset with a focus on impact and ownership"
      ],
      techStack: "Python (Pandas, NumPy, scikit-learn), PyTorch/TensorFlow, Docker & Kubernetes, AWS or GCP, Terraform, CI/CD pipelines",
      interviewProcess: "Our interview process involves an initial coding interview, a ML system design interview, a hands-on programming exercise focused on machine learning, and finally, you'll meet with the team for a culture fit conversation."
    },
    {
      id: 5,
      title: "AI Data Engineer – Data Pipeline & Analytics",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$150,000 – $280,000 USD",
      experience: "4+ years",
      description: "Own the systems that collect, process, and manage the vast datasets used to train and evaluate our AI models. Build scalable infrastructure for data from web-scale data acquisition to efficient ETL processes.",
      aboutRole: "As an AI Data Engineer, you will own the systems that collect, process, and manage the vast datasets used to train and evaluate our AI models. This role is about building scalable infrastructure for data – from web-scale data acquisition to efficient ETL processes and databases that can handle petabytes. You'll ensure our researchers and models always have access to high-quality data when they need it.",
      responsibilities: [
        "Design and implement massive-scale data pipelines",
        "Develop and maintain our data lake and feature store",
        "Implement data quality monitoring and validation",
        "Collaborate with ML researchers to understand their data requirements",
        "Optimize data pipelines for performance and cost"
      ],
      qualifications: [
        "4+ years of experience as a Data Engineer or in a similar role building large-scale data infrastructure",
        "Strong programming skills in Python and/or Scala/Java",
        "Hands-on experience with cloud-based data ecosystems (AWS, GCP, or Azure)",
        "Familiarity with database systems – both NoSQL and SQL",
        "Detail-oriented and reliable: You take pride in building data systems that just work"
      ],
      techStack: "Apache Spark, Hadoop ecosystem, Python (with PySpark/Pandas), Airflow, AWS data services (S3, Athena, EMR, Kinesis)",
      interviewProcess: "Data Engineering candidates will start with a technical screen involving some SQL and coding problems focused on data manipulation. The next step is a system design interview, followed by a hands-on exercise with a sample dataset."
    },
    {
      id: 6,
      title: "AI Infrastructure Engineer – High-Performance Computing Systems",
      department: "Infrastructure",
      location: "Palo Alto, CA",
      type: "Full-time",
      salary: "$160,000 – $320,000 USD",
      experience: "5+ years",
      description: "Design, build, and maintain the large-scale distributed systems that underpin all of Hushh's AI efforts. Manage enormous GPU clusters, high-performance storage, and lightning-fast networks.",
      aboutRole: "As an AI Infrastructure Engineer, you will design, build, and maintain the large-scale distributed systems that underpin all of Hushh's AI efforts. Think of enormous GPU clusters, high-performance storage, and lightning-fast networks – you will be making sure all of it runs smoothly and efficiently. This role involves low-level optimization, systems engineering, and close collaboration with our ML engineers.",
      responsibilities: [
        "Architect and manage our HPC cluster for AI research",
        "Optimize system performance end-to-end",
        "Oversee our high-speed data storage and pipelines",
        "Develop automation and monitoring tools",
        "Collaborate closely with AI engineers to support new needs"
      ],
      qualifications: [
        "5+ years of experience in infrastructure, systems engineering, or devops/SRE",
        "Deep knowledge of Linux systems administration and performance tuning",
        "Experience with cluster management for compute-intensive workloads",
        "Strong programming/scripting ability in Bash and at least one language like Python or Go",
        "Familiarity with GPU computing and distributed ML training is a big plus"
      ],
      techStack: "Linux (Ubuntu) servers, Kubernetes, Terraform/Ansible, monitoring with Prometheus/Grafana, networking hardware (InfiniBand, high-speed Ethernet)",
      interviewProcess: "The interview process will assess both your systems knowledge and your problem-solving approach. It starts with a technical screening, then a deep-dive interview with our current infrastructure engineers, followed by a hands-on practical exercise."
    },
    {
      id: 7,
      title: "Site Reliability Engineer (SRE) – AI Platform Stability",
      department: "Infrastructure",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$150,000 – $270,000 USD",
      experience: "3-6 years",
      description: "Responsible for the reliability and smooth operation of Hushh's AI platforms and services. Design systems and tools that keep our services up 24/7 and quickly resolve incidents when they occur.",
      aboutRole: "As a Site Reliability Engineer, you will be responsible for the reliability and smooth operation of Hushh's AI platforms and services. You'll work on everything from monitoring the health of deployed AI APIs to refining our CI/CD pipelines and emergency response playbooks. This role is equal parts systems engineer, software developer, and firefighter.",
      responsibilities: [
        "Implement and enhance monitoring, alerting, and incident response for our AI services",
        "Develop automation scripts and tools to eliminate manual work",
        "Performance tuning and capacity planning",
        "Collaborate on CI/CD pipelines and release processes",
        "Work with security engineers to ensure our deployments and operations are secure"
      ],
      qualifications: [
        "3-6 years experience as an SRE, DevOps Engineer, or similar role managing large-scale online services",
        "Proficient in at least one programming or scripting language (Python, Go, Bash, etc.)",
        "Hands-on experience with monitoring and observability stacks",
        "Experience with containerization and orchestration (Docker, Kubernetes)",
        "Familiar with CI/CD tools and best practices"
      ],
      techStack: "Kubernetes on cloud, Terraform, Jenkins, Prometheus + Grafana, Python/Go microservices",
      interviewProcess: "The interview process includes a technical screening with a focus on troubleshooting and Linux fundamentals, then a coding/automation exercise, followed by an on-call simulation and culture fit interview."
    },
    {
      id: 8,
      title: "Full-Stack AI Product Engineer – User Applications",
      department: "Product Engineering",
      location: "Palo Alto, CA",
      type: "Full-time",
      salary: "$140,000 – $250,000 USD",
      experience: "4+ years",
      description: "Develop end-to-end features for applications that showcase our Super Supreme Intelligence. Build user-facing web applications and backend APIs that seamlessly integrate AI functionalities.",
      aboutRole: "As a Full-Stack AI Product Engineer, you will develop end-to-end features for applications that showcase our Super Supreme Intelligence. One week, you might be building a slick web interface that allows users to interact with our AI agent; the next, you might be optimizing a backend service to handle complex queries efficiently. You will take ownership of product features from concept to deployment.",
      responsibilities: [
        "Develop user-facing web applications that seamlessly integrate AI functionalities",
        "Build and maintain backend APIs and services that power these applications",
        "Collaborate with UI/UX designers to implement features that are not only functional but also delightful to use",
        "Optimize performance on both front-end and back-end",
        "Work closely with the AI team to understand the outputs and constraints of our models"
      ],
      qualifications: [
        "4+ years of experience in full-stack or software engineering roles",
        "Strong proficiency in frontend technologies: HTML5, CSS3, and JavaScript/TypeScript",
        "Solid experience in backend development: designing APIs and building services",
        "Familiarity with integrating AI/ML models or APIs into applications is a big plus",
        "Product-minded: you think from the end-user's perspective"
      ],
      techStack: "Frontend uses React + TypeScript, with Tailwind CSS, Backend is Node.js/TypeScript with Express and Python microservices, PostgreSQL and Redis, GCP with Kubernetes",
      interviewProcess: "The interview process will cover both frontend and backend skills. Expect a coding exercise, a system design interview, and a session with our designers or product managers to discuss how you approach building user-centric products."
    },
    {
      id: 9,
      title: "Product Manager – AI-Powered Products",
      department: "Product",
      location: "San Francisco Bay Area",
      type: "Full-time",
      salary: "$150,000 – $250,000 USD",
      experience: "5+ years",
      description: "Own one or more product lines that incorporate our Super Supreme Intelligence. Define product strategy, gather requirements, and coordinate execution across multidisciplinary teams.",
      aboutRole: "As a Product Manager for AI-Powered Products, you will own one or more product lines that incorporate our Super Supreme Intelligence. This could range from an AI-driven knowledge assistant, to a predictive analytics tool, to a platform enabling other developers to use our AI. Your role is to define the product strategy, gather requirements, and coordinate execution across multidisciplinary teams.",
      responsibilities: [
        "Define product vision and roadmap",
        "Gather and prioritize requirements",
        "Work hand-in-hand with engineering, research, design, and data teams to execute on the roadmap",
        "Own the product launch and iteration cycle",
        "Serve as the product's chief evangelist and quality officer"
      ],
      qualifications: [
        "5+ years of product management experience, with at least 2 years managing a technology product",
        "Strong technical acumen",
        "User-focused mindset with proven ability to translate user needs into product features",
        "Excellent communication and leadership skills",
        "Entrepreneurial and creative: You thrive in ambiguity"
      ],
      techStack: "Familiarity with agile tools (JIRA), prototyping and analytics tools (Figma, Mixpanel/Google Analytics), and basic understanding of AI/ML tooling",
      interviewProcess: "The PM interview process involves a mix of product sense evaluation, technical understanding, and leadership/collaboration assessment. You can expect a case study exercise and deep dives into your past product experience."
    },
    {
      id: 10,
      title: "MLOps Engineer – Machine Learning Operations & Deployment",
      department: "Engineering",
      location: "Palo Alto, CA",
      type: "Full-time",
      salary: "$140,000 – $260,000 USD",
      experience: "3+ years",
      description: "Design and maintain the pipelines and tools that make our machine learning workflows reproducible, scalable, and robust. Enable scientists to do their work more effectively and engineers to deploy models seamlessly.",
      aboutRole: "As an MLOps Engineer, you will design and maintain the pipelines and tools that make our machine learning workflows reproducible, scalable, and robust. This spans everything from source data versioning, experiment tracking, to model serving infrastructure. You'll be tasked with enabling our scientists to do their work more effectively and our engineers to deploy models seamlessly.",
      responsibilities: [
        "Develop and enhance our ML pipeline orchestration",
        "Implement continuous integration/continuous deployment (CI/CD) for ML models",
        "Build and maintain an experiment tracking system",
        "Manage model serving infrastructure",
        "Work on data versioning and lineage"
      ],
      qualifications: [
        "3+ years of experience in a DevOps/SRE or software engineering role with a focus on machine learning workflows",
        "Strong coding skills in Python and familiarity with one or more ML frameworks",
        "Experience with containerization and orchestration",
        "Familiarity with MLOps tools and platforms",
        "Knowledge of CI/CD pipelines and infrastructure-as-code"
      ],
      techStack: "Python, Docker, Kubernetes, CI/CD (Jenkins/GitHub Actions), MLFlow, Apache Airflow or Kubeflow, DVC for data versioning",
      interviewProcess: "The interview will include a coding test, a design interview where we ask you to outline an MLOps pipeline for a hypothetical scenario, and discussions about real experiences with ML pipelines you've improved."
    }
  ];

  // Memoize departments to avoid recalculation
  const departments = useMemo(() => {
    return [...new Set(jobPositions.map(job => job.department))];
  }, [jobPositions]);

  // Filtering logic - clean and efficient
  const filteredJobs = useMemo(() => {
    if (!jobPositions || jobPositions.length === 0) return [];
    
    return jobPositions.filter((job) => {
      // Search logic - case insensitive
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchTerm || 
                           job.title.toLowerCase().includes(searchLower) ||
                           job.description.toLowerCase().includes(searchLower) ||
                           job.department.toLowerCase().includes(searchLower) ||
                           job.location.toLowerCase().includes(searchLower);
      
      // Department filter logic
      const matchesDepartment = !filterDepartment || job.department === filterDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }, [jobPositions, searchTerm, filterDepartment]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  const handleSubmitApplication = () => {
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest in joining Hushh Labs. We'll review your application and get back to you soon.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <ContentWrapper>
      <Box minH="100vh" bg="white">
        {/* Hero Section */}
        <Container maxW="7xl" pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 24 }}>
          <VStack spacing={{ base: 8, md: 12 }} textAlign="center" mb={{ base: 16, md: 20 }}>
            <Badge 
              bg="linear-gradient(to right, #0071E3, #0071E3)"
              color="white"
              fontSize={{ base: "sm", md: "md" }} 
              px={{ base: 4, md: 6 }} 
              py={{ base: 2, md: 3 }}
              borderRadius="full"
              fontWeight="500"
              letterSpacing="0.5px"
            >
              Hushh × Stanford × Purdue × IIT
            </Badge>
            
            <VStack spacing={6}>
              <Heading 
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} 
                fontWeight="700"
                  bgGradient="linear(90deg, hsla(210, 100%, 45%, 1) 0%, hsla(275, 96%, 69%, 1) 25%, hsla(354, 88%, 61%, 1) 50%, hsla(13, 91%, 55%, 1) 100%)"
                  bgClip="text"
                  letterSpacing="-0.02em"
                  fontFamily="Inter, sans-serif"
                  mb={{ base: 4, md: 6 }}
              >
                Hushh Labs
              </Heading>
            </VStack>

            <VStack spacing={6} pt={8}>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="blue.600" 
                fontWeight="600"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                10 Open Positions • Remote & On-site Options
              </Text>
              
              <HStack spacing={{ base: 6, md: 12 }} flexWrap="wrap" justify="center">
                <HStack spacing={3}>
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize="lg">San Francisco, Palo Alto</Text>
                </HStack>
                <HStack spacing={3}>
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize="lg">World-class Team</Text>
                </HStack>
                <HStack spacing={3}>
                  <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                  <Text color="gray.700" fontWeight="500" fontSize="lg">Competitive Equity</Text>
                </HStack>
              </HStack>
            </VStack>
          </VStack>

          {/* Search and Filter */}
          <Box 
            mb={12} 
            bg="gray.50" 
            borderRadius="16px"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack spacing={4}>
              <Flex justify="space-between" align="center" w="full">
                <Text fontSize="sm" color="gray.600" fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
                  Showing {filteredJobs.length} of {jobPositions.length} positions
                </Text>
                {(searchTerm || filterDepartment) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterDepartment('');
                    }}
                    color="blue.600"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Clear filters
                  </Button>
                )}
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl>
                <Input
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                  borderRadius="12px"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce"
                  }}
                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                />
              </FormControl>
              <FormControl>
                <Select 
                  placeholder="Filter by department"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  size="lg"
                  borderRadius="12px"
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce"
                  }}
                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </Select>
              </FormControl>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Job Listings */}
          <VStack spacing={8} align="stretch">
            {filteredJobs.length === 0 ? (
              <Box 
                bg="gray.50" 
                borderRadius="16px"
                p={12}
                textAlign="center"
                border="1px solid"
                borderColor="gray.200"
              >
                <VStack spacing={4}>
                  <Heading size="md" color="gray.600" fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
                    No positions found
                  </Heading>
                  <Text color="gray.500" fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
                    Try adjusting your search or filter criteria
                  </Text>
                  {(searchTerm || filterDepartment) && (
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterDepartment('');
                      }}
                      bg="blue.600"
                      color="white"
                      size="md"
                      borderRadius="8px"
                      _hover={{ bg: "blue.700" }}
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      Clear all filters
                    </Button>
                  )}
                </VStack>
              </Box>
            ) : (
              filteredJobs.map((job) => (
              <Box 
                key={job.id} 
                bg="white" 
                border="1px solid"
                borderColor="gray.200"
                _hover={{
                  borderColor: "gray.300",
                  shadow: "sm"
                }}
                transition="all 0.2s ease"
                borderRadius="16px"
                p={8}
              >
                <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="start">
                  <VStack align="start" spacing={6} flex="1" mr={{ lg: 8 }}>
                    <HStack spacing={3} flexWrap="wrap">
                      <Badge 
                        bg="blue.50" 
                        color="blue.700" 
                        borderRadius="full" 
                        px={3} 
                        py={1}
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {job.department}
                      </Badge>
                      <Badge 
                        bg="green.50" 
                        color="green.700" 
                        borderRadius="full" 
                        px={3} 
                        py={1}
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {job.type}
                      </Badge>
                      <Badge 
                        bg="purple.50" 
                        color="purple.700" 
                        borderRadius="full" 
                        px={3} 
                        py={1}
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {job.experience}
                      </Badge>
                    </HStack>

                    <Heading 
                      size={{ base: "lg", md: "xl" }} 
                      color="gray.900"
                      fontWeight="600"
                      lineHeight="1.2"
                      fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {job.title}
                    </Heading>

                    <Text 
                      color="gray.600" 
                      fontSize={{ base: "md", md: "lg" }} 
                      lineHeight="1.6"
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {job.description}
                    </Text>

                    <HStack spacing={{ base: 4, md: 8 }} flexWrap="wrap">
                      <HStack spacing={2}>
                        <Icon as={FiMapPin} color="gray.500" boxSize={4} />
                        <Text color="gray.600" fontSize="sm" fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
                          {job.location}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiDollarSign} color="gray.500" boxSize={4} />
                        <Text color="gray.600" fontSize="sm" fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
                          {job.salary}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>

                  <VStack spacing={4} align={{ base: "stretch", lg: "end" }} mt={{ base: 6, lg: 0 }} minW={{ lg: "200px" }}>
                    <Button
                      bg="blue.600"
                      color="white"
                      size="lg"
                      rightIcon={<FiArrowRight />}
                      onClick={() => handleApplyClick(job)}
                      borderRadius="12px"
                      px={8}
                      h="48px"
                      _hover={{
                        bg: "blue.700",
                        transform: "translateY(-1px)"
                      }}
                      transition="all 0.2s ease"
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      fontWeight="600"
                    >
                      Apply Now
                    </Button>
                    <Text 
                      fontSize="sm" 
                      color="gray.500" 
                      textAlign={{ base: "left", lg: "right" }}
                      fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      Applications reviewed within 2 weeks
                    </Text>
                  </VStack>
                </Flex>

                <Divider my={8} borderColor="gray.200" />

                {/* Expandable Job Details */}
                <Accordion allowToggle>
                  <AccordionItem border="none">
                    <AccordionButton 
                      px={0} 
                      _hover={{ bg: "transparent" }}
                      _focus={{ boxShadow: "none" }}
                    >
                      <Box flex="1" textAlign="left">
                        <Text 
                          fontWeight="600" 
                          color="blue.600"
                          fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                        >
                          View Full Job Description
                        </Text>
                      </Box>
                      <AccordionIcon color="blue.600" />
                    </AccordionButton>
                    
                    <AccordionPanel px={0} pt={8}>
                      <VStack align="start" spacing={8}>
                        {/* About the Role */}
                        <Box>
                          <Heading 
                            size="md" 
                            mb={4} 
                            color="gray.900"
                            fontWeight="600"
                            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            About the Role
                          </Heading>
                          <Text 
                            color="gray.600" 
                            lineHeight="1.6"
                            fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            {job.aboutRole}
                          </Text>
                        </Box>

                        {/* Responsibilities */}
                        <Box>
                          <Heading 
                            size="md" 
                            mb={4} 
                            color="gray.900"
                            fontWeight="600"
                            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            What You'll Do
                          </Heading>
                          <List spacing={3}>
                            {job.responsibilities.map((resp, index) => (
                              <ListItem key={index} display="flex" alignItems="start">
                                <ListIcon as={FiCheck} color="green.500" mt={1} />
                                <Text 
                                  color="gray.600" 
                                  lineHeight="1.6"
                                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                                >
                                  {resp}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        {/* Qualifications */}
                        <Box>
                          <Heading 
                            size="md" 
                            mb={4} 
                            color="gray.900"
                            fontWeight="600"
                            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            Who You Are
                          </Heading>
                          <List spacing={3}>
                            {job.qualifications.map((qual, index) => (
                              <ListItem key={index} display="flex" alignItems="start">
                                <ListIcon as={FiCheck} color="blue.500" mt={1} />
                                <Text 
                                  color="gray.600" 
                                  lineHeight="1.6"
                                  fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                                >
                                  {qual}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </Box>

                        {/* Tech Stack */}
                        <Box>
                          <Heading 
                            size="md" 
                            mb={4} 
                            color="gray.900"
                            fontWeight="600"
                            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            Tech Stack
                          </Heading>
                          <Text 
                            color="gray.600" 
                            lineHeight="1.6"
                            fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            {job.techStack}
                          </Text>
                        </Box>

                        {/* Interview Process */}
                        <Box>
                          <Heading 
                            size="md" 
                            mb={4} 
                            color="gray.900"
                            fontWeight="600"
                            fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            Interview Process
                          </Heading>
                          <Text 
                            color="gray.600" 
                            lineHeight="1.6"
                            fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                          >
                            {job.interviewProcess}
                          </Text>
                        </Box>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            )))}
          </VStack>

          {/* About Hushh Lab Section */}
          <Box 
            mt={24} 
            bg="gray.50" 
            borderRadius="24px"
            p={{ base: 8, md: 12 }}
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack spacing={8} textAlign="center">
              <Heading 
                size="xl" 
                color="gray.900"
                fontWeight="600"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                About Hushh's Super Supreme Intelligence Lab
              </Heading>
              
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.600" 
                lineHeight="1.6" 
                maxW="4xl"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Hushh's Super Supreme Intelligence Lab is on a mission to develop superintelligent AI 
                systems that drive monumental breakthroughs for humanity. We are a highly driven, elite team of 
                researchers and engineers committed to pushing the boundaries of AI in a fast-paced, collaborative 
                environment.
              </Text>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="gray.600" 
                lineHeight="1.6" 
                maxW="4xl"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                We operate with a flat structure where everyone is hands-on and innovation and excellence 
                are rewarded with trust and responsibility. If you are passionate about advancing the state of the art in AI 
                and want to lead groundbreaking research, you will thrive here.
              </Text>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} pt={8}>
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiBriefcase} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size="md" 
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Cutting-Edge Research
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Work on next-generation AI models and algorithms that will shape the future of intelligence
                  </Text>
                </VStack>
                
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiUsers} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size="md" 
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    World-Class Team
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Collaborate with brilliant researchers and engineers from Stanford, Purdue, and IIT
                  </Text>
                </VStack>
                
                <VStack spacing={4}>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="12px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Icon as={FiDollarSign} boxSize={8} color="gray.700" />
                  </Box>
                  <Heading 
                    size="md" 
                    color="gray.900"
                    fontWeight="600"
                    fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Competitive Package
                  </Heading>
                  <Text 
                    color="gray.600" 
                    textAlign="center"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  >
                    Market-leading salary, equity, and comprehensive benefits package
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center" mt={20} py={16}>
            <VStack spacing={6}>
              <Heading 
                size="xl" 
                color="gray.900"
                fontWeight="600"
                fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Ready to Shape the Future of AI?
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="2xl" 
                mx="auto" 
                lineHeight="1.6"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Join us in building superintelligent AI systems that will benefit humanity. 
                All employment is decided on the basis of qualifications, merit, and business need.
              </Text>
              <Text 
                fontSize="sm" 
                color="gray.500" 
                fontStyle="italic"
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Hushh's Super Supreme Intelligence Lab is an equal opportunity employer and celebrates diversity.
              </Text>
            </VStack>
          </Box>
        </Container>

        {/* Application Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent borderRadius="16px">
            <ModalHeader fontFamily="'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
              Apply for {selectedJob?.title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Full Name</FormLabel>
                  <Input 
                    placeholder="Your full name" 
                    borderRadius="8px" 
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Email</FormLabel>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    borderRadius="8px"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Resume/CV</FormLabel>
                  <Input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    borderRadius="8px"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Cover Letter</FormLabel>
                  <Textarea 
                    placeholder="Tell us why you're interested in this role and what makes you exceptional..."
                    rows={6}
                    borderRadius="8px"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">Portfolio/GitHub (Optional)</FormLabel>
                  <Input 
                    placeholder="https://github.com/yourprofile" 
                    borderRadius="8px"
                    fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                variant="ghost" 
                mr={3} 
                onClick={onClose}
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Cancel
              </Button>
              <Button 
                bg="blue.600" 
                color="white"
                onClick={handleSubmitApplication}
                _hover={{ bg: "blue.700" }}
                fontFamily="'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                Submit Application
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <ContactForm/>
    </ContentWrapper>
  );
};

export default HushhLabsCareers;