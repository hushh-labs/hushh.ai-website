'use client'
import React, { useState } from "react";
import HushhFooterLogo from "../svg/hushhFooterLogo";
import Link from "next/link";
import { AndroidIcon } from "../svg/icons/androidIcon";
import { IosIcon } from "../svg/icons/iosIcon";
import { useResponsiveSizes } from "../../context/responsive";
import "../../globals.css";
import HushhMobileFooterLogo from "../svg/hushhMobileFooterLogo";
import { animateScroll as scroll } from "react-scroll";
import { isMobile, isAndroid, isIOS } from "react-device-detect";
import UnicodeQR from "../../_components/svg/onelinkQrdownload.svg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import DownloadModal from "../primitives/downloadModal";

const FooterComponent = () => {
  // const isMobile = useResponsiveSizes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQRLink, setCurrentQRLink] = useState("");
  const scrollTo = () => {
    scroll.scrollTo(4250);
  };

  const handleOpenModal = (link) => {
    setCurrentQRLink(link);
    setIsModalOpen(true);
  };

  const handleDownloadClick = () => {
    window.location.href = "https://apps.apple.com/in/app/hushh-app/id6498471189";
  };

  const scrollInMobile = () => {
    scroll.scrollTo(3350);
  };

  return (
    <>
      <div
         className=" bg-footerBG text-white md:pt-[375px]"
        style={{ zIndex: "-2 !important" }}
      >
        {/* Desktop View */}
        <div className="hideDesktopSVG ml-32 mb-4">
          <HushhFooterLogo />
        </div>
        <div className="desktop-view">
          <div className="flex justify-between gap-52 items-start pb-[6.5rem] px-32">
            <div className="w-96 gap-4 flex flex-col justify-normal">
              <p className="font-semibold text-2xl leading-10">
                Future of “Digital Identity” & “Personalised Experiences”
              </p>
              <p className="text-lg">Manish Sainani, 2024</p>
              <p>
                Call <a href="tel:+14252969050">+14252969050</a>
              </p>
            </div>

            <div className="flex justify-between w-full flex-1">
              <div className="flex flex-col gap-4">
                <p className="text-base font-medium opacity-80 leading-6">
                  Our Products
                </p>
                <div className="flex flex-col text-lg gap-5 leading-5">
                  <Link href="/products/hushhWalletApp">Hushh Wallet App</Link>
                  <Link href="/products/hushhButton">Hushh Button</Link>
                  <Link href="/products/vibeSearch">Vibe Search</Link>
                  <Link href="/products/browserCompanion">
                    Browser Companion
                  </Link>
                  <Link href="/developerApi">Developer API</Link>
                  {/* <Link href="/products/conciergeApp">Concierge App​</Link> */}
                  {/* <Link href="/products/hushhValetChat">Valet Chat</Link> */}
                  <Link href="/products/hushhForStudents">HFS App</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-medium opacity-80 leading-6">
                  Company
                </p>
                <div className="flex flex-col text-lg gap-5 leading-5">
                  <Link href="/demoBookingPage">Free Demo</Link>
                  {/* <Link href="/pricingPlans">Pricing</Link> */}
                  <Link href="https://hushh-labs.github.io/hushh-labs-blog/">
                    Blog
                  </Link>
                  <Link href="https://www.linkedin.com/company/hushh-ai/jobs/">
                    Careers
                  </Link>
                  <Link href="#" onClick={scrollTo}>
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-medium opacity-80 leading-6">
                  Resources
                </p>
                <div className="flex flex-col text-lg gap-5 leading-5">
                  {/* <Link href="/UserGuide">
                  User Guide Book
                </Link> */}
                  {/* <Link href="https://sites.google.com/hush1one.com/drops/home/journey">
                  Documentation
                </Link> */}
                  {/* <Link href="https://sites.google.com/hush1one.com/drops/home/journey">
                  Papers
                </Link> */}
                  <Link href="/demoBookingPage">Live Demonstration</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base font-medium opacity-80 leading-6">
                  Get the app
                </p>
                <div className="flex flex-col justify-between h-max gap-3.5">
                  <button
                    onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189")}
                    className="flex px-4 hover:bg-gradientColor2  py-2 gap-1.5 w-max border border-myBorder rounded-full"
                  >
                    Download Our App
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between leading-5 py-7 px-32 bg-gradient-to-r from-gradientColor2 to-gradientColor1">
            <div className="">
              <p>© 2025 HushOne Inc. All rights reserved.</p>
            </div>
            <div className="flex gap-9 ">
              <Link href="/legal/termsofuse">Terms of Service</Link>
              <Link href="/legal/privacypolicy">Privacy Policy</Link>
              {/* <Link href='#'>Cookies</Link> */}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="mobile-view">
          <div className="flex flex-col justify-center items-center gap-10 pb-10 pt-10">
            <div className="w-full px-5 gap-4 flex flex-col justify-center items-start">
              <HushhMobileFooterLogo />
              <p className="font-semibold text-xl leading-10">
                Future of “Digital Identity” & “Personalised Experiences”
              </p>
              <p className="text-base">Manish Sainani, 2024</p>
              <p>
                Call <a href="tel:+14252969050">+14252969050</a>
              </p>
            </div>

            <div className="flex flex-col text-left px-5 gap-5 justify-between w-full flex-1">
              <div className="flex">
                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-sm font-medium opacity-80 leading-6">
                    Our Products
                  </p>
                  <div className="flex flex-col text-base gap-2 leading-5">
                    <Link href="/products/hushhWalletApp">
                      Hushh Wallet App
                    </Link>
                    <Link href="/products/hushhButton">Hushh Button</Link>
                    <Link href="/products/vibeSearch">Vibe Search</Link>
                    <Link href="/products/browserCompanion">
                      Browser Companion
                    </Link>
                    <Link href="/developerApi">Developer API</Link>
                    {/* <Link href="/products/conciergeApp">Concierge App​</Link> */}
                    {/* <Link href="/products/hushhValetChat">Valet Chat</Link> */}
                    <Link href="/products/hushhForStudents">HFS App</Link>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-sm font-medium opacity-80 leading-6">
                    Company
                  </p>
                  <div className="flex flex-col text-base gap-2 leading-5">
                    <Link href="/demoBookingPage">Free Demo</Link>

                    <Link href="https://hushh-labs.github.io/hushh-labs-blog/">
                      Blog
                    </Link>
                    <Link href="https://www.linkedin.com/company/hushh-ai/jobs/">
                      Careers
                    </Link>
                    {/* <Link href="/pricingPlans">Pricing</Link> */}
                    <Link href="#" onClick={scrollInMobile}>
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium opacity-80 leading-6">
                  Resources
                </p>
                <div className="flex flex-col text-base gap-2 leading-5">
                  {/* <Link href="/UserGuide">
                  User Guide Book
                </Link> */}
                  {/* <Link href="https://sites.google.com/hush1one.com/drops/home/journey">
                  Documentation
                </Link>
                <Link href="https://sites.google.com/hush1one.com/drops/home/journey">
                  Papers
                </Link> */}
                  <Link href="/demoBookingPage">Live Demonstration</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-center mt-5">
                <p className="text-base font-medium opacity-80 leading-6">
                  Get the app
                </p>
                <div className="flex items-center justify-center gap-5 h-full">
                  <button onClick={() => router.push("https://apps.apple.com/in/app/hushh-app/id6498471189")} className="flex flex-1 hover:border-none justify-center px-4 py-2 gap-1.5 border border-myBorder rounded-full">
                    Download Hushh App
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between leading-5 py-7 text-center gap-8 bg-gradient-to-r from-gradientColor2 to-gradientColor1">
            <div className="flex gap-4 flex-col w-full">
              <Link href="/legal/termsofuse">Terms of Service</Link>
              <Link href="/legal/privacypolicy">Privacy Policy</Link>
              {/* <Link href='#'>Cookies</Link> */}
            </div>
            <div className=" w-full">
              <p>© 2025 Hush1One Inc. All rights reserved.</p>
              <p>Duns # 119019629</p>
            </div>
          </div>  
        </div>
      </div>
<DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </>
  );
};

export default FooterComponent;
