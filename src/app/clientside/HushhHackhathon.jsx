"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ARIcon from "../_components/svg/hackathon/ARIcon.svg";
import EdgeIcon from "../_components/svg/hackathon/EdgeIcon.svg";
import Image from "next/image";
import FooterComponent from "../_components/features/FooterComponent";
import LinkedInIcon from "../_components/svg/hackathon/linkedInIcon.svg";
import YoutubeIcon from "../_components/svg/hackathon/youtubeIcon.svg";
import WhatsappIcon from "../_components/svg/hackathon/whatsappIcon.svg";
import DiscordIcon from "../_components/svg/hackathon/discordIcon.svg";
import HushhLogoS from "../_components/svg/hackathon/hushhLogo.svg";
import DevfolioLogo from "../../../public/svgs/hackhathonLogo.jpg";
import EthindiaLogo from "../../../public/svgs/ethindia.png";

const items = [
  { title: "AUGMENTED REALITY (AR)", icon: ARIcon },
  { title: "ARTIFICIAL INTELLIGENCE", icon: EdgeIcon },
  { title: "INTERNET OF THINGS", icon: ARIcon },
  { title: "BLOCKCHAIN", icon: EdgeIcon },
  { title: "VIRTUAL REALITY", icon: ARIcon },
  { title: "3D MODELLING", icon: EdgeIcon },
  { title: "BRAIN COMPUTER INTERFACE", icon: ARIcon },
  { title: "EDGE / CLOUD COMPUTING", icon: EdgeIcon },
];

const HushhHackhathon = () => {
  const targetDate = "2025-07-22T00:00:00+05:30";

  const calculateTimeLeft = () => {
    const diff = +new Date(targetDate) - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://apply.devfolio.co/v2/sdk.js';
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <>
      <Box w="100%" px={{ md: '4rem', base: '2rem' }}>
        <Stack flexDirection={{ md: 'row', base: 'column' }} gap={{ md: '4rem', base: '4rem' }}>
          <VStack flex={1} alignItems="flex-start" mt={{ md: '8rem', base: '4rem' }}>
            <Text fontWeight="600" fontSize={{ md: '1.25rem', base: '0.75rem' }} letterSpacing="0.1rem" lineHeight={{ md: '32px', base: '20px' }} color="#E4E4E4">
              HUSHH AI
            </Text>
            <Text fontWeight="400" fontSize={{ md: '1rem', base: '0.75rem' }} letterSpacing="0.1rem" lineHeight={{ md: '25.6px', base: '15px' }} color="#E4E4E4">
              PRESENTS
            </Text>
            <Text as="h1" fontWeight="700" fontSize={{ md: '4rem', base: '2rem' }} lineHeight={{ md: '76.8px', base: '40px' }} className="hushh-gradient" my={{ md: '1rem', base: '0.5rem' }}>
              Hushh PDA Hackathon @ IIT Bombay
            </Text>
            <Text fontWeight="400" fontSize={{ md: '1.25rem', base: '0.75rem' }} lineHeight={{ md: '32px', base: '20px' }} color="#E4E4E4">
              Build AI agents that work for you — while you sleep.
            </Text>
            <Button borderRadius="2px" fontSize={{ md: '1rem', base: '1rem' }} letterSpacing="0.29rem" border="1px solid #606060" fontWeight="400" bg="transparent" lineHeight={{ md: '28.8px', base: '15px' }} color="white" _hover={{ color:'white', background:'linear-gradient(256.5deg, #e0055f 6.97%, #2020ed 92.26%)', border:'none' }} onClick={() => window.open('https://forms.gle/AcJUMmhZXXCFytus9')}>
              Apply Now
            </Button>
            {/* <div
              className="apply-button"
              data-hackathon-slug="hushh-x-dav-club-personal-data-agent-hackathon"
              data-button-theme="light"
              style={{ height: "44px", width: "312px" }}
            ></div> */}

          </VStack>

                    <VStack
            w={"100%"}
            flex={1}
            color={"#FFFFFF"}
            justifyContent={"center"}
            flexDirection={{md:"row",base:"column"}}
            alignItems={"center"}
            spacing={{ md: '3.5rem', base: '2rem' }}
          >
            {/* Countdown Timer */}
            <Flex>
              <VStack>
                <Text
                  lineHeight={{ md: "84px", base: "42px" }}
                  fontWeight={"600"}
                  fontSize={{ md: "4.375rem", base: "2.1rem" }}
                >
                  {timeLeft.days != null
                    ? String(timeLeft.days).padStart(2, "0")
                    : "00"}
                </Text>
                <Text
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={"24px"}
                  fontWeight={"600"}
                >
                  Days
                </Text>
              </VStack>
              <Text fontSize={{md:'2rem',base:'1rem'}} mx={2} my={{base:3, md:5}}>
                :
              </Text>
              <VStack>
                <Text
                  lineHeight={{ md: "84px", base: "42px" }}
                  fontWeight={"600"}
                  fontSize={{ md: "4.375rem", base: "2.1rem" }}
                >
                  {timeLeft.hours != null
                    ? String(timeLeft.hours).padStart(2, "0")
                    : "00"}
                </Text>
                <Text
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={"24px"}
                  fontWeight={"600"}
                >
                  Hours
                </Text>
              </VStack>
              <Text fontSize={{md:'2rem',base:'1rem'}} mx={2} my={{base:3, md:5}}>
                :
              </Text>
              <VStack>
                <Text
                  lineHeight={{ md: "84px", base: "42px" }}
                  fontWeight={"600"}
                  fontSize={{ md: "4.375rem", base: "2.1rem" }}
                >
                  {timeLeft.minutes != null
                    ? String(timeLeft.minutes).padStart(2, "0")
                    : "00"}
                </Text>
                <Text
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={"24px"}
                  fontWeight={"600"}
                >
                  Minutes
                </Text>
              </VStack>
              <Text fontSize={{md:'2rem',base:'1rem'}} mx={2} my={{base:3, md:5}}>
                :
              </Text>
              <VStack>
                <Text
                  lineHeight={{ md: "84px", base: "42px" }}
                  fontWeight={"600"}
                  fontSize={{ md: "4.375rem", base: "2.1rem" }}
                >
                  {timeLeft.seconds != null
                    ? String(timeLeft.seconds).padStart(2, "0")
                    : "00"}
                </Text>
                <Text
                  fontSize={{ md: "1.25rem", base: "1rem" }}
                  lineHeight={"24px"}
                  fontWeight={"600"}
                >
                  Seconds
                </Text>
              </VStack>
            </Flex>

         



          </VStack>
          
        </Stack>

       

        {/* About */}
        <VStack my={{ md: '6rem', base: '3rem' }} textAlign="left" alignItems="flex-start">
          <Text fontWeight="700" fontSize={{ md: '3.81rem', base: '1.9rem' }} lineHeight={{ md: '73.2px', base: '42.4px' }} className="hushh-gradient">
            What's This Hackathon About?
          </Text>
          <Box mt={{ md: '1rem', base: '0.5rem' }} display="flex" flexDirection="column" gap={{ md: '0.75rem', base: '0.45rem' }} color="#E4E4E4" fontWeight="500" lineHeight={{ md: '32px', base: '20px' }} fontSize={{ md: '1.25rem', base: '0.75rem' }}>
            <Text>The Hushh PDA Hackathon is a bold AI sprint hosted online by the DAV Team, IIT Bombay to build the next generation of Personal Data Agents (PDAs) — intelligent AI tools that know your data, understand your needs, and act on your behalf.</Text>
            <Text>Think: your own Jarvis × Notion × GPT-4. In one week.</Text>
            <Text>Whether it's managing your finances, organizing your calendar, or reminding you to take a break — these agents are meant to solve real human problems while you sleep.</Text>
          </Box>
        </VStack>

        {/* Mission & Theme */}
        <VStack mx={{ md: '0', base: '0' }} textAlign="left" alignItems="flex-start" spacing={{ md: '2rem', base: '1rem' }}>
          <Text className="hushh-gradient" fontSize={{ md: '3.8rem', base: '1.9rem' }} fontWeight="700" lineHeight={{ md: '73.2px', base: '42px' }}>
            Mission
          </Text>
          <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>To accelerate the prototype of Hushh's Personal Data Agent (PDA) product by inviting India's top AI minds to build agentic, wow-worthy prototypes around core human needs — health, money, time, trust, and joy.</Text>
          <Text className="hushh-gradient" fontSize={{ md: '3.8rem', base: '1.9rem' }} fontWeight="700" lineHeight={{ md: '73.2px', base: '42px' }}>
            Theme: "You, Upgraded"
          </Text>
          <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>A week-long hybrid AI hack to build PDAs that automate life's annoying tasks and boost productivity — powered by Hushh's infra and your ideas.</Text>
        </VStack>

        {/* What You'll Build */}
        <VStack mt={{md:'4rem',base:'2rem'}} textAlign="left" alignItems="flex-start" spacing={{ md: '2rem', base: '1rem' }}>
          <Text className="hushh-gradient" fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} lineHeight={{ md: '73.2px', base: '42px' }}>
            What You'll Build
          </Text>
          {[
            'FinanceBot – Splits bills, manages expenses, tracks subscriptions',
            'Focus Assistant – Weekly planning + time blocking + reminders',
            'Wellness Coach – Habit tracking + stress detection + sleep tips',
            'Gift Recommender – Finds and buys the right gift for any person',
            'Wildcard – Any agent solving a real-world, human-first problem'
          ].map((text,i)=>(
            <HStack key={i}>
              <Text color="#e0055f" fontWeight="bold">•</Text>
              <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>{text}</Text>
            </HStack>
          ))}
        </VStack>

        {/* Tech Stack Provided */}
        <VStack mt={{md:'4rem',base:'2rem'}}  textAlign="left" alignItems="flex-start" spacing={{ md: '2rem', base: '1rem' }}>
          <Text className="hushh-gradient" fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} lineHeight={{ md: '73.2px', base: '42px' }}>
            Tech Stack Provided
          </Text>
          {[
            'LLMs: GPT-4, Claude, Mistral, Llama 3 (BYO LLM supported)',
            'Frameworks: LangChain, LlamaIndex for agent orchestration',
            'Memory: ChromaDB, Pinecone',
            'Integrations: Make.com, Zapier, HushhSDK and APIs',
            'Opensource tooling available via Hugging Face, Kaggle, Google Colab'
          ].map((text,i)=>(
            <HStack key={i}>
              <Text color="#2020ed" fontWeight="bold">•</Text>
              <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>{text}</Text>
            </HStack>
          ))}
        </VStack>

        {/* Prizes & Rewards */}
        <VStack mt={{md:'4rem',base:'2rem'}}  textAlign="left" alignItems="flex-start" spacing={{ md: '2rem', base: '1rem' }}>
          <Text className="hushh-gradient" fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} lineHeight={{ md: '73.2px', base: '42px' }}>
            Prizes & Rewards
          </Text>
          {[
            'Total Prize Pool: ₹1,70,000+',
            '1st Prize: ₹1,00,000 + Full-time offer @ Hushh.ai and/or HushhTech.com as L1-L3 Full Stack Engineer',
            '2nd Prize: ₹50,000 + Job/internship offer',
            '3rd Prize: ₹20,000 + Collaboration with Hushh Labs (newly established Lab starting Fall 2025)',
            'All finalists: Paid internship / Hushh Engineering Co-op Program from Fall 2025 through Spring 2026',
            'Top teams: Demo at global Hushh investor/founder event',
            'Other standout teams may receive internship offers too'
          ].map((text,i)=>(
            <HStack key={i}>
              <Text color="#e0055f" fontWeight="bold">•</Text>
              <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>{text}</Text>
            </HStack>
          ))}
        </VStack>

        {/* Judging Criteria */}
        <VStack mt={{md:'4rem',base:'2rem'}}  textAlign="left" alignItems="flex-start" spacing={{ md: '2rem', base: '1rem' }}>
          <Text className="hushh-gradient" fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} lineHeight={{ md: '73.2px', base: '42px' }}>
            Judging Criteria
          </Text>
          <SimpleGrid columns={[1, null, 5]} spacing={4}>
            {[
              { label: 'WOW Factor', weight: '30%' },
              { label: 'Agent Intelligence', weight: '25%' },
              { label: 'UX & Polish', weight: '15%' },
              { label: 'Impact', weight: '15%' },
              { label: 'Scalability', weight: '15%' }
            ].map((c,i)=>(
              <VStack key={i} p={4} bg="#111" borderRadius="2px">
                <Text color="#E4E4E4" fontWeight="600">{c.label}</Text>
                <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>{c.weight}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Logistics & Who Can Apply */}
        <Stack flexDirection={{ md: 'row', base: 'column' }} spacing={{ md: '4rem', base: '2rem' }} my={{ md: '4rem', base: '2rem' }}>
          <VStack alignItems="flex-start" spacing={2} fontSize={{md:'1.25rem',base:'0.75rem'}}>
            <Text fontWeight="700"  fontSize={{ md: '3.8rem', base: '1.9rem' }} className="hushh-gradient">Logistics</Text>
            <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>Where: Online (hosted by DAV Team, IIT Bombay)</Text>
            <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>When: 22th July – 30th July</Text>
            <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>Core 96-hour build window over the duration of 1 week total</Text>
            <Text color="#E4E4E4">Pre-Hack workshop & onboarding support with Hushh Team</Text>
            <Text color="#E4E4E4">Demo Day with panel of founders & AI operators (Google, Microsoft, Salesforce engineering leaders)</Text>
          </VStack>
          <VStack alignItems="flex-start" spacing={2} fontSize={{md:'1.25rem',base:'0.75rem'}}>
            <Text fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} className="hushh-gradient">Who Can Apply?</Text>
            <Text color="#E4E4E4">Students across all IIT Campuses in India</Text>
            <Text color="#E4E4E4">Teams of 1–4 people (solo hackers welcome always - we love all types of hackers and engineers who love to break and make things 🙌)</Text>
            <Text color="#E4E4E4">Remote participation available for all - encourage to use collaboration tools to maximize productivity and quality of overall product/ prototype of PDA</Text>
          </VStack>
        </Stack>

        {/* Timeline */}
        <VStack alignItems="flex-start" spacing={2} my={{ md: '4rem', base: '2rem' }}>
          <Text fontWeight="700" fontSize={{ md: '3.8rem', base: '1.9rem' }} className="hushh-gradient">Timeline</Text>
          {[
            { date: 'July 21', event: 'Application Deadline' },
            { date: 'July 22', event: 'Final Team Confirmation' },
            { date: 'July 23–24', event: 'Hackathon Sprint 1 (48 hrs)' },
            { date: 'July 25–30', event: 'Hackathon Sprint 2 (48 hrs)' },
            { date: 'Sprint 3 (48 hrs)', event: 'Polish + async mentorship (48 hrs)' },
            { date: 'July 30', event: 'Final Demo Day' }
          ].map((t,i)=>(
            <HStack key={i} spacing={2}>
              <Text color="#E4E4E4" fontWeight="600" fontSize={{md:'1.25rem',base:'0.75rem'}}>{t.date}:</Text>
              <Text color="#E4E4E4" fontSize={{md:'1.25rem',base:'0.75rem'}}>{t.event}</Text>
            </HStack>
          ))}
        </VStack>

        {/* Submission & Contact */}
        <VStack my={{ md: '4rem', base: '2rem' }} alignItems="center" spacing={4} mb={{ base: '4rem' }}>
          <Button borderRadius="2px" fontSize={{ md: '1rem', base: '1rem' }} letterSpacing="0.29rem" border="1px solid #606060" fontWeight="400" bg="transparent" lineHeight={{ md: '28.8px', base: '15px' }} color="white" _hover={{ color:'white', background:'linear-gradient(256.5deg, #e0055f 6.97%, #2020ed 92.26%)', border:'none' }} onClick={() => window.open('https://forms.gle/AcJUMmhZXXCFytus9')}>
            Apply Now
          </Button>
          <Text color="#E4E4E4" textAlign="center" fontSize={{md:'1.25rem',base:'0.85rem'}}>
            Submission Format: Push your code to GitHub: Create a new repository named Hushh_Hackathon_Team_Name and ensure README.md explains setup steps clearly.
          </Text>
          <HStack spacing={4}>
            {/* <Image src={WhatsappIcon} alt="WhatsappIcon" width={32} height={32} onClick={() => window.open('https://chat.whatsapp.com/CTa7ULornjfHEzVyvNN9gB','_blank')} style={{cursor:'pointer'}} /> */}
            <Image src={DiscordIcon} alt="DiscordIcon" width={32} height={32} onClick={() => window.open('https://discord.gg/Vznzv5k7','_blank')} style={{cursor:'pointer'}} />
            <Image src={LinkedInIcon} alt="LinkedInIcon" width={32} height={32} onClick={() => window.open('https://www.linkedin.com/company/hushh-ai/','_blank')} style={{cursor:'pointer'}} />
            {/* <Image src={YoutubeIcon} alt="YoutubeIcon" width={32} height={32} onClick={() => window.open('https://www.youtube.com/@hushhai','_blank')} style={{cursor:'pointer'}} /> */}
          </HStack>
          <Text color="#E4E4E4" textAlign="center">
            Got questions? Ping us at: hackathon@hushh.ai | i-akshat@hush1one.com | ankit@hushh.ai
          </Text>
        </VStack>
      </Box>
      <FooterComponent />
    </>
  );
};

export default HushhHackhathon;
